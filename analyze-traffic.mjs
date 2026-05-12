import Redis from 'ioredis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
let redisUrl = '';
try {
  const envPath = join(__dirname, '.worktrees/security-overhaul/.env.local');
  const envFile = readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key === 'REDIS_URL') {
        redisUrl = value;
      }
    }
  });
} catch (err) {
  console.error('Could not load .env.local:', err.message);
  process.exit(1);
}

const redis = new Redis(redisUrl);

async function analyzeTraffic() {
  console.log('📊 Live Now Club - Traffic & Subscription Analysis\n');
  console.log('=' .repeat(60));

  try {
    // 1. Email Subscriptions
    console.log('\n📧 EMAIL SUBSCRIPTIONS\n');
    const totalEmails = await redis.get('stats:emails:total') || '0';
    console.log(`Total email captures: ${totalEmails}`);

    const emailKeys = await redis.keys('email:*');
    console.log(`Emails in database: ${emailKeys.length}`);

    // Check last 30 days
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    console.log('\nEmail signups by date (last 30 days):');
    let foundAnyEmails = false;
    for (const date of dates) {
      const count = await redis.get(`stats:emails:${date}`);
      if (count && parseInt(count) > 0) {
        console.log(`  ${date}: ${count}`);
        foundAnyEmails = true;
      }
    }
    if (!foundAnyEmails) {
      console.log('  (No email signups in last 30 days)');
    }

    // Substack success/failure
    console.log('\nSubstack integration status:');
    let totalSuccess = 0;
    let totalFailed = 0;
    for (const date of dates) {
      const success = await redis.get(`stats:substack:success:${date}`);
      const failed = await redis.get(`stats:substack:failed:${date}`);
      if (success) totalSuccess += parseInt(success);
      if (failed) totalFailed += parseInt(failed);
    }
    console.log(`  Successful: ${totalSuccess}`);
    console.log(`  Failed: ${totalFailed}`);

    // 2. Traffic Analysis
    console.log('\n\n🌐 TRAFFIC ANALYSIS\n');

    // Total pageviews
    console.log('Pageviews by date (last 30 days):');
    let foundAnyViews = false;
    for (const date of dates) {
      const total = await redis.get(`stats:pageviews:${date}:total`);
      if (total && parseInt(total) > 0) {
        console.log(`  ${date}: ${total} views`);
        foundAnyViews = true;
      }
    }
    if (!foundAnyViews) {
      console.log('  (No pageviews tracked in last 30 days)');
    }

    // Top pages
    console.log('\nTop pages (last 7 days):');
    const pageCounts = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const keys = await redis.keys(`stats:pageviews:${dateStr}:*`);
      for (const key of keys) {
        if (key.endsWith(':total')) continue;
        const page = key.split(':')[3] || key.split(':').slice(3).join(':');
        const count = await redis.get(key);
        pageCounts[page] = (pageCounts[page] || 0) + parseInt(count || '0');
      }
    }

    const sortedPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    if (sortedPages.length > 0) {
      sortedPages.forEach(([page, count]) => {
        console.log(`  ${page}: ${count} views`);
      });
    } else {
      console.log('  (No page data)');
    }

    // Unique visitors
    console.log('\nUnique visitors by date (last 7 days):');
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const visitors = await redis.scard(`stats:visitors:${dateStr}`);
      if (visitors > 0) {
        console.log(`  ${dateStr}: ${visitors} unique visitors`);
      }
    }

    // 3. Funnel Analysis
    console.log('\n\n🎯 CONVERSION FUNNEL\n');

    // Homepage visits vs newsletter signups
    let homepageViews = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const views = await redis.get(`stats:pageviews:${dateStr}:/`);
      homepageViews += parseInt(views || '0');
    }

    console.log(`Homepage views (last 7 days): ${homepageViews}`);
    console.log(`Newsletter signups (last 7 days): ${foundAnyEmails ? 'See above' : '0'}`);

    // 4. Recent Activity
    console.log('\n\n⏰ RECENT ACTIVITY\n');
    const recentVisits = await redis.zrange('stats:recent', -10, -1);
    console.log('Last 10 visits:');
    if (recentVisits.length > 0) {
      recentVisits.reverse().forEach(visit => {
        try {
          const data = JSON.parse(visit);
          console.log(`  ${data.timestamp}: ${data.page} (${data.country || 'unknown'})`);
        } catch (e) {
          console.log(`  (Could not parse: ${visit.substring(0, 50)}...)`);
        }
      });
    } else {
      console.log('  (No recent activity tracked)');
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Analysis complete\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await redis.quit();
  }
}

analyzeTraffic();

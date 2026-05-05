import Redis from 'ioredis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env.local manually
try {
  const envPath = join(__dirname, '../../.env.local');
  const envFile = readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
} catch (err) {
  console.error('Could not load .env.local:', err.message);
}

const redis = new Redis(process.env.REDIS_URL || '');

async function checkConnectStats() {
  console.log('Checking /connect page statistics...\n');

  try {
    // Get recent visits
    const recentVisits = await redis.zrange('stats:recent', 0, -1);
    const connectVisits = recentVisits
      .map(visit => JSON.parse(visit))
      .filter(visit => visit.page === '/connect');

    console.log(`Recent /connect visits: ${connectVisits.length}`);
    if (connectVisits.length > 0) {
      console.log('\nMost recent /connect visits:');
      connectVisits.slice(-5).forEach(visit => {
        console.log(`  - ${visit.timestamp} from ${visit.country}`);
      });
    }

    // Check pageview counts for recent dates
    const dates = [];
    for (let i = 0; i < 30; i++) {  // Check last 30 days
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    console.log('\n/connect pageviews by date:');
    let foundAny = false;
    for (const date of dates) {
      const count = await redis.get(`stats:pageviews:${date}:/connect`);
      if (count && parseInt(count) > 0) {
        console.log(`  ${date}: ${count} views`);
        foundAny = true;
      }
    }
    if (!foundAny) {
      console.log('  (No pageviews found in last 30 days)');
    }

    // Check total pageviews
    const allKeys = await redis.keys('stats:pageviews:*:/connect');
    const totalConnectViews = await Promise.all(
      allKeys.map(key => redis.get(key))
    );
    const total = totalConnectViews
      .map(v => parseInt(v || '0'))
      .reduce((a, b) => a + b, 0);

    console.log(`\nTotal /connect pageviews (all time): ${total}`);

    // Check if there are any email submissions
    const emailKeys = await redis.keys('email:*');
    console.log(`\nTotal newsletter signups: ${emailKeys.length}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await redis.quit();
  }
}

checkConnectStats();

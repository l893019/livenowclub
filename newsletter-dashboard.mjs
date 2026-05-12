import Redis from 'ioredis';
import { readFileSync } from 'fs';

// Load Redis URL from .env.local
let redisUrl = '';
try {
  const envFile = readFileSync('.worktrees/security-overhaul/.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && match[1].trim() === 'REDIS_URL') {
      redisUrl = match[2].trim();
    }
  });
} catch (err) {
  console.error('Could not load .env.local:', err.message);
  process.exit(1);
}

const redis = new Redis(redisUrl);

async function showDashboard() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║       📊 THE LIVE NOW CLUB - NEWSLETTER DASHBOARD              ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // ========================================
    // OVERVIEW (Last 7 Days)
    // ========================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📈 OVERVIEW (Last 7 Days)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Total pageviews
    let totalPageviews = 0;
    let essayPageviews = 0;
    let homepagePageviews = 0;

    for (const date of dates) {
      const total = await redis.get(`stats:pageviews:${date}:total`);
      const homepage = await redis.get(`stats:pageviews:${date}:/`);

      if (total) totalPageviews += parseInt(total);
      if (homepage) homepagePageviews += parseInt(homepage);

      // Count essay pages
      const keys = await redis.keys(`stats:pageviews:${date}:/read/*`);
      for (const key of keys) {
        const count = await redis.get(key);
        if (count) essayPageviews += parseInt(count);
      }
    }

    // Email signups
    let totalSignups = 0;
    for (const date of dates) {
      const signups = await redis.get(`stats:emails:${date}`);
      if (signups) totalSignups += parseInt(signups);
    }

    console.log(`  📄 Total Pageviews:       ${totalPageviews.toLocaleString()}`);
    console.log(`  🏠 Homepage Views:         ${homepagePageviews.toLocaleString()}`);
    console.log(`  📖 Essay Views:            ${essayPageviews.toLocaleString()}`);
    console.log(`  ✉️  Email Signups:          ${totalSignups.toLocaleString()}`);
    if (totalPageviews > 0) {
      const conversionRate = ((totalSignups / totalPageviews) * 100).toFixed(2);
      console.log(`  📊 Overall Conversion:     ${conversionRate}%`);
    }

    // ========================================
    // EXIT-INTENT POPUP (Essays)
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚪 EXIT-INTENT POPUP (Essay Pages)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let exitIntentShown = 0;
    let exitIntentDismissed = 0;

    for (const date of dates) {
      const shown = await redis.get(`stats:events:${date}:exit_intent_shown`);
      const dismissed = await redis.get(`stats:events:${date}:exit_intent_dismissed`);
      if (shown) exitIntentShown += parseInt(shown);
      if (dismissed) exitIntentDismissed += parseInt(dismissed);
    }

    // Get exit-intent signups
    const exitIntentEvents = await redis.zrange('stats:events:email_signup', 0, -1);
    let exitIntentSignups = 0;
    for (const eventStr of exitIntentEvents) {
      try {
        const event = JSON.parse(eventStr);
        if (event.context === 'exit-intent') {
          exitIntentSignups++;
        }
      } catch (e) {}
    }

    console.log(`  👀 Popup Shown:            ${exitIntentShown.toLocaleString()} times`);
    console.log(`  ❌ Dismissed:              ${exitIntentDismissed.toLocaleString()} times`);
    console.log(`  ✉️  Email Signups:          ${exitIntentSignups.toLocaleString()}`);

    if (exitIntentShown > 0) {
      const impressionRate = ((exitIntentShown / essayPageviews) * 100).toFixed(1);
      const dismissRate = ((exitIntentDismissed / exitIntentShown) * 100).toFixed(1);
      const conversionRate = ((exitIntentSignups / exitIntentShown) * 100).toFixed(2);

      console.log(`\n  📊 Stats:`);
      console.log(`     • Impression Rate:      ${impressionRate}% of essay readers saw popup`);
      console.log(`     • Dismiss Rate:         ${dismissRate}% closed without subscribing`);
      console.log(`     • Conversion Rate:      ${conversionRate}% subscribed`);
    } else {
      console.log(`\n  ⚠️  No data yet - popup may not be triggering`);
    }

    // ========================================
    // SCROLL SLIDE-IN (Homepage)
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📜 SCROLL SLIDE-IN (Homepage)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let slideInShown = 0;
    let slideInDismissed = 0;

    for (const date of dates) {
      const shown = await redis.get(`stats:events:${date}:scroll_slidein_shown`);
      const dismissed = await redis.get(`stats:events:${date}:scroll_slidein_dismissed`);
      if (shown) slideInShown += parseInt(shown);
      if (dismissed) slideInDismissed += parseInt(dismissed);
    }

    // Get scroll slide-in signups
    let slideInSignups = 0;
    for (const eventStr of exitIntentEvents) {
      try {
        const event = JSON.parse(eventStr);
        if (event.context === 'essay' && event.page === '/') {
          slideInSignups++;
        }
      } catch (e) {}
    }

    console.log(`  👀 Slide-in Shown:         ${slideInShown.toLocaleString()} times`);
    console.log(`  ❌ Dismissed:              ${slideInDismissed.toLocaleString()} times`);
    console.log(`  ✉️  Email Signups:          ${slideInSignups.toLocaleString()}`);

    if (slideInShown > 0) {
      const impressionRate = ((slideInShown / homepagePageviews) * 100).toFixed(1);
      const dismissRate = ((slideInDismissed / slideInShown) * 100).toFixed(1);
      const conversionRate = ((slideInSignups / slideInShown) * 100).toFixed(2);

      console.log(`\n  📊 Stats:`);
      console.log(`     • Impression Rate:      ${impressionRate}% of homepage visitors scrolled 50%+`);
      console.log(`     • Dismiss Rate:         ${dismissRate}% closed without subscribing`);
      console.log(`     • Conversion Rate:      ${conversionRate}% subscribed`);
    } else {
      console.log(`\n  ⚠️  No data yet - slide-in may not be triggering`);
    }

    // ========================================
    // DAILY BREAKDOWN
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📅 DAILY BREAKDOWN (Last 7 Days)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('Date       | Views | Exit Pop | Slide-in | Signups');
    console.log('-----------|-------|----------|----------|--------');

    for (const date of dates.reverse()) {
      const views = await redis.get(`stats:pageviews:${date}:total`) || '0';
      const exitPop = await redis.get(`stats:events:${date}:exit_intent_shown`) || '0';
      const slideIn = await redis.get(`stats:events:${date}:scroll_slidein_shown`) || '0';
      const signups = await redis.get(`stats:emails:${date}`) || '0';

      console.log(`${date} | ${views.toString().padStart(5)} | ${exitPop.toString().padStart(8)} | ${slideIn.toString().padStart(8)} | ${signups.toString().padStart(7)}`);
    }

    // ========================================
    // TOP ESSAYS
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 TOP ESSAYS (Last 7 Days)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const essayCounts = {};
    for (const date of dates) {
      const keys = await redis.keys(`stats:pageviews:${date}:/read/*`);
      for (const key of keys) {
        const parts = key.split(':');
        const essay = parts.slice(3).join(':');
        const count = await redis.get(key);
        essayCounts[essay] = (essayCounts[essay] || 0) + parseInt(count || '0');
      }
    }

    const topEssays = Object.entries(essayCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    if (topEssays.length > 0) {
      topEssays.forEach(([essay, count], i) => {
        const slug = essay.replace('/read/', '');
        console.log(`  ${(i + 1).toString().padStart(2)}. ${slug.padEnd(50)} ${count.toLocaleString().padStart(5)} views`);
      });
    } else {
      console.log('  No essay data available');
    }

    // ========================================
    // RECOMMENDATIONS
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 RECOMMENDATIONS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (totalPageviews === 0) {
      console.log('  ⚠️  No traffic data - analytics may not be tracking properly');
    } else if (exitIntentShown === 0 && slideInShown === 0) {
      console.log('  ⚠️  No popup impressions - components may not be deployed yet');
      console.log('     Wait 24 hours for data to accumulate');
    } else {
      if (exitIntentShown > 0) {
        const exitRate = (exitIntentSignups / exitIntentShown) * 100;
        if (exitRate < 1) {
          console.log('  📝 Exit popup conversion is low (<1%) - consider:');
          console.log('     • Testing different copy');
          console.log('     • Offering a lead magnet (free guide)');
          console.log('     • Adding social proof ("Join 1,234 readers")');
        } else if (exitRate > 5) {
          console.log('  ✅ Exit popup is performing well (>5% conversion)!');
        }
      }

      if (slideInShown > 0) {
        const slideRate = (slideInSignups / slideInShown) * 100;
        if (slideRate < 1) {
          console.log('  📝 Scroll slide-in conversion is low (<1%) - consider:');
          console.log('     • Making it more prominent');
          console.log('     • Triggering earlier (at 25% instead of 50%)');
          console.log('     • Adding urgency ("Join 1,234 readers")');
        } else if (slideRate > 5) {
          console.log('  ✅ Scroll slide-in is performing well (>5% conversion)!');
        }
      }

      const overallConversion = (totalSignups / totalPageviews) * 100;
      if (overallConversion < 1) {
        console.log('  📊 Overall conversion is low (<1%) - consider:');
        console.log('     • Adding newsletter signup to end of essays');
        console.log('     • Testing different value propositions');
        console.log('     • Showing subscriber count for social proof');
      } else if (overallConversion > 3) {
        console.log('  🎉 Great overall conversion rate (>3%)!');
      }
    }

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  Run again: node newsletter-dashboard.mjs                      ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await redis.quit();
  }
}

showDashboard();

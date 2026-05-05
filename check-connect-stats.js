import Redis from 'ioredis';
import 'dotenv/config';

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
    const today = new Date().toISOString().split('T')[0];
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    console.log('\n/connect pageviews by date:');
    for (const date of dates) {
      const count = await redis.get(`stats:pageviews:${date}:/connect`);
      if (count && parseInt(count) > 0) {
        console.log(`  ${date}: ${count} views`);
      }
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

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await redis.quit();
  }
}

checkConnectStats();

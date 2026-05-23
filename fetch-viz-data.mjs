import Redis from 'ioredis';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import from the project
const require = createRequire(import.meta.url);
const projectPath = '/Users/louiseireland/Projects/livenowclub';

// Dynamically import the functions
const dimensionsPath = join(projectPath, 'src/lib/dimensions.ts');
const identitiesPath = join(projectPath, 'src/lib/identities.ts');

// Since we can't directly import .ts files, we'll implement the logic here
// based on the viz-data route code

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

async function fetchVizData() {
  try {
    const userKeys = await redis.keys('user:*');
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));

    console.log(`Found ${actualUserKeys.length} user keys`);

    const users = [];

    for (const key of actualUserKeys) {
      try {
        const userData = await redis.get(key);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.answers && user.answers.length > 0 && user.dimensions && user.identity) {
            users.push({
              id: user.id,
              agency: user.dimensions.agency,
              certainty: user.dimensions.certainty,
              posture: user.dimensions.posture,
              identity: user.identity.key || 'unknown',
              identityName: user.identity.name || 'Unknown',
              noun: user.identity.noun || 'unknown',
              adjective: user.identity.adjective || 'unknown',
              quadrant: user.identity.quadrant || 'unknown',
            });
          }
        }
      } catch (e) {
        console.error('Error parsing user:', key, e.message);
      }
    }

    console.log(`Processed ${users.length} users with complete data`);

    // Calculate identity centroids
    const identityGroups = {};

    users.forEach(user => {
      if (!identityGroups[user.identity]) {
        identityGroups[user.identity] = { agency: [], posture: [], certainty: [] };
      }
      identityGroups[user.identity].agency.push(user.agency);
      identityGroups[user.identity].posture.push(user.posture);
      identityGroups[user.identity].certainty.push(user.certainty);
    });

    const identityCentroids = Object.entries(identityGroups).map(([identity, coords]) => ({
      identity,
      identityName: users.find(u => u.identity === identity)?.identityName || identity,
      count: coords.agency.length,
      centroid: {
        agency: coords.agency.reduce((a, b) => a + b, 0) / coords.agency.length,
        posture: coords.posture.reduce((a, b) => a + b, 0) / coords.posture.length,
        certainty: coords.certainty.reduce((a, b) => a + b, 0) / coords.certainty.length,
      }
    })).sort((a, b) => b.count - a.count);

    const result = {
      users,
      identityCentroids,
      metadata: {
        totalUsers: users.length,
        uniqueIdentities: identityCentroids.length,
        axisLabels: {
          x: { min: 'Witness', max: 'Builder', label: 'Agency' },
          y: { min: 'Protective', max: 'Expansive', label: 'Posture' },
          color: { min: 'Seeking', max: 'Settled', label: 'Certainty' }
        },
        quadrants: [
          { name: 'Open', x: 'low', y: 'high', description: 'Seeking + Expansive' },
          { name: 'Poised/Driven', x: 'high', y: 'high', description: 'Settled + Expansive' },
          { name: 'Thoughtful', x: 'low', y: 'low', description: 'Seeking + Protective' },
          { name: 'Grounded', x: 'high', y: 'low', description: 'Settled + Protective' }
        ]
      }
    };

    // Write to file
    fs.writeFileSync('/tmp/scatter-plot-data.json', JSON.stringify(result, null, 2));
    console.log('Data written to /tmp/scatter-plot-data.json');
    console.log(`Total users: ${result.metadata.totalUsers}`);
    console.log(`Unique identities: ${result.metadata.uniqueIdentities}`);
    console.log(`Top 5 identities:`);
    result.identityCentroids.slice(0, 5).forEach(ic => {
      console.log(`  ${ic.identityName}: ${ic.count} users`);
    });

    await redis.quit();
    return result;
  } catch (error) {
    console.error('Error:', error);
    await redis.quit();
    process.exit(1);
  }
}

fetchVizData();

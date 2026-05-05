import { redis } from './redis';

// Security event types
export type SecurityEventType = 'auth' | 'ratelimit' | 'csrf' | 'data' | 'admin';

// Security event structure
export interface SecurityEvent {
  type: SecurityEventType;
  action: string;
  timestamp: string;
  metadata: Record<string, any>;
}

// Constants
const EVENT_PREFIX = 'security:events:';
const COUNT_PREFIX = 'security:count:';
const EVENT_TTL = 90 * 24 * 60 * 60; // 90 days in seconds

/**
 * Logs a security event to Redis sorted set
 * Events are stored in daily sorted sets with 90-day TTL
 * Also increments a counter for each event type
 */
export async function logSecurityEvent(
  type: SecurityEventType,
  action: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  const timestamp = new Date().toISOString();
  const date = timestamp.split('T')[0]; // YYYY-MM-DD
  const score = Date.now(); // Use timestamp as score for sorting

  const event: SecurityEvent = {
    type,
    action,
    timestamp,
    metadata,
  };

  const key = `${EVENT_PREFIX}${date}`;
  const countKey = `${COUNT_PREFIX}${type}:${action}`;

  try {
    // Store event in sorted set (score = timestamp, value = event JSON)
    await redis.zadd(key, score, JSON.stringify(event));

    // Set TTL on the sorted set (90 days)
    await redis.expire(key, EVENT_TTL);

    // Increment event counter
    await redis.incr(countKey);
  } catch (error) {
    // Logging should not break the application
    console.error('Failed to log security event:', error);
  }
}

/**
 * Retrieves security events for a specific date
 * Optionally filters by event type and limits results
 */
export async function getSecurityEvents(
  date: string,
  type?: SecurityEventType,
  limit?: number
): Promise<SecurityEvent[]> {
  const key = `${EVENT_PREFIX}${date}`;
  const end = limit ? limit - 1 : -1;

  try {
    // Get events in reverse chronological order (most recent first)
    const events = await redis.zrevrange(key, 0, end);

    // Parse JSON events
    const parsedEvents = events
      .map((eventStr) => {
        try {
          return JSON.parse(eventStr) as SecurityEvent;
        } catch {
          // Skip malformed events
          return null;
        }
      })
      .filter((event): event is SecurityEvent => event !== null);

    // Filter by type if specified
    if (type) {
      return parsedEvents.filter((event) => event.type === type);
    }

    return parsedEvents;
  } catch (error) {
    console.error('Failed to retrieve security events:', error);
    return [];
  }
}

/**
 * Retrieves event counts for all event types
 * Returns an object mapping event type:action to count
 */
export async function getEventCounts(): Promise<Record<string, number>> {
  try {
    // Get all count keys
    const keys = await redis.keys(`${COUNT_PREFIX}*`);

    if (keys.length === 0) {
      return {};
    }

    // Get counts for all keys
    const counts: Record<string, number> = {};

    for (const key of keys) {
      const eventType = key.replace(COUNT_PREFIX, '');
      const count = await redis.get(key);
      counts[eventType] = parseInt(count || '0', 10);
    }

    return counts;
  } catch (error) {
    console.error('Failed to retrieve event counts:', error);
    return {};
  }
}

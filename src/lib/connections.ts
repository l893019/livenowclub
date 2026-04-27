import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

// =============================================================================
// TYPES
// =============================================================================

export type Connection = {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
};

// =============================================================================
// CONNECTION FUNCTIONS
// =============================================================================

/**
 * Create a mutual connection between two users.
 * Connections are bidirectional - if A connects with B, B also connects with A.
 */
export async function createConnection(userAId: string, userBId: string): Promise<Connection> {
  // Normalize order to prevent duplicate connections (always store smaller ID first)
  const [first, second] = [userAId, userBId].sort();
  const connectionId = `${first}:${second}`;

  const existing = await redis.get(`connection:${connectionId}`);
  if (existing) {
    return JSON.parse(existing);
  }

  const connection: Connection = {
    id: connectionId,
    userAId: first,
    userBId: second,
    createdAt: new Date().toISOString(),
  };

  // Store connection
  await redis.set(`connection:${connectionId}`, JSON.stringify(connection));

  // Add to both users' connection lists
  await redis.sadd(`user:${first}:connections`, connectionId);
  await redis.sadd(`user:${second}:connections`, connectionId);

  return connection;
}

/**
 * Get all connections for a user
 */
export async function getUserConnections(userId: string): Promise<Connection[]> {
  const connectionIds = await redis.smembers(`user:${userId}:connections`);

  if (connectionIds.length === 0) {
    return [];
  }

  // Batch fetch all connections in one Redis call
  const keys = connectionIds.map(id => `connection:${id}`);
  const results = await redis.mget(...keys);

  const connections: Connection[] = [];
  for (const data of results) {
    if (data) {
      try {
        connections.push(JSON.parse(data));
      } catch {
        // Skip malformed data
      }
    }
  }

  // Sort by most recent first
  return connections.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Check if two users are connected
 */
export async function areConnected(userAId: string, userBId: string): Promise<boolean> {
  const [first, second] = [userAId, userBId].sort();
  const connectionId = `${first}:${second}`;
  const exists = await redis.exists(`connection:${connectionId}`);
  return exists === 1;
}

/**
 * Remove a connection (user removes someone from their connections)
 * Note: This is unilateral - removes from YOUR list only
 */
export async function removeConnection(userId: string, connectionId: string): Promise<void> {
  await redis.srem(`user:${userId}:connections`, connectionId);
  // Note: We don't delete the connection itself or remove from other user's list
  // The other person can still see them in their connections
}

/**
 * Get the other user ID from a connection
 */
export function getOtherUserId(connection: Connection, currentUserId: string): string {
  return connection.userAId === currentUserId ? connection.userBId : connection.userAId;
}

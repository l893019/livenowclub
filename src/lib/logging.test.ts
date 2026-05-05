import {
  logSecurityEvent,
  getSecurityEvents,
  getEventCounts,
  SecurityEventType,
} from './logging';
import { redis } from './redis';

jest.mock('./redis', () => ({
  redis: {
    zadd: jest.fn(),
    zrange: jest.fn(),
    zrevrange: jest.fn(),
    expire: jest.fn(),
    get: jest.fn(),
    incr: jest.fn(),
    keys: jest.fn(),
  },
}));

describe('Security Audit Logging', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('logSecurityEvent', () => {
    it('should log authentication event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('auth', 'session_created', {
        userId: 'user-123',
        ip: '192.168.1.1',
      });

      expect(redis.zadd).toHaveBeenCalledWith(
        'security:events:2024-01-15',
        expect.any(Number),
        expect.stringContaining('"type":"auth"')
      );

      expect(redis.expire).toHaveBeenCalledWith(
        'security:events:2024-01-15',
        90 * 24 * 60 * 60
      );
    });

    it('should log rate limit event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('ratelimit', 'exceeded', {
        userId: 'user-123',
        ip: '192.168.1.1',
        action: 'update-email',
      });

      const callArgs = (redis.zadd as jest.Mock).mock.calls[0];
      const eventData = JSON.parse(callArgs[2]);

      expect(eventData.type).toBe('ratelimit');
      expect(eventData.action).toBe('exceeded');
      expect(eventData.metadata.userId).toBe('user-123');
      expect(eventData.metadata.action).toBe('update-email');
    });

    it('should log CSRF event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('csrf', 'token_mismatch', {
        ip: '192.168.1.1',
      });

      const callArgs = (redis.zadd as jest.Mock).mock.calls[0];
      const eventData = JSON.parse(callArgs[2]);

      expect(eventData.type).toBe('csrf');
      expect(eventData.action).toBe('token_mismatch');
    });

    it('should log data modification event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('data', 'email_updated', {
        userId: 'user-123',
        ip: '192.168.1.1',
        field: 'email',
      });

      const callArgs = (redis.zadd as jest.Mock).mock.calls[0];
      const eventData = JSON.parse(callArgs[2]);

      expect(eventData.type).toBe('data');
      expect(eventData.action).toBe('email_updated');
      expect(eventData.metadata.field).toBe('email');
    });

    it('should log admin event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('admin', 'stats_accessed', {
        ip: '192.168.1.1',
        endpoint: '/api/stats',
      });

      const callArgs = (redis.zadd as jest.Mock).mock.calls[0];
      const eventData = JSON.parse(callArgs[2]);

      expect(eventData.type).toBe('admin');
      expect(eventData.action).toBe('stats_accessed');
      expect(eventData.metadata.endpoint).toBe('/api/stats');
    });

    it('should include timestamp in event', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('auth', 'session_created', {
        userId: 'user-123',
      });

      const callArgs = (redis.zadd as jest.Mock).mock.calls[0];
      const score = callArgs[1];
      const eventData = JSON.parse(callArgs[2]);

      expect(score).toBe(Date.now());
      expect(eventData.timestamp).toBe(new Date().toISOString());
    });

    it('should increment event count', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('auth', 'session_created', {
        userId: 'user-123',
      });

      expect(redis.incr).toHaveBeenCalledWith('security:count:auth:session_created');
    });

    it('should set 90-day TTL on event log', async () => {
      (redis.zadd as jest.Mock).mockResolvedValue(1);
      (redis.expire as jest.Mock).mockResolvedValue(1);
      (redis.incr as jest.Mock).mockResolvedValue(1);

      await logSecurityEvent('auth', 'session_created', {
        userId: 'user-123',
      });

      expect(redis.expire).toHaveBeenCalledWith(
        'security:events:2024-01-15',
        90 * 24 * 60 * 60
      );
    });
  });

  describe('getSecurityEvents', () => {
    it('should retrieve events for a specific date', async () => {
      const mockEvents = [
        JSON.stringify({
          type: 'auth',
          action: 'session_created',
          timestamp: '2024-01-15T10:00:00Z',
          metadata: { userId: 'user-123' },
        }),
        JSON.stringify({
          type: 'auth',
          action: 'session_expired',
          timestamp: '2024-01-15T11:00:00Z',
          metadata: { userId: 'user-456' },
        }),
      ];

      (redis.zrevrange as jest.Mock).mockResolvedValue(mockEvents);

      const result = await getSecurityEvents('2024-01-15');

      expect(redis.zrevrange).toHaveBeenCalledWith(
        'security:events:2024-01-15',
        0,
        -1
      );

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('auth');
      expect(result[0].action).toBe('session_created');
      expect(result[1].action).toBe('session_expired');
    });

    it('should filter by event type', async () => {
      const mockEvents = [
        JSON.stringify({
          type: 'auth',
          action: 'session_created',
          timestamp: '2024-01-15T10:00:00Z',
          metadata: {},
        }),
        JSON.stringify({
          type: 'ratelimit',
          action: 'exceeded',
          timestamp: '2024-01-15T11:00:00Z',
          metadata: {},
        }),
      ];

      (redis.zrevrange as jest.Mock).mockResolvedValue(mockEvents);

      const result = await getSecurityEvents('2024-01-15', 'auth');

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('auth');
    });

    it('should limit results when limit parameter provided', async () => {
      const mockEvents = Array(100).fill(null).map((_, i) =>
        JSON.stringify({
          type: 'auth',
          action: 'session_created',
          timestamp: `2024-01-15T${String(i).padStart(2, '0')}:00:00Z`,
          metadata: {},
        })
      );

      (redis.zrevrange as jest.Mock).mockResolvedValue(mockEvents.slice(0, 50));

      const result = await getSecurityEvents('2024-01-15', undefined, 50);

      expect(redis.zrevrange).toHaveBeenCalledWith(
        'security:events:2024-01-15',
        0,
        49
      );

      expect(result).toHaveLength(50);
    });

    it('should return empty array when no events', async () => {
      (redis.zrevrange as jest.Mock).mockResolvedValue([]);

      const result = await getSecurityEvents('2024-01-15');

      expect(result).toEqual([]);
    });

    it('should handle malformed JSON gracefully', async () => {
      const mockEvents = [
        JSON.stringify({ type: 'auth', action: 'test', timestamp: '2024-01-15T10:00:00Z', metadata: {} }),
        'invalid json',
        JSON.stringify({ type: 'auth', action: 'test2', timestamp: '2024-01-15T11:00:00Z', metadata: {} }),
      ];

      (redis.zrevrange as jest.Mock).mockResolvedValue(mockEvents);

      const result = await getSecurityEvents('2024-01-15');

      // Should skip invalid JSON and return only valid events
      expect(result).toHaveLength(2);
      expect(result[0].action).toBe('test');
      expect(result[1].action).toBe('test2');
    });
  });

  describe('getEventCounts', () => {
    it('should return counts for all event types', async () => {
      (redis.keys as jest.Mock).mockResolvedValue([
        'security:count:auth:session_created',
        'security:count:auth:session_expired',
        'security:count:ratelimit:exceeded',
        'security:count:csrf:token_mismatch',
        'security:count:data:email_updated',
        'security:count:admin:stats_accessed',
      ]);

      (redis.get as jest.Mock)
        .mockResolvedValueOnce('100') // auth:session_created
        .mockResolvedValueOnce('50')  // auth:session_expired
        .mockResolvedValueOnce('10')  // ratelimit:exceeded
        .mockResolvedValueOnce('5')   // csrf:token_mismatch
        .mockResolvedValueOnce('20')  // data:email_updated
        .mockResolvedValueOnce('3');  // admin:stats_accessed

      const result = await getEventCounts();

      expect(result).toEqual({
        'auth:session_created': 100,
        'auth:session_expired': 50,
        'ratelimit:exceeded': 10,
        'csrf:token_mismatch': 5,
        'data:email_updated': 20,
        'admin:stats_accessed': 3,
      });
    });

    it('should return empty object when no counts exist', async () => {
      (redis.keys as jest.Mock).mockResolvedValue([]);

      const result = await getEventCounts();

      expect(result).toEqual({});
    });

    it('should handle missing count values', async () => {
      (redis.keys as jest.Mock).mockResolvedValue([
        'security:count:auth:session_created',
        'security:count:auth:session_expired',
      ]);

      (redis.get as jest.Mock)
        .mockResolvedValueOnce('100')
        .mockResolvedValueOnce(null);

      const result = await getEventCounts();

      expect(result).toEqual({
        'auth:session_created': 100,
        'auth:session_expired': 0,
      });
    });
  });
});

'use client';

import { useEffect, useState } from 'react';

type Stats = {
  pageviews: Record<string, number>;
  visitors: Record<string, number>;
  referrers: Record<string, number>;
  countries: Record<string, number>;
  recent: Array<{
    page: string;
    timestamp: string;
    country: string;
    referrer: string;
  }>;
  topPages: Array<{
    page: string;
    views: number;
  }>;
  emails: {
    total: number;
    byDate: Record<string, number>;
    byIdentity: Record<string, number>;
    substackSuccess: number;
    substackFailed: number;
  };
  events: Record<string, number>;
  funnel: {
    quizStarted: number;
    quizCompleted: number;
    emailSignup: number;
    completionRate: number;
    signupRate: number;
  };
  users: {
    total: number;
    recent: Array<{
      id: string;
      name: string;
      archetype: string;
      identityName: string;
      email: string | null;
      createdAt: string;
    }>;
    byIdentity: Record<string, number>;
    byDate: Record<string, number>;
  };
  utopias: {
    total: number;
    recent: Array<{
      slug: string;
      name: string;
      memberCount: number;
      createdAt: string;
      createdBy: string;
    }>;
  };
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/stats?days=${days}`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
      setLoading(false);
    };

    fetchStats();
  }, [days]);

  if (loading) {
    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
        <h1>Loading analytics...</h1>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
        <h1>Failed to load analytics</h1>
      </div>
    );
  }

  const totalPageviews = Object.values(stats.pageviews).reduce((a, b) => a + b, 0);
  const totalVisitors = Object.values(stats.visitors).reduce((a, b) => a + b, 0);
  const avgPageviews = Math.round(totalPageviews / days);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Analytics</h1>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => setDays(7)}
            style={{
              padding: '8px 16px',
              background: days === 7 ? '#000' : '#eee',
              color: days === 7 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Last 7 days
          </button>
          <button
            onClick={() => setDays(30)}
            style={{
              padding: '8px 16px',
              background: days === 30 ? '#000' : '#eee',
              color: days === 30 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Last 30 days
          </button>
          <button
            onClick={() => setDays(90)}
            style={{
              padding: '8px 16px',
              background: days === 90 ? '#000' : '#eee',
              color: days === 90 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Last 90 days
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Pageviews</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalPageviews.toLocaleString()}</div>
        </div>
        <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Unique Visitors</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalVisitors.toLocaleString()}</div>
        </div>
        <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Avg per Day</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{avgPageviews.toLocaleString()}</div>
        </div>
        <div style={{ background: '#e8178a', color: '#fff', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Quiz Users</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.users.total.toLocaleString()}</div>
        </div>
        <div style={{ background: '#4a90e2', color: '#fff', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Email Signups</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.emails.total.toLocaleString()}</div>
        </div>
        <div style={{ background: '#50c878', color: '#fff', padding: '24px', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Utopias Created</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.utopias.total.toLocaleString()}</div>
        </div>
      </div>

      {/* Funnel Metrics */}
      {stats.funnel && stats.funnel.quizStarted > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Conversion Funnel</h2>
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Quiz Started</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.funnel.quizStarted.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Quiz Completed</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.funnel.quizCompleted.toLocaleString()}</div>
                <div style={{ fontSize: '13px', color: '#e8178a', marginTop: '4px' }}>
                  {stats.funnel.completionRate}% completion
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Email Signups</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.funnel.emailSignup.toLocaleString()}</div>
                <div style={{ fontSize: '13px', color: '#e8178a', marginTop: '4px' }}>
                  {stats.funnel.signupRate}% signup rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Users */}
      {stats.users && stats.users.total > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Quiz Users ({stats.users.total.toLocaleString()})</h2>

          {/* Identity Distribution */}
          {Object.keys(stats.users.byIdentity).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}>Identity Distribution</h3>
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                {Object.entries(stats.users.byIdentity)
                  .sort(([, a], [, b]) => b - a)
                  .map(([identity, count], i) => {
                    const percentage = ((count / stats.users.total) * 100).toFixed(1);
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          borderBottom: i < Object.keys(stats.users.byIdentity).length - 1 ? '1px solid #eee' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{identity}</span>
                          <div style={{ flex: 1, height: '8px', background: '#f0f0f0', borderRadius: '4px', maxWidth: '200px' }}>
                            <div style={{ height: '100%', background: '#e8178a', borderRadius: '4px', width: `${percentage}%` }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '13px', color: '#666' }}>{percentage}%</span>
                          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{count}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Recent Users */}
          {stats.users.recent && stats.users.recent.length > 0 && (
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}>Recent Quiz Completions</h3>
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                {stats.users.recent.map((user, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      borderBottom: i < stats.users.recent.length - 1 ? '1px solid #eee' : 'none',
                      fontSize: '13px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div>
                        <span style={{ fontWeight: '500', marginRight: '8px' }}>{user.name}</span>
                        <span style={{ color: '#e8178a', fontSize: '12px' }}>{user.identityName}</span>
                      </div>
                      <span style={{ color: '#666', fontSize: '12px' }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {user.email && (
                      <div style={{ color: '#999', fontSize: '12px' }}>{user.email}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Utopias */}
      {stats.utopias && stats.utopias.total > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Utopias ({stats.utopias.total.toLocaleString()})</h2>
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
            {stats.utopias.recent.map((utopia, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderBottom: i < stats.utopias.recent.length - 1 ? '1px solid #eee' : 'none',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div>
                    <span style={{ fontWeight: '500', marginRight: '8px' }}>{utopia.name}</span>
                    <span style={{ color: '#50c878', fontSize: '12px' }}>
                      {utopia.memberCount} {utopia.memberCount === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  <span style={{ color: '#666', fontSize: '12px' }}>
                    {new Date(utopia.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ color: '#999', fontSize: '12px', fontFamily: 'monospace' }}>
                  /wonder/essay/quiz/utopia/{utopia.slug}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Metrics */}
      {stats.emails.total > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Email Subscriptions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Substack Integration</div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0a0' }}>
                  {stats.emails.substackSuccess}
                </span>
                <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>successful</span>
              </div>
              <div>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#c00' }}>
                  {stats.emails.substackFailed}
                </span>
                <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>failed/retry</span>
              </div>
            </div>

            {Object.keys(stats.emails.byIdentity).length > 0 && (
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Top Identities</div>
                {Object.entries(stats.emails.byIdentity)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([identity, count]) => (
                    <div key={identity} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#333' }}>{identity}</span>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#e8178a' }}>{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Events */}
      {stats.events && Object.keys(stats.events).length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Events</h2>
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
            {Object.entries(stats.events)
              .sort(([, a], [, b]) => b - a)
              .map(([event, count], i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderBottom: i < Object.keys(stats.events).length - 1 ? '1px solid #eee' : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{event}</span>
                  <span style={{ fontWeight: 'bold' }}>{count.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Top Pages */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Top Pages</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {stats.topPages.map((page, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px',
                borderBottom: i < stats.topPages.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{page.page}</span>
              <span style={{ fontWeight: 'bold' }}>{page.views.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Referrers */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Top Referrers</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {Object.entries(stats.referrers)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([referrer, count], i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: i < 9 ? '1px solid #eee' : 'none',
                }}
              >
                <span style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {referrer || 'Direct'}
                </span>
                <span style={{ fontWeight: 'bold' }}>{count.toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Countries */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Countries</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {Object.entries(stats.countries)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([country, count], i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: i < 9 ? '1px solid #eee' : 'none',
                }}
              >
                <span style={{ fontSize: '14px' }}>{country}</span>
                <span style={{ fontWeight: 'bold' }}>{count.toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Recent Activity</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {stats.recent.map((visit, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                borderBottom: i < stats.recent.length - 1 ? '1px solid #eee' : 'none',
                fontSize: '13px',
              }}
            >
              <div style={{ fontFamily: 'monospace', marginBottom: '4px' }}>{visit.page}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>
                {new Date(visit.timestamp).toLocaleString()} • {visit.country} •{' '}
                {visit.referrer || 'Direct'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

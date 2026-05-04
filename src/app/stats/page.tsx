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
  engagement: {
    avgSessionDuration: number;
    avgPagesPerSession: string;
    bounceRate: number;
    totalSessions: number;
    topEngagingPages: Array<{
      page: string;
      avgTimeSeconds: number;
      views: number;
    }>;
    exitPages: Array<{
      page: string;
      exits: number;
      exitRate: number;
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

  // Categorize pages
  const articles = stats.topPages.filter(p => p.page.startsWith('/read/') && p.page !== '/read' && p.page !== '/read/all');
  const quizPages = stats.topPages.filter(p => p.page.includes('/quiz'));
  const otherPages = stats.topPages.filter(p => !p.page.startsWith('/read/') && !p.page.includes('/quiz'));

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

      {/* Engagement Metrics - User Behavior Insights */}
      {stats.engagement && stats.engagement.totalSessions > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#4a90e2' }}>🎯 User Engagement & Behavior</h2>

          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#fff', border: '2px solid #4a90e2', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Avg Session Duration</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4a90e2' }}>
                {Math.floor(stats.engagement.avgSessionDuration / 60)}m {stats.engagement.avgSessionDuration % 60}s
              </div>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                {stats.engagement.avgSessionDuration > 180 ? '🟢 Great engagement!' : stats.engagement.avgSessionDuration > 60 ? '🟡 Good' : '🔴 Improve engagement'}
              </div>
            </div>

            <div style={{ background: '#fff', border: '2px solid #50c878', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Pages per Session</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#50c878' }}>
                {stats.engagement.avgPagesPerSession}
              </div>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                {Number(stats.engagement.avgPagesPerSession) > 3 ? '🟢 Excellent!' : Number(stats.engagement.avgPagesPerSession) > 1.5 ? '🟡 Good' : '🔴 Users not exploring'}
              </div>
            </div>

            <div style={{ background: '#fff', border: '2px solid #ff6b6b', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Bounce Rate</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6b6b' }}>
                {stats.engagement.bounceRate}%
              </div>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                {stats.engagement.bounceRate < 40 ? '🟢 Excellent!' : stats.engagement.bounceRate < 60 ? '🟡 Average' : '🔴 High drop-off'}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Total Sessions</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.engagement.totalSessions}</div>
            </div>
          </div>

          {/* Engagement Insights */}
          <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: '600' }}>💡 Insights & Recommendations</h3>
            <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#495057' }}>
              {stats.engagement.bounceRate > 60 && (
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600', color: '#ff6b6b' }}>⚠️ High Bounce Rate:</span> {stats.engagement.bounceRate}% of visitors leave after one page.
                  Try adding:
                  <ul style={{ marginTop: '6px', marginBottom: '0', paddingLeft: '24px' }}>
                    <li>Related article links at the end of posts</li>
                    <li>Clear calls-to-action to explore more content</li>
                    <li>"Read Next" recommendations</li>
                  </ul>
                </div>
              )}
              {Number(stats.engagement.avgPagesPerSession) < 2 && (
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600', color: '#ffa500' }}>📊 Low Pages/Session:</span> Users view {stats.engagement.avgPagesPerSession} pages on average.
                  Encourage exploration with:
                  <ul style={{ marginTop: '6px', marginBottom: '0', paddingLeft: '24px' }}>
                    <li>Internal linking between related essays</li>
                    <li>A "Popular Posts" sidebar widget</li>
                    <li>Content clusters around themes</li>
                  </ul>
                </div>
              )}
              {stats.engagement.avgSessionDuration < 60 && (
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600', color: '#dc3545' }}>⏱️ Short Sessions:</span> Average session is under 1 minute.
                  Keep users engaged longer with:
                  <ul style={{ marginTop: '6px', marginBottom: '0', paddingLeft: '24px' }}>
                    <li>Compelling opening paragraphs that hook readers</li>
                    <li>Break up long text with subheadings and images</li>
                    <li>Interactive elements like the quiz</li>
                  </ul>
                </div>
              )}
              {stats.engagement.bounceRate < 40 && Number(stats.engagement.avgPagesPerSession) > 3 && stats.engagement.avgSessionDuration > 180 && (
                <div style={{ color: '#28a745', fontWeight: '600' }}>
                  ✅ Excellent engagement! Users are exploring your content deeply and staying engaged.
                </div>
              )}
            </div>
          </div>

          {/* Pages That Keep Users Engaged */}
          {stats.engagement.topEngagingPages.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>⏰ Pages That Keep Users Engaged (Avg Time on Page)</h3>
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                {stats.engagement.topEngagingPages.map((page, i) => {
                  const minutes = Math.floor(page.avgTimeSeconds / 60);
                  const seconds = page.avgTimeSeconds % 60;
                  const isArticle = page.page.startsWith('/read/');
                  const articleName = isArticle
                    ? page.page.replace('/read/', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    : page.page;

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 16px',
                        borderBottom: i < stats.engagement.topEngagingPages.length - 1 ? '1px solid #eee' : 'none',
                        background: i === 0 ? '#f0f8ff' : 'transparent',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: i === 0 ? '600' : '500', marginBottom: '4px' }}>
                          {i === 0 && '🏆 '}
                          {isArticle ? `📖 ${articleName}` : articleName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{page.views} views</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a90e2' }}>
                        {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exit Pages - Where Users Leave */}
          {stats.engagement.exitPages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>🚪 Exit Pages (Where Users Leave)</h3>
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                {stats.engagement.exitPages.map((page, i) => {
                  const isArticle = page.page.startsWith('/read/');
                  const articleName = isArticle
                    ? page.page.replace('/read/', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    : page.page;

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 16px',
                        borderBottom: i < stats.engagement.exitPages.length - 1 ? '1px solid #eee' : 'none',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                          {isArticle ? `📖 ${articleName}` : articleName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {page.exits} exits • {page.exitRate}% exit rate
                        </div>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b6b' }}>
                        {page.exits}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '12px', fontStyle: 'italic' }}>
                💡 Tip: Add "Read More" links or related content suggestions to these pages to reduce exits.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Engagement - What People Are Reading */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#e8178a' }}>📖 What People Are Reading</h2>

        {/* Top Articles */}
        {articles.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>Top Articles ({articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()} total views)</h3>
            <div style={{ background: '#fff', border: '2px solid #e8178a', borderRadius: '8px', overflow: 'hidden' }}>
              {articles.slice(0, 10).map((page, i) => {
                const articleName = page.page.replace('/read/', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                const percentage = articles.length > 0 ? ((page.views / articles.reduce((sum, a) => sum + a.views, 0)) * 100).toFixed(1) : 0;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      borderBottom: i < Math.min(articles.length, 10) - 1 ? '1px solid #f0f0f0' : 'none',
                      background: i === 0 ? '#fff9fc' : 'transparent',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        {i === 0 && <span style={{ fontSize: '20px' }}>🏆</span>}
                        <span style={{ fontWeight: i === 0 ? '700' : '500', fontSize: i === 0 ? '15px' : '14px' }}>
                          {articleName}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          flex: 1,
                          height: '6px',
                          background: '#f0f0f0',
                          borderRadius: '3px',
                          maxWidth: '300px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            background: i === 0 ? '#e8178a' : '#ffc0e0',
                            borderRadius: '3px',
                            width: `${percentage}%`,
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#999', minWidth: '45px' }}>{percentage}%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
                      <span style={{
                        fontSize: i === 0 ? '24px' : '18px',
                        fontWeight: 'bold',
                        color: i === 0 ? '#e8178a' : '#333'
                      }}>
                        {page.views.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '12px', color: '#999' }}>views</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quiz Engagement */}
        {quizPages.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>Quiz Engagement ({quizPages.reduce((sum, q) => sum + q.views, 0).toLocaleString()} total views)</h3>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
              {quizPages.slice(0, 5).map((page, i) => {
                const pageName = page.page.split('/').pop() || page.page;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderBottom: i < Math.min(quizPages.length, 5) - 1 ? '1px solid #eee' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#666' }}>{page.page}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{page.views.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Popular Pages */}
        {otherPages.length > 0 && (
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>Other Popular Pages</h3>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
              {otherPages.slice(0, 5).map((page, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: i < Math.min(otherPages.length, 5) - 1 ? '1px solid #eee' : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#666' }}>{page.page}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* Recent Reading Activity */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Recent Reading Activity</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {stats.recent.filter(v => v.page.startsWith('/read/')).length > 0 ? (
            stats.recent.filter(v => v.page.startsWith('/read/')).map((visit, i) => {
              const articleName = visit.page.replace('/read/', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              return (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < stats.recent.filter(v => v.page.startsWith('/read/')).length - 1 ? '1px solid #eee' : 'none',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ fontWeight: '500', marginBottom: '4px', color: '#333' }}>📖 {articleName}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    {new Date(visit.timestamp).toLocaleString()} • {visit.country} •{' '}
                    {visit.referrer || 'Direct'}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: '#999' }}>
              No recent article reads in the last 20 visits
            </div>
          )}
        </div>
      </div>

      {/* All Recent Activity */}
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>All Recent Activity</h2>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {stats.recent.map((visit, i) => {
            const isArticle = visit.page.startsWith('/read/');
            const isQuiz = visit.page.includes('/quiz');
            let emoji = '📄';
            if (isArticle) emoji = '📖';
            else if (isQuiz) emoji = '✨';

            return (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderBottom: i < stats.recent.length - 1 ? '1px solid #eee' : 'none',
                  fontSize: '13px',
                  background: isArticle ? '#fffef9' : 'transparent',
                }}
              >
                <div style={{ fontFamily: 'monospace', marginBottom: '4px' }}>
                  {emoji} {visit.page}
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {new Date(visit.timestamp).toLocaleString()} • {visit.country} •{' '}
                  {visit.referrer || 'Direct'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
      </div>

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

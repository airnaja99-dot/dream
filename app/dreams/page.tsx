-'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DreamsPage() {
  const [data, setData] = useState<any[]>([]);
  const [err, setErr] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/dreams', { cache: 'no-store' });
        const js = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(js.error || 'fetch failed');
        setData(js.data || []);
      } catch (e: any) {
        setErr(e.message || 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <h2>Dream Logs</h2>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <Link href="/dreams/new">+ New</Link>
        <a href="/api/export" download>↓ Export CSV</a>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p style={{color:'crimson'}}>Error: {err}</p>}
      {!loading && !err && (
        <ul>
          {data.map((d:any)=>(
            <li key={d.id}>
              <strong>{d.dream_date}</strong> — {d.summary || '(no summary)'} {d.lucid_mode ? ` [lucid=${d.lucid_mode}]` : ''}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

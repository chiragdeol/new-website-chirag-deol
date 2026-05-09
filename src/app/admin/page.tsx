'use client';

import { useState } from 'react';

interface Lead {
  id: string;
  kind: 'contact' | 'chatbot';
  createdAt: string;
  payload: Record<string, string | string[] | undefined>;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid admin password.');
        return;
      }
      setLeads(data.leads || []);
    } catch {
      setError('Unable to load leads right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 md:px-12" style={{ background: '#fafaf9' }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="display-heading mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Admin Panel
        </h1>
        <p className="body-text mb-8">View contact form and chatbot leads.</p>

        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6">
          <label className="mdx-input-label">Admin Password</label>
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <input
              type="password"
              className="mdx-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin panel password"
            />
            <button className="btn-cta" onClick={fetchLeads} type="button">
              <div className="btn-bg" />
              <span className="btn-text">{loading ? 'LOADING...' : 'LOAD LEADS'}</span>
            </button>
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-black px-3 py-1 text-xs uppercase tracking-wider text-white">
                  {lead.kind}
                </span>
                <span className="text-xs text-neutral-500">
                  {new Date(lead.createdAt).toLocaleString()}
                </span>
              </div>
              <pre className="overflow-auto text-sm text-slate-700">
                {JSON.stringify(lead.payload, null, 2)}
              </pre>
            </article>
          ))}
          {!loading && leads.length === 0 && (
            <p className="body-text">
              No leads yet. Submit the contact form or chatbot flow to test.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

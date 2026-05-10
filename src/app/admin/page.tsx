'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

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
  const [unlocked, setUnlocked] = useState(false);

  const fetchLeads = async () => {
    if (!password.trim()) {
      setError('Enter your admin password first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { 'x-admin-password': password.trim() },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid admin password. Try again or reset below.');
        setUnlocked(false);
        return;
      }
      setLeads(data.leads || []);
      setUnlocked(true);
    } catch {
      setError('Unable to load leads. Check your connection and try again.');
      setUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void fetchLeads();
  };

  const clearPassword = () => {
    setPassword('');
    setError('');
    setLeads([]);
    setUnlocked(false);
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12 md:px-12" style={{ background: '#fafaf9' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h1 className="display-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            Admin Panel
          </h1>
          <Link
            href="/"
            className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-800"
          >
            ← Back to site
          </Link>
        </div>
        <p className="body-text mb-8">View contact form and chatbot leads. Use the password from your server config.</p>

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6"
        >
          <label className="mdx-input-label" htmlFor="admin-password">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            name="admin-password"
            autoComplete="current-password"
            className="mdx-input mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the value of ADMIN_PANEL_PASSWORD"
          />

          <p className="mb-4 text-xs leading-relaxed text-neutral-500">
            The password is not stored in the app — it comes from <code className="rounded bg-neutral-100 px-1">.env</code> or your host
            (e.g. Vercel) as <code className="rounded bg-neutral-100 px-1">ADMIN_PANEL_PASSWORD</code>. To change it, update that
            variable and redeploy. Use <strong>Reset</strong> below to clear this field and try again.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full min-h-[3rem] items-center justify-center rounded-full bg-[#111822] px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-black disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
            >
              {loading ? 'Loading…' : 'Submit & load leads'}
            </button>
            <button
              type="button"
              onClick={clearPassword}
              className="inline-flex w-full min-h-[3rem] items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 sm:w-auto"
            >
              Reset / clear password
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {unlocked && !error && (
            <p className="mt-4 text-sm text-emerald-700">Unlocked. Showing {leads.length} lead(s).</p>
          )}
        </form>

        <div className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-black px-3 py-1 text-xs uppercase tracking-wider text-white">
                  {lead.kind}
                </span>
                <span className="text-xs text-neutral-500">
                  {new Date(lead.createdAt).toLocaleString()}
                </span>
              </div>
              <pre className="max-h-80 overflow-auto text-sm text-slate-700">
                {JSON.stringify(lead.payload, null, 2)}
              </pre>
            </article>
          ))}
          {!loading && !unlocked && leads.length === 0 && (
            <p className="body-text">Enter the admin password and tap <strong>Submit & load leads</strong> to see entries.</p>
          )}
          {unlocked && leads.length === 0 && (
            <p className="body-text">No leads yet. Submit the contact form or chatbot on the main site to test.</p>
          )}
        </div>
      </div>
    </main>
  );
}

import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Vercel serverless: repo dir is read-only; only tmp is writable (fixes 500 on /api/admin/leads).
// Note: multiple regions/instances each have their own tmp — use a DB/KV for shared storage later.
const DATA_DIR =
  process.env.VERCEL === '1' ? os.tmpdir() : path.join(process.cwd(), 'data');

export type LeadKind = 'contact' | 'chatbot';

export interface ContactLeadPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  budget?: string;
  message: string;
  services: string[];
}

export interface ChatbotLeadPayload {
  service?: string;
  budget?: string;
  timeline?: string;
  contact: string;
}

export interface LeadEntry {
  id: string;
  kind: LeadKind;
  createdAt: string;
  payload: ContactLeadPayload | ChatbotLeadPayload;
}

interface LeadsFileShape {
  leads: LeadEntry[];
}

const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    const initial: LeadsFileShape = { leads: [] };
    await fs.writeFile(LEADS_FILE, JSON.stringify(initial, null, 2), 'utf8');
  }
}

async function readLeadsFile(): Promise<LeadsFileShape> {
  await ensureDataFile();
  const raw = await fs.readFile(LEADS_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw) as LeadsFileShape;
    return parsed?.leads ? parsed : { leads: [] };
  } catch {
    return { leads: [] };
  }
}

export async function addLead(kind: LeadKind, payload: ContactLeadPayload | ChatbotLeadPayload) {
  const file = await readLeadsFile();
  const lead: LeadEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    createdAt: new Date().toISOString(),
    payload,
  };
  file.leads.unshift(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(file, null, 2), 'utf8');
  return lead;
}

export async function getAllLeads() {
  const file = await readLeadsFile();
  return file.leads;
}

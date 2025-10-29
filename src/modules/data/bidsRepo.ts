import type { Bid } from './types';

const LS_KEY = 'bbhq.bids.v1';

function load(): Bid[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) { localStorage.setItem(LS_KEY, JSON.stringify([])); return []; }
  try { return JSON.parse(raw) as Bid[]; } catch { return []; }
}

function save(all: Bid[]) { localStorage.setItem(LS_KEY, JSON.stringify(all)); }

export const bidsRepo = {
  all(): Bid[] { return load(); },
  forBillboard(billboardId: string): Bid[] { return load().filter(b => b.billboardId === billboardId); },
  create(b: Bid) {
    const all = load();
    all.push(b);
    save(all);
  },
  updateStatus(id: string, status: Bid['status']) {
    const all = load();
    const idx = all.findIndex(b => b.id === id);
    if (idx === -1) return;
    const item = all[idx]!;
    item.status = status;
    save(all);
  }
};

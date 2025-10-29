import type { Contract } from './types';
import { billboardsRepo } from './billboardsRepo';

const LS_KEY = 'bbhq.contracts.v1';

const seed: Contract[] = [
  {
    id: 'ct-100',
    billboardId: 'bb-002',
    companyId: 'co-001',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    monthlyRate: 2400,
    status: 'active',
  },
];

const load = (): Contract[] => {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return [...seed];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [...seed];
  }
};

const save = (all: Contract[]) => localStorage.setItem(LS_KEY, JSON.stringify(all));

export const contractsRepo = {
  all: load,
  byId: (id: string) => load().find(c => c.id === id),

  create(c: Contract) {
    const all = load();
    all.push(c);
    save(all);
    billboardsRepo.setStatus(c.billboardId, 'occupied', c.id);
  },

  end(id: string) {
    const all = load();
    const c = all.find(x => x.id === id);
    if (!c) return;
    c.status = 'ended';
    save(all);
    billboardsRepo.setStatus(c.billboardId, 'available', null);
  },

  extend(id: string, days: number) {
    const all = load();
    const c = all.find(x => x.id === id);
    if (!c) return;
    const end = new Date(c.endDate);
    end.setDate(end.getDate() + days);
    c.endDate = end.toISOString();
    save(all);
  },

  sweepExpired() {
    const today = new Date();
    const all = load();
    let changed = false;
    for (const c of all) {
      if (c.status === 'active' && new Date(c.endDate) < today) {
        c.status = 'ended';
        billboardsRepo.setStatus(c.billboardId, 'available', null);
        changed = true;
      }
    }
    if (changed) save(all);
  },

  updateTerms(id: string, terms: Partial<Pick<Contract, 'startDate' | 'endDate' | 'monthlyRate'>>) {
    const all = load();
    const c = all.find(x => x.id === id);
    if (!c) return;
    Object.assign(c, terms);
    save(all);
  },

  remove(id: string) {
    const all = load().filter(c => c.id !== id);
    save(all);
  },
};

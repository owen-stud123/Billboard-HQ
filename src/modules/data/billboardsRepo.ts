import type { Billboard, BillboardStatus } from './types';

const LS_KEY = 'bbhq.billboards.v1';

const seed: Billboard[] = [
  {
    id: 'bb-001',
    code: 'NBO-A1',
    location: { city: 'Kigali', address: 'Kigali 11th Ave' },
    size: '6x3m',
    type: 'static',
    pricePerMonth: 950,
    status: 'available',
    images: [],
    tags: ['CBD', 'high-traffic'],
    biddingEnabled: true,
  },
  {
    id: 'bb-002',
    code: 'NBO-D2',
    location: { city: 'Kigali', address: 'Kk 9 St Karama Kanombe RWA' },
    size: '12x6m',
    type: 'digital',
    pricePerMonth: 2400,
    status: 'occupied',
    currentContractId: 'ct-100',
    images: [],
    tags: ['mall', 'premium'],
    biddingEnabled: true,
  },
  {
    id: 'bb-003',
    code: 'KGL-S3',
    location: { city: 'Kigali', address: 'KG 7 Ave' },
    size: '6x3m',
    type: 'static',
    pricePerMonth: 700,
    status: 'available',
    images: [],
    tags: ['city-center'],
    biddingEnabled: false,
  },
  {
    id: 'bb-004',
    code: 'LOS-H5',
    location: { city: 'Rubavu', address: '5 Kg 103 St Bibare ' },
    size: '9x3m',
    type: 'static',
    pricePerMonth: 1200,
    status: 'available',
    images: [],
    tags: ['expressway', 'commuter'],
    biddingEnabled: true,
  },
  {
    id: 'bb-005',
    code: 'DAR-D1',
    location: { city: 'Musanze', address: '5 Kg 103 St Musanze' },
    size: '12x6m',
    type: 'digital',
    pricePerMonth: 2100,
    status: 'available',
    images: [],
    tags: ['premium', 'coastal'],
    biddingEnabled: true,
  },
  {
    id: 'bb-006',
    code: 'KLA-R2',
    location: { city: 'Kibuye', address: '5 Kg 103 St Kibuye' },
    size: '6x3m',
    type: 'static',
    pricePerMonth: 800,
    status: 'available',
    images: [],
    tags: ['retail', 'high-traffic'],
    biddingEnabled: false,
  },
];

function load(): Billboard[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return [...seed];
  }
  try {
    const data = JSON.parse(raw) as Billboard[];
    // Merge in any new seed items that aren't present yet
    let changed = false;
    for (const s of seed) {
      if (!data.some(b => b.id === s.id)) {
        data.push(s);
        changed = true;
      }
    }
    if (changed) {
      save(data);
    }
    return data;
  } catch {
    return [...seed];
  }
}

function save(all: Billboard[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

export const billboardsRepo = {
  all(): Billboard[] { return load(); },
  byId(id: string): Billboard | undefined { return load().find(b => b.id === id); },
  findAvailable(): Billboard[] { return load().filter(b => b.status === 'available'); },
  setStatus(id: string, status: BillboardStatus, currentContractId?: string | null) {
    const all = load();
    const idx = all.findIndex(b => b.id === id);
    if (idx === -1) return;
    const item = all[idx];
    if (!item) return;
    item.status = status;
    item.currentContractId = currentContractId ?? null;
    save(all);
  },
  upsert(b: Billboard) {
    const all = load();
    const idx = all.findIndex(x => x.id === b.id);
    if (idx === -1) { all.push(b); } else { all[idx] = b; }
    save(all);
  },
};

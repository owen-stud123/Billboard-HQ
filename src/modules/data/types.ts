export type BillboardStatus = 'available' | 'occupied' | 'pending';

export interface Location {
  city: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface Billboard {
  id: string;
  code: string;
  location: Location;
  size: string; // e.g. 6x3m
  type: 'static' | 'digital';
  pricePerMonth: number;
  status: BillboardStatus;
  currentContractId?: string | null;
  images?: string[];
  tags?: string[];
  biddingEnabled?: boolean;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export type ContractStatus = 'active' | 'ended' | 'cancelled';

export interface Contract {
  id: string;
  billboardId: string;
  companyId: string;
  startDate: string; // ISO date
  endDate: string;   // ISO date
  monthlyRate: number;
  status: ContractStatus;
  awardedTo?: {
    name?: string;
    email?: string;
    phone?: string;
    companyName?: string;
  };
}

export type BidStatus = 'open' | 'accepted' | 'rejected' | 'withdrawn';

export interface Bid {
  id: string;
  billboardId: string;
  companyId: string;
  amount: number;
  note?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  createdAt: string; // ISO date
  status: BidStatus;
}

import React, { useState } from 'react';
import { bidsRepo } from '../../data/bidsRepo';
import { billboardsRepo } from '../../data/billboardsRepo';
import { contractsRepo } from '../../data/contractsRepo';

const statusStyles: Record<string, string> = {
  open: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  withdrawn: 'bg-gray-100 text-gray-600',
};

const Bids: React.FC = () => {
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const bidsAll = bidsRepo.all();
  const bids = bidsAll.filter(b => (b.amount ?? 0) > 0);
  const contacts = bidsAll.filter(b => (b.amount ?? 0) === 0);
  const boards = billboardsRepo.all();

  const accept = (id: string) => {
    const bid = bids.find(b => b.id === id);
    if (!bid) return;
    // Create a simple 30-day contract; if bid amount is 0 (inquiry), fall back to billboard's list price
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 30);
    const board = boards.find(x => x.id === bid.billboardId);
    const monthlyRate = bid.amount > 0 ? bid.amount : (board?.pricePerMonth ?? 0);
    const awardedTo: { name?: string; email?: string; phone?: string; companyName?: string } = {};
    if (bid.name) awardedTo.name = bid.name;
    if (bid.email) awardedTo.email = bid.email;
    if (bid.phone) awardedTo.phone = bid.phone;
    if (bid.companyName) awardedTo.companyName = bid.companyName;

    contractsRepo.create({
      id: `ct-${Date.now()}`,
      billboardId: bid.billboardId,
      companyId: bid.companyName || bid.companyId || 'guest-company',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      monthlyRate,
      status: 'active',
      awardedTo,
    });
    bidsRepo.updateStatus(id, 'accepted');
    setToast({ type: 'success', text: 'Bid accepted. Contract created for 30 days.' });
    setTick(t => t + 1);
  };

  const reject = (id: string) => {
    bidsRepo.updateStatus(id, 'rejected');
    setToast({ type: 'success', text: 'Bid rejected.' });
    setTick(t => t + 1);
  };

  const deleteSelectedBid = () => {
    if (!selectedBidId) return;
    bidsRepo.remove(selectedBidId);
    setToast({ type: 'success', text: 'Bid deleted.' });
    setSelectedBidId(null);
    setTick(t => t + 1);
  };

  const deleteSelectedContact = () => {
    if (!selectedContactId) return;
    bidsRepo.remove(selectedContactId);
    setToast({ type: 'success', text: 'Contact deleted.' });
    setSelectedContactId(null);
    setTick(t => t + 1);
  };

  const createContractFromContact = (id: string) => {
    const item = contacts.find(c => c.id === id);
    if (!item) return;
    const board = boards.find(x => x.id === item.billboardId);
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 30);
    const rate = board?.pricePerMonth ?? 0;
    const awardedTo: { name?: string; email?: string; phone?: string; companyName?: string } = {};
    if (item.name) awardedTo.name = item.name;
    if (item.email) awardedTo.email = item.email;
    if (item.phone) awardedTo.phone = item.phone;
    if (item.companyName) awardedTo.companyName = item.companyName;

    contractsRepo.create({
      id: `ct-${Date.now()}`,
      billboardId: item.billboardId,
      companyId: item.companyName || item.companyId || 'guest-company',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      monthlyRate: rate,
      status: 'active',
      awardedTo,
    });
    bidsRepo.updateStatus(id, 'accepted');
    setToast({ type: 'success', text: 'Contract created from contact (30 days).' });
    setTick(t => t + 1);
  };

  const archiveContact = (id: string) => {
    bidsRepo.updateStatus(id, 'withdrawn');
    setToast({ type: 'success', text: 'Contact archived.' });
    setTick(t => t + 1);
  };

  return (
    <div className="p-6">
      {toast && (
        <div className={`mb-4 p-3 rounded ${toast.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <div className="flex items-center justify-between">
            <span>{toast.text}</span>
            <button onClick={()=>setToast(null)} className="text-sm underline">Dismiss</button>
          </div>
        </div>
      )}
      {/* --- Bids Section --- */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bids</h2>
         
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setTick(t=>t+1)} className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Refresh</button>
          <button onClick={deleteSelectedBid} disabled={!selectedBidId} className={`px-4 py-2 rounded-md ${selectedBidId ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Delete</button>
        </div>
      </div>

      {/* --- Bids Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Billboard</th>
              <th className="py-3 px-4">Amount (RWF)</th>
              <th className="py-3 px-4">Bidder</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((b) => {
              const board = boards.find((x) => x.id === b.billboardId);
              return (
                <tr
                  key={b.id}
                  onClick={()=>setSelectedBidId(b.id)}
                  className={`border-t hover:bg-gray-50 transition cursor-pointer ${selectedBidId===b.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {board ? `${board.code} (${board.location.city})` : b.billboardId}
                  </td>
                  <td className="py-3 px-4">{new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(b.amount)}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="text-gray-800">{b.name || 'Unknown'}</div>
                    <div className="text-gray-500">{b.email || '-'}</div>
                    <div className="text-gray-500">{b.phone || '-'}</div>
                    <div className="text-gray-500">{b.companyName || '-'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {b.status === 'open' ? (
                      <>
                        <button
                          onClick={() => accept(b.id)}
                          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => reject(b.id)}
                          className="px-3 py-1 text-sm rounded bg-red-700 text-white hover:bg-red-800"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 text-sm">No actions</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- Contacts Section --- */}
      <div className="mt-10 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
         
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setTick(t=>t+1)} className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Refresh</button>
          <button onClick={deleteSelectedContact} disabled={!selectedContactId} className={`px-4 py-2 rounded-md ${selectedContactId ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Delete</button>
        </div>
      </div>

      {/* --- Contacts Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Billboard</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((b) => {
              const board = boards.find((x) => x.id === b.billboardId);
              return (
                <tr
                  key={b.id}
                  onClick={()=>setSelectedContactId(b.id)}
                  className={`border-t hover:bg-gray-50 transition cursor-pointer ${selectedContactId===b.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {board ? `${board.code} (${board.location.city})` : b.billboardId}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="text-gray-800">{b.name || 'Unknown'}</div>
                    <div className="text-gray-500">{b.email || '-'}</div>
                    <div className="text-gray-500">{b.phone || '-'}</div>
                    <div className="text-gray-500">{b.companyName || '-'}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate" title={b.note || undefined}>
                    {b.note || '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{new Date(b.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {b.status === 'open' ? (
                      <>
                        <button
                          onClick={() => createContractFromContact(b.id)}
                          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Create Contract
                        </button>
                        <button
                          onClick={() => archiveContact(b.id)}
                          className="px-3 py-1 text-sm rounded bg-red-700 text-white hover:bg-red-800"
                        >
                          Archive
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 text-sm">No actions</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bids;

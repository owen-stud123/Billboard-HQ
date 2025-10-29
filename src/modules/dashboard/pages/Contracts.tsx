import React, { useMemo, useState } from 'react';
import { contractsRepo } from '../../data/contractsRepo';
import { billboardsRepo } from '../../data/billboardsRepo';

const formatRwf = (v: number) =>
  new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(v);

const StatusBadge: React.FC<{ status: 'active' | 'ended' | 'cancelled' }> = ({ status }) => {
  const styles = {
    active: 'bg-green-50 text-green-700',
    ended: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-50 text-red-700',
  }[status];

  return <span className={`text-xs px-2 py-0.5 rounded ${styles}`}>{status}</span>;
};

const Contracts: React.FC = () => {
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editing, setEditing] = useState<{ id: string; start: string; end: string; rate: string } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const contracts = useMemo(() => {
    contractsRepo.sweepExpired();
    return contractsRepo.all();
  }, [tick]);

  const selected = contracts.find(c => c.id === selectedId) ?? null;

  // --- Actions ---
  const refresh = () => setTick(t => t + 1);

  const endContract = (id: string) => {
    if (confirm('End this contract?')) {
      contractsRepo.end(id);
      refresh();
    }
  };

  const extendContract = (id: string) => {
    contractsRepo.extend(id, 30);
    refresh();
  };

  const startEdit = (id: string) => {
    const c = contracts.find(x => x.id === id);
    if (!c) return;
    setEditing({
      id,
      start: c.startDate.slice(0, 10),
      end: c.endDate.slice(0, 10),
      rate: String(c.monthlyRate),
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    const rateNum = Number(editing.rate);
    if (!rateNum || rateNum <= 0) {
      return setToast({ type: 'error', text: 'Please enter a valid monthly rate' });
    }
    contractsRepo.updateTerms(editing.id, {
      startDate: new Date(editing.start).toISOString(),
      endDate: new Date(editing.end).toISOString(),
      monthlyRate: rateNum,
    });
    setEditing(null);
    refresh();
    setToast({ type: 'success', text: 'Contract updated.' });
  };

  const deleteContract = (id: string) => {
    const c = contracts.find(x => x.id === id);
    if (!c) return;
    if (c.status !== 'ended') {
      return setToast({ type: 'error', text: 'Only ended contracts can be deleted.' });
    }
    contractsRepo.remove(id);
    refresh();
    setToast({ type: 'success', text: 'Contract deleted.' });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Contracts</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={refresh} className="px-3 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white text-sm">
            Refresh
          </button>
          <button
            onClick={() => selected && startEdit(selected.id)}
            disabled={!selected}
            className={`px-3 py-2 rounded text-sm ${
              selected ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => selected && deleteContract(selected.id)}
            disabled={!selected || selected?.status !== 'ended'}
            className={`px-3 py-2 rounded text-sm ${
              selected?.status === 'ended' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`mb-4 p-3 rounded ${
            toast.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{toast.text}</span>
            <button onClick={() => setToast(null)} className="text-sm underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Contract</th>
              <th className="text-left px-4 py-3">Billboard</th>
              <th className="text-left px-4 py-3">Awarded to</th>
              <th className="text-left px-4 py-3">Period</th>
              <th className="text-left px-4 py-3">Rate</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                  No contracts yet.
                </td>
              </tr>
            )}

            {contracts.map(c => {
              const b = billboardsRepo.byId(c.billboardId);
              const isSelected = selectedId === c.id;

              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`border-t cursor-pointer ${isSelected ? 'bg-sky-50' : ''}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900">{b?.code ?? c.billboardId}</div>
                    <div className="text-gray-500 text-xs">
                      {b?.location.city} • {b?.location.address}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div>{c.awardedTo?.name ?? '—'}</div>
                    <div className="text-gray-500">{c.awardedTo?.email ?? '—'}</div>
                    <div className="text-gray-500">{c.awardedTo?.phone ?? '—'}</div>
                    <div className="text-gray-500">{c.awardedTo?.companyName ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(c.startDate).toLocaleDateString()} → {new Date(c.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-indigo-700 font-semibold">
                    {formatRwf(c.monthlyRate)}/mo
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    {c.status === 'active' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => extendContract(c.id)}
                          className="px-3 py-1.5 rounded bg-blue-600 hover:bg-sky-700 text-white"
                        >
                          Extend 30 days
                        </button>
                        <button
                          onClick={() => endContract(c.id)}
                          className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white"
                        >
                          End
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="mt-4 border rounded p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Edit contract terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={editing.start}
              onChange={e => setEditing({ ...editing, start: e.target.value })}
            />
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={editing.end}
              onChange={e => setEditing({ ...editing, end: e.target.value })}
            />
            <input
              type="number"
              min="1"
              className="border rounded px-2 py-1"
              value={editing.rate}
              onChange={e => setEditing({ ...editing, rate: e.target.value })}
              placeholder="Monthly rate"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded border">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;


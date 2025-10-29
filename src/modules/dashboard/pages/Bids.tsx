import React from 'react';
import { bidsRepo } from '../../data/bidsRepo';
import { billboardsRepo } from '../../data/billboardsRepo';

const statusStyles: Record<string, string> = {
  open: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const Bids: React.FC = () => {
  const bids = bidsRepo.all();
  const boards = billboardsRepo.all();

  const accept = (id: string) => {
    bidsRepo.updateStatus(id, 'accepted');
    alert('✅ Bid accepted (demo). In a full app, this would generate a contract.');
    window.location.reload();
  };

  const reject = (id: string) => {
    bidsRepo.updateStatus(id, 'rejected');
    alert('❌ Bid rejected.');
    window.location.reload();
  };

  return (
    <div className="p-6">
      {/* --- Header --- */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bids</h2>
          <p className="text-gray-500 text-sm">Incoming bids from companies</p>
        </div>
        <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
          Refresh
        </button>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Billboard</th>
              <th className="py-3 px-4">Amount</th>
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
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {board ? `${board.code} (${board.location.city})` : b.billboardId}
                  </td>
                  <td className="py-3 px-4">${b.amount}</td>
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
                          className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => reject(b.id)}
                          className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
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
    </div>
  );
};

export default Bids;

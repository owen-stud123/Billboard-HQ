import React, { useState } from 'react';
import { billboardsRepo } from '../../data/billboardsRepo';
import type { Billboard } from '../../data/types';
import BillboardModal from './BillboardModal';
import EditBillboardsModal from './EditBillboardsModal';

const statusStyles: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  occupied: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

const Billboards: React.FC = () => {
  const [boards, setBoards] = useState(billboardsRepo.all());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | undefined>(undefined);

  const handleAdd = () => {
    setEditMode(false);
    setSelectedBillboard(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditList = () => {
    setIsEditListModalOpen(true);
  };

  const handleEditFromList = (billboard: Billboard) => {
    setEditMode(true);
    setSelectedBillboard(billboard);
    setIsEditListModalOpen(false);
    setIsModalOpen(true);
  };

  const handleSave = (billboard: Billboard) => {
    billboardsRepo.upsert(billboard);
    setBoards(billboardsRepo.all());
    setIsModalOpen(false);
    setSelectedBillboard(undefined);
  };

  return (
    <div className="p-6">
      {/* --- Page Header --- */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Billboards</h2>
          <p className="text-gray-500 text-sm">All billboard locations and statuses</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
          >
            + Add Billboard
          </button>
          <button 
            onClick={handleOpenEditList}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Edit Billboards
          </button>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Price/mo(frw)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">{b.code}</td>
                <td className="py-3 px-4">{b.location.city}</td>
                <td className="py-3 px-4">{b.location.address}</td>
                <td className="py-3 px-4 capitalize">{b.type}</td>
                <td className="py-3 px-4">{b.size}</td>
                <td className="py-3 px-4">{b.pricePerMonth}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {b.status === 'available' ? (
                    <button className="text-blue-600 hover:underline">Bid</button>
                  ) : (
                    <span className="text-gray-400">Unavailable</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Billboard Modal --- */}
      {isModalOpen && (
        <BillboardModal 
          editMode={editMode}
          billboard={selectedBillboard}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* --- Edit Billboards List Modal --- */}
      {isEditListModalOpen && (
        <EditBillboardsModal
          billboards={boards}
          onClose={() => setIsEditListModalOpen(false)}
          onEdit={handleEditFromList}
        />
      )}
    </div>
  );
};

export default Billboards;

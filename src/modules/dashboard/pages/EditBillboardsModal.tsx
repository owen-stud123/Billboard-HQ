import React, { useState } from "react";
import type { Billboard } from "../../data/types";

interface Props {
  billboards: Billboard[];
  onClose: () => void;
  onEdit: (billboard: Billboard) => void;
}

const EditBillboardsModal: React.FC<Props> = ({ billboards, onClose, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBillboards = billboards.filter(
    (b) =>
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusStyles: Record<string, string> = {
    available: 'bg-green-100 text-green-700',
    occupied: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Edit Billboards</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by code, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Billboards List */}
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase sticky top-0">
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
              {filteredBillboards.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No billboards found
                  </td>
                </tr>
              ) : (
                filteredBillboards.map((b) => (
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
                      <button
                        onClick={() => onEdit(b)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Showing {filteredBillboards.length} of {billboards.length} billboards
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBillboardsModal;

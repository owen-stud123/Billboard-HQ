import React, { useState, useEffect } from "react";
import type { Billboard, BillboardStatus } from "../../data/types";

interface Props {
  editMode: boolean;
  billboard: Billboard | undefined;
  onClose: () => void;
  onSave: (billboard: Billboard) => void;
}

const BillboardModal: React.FC<Props> = ({ editMode, billboard, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: "",
    city: "",
    address: "",
    type: "static" as "static" | "digital",
    size: "",
    pricePerMonth: "",
    status: "available" as BillboardStatus,
    biddingEnabled: true,
  });

  useEffect(() => {
    if (editMode && billboard) {
      setFormData({
        code: billboard.code,
        city: billboard.location.city,
        address: billboard.location.address,
        type: billboard.type,
        size: billboard.size,
        pricePerMonth: billboard.pricePerMonth.toString(),
        status: billboard.status,
        biddingEnabled: billboard.biddingEnabled ?? true,
      });
    }
  }, [editMode, billboard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBillboard: Billboard = {
      id: editMode && billboard ? billboard.id : `bb-${Date.now()}`,
      code: formData.code,
      location: {
        city: formData.city,
        address: formData.address,
      },
      size: formData.size,
      type: formData.type,
      pricePerMonth: parseFloat(formData.pricePerMonth),
      status: formData.status,
      images: billboard?.images || [],
      tags: billboard?.tags || [],
      biddingEnabled: formData.biddingEnabled,
      ...(billboard?.currentContractId !== undefined && { currentContractId: billboard.currentContractId }),
    };

    onSave(newBillboard);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {editMode ? "Edit Billboard" : "Add New Billboard"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Code */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code *
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., KGL-A1"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>

            {/* City */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Kigali"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., KG 7 Ave"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="static">Static</option>
                <option value="digital">Digital</option>
              </select>
            </div>

            {/* Size */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size *
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., 6x3m"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price Per Month */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price/Month (Rwf) *
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., 950"
                name="pricePerMonth"
                type="number"
                value={formData.pricePerMonth}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Bidding Enabled */}
            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                name="biddingEnabled"
                id="biddingEnabled"
                checked={formData.biddingEnabled}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="biddingEnabled" className="ml-2 text-sm font-medium text-gray-700">
                Enable Bidding
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editMode ? "Save Changes" : "Add Billboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillboardModal;

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../../restaurant-app/types/Menu';
import { Deal } from '../../restaurant-app/types/Deal';

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deal: Omit<Deal, 'id'>) => void;
  menuItem: MenuItem | null;
}

const DealModal: React.FC<DealModalProps> = ({ isOpen, onClose, onSubmit, menuItem }) => {
  const [formData, setFormData] = useState({
    name: ``,
    discountedPrice: 0, // 20% discount by default
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    isActive: true
  });

  if (!isOpen || !menuItem) return null;

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
        ...formData,
        bundleItems: [],
        totalPrice: 0
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Create Deal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deal Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price: ${menuItem.price}
            </label>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Discounted Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.discountedPrice}
                onChange={(e) => setFormData({ ...formData, discountedPrice: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Create Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealModal;
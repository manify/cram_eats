import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../../restaurant-app/types/Menu';
import { Deal, BundleItem } from '../../restaurant-app/types/Deal';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deal: Omit<Deal, 'id'>) => void;
  menuItems: MenuItem[];
  initialItem: MenuItem | null; // Change this line to accept null
}

const BundleModal: React.FC<BundleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  menuItems,
  initialItem
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true
  });

  const [selectedItems, setSelectedItems] = useState<BundleItem[]>(
    initialItem ? [{ menuItem: initialItem, quantity: 1 }] : []
  );

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0
    );
  };

  const handleAddItem = (menuItem: MenuItem) => {
    const existing = selectedItems.find(item => item.menuItem.id === menuItem.id);
    if (existing) {
      setSelectedItems(items => 
        items.map(item => 
          item.menuItem.id === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([...selectedItems, { menuItem, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (menuItem: MenuItem) => {
    setSelectedItems(items => 
      items.filter(item => item.menuItem.id !== menuItem.id)
    );
  };

  const handleQuantityChange = (menuItem: MenuItem, delta: number) => {
    setSelectedItems(items => 
      items.map(item => {
        if (item.menuItem.id === menuItem.id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    const discountedPrice = totalPrice * 0.85; // 15% discount

    onSubmit({
      ...formData,
      bundleItems: selectedItems,
      totalPrice,
      discountedPrice,
    });
    onClose();
  };

  if (!isOpen) return null;

  const totalPrice = calculateTotalPrice();
  const suggestedDiscount = totalPrice * 0.85; // 15% bundle discount

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Create Bundle Deal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bundle Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., Family Feast Bundle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={2}
              placeholder="Describe your bundle deal..."
            />
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Bundle Items</h3>
            <div className="space-y-2">
              {selectedItems.map(({ menuItem, quantity }) => (
                <div key={menuItem.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{menuItem.name}</p>
                    <p className="text-sm text-gray-500">${menuItem.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(menuItem, -1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(menuItem, 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(menuItem)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <select
                onChange={(e) => {
                  const menuItem = menuItems.find(item => item.id === e.target.value);
                  if (menuItem) handleAddItem(menuItem);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value=""
              >
                <option value="">Add item to bundle...</option>
                {menuItems
                  .filter(item => !selectedItems.some(selected => selected.menuItem.id === item.id))
                  .map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - ${item.price.toFixed(2)}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value: ${totalPrice.toFixed(2)}</p>
              <p className="text-sm font-medium text-green-600">Bundle Price: ${suggestedDiscount.toFixed(2)}</p>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              disabled={selectedItems.length === 0}
            >
              Create Bundle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BundleModal;
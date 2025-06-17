import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../../restaurant-app/types/Menu';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<MenuItem, 'id'>) => void;
  initialData?: MenuItem;  // Add this line
}

const AddItemModal: React.FC<AddItemModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'mains' as MenuItem['category'],
    image: '',
    isAvailable: true
  });

  // Add effect to handle initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        category: initialData.category,
        image: initialData.image || '',
        isAvailable: initialData.isAvailable
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'mains',
        image: '',
        isAvailable: true
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Menu Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
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
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem['category'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="starters">Starters</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
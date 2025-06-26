import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ConfirmationModal from '../../../shared/ConfirmationModal';
import { MenuItem } from '../../types/Menu';
import AddItemModal from '../../models/AddItemModal';
import axios from 'axios';

const MenuView: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const restaurantId = localStorage.getItem('restaurantId');

  // Fetch all items for this restaurant
  useEffect(() => {
    if (!restaurantId) return;
    setLoading(true);
    axios
      .get(`http://localhost:3030/crameats/restaurants/${restaurantId}/items`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setMenuItems(res.data);
        } else if (Array.isArray(res.data.items)) {
          setMenuItems(res.data.items);
        } else {
          setMenuItems([]);
        }
      })
      .catch(() => setMenuItems([]))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  // Add item
  const handleAddItem = async (newItem: Omit<MenuItem, 'id'>) => {
    if (!restaurantId) return;
    try {
      await axios.post(
        `http://localhost:3030/crameats/restaurants/${restaurantId}/items`,
        newItem
      );
      // Refetch items after add
      const res = await axios.get(`http://localhost:3030/crameats/restaurants/${restaurantId}/items`);
      setMenuItems(Array.isArray(res.data) ? res.data : res.data.items || []);
      setIsAddModalOpen(false);
    } catch (err) {
      alert('Failed to add menu item');
    }
  };

  // Edit item
  const handleEditItem = async (updatedItem: MenuItem) => {
    try {
      await axios.put(
        `http://localhost:3030/crameats/items/${updatedItem.id}`,
        updatedItem
      );
      setMenuItems(prev =>
        prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(null);
    } catch (err) {
      alert('Failed to update menu item');
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3030/crameats/items/${itemId}`);
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
      setDeleteItemId(null);
    } catch (err) {
      alert('Failed to delete menu item');
    }
  };

  const handleDeleteClick = (itemId: string) => setDeleteItemId(itemId);
  const handleConfirmDelete = () => {
    if (deleteItemId) handleDeleteItem(deleteItemId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Item</span>
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : menuItems.length === 0 ? (
        <div>No items found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-yellow-600">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status === 'available' ? 'Available' : 'Unavailable'}
                  </span>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />

      <AddItemModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={(updatedItemData) =>
          handleEditItem({ ...updatedItemData, id: editingItem!.id })
        }
        initialData={editingItem || undefined}
      />

      <ConfirmationModal
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default MenuView;

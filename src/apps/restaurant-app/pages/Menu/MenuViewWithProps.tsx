import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import ConfirmationModal from '../../../shared/ConfirmationModal';
import { MenuItem } from '../../types/Menu';
import { Deal } from '../../types/Deal';
import AddItemModal from '../../models/AddItemModal';

interface MenuViewProps {
  menuItems: MenuItem[];
  deals: Deal[];
  onAddItem: (newItem: MenuItem) => Promise<void>;
  onEditItem: (editedItem: MenuItem) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
  onToggleAvailability: (itemId: string) => Promise<void>;
  onAddDeal: (deal: Deal) => Promise<void>;
  onDeleteDeal: (dealId: string) => Promise<void>;
  loading: boolean;
}

const MenuView: React.FC<MenuViewProps> = ({
  menuItems,
  deals,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleAvailability,
  onAddDeal,
  onDeleteDeal,
  loading
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const handleAddItem = async (newItemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...newItemData,
      id: Date.now().toString() // Temporary ID generation
    };
    await onAddItem(newItem);
    setIsAddModalOpen(false);
  };

  const handleEditItem = async (updatedItemData: Omit<MenuItem, 'id'>) => {
    if (!editingItem) return;
    const updatedItem: MenuItem = {
      ...updatedItemData,
      id: editingItem.id
    };
    await onEditItem(updatedItem);
    setEditingItem(null);
  };

  const handleDeleteClick = (itemId: string) => setDeleteItemId(itemId);
  
  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await onDeleteItem(deleteItemId);
      setDeleteItemId(null);
    }
  };

  const handleToggleAvailability = async (itemId: string) => {
    await onToggleAvailability(itemId);
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
        <div className="text-center py-8">Loading menu items...</div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-8">No menu items found.</div>
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
                  <button
                    onClick={() => handleToggleAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      item.status === 'available'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {item.status === 'available' ? 'Available' : 'Unavailable'}
                  </button>
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

      {/* Deals Section */}
      {deals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deals.map(deal => (
              <div
                key={deal.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{deal.name}</h3>
                  <button
                    onClick={() => onDeleteDeal(deal.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{deal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-600">
                    ${deal.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${deal.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
        onSubmit={handleEditItem}
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

import React, { useState } from 'react';
import { Plus, Tag, X } from 'lucide-react';
import ConfirmationModal from '../../../shared/ConfirmationModal';
import { MenuItem } from '../../types/Menu';
import { Deal } from '../../types/Deal';
import AddItemModal from '../../models/AddItemModal';
import BundleModal from '../../../restaurant-app/models/BundleModal';

// Add onDeleteItem to the interface
interface MenuViewProps {
  items: MenuItem[];
  deals: Deal[];
  onAddItem: (item: MenuItem) => void;
  onEditItem: (item: MenuItem) => void;
  onToggleAvailability: (itemId: string) => void;
  onCreateDeal: (deal: Deal) => void;
  onRemoveDeal: (dealId: string) => void;
  onDeleteItem: (itemId: string) => void;  // Add this line
}

const MenuView: React.FC<MenuViewProps> = ({ 
  items, 
  deals,
  onAddItem, 
  onEditItem, 
  onToggleAvailability,
  onCreateDeal,
  onRemoveDeal,
  onDeleteItem  // Add this line
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('mains');
  const [dealItem, setDealItem] = useState<MenuItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const categories: MenuItem['category'][] = ['starters', 'mains', 'desserts', 'beverages'];

  const filteredItems = items.filter(item => item.category === selectedCategory);

  const handleAddItem = (newItem: Omit<MenuItem, 'id'>) => {
    const itemWithId: MenuItem = {
      ...newItem,
      id: `item-${Date.now()}`,
    };
    onAddItem(itemWithId);
    setIsAddModalOpen(false);
  };

  const handleEditItem = (updatedItem: MenuItem) => {
    onEditItem(updatedItem);
    setEditingItem(null);
  };

  const handleDeleteClick = (itemId: string) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      onDeleteItem(deleteItemId);
      setDeleteItemId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Regular Menu Items Section */}
      <div className="space-y-6">
        {/* Category Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                selectedCategory === category
                  ? 'bg-yellow-100 text-yellow-800 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Add Item Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {item.image && (
                <img
                  src={item.image}
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
                    onClick={() => onToggleAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDealItem(item)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm ml-2"
                  >
                    Create Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bundles Section */}
      {deals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Special Bundles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{deal.name}</h3>
                    <button
                      onClick={() => onRemoveDeal(deal.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{deal.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {deal.bundleItems.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                        <span className="text-gray-500">${item.menuItem.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-end pt-3 border-t border-yellow-200">
                    <div>
                      <div className="text-sm text-gray-500 line-through">
                        ${deal.totalPrice.toFixed(2)}
                      </div>
                      <div className="text-lg font-bold text-yellow-600">
                        ${deal.discountedPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Valid until {new Date(deal.endDate).toLocaleDateString()}
                    </div>
                  </div>
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
        onSubmit={(updatedItemData) => handleEditItem({ ...updatedItemData, id: editingItem!.id })}
        initialData={editingItem || undefined}
      />

      <BundleModal
        isOpen={!!dealItem}
        onClose={() => setDealItem(null)}
        onSubmit={(dealData) => {
          if (onCreateDeal) {
            onCreateDeal({
              ...dealData,
              id: `deal-${Date.now()}`
            });
          }
          setDealItem(null);
        }}
        menuItems={items}
        initialItem={dealItem}
      />

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item"
        message="Are you sure you want to delete this item? This action cannot be undone and will also remove any deals that include this item."
      />
    </div>
  );
};

export default MenuView;
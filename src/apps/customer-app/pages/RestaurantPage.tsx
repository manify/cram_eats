import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Phone,
  Plus, Minus, ShoppingCart, Flame, Leaf
} from 'lucide-react';

import { useCartStore, useRestaurantStore, useNotificationStore } from '../stores';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCartStore();
  const { addNotification } = useNotificationStore();
  const { selectedRestaurant, isLoadingDetail, error, fetchRestaurantById } = useRestaurantStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    if (id && !isLoadingDetail) {
      const restaurantId = parseInt(id);
      // Only fetch if we don't have the selected restaurant or it's a different one
      if (!selectedRestaurant || selectedRestaurant.id !== restaurantId) {
        console.log(`Loading restaurant details for ID: ${restaurantId}`);
        fetchRestaurantById(restaurantId);
      }
    }
  }, [id]); // Remove fetchRestaurantById from dependencies

  if (isLoadingDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }
  if (error || !selectedRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || 'Restaurant not found'}</p>
          <div className="space-x-4">
            {id && (
              <button 
                onClick={() => fetchRestaurantById(parseInt(id))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                disabled={isLoadingDetail}
              >
                {isLoadingDetail ? 'Loading...' : 'Retry'}
              </button>
            )}
            <button 
              onClick={() => navigate('/dashboard/home')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get unique categories from menu
  const categories = selectedRestaurant.menu.map(menu => menu.name);
  const allCategories = ['All', ...categories];

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory === 'All' 
    ? selectedRestaurant.menu.flatMap(menu => menu.items.map(item => ({ ...item.item, menuName: menu.name })))
    : selectedRestaurant.menu
        .filter(menu => menu.name === selectedCategory)
        .flatMap(menu => menu.items.map(item => ({ ...item.item, menuName: menu.name })));
  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${item.id}-${Date.now()}-${i}`,
        originalItemId: item.itemId || item.id, // Use itemId if available, fallback to id
        name: item.name,
        description: item.itemId, // Using itemId as description since API doesn't provide description
        price: item.price,
        restaurantId: selectedRestaurant.id.toString(),
        restaurantName: selectedRestaurant.name,
        image: item.imageUrl,
        category: item.menuName
      });
    }

    addNotification({
      title: 'Added to Cart',
      message: `${quantity}x ${item.name} added to your cart`,
      type: 'order',
      read: false
    });

    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const cartItemCount = getCartItemCount();

  // Default cover image since API doesn't provide one
  const coverImage = 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <img src={coverImage} alt={selectedRestaurant.name} className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <button
          onClick={() => navigate('/dashboard/home')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {cartItemCount > 0 && (
          <button
            onClick={() => navigate('/cart')}
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartItemCount}
              </span>
            </div>
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedRestaurant.name}</h1>
          <p className="text-lg text-gray-200 mb-4">Owned by {selectedRestaurant.user.firstName} {selectedRestaurant.user.lastName}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.5</span>
              <span>(100+ reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>25-35 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>1.2 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-600 mb-1">Restaurant • {selectedRestaurant.location || 'Location not specified'}</p>
            <div className="flex items-center space-x-1 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{selectedRestaurant.user.email}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Delivery fee: €2.50</span>
            <span className="text-sm text-gray-500">Min. order: €15.00</span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>      {/* Menu Items */}
      <div className="max-w-4xl mx-auto p-6">
        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No items available in this category</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMenuItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={item.imageUrl || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          {item.status === 'available' && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Available</span>
                          )}
                          {item.status === 'unavailable' && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Unavailable</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">Item ID: {item.itemId}</p>
                        <p className="text-xl font-bold text-green-600">€{item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {item.status === 'available' && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id.toString(), -1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-lg min-w-[2rem] text-center">
                            {quantities[item.id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id.toString(), 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;

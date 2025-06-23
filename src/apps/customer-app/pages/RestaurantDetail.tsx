import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Phone,
  Plus, Minus, ShoppingCart, Flame, Leaf
} from 'lucide-react';

import { getRestaurantById, getMenuCategories } from '../data/restaurants';
import { useCartStore, useNotificationStore } from '../stores';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCartStore();
  const { addNotification } = useNotificationStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const restaurant = id ? getRestaurantById(id) : undefined;
  const categories = id ? getMenuCategories(id) : [];

  useEffect(() => {
    if (!restaurant) {
      navigate('/dashboard/home');
    }
  }, [restaurant, navigate]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading restaurant details...</p>
      </div>
    );
  }

  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter((item) => item.category === selectedCategory);
  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${item.id}-${Date.now()}-${i}`,
        originalItemId: item.itemId || item.id, // Use itemId if available, fallback to id
        name: item.name,
        description: item.description,
        price: item.price,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        image: item.image,
        category: item.category
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Image and Overlay */}
      <div className="relative">
        <img src={restaurant.coverImage} alt={restaurant.name} className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard/home')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Cart Button */}
        {cartItemCount > 0 && (
          <button
            onClick={() => navigate('/cart')}
            className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartItemCount}
              </span>
            </div>
          </button>
        )}

        {/* Text Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg text-gray-200 mb-4">{restaurant.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{restaurant.rating}</span>
              <span>({restaurant.reviewCount}+ reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-600 mb-1">{restaurant.cuisine} • {restaurant.address}</p>
            <div className="flex items-center space-x-1 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{restaurant.phone}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Delivery fee: €2.50</span>
            <span className="text-sm text-gray-500">Min. order: €15.00</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category: string) => (
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
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid gap-6">
          {filteredMenu.map((item: any) => (
            <div key={item.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        {item.popular && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                        {item.spicy && <Flame className="w-4 h-4 text-red-500" />}
                        {item.vegetarian && <Leaf className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <p className="text-xl font-bold text-green-600">€{item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-lg min-w-[2rem] text-center">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn-primary bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

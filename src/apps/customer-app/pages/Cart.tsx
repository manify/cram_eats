import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore, useNotificationStore } from '../stores';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart, placeOrder } = useCartStore();
  const { addNotification } = useNotificationStore();

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const orderId = placeOrder('25 Avenue des Mazades, 31200 Toulouse, France');

    addNotification({
      title: 'Order Placed Successfully',
      message: `Your order #${orderId} has been placed and is being processed.`,
      type: 'order',
      read: false,
    });

    // Redirect to Orders dashboard
    navigate('/dashboard/orders');
  };


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          {/* When cart is empty */}
<button
  onClick={() => navigate('/dashboard/home')}   // ⬅️ go straight to Home.tsx
  className="btn-primary"
>
  Browse Restaurants
</button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600">{items.length} items</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.restaurantName}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="font-semibold text-green-600 mt-1">€{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-lg min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="w-full text-center text-red-600 hover:bg-red-50 py-2 rounded-lg transition font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white p-6 rounded-xl shadow sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">€{deliveryFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-green-600">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Delivery Address</h4>
                <p className="text-sm text-gray-600">25 Avenue des Mazades</p>
                <p className="text-sm text-gray-600">31200 Toulouse, France</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition text-center"
                disabled={items.length === 0}
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Estimated delivery: 25–35 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

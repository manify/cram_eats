import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const storedName = localStorage.getItem("userName") || localStorage.getItem("userEmail")?.split("@")[0] || "Guest";
  const userInitial = storedName.charAt(0).toUpperCase();

  const [restaurantData, setRestaurantData] = useState({
    name: "McDonald's (Toulouse Labège)",
    address: "146 L'Occitane, 31670",
    heroImage: "/assets/restaurant-hero.jpg",
    items: [
      { id: '1', name: 'Big Mac', description: 'Double burger with sauce', price: 6.50, image: '/assets/bigmac.jpg', rating: '4.5 (1200+)' },
      { id: '2', name: 'Fries', description: 'Golden and crispy', price: 2.30, image: '/assets/fries.jpg', rating: '4.2 (800+)' },
      { id: '3', name: 'Sprite', description: 'Fresh and fizzy', price: 1.90, image: '/assets/sprite.jpg', rating: '4.6 (1500+)' }
    ]
  });

  const [basket, setBasket] = useState<typeof restaurantData.items>([]);

  const addToBasket = (item: typeof restaurantData.items[number]) => {
  const updatedBasket = [...basket, item];
  setBasket(updatedBasket);
  localStorage.setItem("userBasket", JSON.stringify(updatedBasket));
};
useEffect(() => {
  const storedBasket = localStorage.getItem("userBasket");
  if (storedBasket) {
    setBasket(JSON.parse(storedBasket));
  }
}, []);


  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="flex">
        <aside className="w-64 bg-yellow-50 p-6 space-y-6 hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-lg">
              {userInitial}
            </div>
            <div>
              <h2 className="font-medium text-base">{storedName}</h2>
              <p className="text-sm text-green-400 cursor-pointer">View profile</p>
            </div>
          </div>

          <nav className="mt-6 space-y-4 text-sm font-medium">
            <a href="#" className="flex items-center text-white bg-green-400 px-3 py-2 rounded-3xl">Home</a>
            <a href="#" className="flex items-center text-neutral-900 px-3 py-2">Orders</a>
            <a href="#" className="flex items-center text-neutral-900 px-3 py-2">Notifications</a>
            <a href="#" className="flex items-center text-neutral-900 px-3 py-2">Account</a>
          </nav>
        </aside>

        <main className="flex-1 p-8 space-y-6">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex w-full md:w-1/2 items-center bg-yellow-50 px-4 py-2 rounded-xl border border-gray-200">
              <input
                type="text"
                placeholder="Search for restaurants or cuisines"
                className="bg-transparent w-full text-sm text-pink-800 placeholder-green-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-gray-200 text-green-400 text-sm">
                25 Avenue des Mazades
              </div>
              <button className="w-10 h-10 rounded-full bg-gray-100 border" />
            </div>
          </header>

          {/* Hero image */}
          <section>
            <img
              src={restaurantData.heroImage}
              alt="Restaurant Hero"
              className="rounded-2xl w-full object-cover h-64"
            />
          </section>

          {/* Restaurant info */}
          <section>
            <h1 className="text-3xl font-semibold">{restaurantData.name}</h1>
            <p className="text-sm text-neutral-500 mt-2">
              3.9 (2,000+) • American • Burgers • Fast Food • € • <a className="underline" href="#">Info</a><br />
              Tap for hours, info, and more<br />
              {restaurantData.address}
            </p>
          </section>

          {/* Featured Items */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Featured items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantData.items.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-green-600 font-bold mt-1">{item.price.toFixed(2)} €</p>
                    <p className="text-sm text-emerald-700">{item.rating}</p>
                    <button
                      onClick={() => addToBasket(item)}
                      className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Basket Summary */}
          {basket.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 w-64">
              <h2 className="font-semibold mb-2">Basket</h2>
              <ul className="space-y-1 text-sm">
                {basket.map((item, index) => (
                  <li key={index}>{item.name} - {item.price.toFixed(2)} €</li>
                ))}
              </ul>
              <p className="mt-2 font-bold">
                Total: {basket.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

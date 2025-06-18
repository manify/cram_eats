
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout2 from '../components/ui/Layout2';

export default function Dashboard() {
  return (
    <Layout2>
      <Outlet />
    </Layout2>

// ...imports
import React, { useEffect, useState } from 'react';
import {
  FiHome, FiUser, FiBell, FiMapPin,
  FiSearch, FiShoppingCart, FiFileText, FiX,
} from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [location, setLocation] = useState('25 Avenue des Mazades');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [basket, setBasket] = useState<any[]>([]);

  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName") || localStorage.getItem("userEmail")?.split("@")[0] || "Guest";
  const userInitial = storedName.charAt(0).toUpperCase();
  const SearchIcon = FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const CartIcon = FiShoppingCart as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const XIcon = FiX as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  

  const featuredRestaurants = [
    { name: 'The Italian Place', rating: '4.5(1200+)', image: '/assets/italian.jpg', id: 1 },
    { name: 'Sushi Express', rating: '4.2(800+)', image: '/assets/sushi.jpg', id: 2 },
    { name: 'Burger Haven', rating: '4.6(1500+)', image: '/assets/burger.jpg', id: 3 },
  ];

  const popularRestaurants = [
    { name: 'The Italian Place', rating: '4.5(1200+)', image: '/assets/italian.jpg', id: 1 },
    { name: 'Sushi Express', rating: '4.2(800+)', image: '/assets/sushi.jpg', id: 2 },
    { name: 'Burger Haven', rating: '4.6(1500+)', image: '/assets/burger.jpg', id: 3 },
    { name: 'Taco Fiesta', rating: '4.3(900+)', image: '/assets/taco.jpg', id: 4 },
    { name: 'Noodle Nirvana', rating: '4.4(1100+)', image: '/assets/noodle.jpg', id: 5 },
    { name: 'Dessert Delight', rating: '4.7(1300+)', image: '/assets/dessert.jpg', id: 6 },
  ];

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    const storedPhone = localStorage.getItem("userPhone");
    const storedImage = localStorage.getItem("userImage");
    const storedBasket = localStorage.getItem("userBasket");

    if (storedLocation) setLocation(storedLocation);
    if (storedPhone) setPhoneNumber(storedPhone);
    if (storedImage) setImagePreview(storedImage);
    if (storedBasket) setBasket(JSON.parse(storedBasket));
  }, []);

  const handleSave = () => {
    localStorage.setItem("userLocation", location);
    localStorage.setItem("userPhone", phoneNumber);
    if (imagePreview) localStorage.setItem("userImage", imagePreview);
    setShowProfileModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-50 p-6 space-y-6 hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-lg">
              {userInitial}
            </div>
            <div>
              <h2 className="font-medium text-base">{storedName}</h2>
              <p className="text-sm text-green-400 cursor-pointer" onClick={() => setShowProfileModal(true)}>View profile</p>
            </div>
          </div>

          <nav className="mt-6 space-y-4 text-sm font-medium">
            <a href="#" className="flex items-center text-white bg-green-400 px-3 py-2 rounded-3xl">Home</a>
            <a onClick={() => navigate("/orders")} className="cursor-pointer flex items-center text-neutral-900 px-3 py-2">Orders</a>
            <a href="#" className="flex items-center text-neutral-900 px-3 py-2">Notifications</a>
            <a href="#" className="flex items-center text-neutral-900 px-3 py-2">Account</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex w-full md:w-1/2 items-center bg-yellow-50 px-4 py-2 rounded-xl border border-gray-200">
              <SearchIcon className="text-gray-400 mr-2" />
              <input type="text" placeholder="Search for restaurants or cuisines" className="bg-transparent w-full text-sm text-pink-800 placeholder-green-400 focus:outline-none" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-gray-200 text-green-400 text-sm">
                {location}
              </div>
              <button className="w-10 h-10 rounded-full bg-gray-100 border"><CartIcon /></button>
            </div>
          </header>

          {/* Featured */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredRestaurants.map((res) => (
                <div key={res.id} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer" onClick={() => navigate(`/restaurant/${res.id}`)}>
                  <img src={res.image} alt={res.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">{res.name}</h3>
                    <p className="text-sm text-green-600">{res.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Popular Near You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {popularRestaurants.map((res) => (
                <div key={res.id} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer" onClick={() => navigate(`/restaurant/${res.id}`)}>
                  <img src={res.image} alt={res.name} className="w-full h-28 object-cover" />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold">{res.name}</h3>
                    <p className="text-xs text-green-600">{res.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Basket Section */}
          {basket.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mt-8 mb-3">Current Basket</h2>
              <ul className="bg-white p-4 border rounded-lg shadow space-y-2 text-sm">
                {basket.map((item, idx) => (
                  <li key={idx}>{item.name} - {item.price.toFixed(2)} €</li>
                ))}
                <li className="pt-2 font-bold">
                  Total: {basket.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €
                </li>
              </ul>
            </section>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[400px] shadow-lg relative overflow-hidden">
            <div className="bg-green-500 text-white text-center py-4 font-semibold text-lg">
              Edit Profile
            </div>
            <button onClick={() => setShowProfileModal(false)} className="absolute top-3 right-3">
              <XIcon width={20} height={20} />
            </button>
            <div className="p-6 space-y-4">
              <div className="flex justify-center">
                <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                />
              </div>
              <div className="flex justify-between gap-4 pt-4">
                <button onClick={handleSave} className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                  Save Changes
                </button>
                <button onClick={handleLogout} className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

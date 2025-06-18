import React from 'react';
import { Star, Clock, MapPin, Phone } from 'lucide-react';

const RestoPage = () => {
  const restaurants = [
    {
      id: 1,
      name: "Mario's Italian Kitchen",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      rating: 4.8,
      deliveryTime: "25-35 min",
      cuisine: "Italian, Pizza",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      featured: true
    },
    {
      id: 2,
      name: "Sakura Sushi Bar",
      image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
      rating: 4.7,
      deliveryTime: "30-40 min",
      cuisine: "Japanese, Sushi",
      address: "456 Oak Ave, Midtown",
      phone: "(555) 987-6543",
      featured: false
    },
    {
      id: 3,
      name: "Burger Palace",
      image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      rating: 4.5,
      deliveryTime: "20-30 min",
      cuisine: "American, Burgers",
      address: "789 Pine St, Uptown",
      phone: "(555) 456-7890",
      featured: true
    },
    {
      id: 4,
      name: "Spice Garden",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.6,
      deliveryTime: "35-45 min",
      cuisine: "Indian, Curry",
      address: "321 Elm St, Southside",
      phone: "(555) 321-0987",
      featured: false
    },
    {
      id: 5,
      name: "Taco Fiesta",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      rating: 4.4,
      deliveryTime: "15-25 min",
      cuisine: "Mexican, Tacos",
      address: "654 Cedar Ave, Westside",
      phone: "(555) 654-3210",
      featured: false
    },
    {
      id: 6,
      name: "Fresh Salad Co.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.3,
      deliveryTime: "20-30 min",
      cuisine: "Healthy, Salads",
      address: "987 Maple St, Eastside",
      phone: "(555) 789-0123",
      featured: true
    }
  ];

  const featuredRestaurants = restaurants.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-[#FFFBE6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg mb-4">
            <h1 className="text-3xl font-bold tracking-wide">Available Restaurants</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover amazing restaurants near you and get your favorite meals delivered fresh to your door.
          </p>
        </div>

        {/* Featured */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm mr-3">Featured</span>
            Top Rated Restaurants
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{restaurant.phone}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestoPage;

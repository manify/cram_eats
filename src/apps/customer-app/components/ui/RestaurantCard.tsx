import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  image: string;
  deliveryTime?: string;
  distance?: string;
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  rating,
  reviewCount,
  image,
  deliveryTime = "25-35 min",
  distance = "1.2 km",
  featured = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`card overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 ${
        featured ? 'ring-2 ring-primary-200' : ''
      }`}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{name}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{rating}</span>
            <span>({reviewCount}+)</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface RestaurantProfile {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string;
  openingHours: string;
  image: string;
  isOpen: boolean;
}

interface ProfileSettingsProps {
  profile: RestaurantProfile;
  onUpdateProfile: (profile: RestaurantProfile) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onUpdateProfile }) => {
  const [formData, setFormData] = useState<RestaurantProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const toggleRestaurantStatus = () => {
    const updatedProfile = {
      ...profile,
      isOpen: !profile.isOpen
    };
    onUpdateProfile(updatedProfile);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-yellow-50">
          {formData.image ? (
            <img 
              src={formData.image} 
              alt={formData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Status Section */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${profile.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-lg font-medium">
                Status: {profile.isOpen ? 'Open for Orders' : 'Temporarily Closed'}
              </span>
            </div>
            <button
              onClick={toggleRestaurantStatus}
              className={`px-4 py-2 rounded-lg font-medium ${
                profile.isOpen 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {profile.isOpen ? 'Close Restaurant' : 'Open Restaurant'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuisine Type
                    </label>
                    <input
                      type="text"
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      value={formData.openingHours}
                      onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="mt-2 text-gray-600">{formData.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{formData.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>{formData.email}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Cuisine Type</span>
                    <p className="mt-1 text-gray-900">{formData.cuisine}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Opening Hours</span>
                    <p className="mt-1 text-gray-900">{formData.openingHours}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
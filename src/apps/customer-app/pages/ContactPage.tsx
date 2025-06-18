import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-[#FFFBE6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Have questions about our services? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none text-gray-900 placeholder-gray-400"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span className="text-lg">Send Message</span>
              </button>
            </form>
          </div>

          {/* Right Side - Contact Info and Image */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20"></div>
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                  alt="Customer Service Team"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="font-bold text-gray-900">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-green-500 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Phone Support</h4>
                      <p className="text-green-600 font-semibold text-lg">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Available Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Email Support</h4>
                      <p className="text-blue-600 font-semibold text-lg">support@crameats.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Visit Our Office</h4>
                      <p className="text-gray-700 font-medium">123 Food Street</p>
                      <p className="text-gray-700 font-medium">Delivery District, DD 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-orange-500 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Business Hours</h4>
                      <p className="text-gray-700">Monday - Friday: 8:00 AM - 10:00 PM</p>
                      <p className="text-gray-700">Saturday - Sunday: 9:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

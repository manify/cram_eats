import React from 'react';
import { useNotificationStore } from '../stores';
import { Bell, Package, Gift, Settings, Trash2, BookMarked as MarkAsRead } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-primary-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Notifications</h1>
            <p className="text-purple-100">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
            </p>
          </div>
          <Bell className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <MarkAsRead className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="card p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">We'll notify you when there's something new!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card p-4 transition-all duration-200 ${
                !notification.read 
                  ? 'bg-blue-50 border-blue-200 shadow-md' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'order' ? 'bg-blue-100' :
                  notification.type === 'promotion' ? 'bg-primary-100' :
                  'bg-gray-100'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
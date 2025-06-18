import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  read: boolean;
  timestamp: Date;
  icon?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Confirmed',
      message: 'Your order from The Italian Place has been confirmed and is being prepared.',
      type: 'order',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 20% off your next order from Sushi Express. Use code SUSHI20.',
      type: 'promotion',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: '3',
      title: 'Delivery Update',
      message: 'Your order is out for delivery and will arrive in 10-15 minutes.',
      type: 'order',
      read: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        const orderStatuses = ['confirmed', 'preparing', 'out for delivery'];
        const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
        
        addNotification({
          title: 'Order Update',
          message: `Your order is now ${randomStatus}.`,
          type: 'order',
          read: false,
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
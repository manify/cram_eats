import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  read: boolean;
  timestamp: Date | string; // Allow both Date and string to handle serialization
  icon?: string;
}

interface NotificationState {
  notifications: Notification[];
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
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
          title: 'System Update',
          message: 'We have updated our app to serve you better. Check out the new features!',
          type: 'system',
          read: true,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        }
      ],

      addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
        const newNotification: Notification = {
          ...notification,
          id: `notification-${Date.now()}`,
          timestamp: new Date(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(notification => ({
            ...notification,
            read: true
          }))
        }));
      },

      deleteNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(notification => notification.id !== id)
        }));
      },

      getUnreadCount: () => {
        const { notifications } = get();
        return notifications.filter(notification => !notification.read).length;
      }    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        notifications: state.notifications
      })
    }
  )
);

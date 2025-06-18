import { Order } from '../../../types/Order';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    date: '2024-03-15T14:30:00Z',
    status: 'pending',
    total: 45.99,
    items: [
      { id: 'ITEM-001', name: 'Margherita Pizza', quantity: 1, price: 15.99 },
      { id: 'ITEM-002', name: 'Chicken Wings', quantity: 2, price: 14.99 }
    ],
    specialInstructions: 'Extra cheese please'
  },
  {
    id: 'ORD-002',
    customerName: 'Alice Smith',
    date: '2024-03-15T15:45:00Z',
    status: 'preparing',
    total: 32.50,
    items: [
      { id: 'ITEM-003', name: 'Pasta Carbonara', quantity: 1, price: 18.50 },
      { id: 'ITEM-004', name: 'Caesar Salad', quantity: 1, price: 14.00 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Wilson',
    date: '2024-03-15T13:15:00Z',
    status: 'ready',
    total: 27.99,
    items: [
      { id: 'ITEM-005', name: 'Veggie Burger', quantity: 1, price: 12.99 },
      { id: 'ITEM-006', name: 'French Fries', quantity: 2, price: 7.50 }
    ],
    specialInstructions: 'No onions in burger'
  }
];
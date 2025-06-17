import { MenuItem } from '../../../types/Menu';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in a rich, creamy tomato sauce',
    price: 24.99,
    category: 'mains',
    isAvailable: true,
    image: 'https://source.unsplash.com/featured/?curry'
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices and vegetables',
    price: 18.99,
    category: 'starters',
    isAvailable: true,
    image: 'https://source.unsplash.com/featured/?paneer'
  },
  {
    id: '3',
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings soaked in rose syrup',
    price: 6.99,
    category: 'desserts',
    isAvailable: true,
    image: 'https://source.unsplash.com/featured/?dessert'
  },
  {
    id: '4',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango pulp',
    price: 4.99,
    category: 'beverages',
    isAvailable: true,
    image: 'https://source.unsplash.com/featured/?smoothie'
  }
];
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages';
  image?: string;
  isAvailable: boolean;
}
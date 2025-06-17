import { MenuItem } from './Menu';

export interface BundleItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Deal {
  id: string;
  name: string;
  bundleItems: BundleItem[];
  totalPrice: number;
  discountedPrice: number;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
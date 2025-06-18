export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  image: string;
  coverImage: string;
  deliveryTime: string;
  distance: string;
  featured?: boolean;
  cuisine: string;
  description: string;
  address: string;
  phone: string;
  menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: 'italian-place',
    name: 'The Italian Place',
    rating: 4.5,
    reviewCount: 1200,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '25-35 min',
    distance: '1.2 km',
    featured: true,
    cuisine: 'Italian',
    description: 'Authentic Italian cuisine with fresh ingredients and traditional recipes.',
    address: '123 Italian Street, Toulouse',
    phone: '+33 5 61 12 34 56',
    menu: [
      {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, basil, olive oil',
        price: 12.50,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Pizza',
        popular: true,
        vegetarian: true
      },
      {
        id: 'pepperoni-pizza',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, tomato sauce',
        price: 14.50,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Pizza',
        popular: true
      },
      {
        id: 'carbonara-pasta',
        name: 'Spaghetti Carbonara',
        description: 'Spaghetti with eggs, cheese, pancetta, and black pepper',
        price: 13.50,
        image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Pasta',
        popular: true
      },
      {
        id: 'lasagna',
        name: 'Homemade Lasagna',
        description: 'Layers of pasta, meat sauce, and cheese',
        price: 15.50,
        image: 'https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Pasta'
      },
      {
        id: 'caesar-salad',
        name: 'Caesar Salad',
        description: 'Crisp romaine, parmesan, croutons, caesar dressing',
        price: 8.50,
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Salads',
        vegetarian: true
      },
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 6.50,
        image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Desserts',
        vegetarian: true
      }
    ]
  },
  {
    id: 'sushi-express',
    name: 'Sushi Express',
    rating: 4.2,
    reviewCount: 800,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '20-30 min',
    distance: '0.8 km',
    cuisine: 'Japanese',
    description: 'Fresh sushi and Japanese cuisine made with premium ingredients.',
    address: '456 Sushi Avenue, Toulouse',
    phone: '+33 5 61 23 45 67',
    menu: [
      {
        id: 'salmon-roll',
        name: 'Salmon Roll',
        description: 'Fresh salmon, avocado, cucumber',
        price: 9.50,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Sushi',
        popular: true
      },
      {
        id: 'tuna-roll',
        name: 'Tuna Roll',
        description: 'Fresh tuna, avocado, spicy mayo',
        price: 10.50,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Sushi',
        spicy: true
      },
      {
        id: 'california-roll',
        name: 'California Roll',
        description: 'Crab, avocado, cucumber, sesame seeds',
        price: 8.50,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Sushi',
        popular: true
      },
      {
        id: 'chicken-teriyaki',
        name: 'Chicken Teriyaki',
        description: 'Grilled chicken with teriyaki sauce and rice',
        price: 12.50,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Main Dishes'
      },
      {
        id: 'miso-soup',
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu and seaweed',
        price: 4.50,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Soups',
        vegetarian: true
      },
      {
        id: 'mochi-ice-cream',
        name: 'Mochi Ice Cream',
        description: 'Sweet rice cake filled with ice cream',
        price: 5.50,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Desserts',
        vegetarian: true
      }
    ]
  },
  {
    id: 'burger-haven',
    name: 'Burger Haven',
    rating: 4.6,
    reviewCount: 1500,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '15-25 min',
    distance: '0.5 km',
    featured: true,
    cuisine: 'American',
    description: 'Gourmet burgers made with premium beef and fresh ingredients.',
    address: '789 Burger Street, Toulouse',
    phone: '+33 5 61 34 56 78',
    menu: [
      {
        id: 'classic-burger',
        name: 'Classic Burger',
        description: 'Beef patty, lettuce, tomato, onion, pickles',
        price: 8.50,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Burgers',
        popular: true
      },
      {
        id: 'big-mac',
        name: 'Big Mac',
        description: 'Double burger with special sauce',
        price: 6.50,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Burgers',
        popular: true
      },
      {
        id: 'cheese-burger',
        name: 'Cheese Burger',
        description: 'Beef patty with melted cheese',
        price: 9.50,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Burgers'
      },
      {
        id: 'fries',
        name: 'French Fries',
        description: 'Golden and crispy potato fries',
        price: 2.30,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Sides',
        popular: true
      },
      {
        id: 'onion-rings',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings',
        price: 3.50,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Sides'
      },
      {
        id: 'milkshake',
        name: 'Vanilla Milkshake',
        description: 'Creamy vanilla milkshake',
        price: 4.50,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Drinks',
        vegetarian: true
      }
    ]
  },
  {
    id: 'taco-fiesta',
    name: 'Taco Fiesta',
    rating: 4.3,
    reviewCount: 900,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '20-30 min',
    distance: '1.5 km',
    cuisine: 'Mexican',
    description: 'Authentic Mexican flavors with fresh ingredients and bold spices.',
    address: '321 Taco Boulevard, Toulouse',
    phone: '+33 5 61 45 67 89',
    menu: [
      {
        id: 'beef-tacos',
        name: 'Beef Tacos',
        description: 'Seasoned beef with lettuce, tomato, cheese',
        price: 7.50,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Tacos',
        popular: true
      },
      {
        id: 'chicken-quesadilla',
        name: 'Chicken Quesadilla',
        description: 'Grilled chicken and cheese in a flour tortilla',
        price: 9.50,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Quesadillas'
      },
      {
        id: 'guacamole',
        name: 'Guacamole & Chips',
        description: 'Fresh avocado dip with tortilla chips',
        price: 5.50,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Appetizers',
        vegetarian: true
      }
    ]
  },
  {
    id: 'noodle-nirvana',
    name: 'Noodle Nirvana',
    rating: 4.4,
    reviewCount: 1100,
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '25-35 min',
    distance: '2.1 km',
    cuisine: 'Asian',
    description: 'Delicious Asian noodle dishes with authentic flavors.',
    address: '654 Noodle Lane, Toulouse',
    phone: '+33 5 61 56 78 90',
    menu: [
      {
        id: 'pad-thai',
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with shrimp and vegetables',
        price: 11.50,
        image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Noodles',
        popular: true,
        spicy: true
      },
      {
        id: 'ramen',
        name: 'Chicken Ramen',
        description: 'Rich broth with noodles, chicken, and vegetables',
        price: 10.50,
        image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Noodles'
      }
    ]
  },
  {
    id: 'dessert-delight',
    name: 'Dessert Delight',
    rating: 4.7,
    reviewCount: 1300,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliveryTime: '15-25 min',
    distance: '1.8 km',
    cuisine: 'Desserts',
    description: 'Sweet treats and desserts made fresh daily.',
    address: '987 Sweet Street, Toulouse',
    phone: '+33 5 61 67 89 01',
    menu: [
      {
        id: 'chocolate-cake',
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate frosting',
        price: 5.50,
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Cakes',
        popular: true,
        vegetarian: true
      },
      {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake with berry topping',
        price: 6.50,
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Cakes',
        vegetarian: true
      }
    ]
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getMenuCategories = (restaurantId: string): string[] => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return [];
  
  const categories = restaurant.menu.map(item => item.category);
  return ['All', ...Array.from(new Set(categories))];
};
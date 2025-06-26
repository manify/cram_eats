# Restaurant Dashboard API Integration

## Overview
The Restaurant Dashboard has been updated to integrate with your backend API structure using the complex menu system with items and menu associations.

## API Endpoints Used

### 1. Get Restaurant Data (including menus and items)
```
GET http://localhost:3030/crameats/restaurants/{restaurantId}
```
**Response Structure:**
```json
{
    "id": 1,
    "userId": 3,
    "name": "Pizza Palace",
    "user": {
        "id": 3,
        "firstName": "Mario",
        "lastName": "Rossi",
        "email": "mario.rossi@example.com"
    },
    "menu": [
        {
            "id": 1,
            "restaurantId": 1,
            "name": "Main Menu",
            "description": "Our classic pizza selection",
            "price": 0,
            "imageUrl": null,
            "items": [
                {
                    "menuId": 1,
                    "itemId": 1,
                    "item": {
                        "id": 1,
                        "itemId": "pizza-001",
                        "name": "Margherita Pizza",
                        "restaurantId": 1,
                        "price": 12.99,
                        "status": "available",
                        "imageUrl": "https://example.com/images/margherita.jpg"
                    }
                }
            ]
        }
    ],
    "location": null
}
```

### 2. Add Item to Restaurant
```
POST http://localhost:3030/crameats/items
```
**Request Body:**
```json
{
    "itemId": "item-1234567890",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    "price": 12.99,
    "category": "Pizza",
    "status": "available",
    "imageUrl": "https://example.com/pizza.jpg",
    "restaurantId": 1
}
```

### 3. Update Item
```
PUT http://localhost:3030/crameats/items/{itemId}
```

### 4. Delete Item
```
DELETE http://localhost:3030/crameats/items/{itemId}
```

### 5. Get Restaurant Orders
```
GET http://localhost:3030/crameats/orders/restaurant/{restaurantId}
```

### 6. Update Order Status
```
PATCH http://localhost:3030/crameats/orders/{orderId}/status
```

## Data Models

### MenuItem (Frontend Interface)
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'available' | 'unavailable';
  imageUrl?: string;
  restaurantId?: number;
}
```

### RestaurantMenuItem (Backend Response)
```typescript
interface RestaurantMenuItem {
  id: number;
  itemId: string;
  name: string;
  restaurantId: number;
  price: number;
  status: 'available' | 'unavailable';
  imageUrl: string | null;
  description?: string;
  category?: string;
}
```

### RestaurantData (Backend Response)
```typescript
interface RestaurantData {
  id: number;
  userId: number;
  name: string;
  user: RestaurantUser;
  menu: RestaurantMenu[];
  location: any;
}
```

## Features Implemented

1. **Item Management**
   - Add new items to restaurant using the crameats API
   - Edit existing items
   - Toggle item availability (available/unavailable)
   - Delete items
   - View all restaurant items from complex menu structure

2. **Menu System Understanding**
   - Fetches restaurant data with nested menu structure
   - Extracts items from menu associations
   - Displays items in a flat structure for easy management
   - Maintains restaurant context and user information

3. **Order Management**
   - View all restaurant orders
   - Update order status
   - Display order statistics on dashboard

4. **Dashboard Statistics**
   - Total orders count
   - Revenue calculation (from delivered orders)
   - Active orders count
   - Menu items count (extracted from all menus)

## Data Flow

1. **Login** → Store `restaurantId` and `token`
2. **Fetch Restaurant Data** → `GET /crameats/restaurants/{restaurantId}`
3. **Extract Items** → Parse nested menu structure to get all items
4. **Display Items** → Show in flat list for management
5. **Item Operations** → Use `/crameats/items` endpoints
6. **Order Management** → Use `/crameats/orders` endpoints

## Authentication
All API requests include:
```
Authorization: Bearer {token}
Content-Type: application/json
```

## Menu Structure Handling
The dashboard handles the complex menu structure by:
- Fetching the full restaurant data including nested menus
- Extracting all items from all menu associations
- Converting backend item format to frontend MenuItem interface
- Providing a unified view for item management

## File Changes Made
- `RestaurantDashboard.tsx` - Updated to use crameats API endpoints
- `RestaurantApi.ts` - New types for backend data structure
- `MenuItem.ts` - Updated interface for status/imageUrl fields
- `AddItemModal.tsx` - Updated for new MenuItem structure
- `MenuViewWithProps.tsx` - Updated for status field

# Order Creation API Implementation

This guide explains how to use the newly implemented order creation functionality in your CramEats app.

## Files Created/Modified

1. **Updated**: `src/apps/customer-app/types/api.ts` - Added order-related types
2. **Created**: `src/apps/customer-app/api/orders.ts` - Order API functions
3. **Updated**: `src/apps/customer-app/stores/authStore.ts` - Added token support
4. **Created**: `src/apps/customer-app/hooks/useCreateOrder.ts` - React hook for order creation
5. **Created**: `src/apps/customer-app/components/CreateOrderExample.tsx` - Example component

## How to Use

### 1. Basic API Usage (Direct Function Call)

```typescript
import { createOrderDirect } from '../hooks/useCreateOrder';

// Example usage
const handleCreateOrder = async () => {
  try {
    const result = await createOrderDirect(
      1, // restaurantId
      45.99, // totalPrice
      [ // items array
        { itemId: 1, quantity: 2 },
        { itemId: 3, quantity: 1 },
        { itemId: 5, quantity: 3 }
      ]
    );
    console.log('Order created:', result);
  } catch (error) {
    console.error('Order failed:', error);
  }
};
```

### 2. React Hook Usage (Recommended)

```typescript
import { useCreateOrder } from '../hooks/useCreateOrder';

const MyComponent = () => {
  const { submitOrder, isLoading, error, clearError } = useCreateOrder();

  const handleOrder = async () => {
    const result = await submitOrder(
      1, // restaurantId
      45.99, // totalPrice
      [ // items
        { itemId: 1, quantity: 2 },
        { itemId: 3, quantity: 1 },
        { itemId: 5, quantity: 3 }
      ]
    );
    
    if (result) {
      console.log('Order created:', result);
      // Handle success (e.g., redirect to order tracking)
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleOrder} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Order'}
      </button>
    </div>
  );
};
```

### 3. Complete Example Component

See `src/apps/customer-app/components/CreateOrderExample.tsx` for a full working example.

## API Endpoint Details

- **URL**: `http://localhost:3030/orderservice/orders`
- **Method**: POST
- **Headers**: 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "userId": 1,
  "restaurantId": 1,
  "totalPrice": 45.99,
  "items": [
    { "itemId": 1, "quantity": 2 },
    { "itemId": 3, "quantity": 1 },
    { "itemId": 5, "quantity": 3 }
  ]
}
```
- **Response**:
```json
{
  "success": true,
  "order": {
    "id": 4,
    "userId": 1,
    "restaurantId": 1,
    "status": "PENDING",
    "timestamp": "2025-06-19T00:59:35.874Z",
    "totalPrice": 45.99
  }
}
```

## Authentication

The system now supports Bearer token authentication:

1. **Token Storage**: Tokens are stored in both the Zustand store and localStorage
2. **Auto-retrieval**: The API automatically gets the token from the auth store
3. **Fallback**: If the store doesn't have a token, it falls back to localStorage and cookies

## Error Handling

The implementation includes comprehensive error handling:

- **Authentication errors**: When no token is found
- **API errors**: Server-side errors are properly caught and displayed
- **Network errors**: Connection issues are handled gracefully

## Integration with Existing Code

To integrate with your existing cart or checkout flow:

1. Import the hook: `import { useCreateOrder } from '../hooks/useCreateOrder';`
2. Use it in your component
3. Pass the restaurant ID, calculated total, and cart items
4. Handle the response (success/error states)

## Next Steps

1. Test the API with your backend server
2. Integrate with your existing cart functionality
3. Add order tracking features
4. Implement order history retrieval

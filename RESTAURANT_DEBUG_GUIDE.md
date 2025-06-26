# Restaurant Dashboard Debug Guide

## Current Issues Identified

Based on your backend logs, here are the main issues:

### 1. Restaurant ID 27 Not Found (404 Errors)
```
Restaurant Route Hit: GET /restaurants/27
127.0.0.1 - - [26/Jun/2025:22:12:28 +0000] "GET /crameats/restaurants/27 HTTP/1.1" 404 32
```

**Problem**: Restaurant with ID 27 doesn't exist in your database.
**Solution**: 
- Check if the restaurant was created properly during registration
- Verify the restaurantId stored in localStorage matches an existing restaurant
- Use restaurant ID 1 for testing (which works as shown in your logs)

### 2. Missing API Endpoints (404 Errors)
```
127.0.0.1 - - [26/Jun/2025:22:16:37 +0000] "POST /crameats/items HTTP/1.1" 404 58
127.0.0.1 - - [26/Jun/2025:22:06:00 +0000] "GET /crameats/orders/restaurant/27 HTTP/1.1" 404 73
```

**Problem**: Some API endpoints are returning 404
**Possible Solutions**:
- Check if your backend has these routes implemented:
  - `POST /crameats/items`
  - `GET /crameats/orders/restaurant/:id`
  - `GET /crameats/menus/restaurant/:id`

## Debug Steps

### Step 1: Check localStorage Values
Open browser DevTools (F12) and run:
```javascript
console.log('Restaurant ID:', localStorage.getItem('restaurantId'));
console.log('Restaurant Token:', localStorage.getItem('restaurantToken'));
console.log('Restaurant User:', localStorage.getItem('restaurantUser'));
```

### Step 2: Test with Working Restaurant ID
Temporarily set restaurant ID to 1 (which works):
```javascript
localStorage.setItem('restaurantId', '1');
```

### Step 3: Check API Endpoints
Test these endpoints directly:
- `GET http://localhost:3030/crameats/restaurants/1` ✅ (Working)
- `GET http://localhost:3030/crameats/restaurants/27` ❌ (404 - Not Found)
- `POST http://localhost:3030/crameats/items` ❌ (404 - Endpoint Missing?)

### Step 4: Verify Backend Routes
Check your backend code for these routes:
```javascript
// Should exist in your backend
app.get('/crameats/restaurants/:id', ...);
app.get('/crameats/orders/restaurant/:id', ...);
app.post('/crameats/items', ...);
app.put('/crameats/items/:id', ...);
app.delete('/crameats/items/:id', ...);
```

## Debugging Features Added

### 1. Enhanced Console Logging
The dashboard now logs:
- Restaurant ID being used
- API request details
- Response data
- Error details with status codes

### 2. Debug Component
A debug panel shows:
- Current restaurant ID
- Loading states
- Data counts
- Raw data for inspection

### 3. Error Handling
- Proper 404 error detection
- Graceful fallbacks
- Detailed error messages

## Quick Fix

For immediate testing, you can:

1. **Use Restaurant ID 1**:
   ```javascript
   localStorage.setItem('restaurantId', '1');
   ```

2. **Check Network Tab** in DevTools to see exact API calls

3. **Verify Backend Database** has restaurant with ID 27

4. **Implement Missing Routes** in your backend if they don't exist

## Expected Backend Routes Structure

```javascript
// GET restaurant data
app.get('/crameats/restaurants/:id', async (req, res) => {
  // Return restaurant with menu structure
});

// GET restaurant orders  
app.get('/crameats/orders/restaurant/:id', async (req, res) => {
  // Return orders for restaurant
});

// POST new item
app.post('/crameats/items', async (req, res) => {
  // Create new item
});

// PUT update item
app.put('/crameats/items/:id', async (req, res) => {
  // Update existing item
});

// DELETE item
app.delete('/crameats/items/:id', async (req, res) => {
  // Delete item
});
```

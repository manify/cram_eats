#!/bin/bash

# Backend API Endpoint Verification Script
# Run this to test which endpoints are working

BASE_URL="http://localhost:3030/crameats"
TOKEN="YOUR_TOKEN_HERE"  # Replace with actual token

echo "🔍 Testing Restaurant API Endpoints..."
echo "======================================"

# Test Restaurant ID 1 (known to work)
echo "📍 Testing Restaurant ID 1:"
curl -s -o /dev/null -w "GET /restaurants/1: %{http_code}\n" "$BASE_URL/restaurants/1"

# Test Restaurant ID 27 (failing)
echo "📍 Testing Restaurant ID 27:"
curl -s -o /dev/null -w "GET /restaurants/27: %{http_code}\n" "$BASE_URL/restaurants/27"

# Test Orders endpoint
echo "📋 Testing Orders endpoints:"
curl -s -o /dev/null -w "GET /orders/restaurant/1: %{http_code}\n" "$BASE_URL/orders/restaurant/1"
curl -s -o /dev/null -w "GET /orders/restaurant/27: %{http_code}\n" "$BASE_URL/orders/restaurant/27"

# Test Items endpoint
echo "🍕 Testing Items endpoints:"
curl -s -o /dev/null -w "GET /items: %{http_code}\n" "$BASE_URL/items"
curl -s -o /dev/null -w "POST /items: %{http_code}\n" -X POST "$BASE_URL/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","price":10}'

# Test Menus endpoint
echo "📜 Testing Menus endpoints:"
curl -s -o /dev/null -w "GET /menus/restaurant/1: %{http_code}\n" "$BASE_URL/menus/restaurant/1"
curl -s -o /dev/null -w "GET /menus/restaurant/27: %{http_code}\n" "$BASE_URL/menus/restaurant/27"

echo ""
echo "📊 Expected Results:"
echo "- 200 = Endpoint exists and works"
echo "- 404 = Endpoint doesn't exist or resource not found"
echo "- 401/403 = Authentication/permission issues"
echo "- 500 = Server error"

echo ""
echo "🛠️ Next Steps:"
echo "1. If Restaurant ID 27 returns 404, create it in your database"
echo "2. If endpoints return 404, implement them in your backend"
echo "3. Check your backend routes match the expected URLs"

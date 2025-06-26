# PowerShell script to test Restaurant API endpoints
# Run this in PowerShell to check which endpoints are working

$baseUrl = "http://localhost:3030/crameats"
$token = "YOUR_TOKEN_HERE"  # Replace with actual token

Write-Host "🔍 Testing Restaurant API Endpoints..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = $null
    )
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        }
        
        if ($Body) {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -Body ($Body | ConvertTo-Json) -UseBasicParsing
        } else {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -UseBasicParsing
        }
        
        Write-Host "$Method $Url`: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "$Method $Url`: $statusCode" -ForegroundColor Red
    }
}

# Test Restaurant endpoints
Write-Host "`n📍 Testing Restaurant endpoints:" -ForegroundColor Yellow
Test-Endpoint "$baseUrl/restaurants/1"
Test-Endpoint "$baseUrl/restaurants/27"

# Test Orders endpoints
Write-Host "`n📋 Testing Orders endpoints:" -ForegroundColor Yellow
Test-Endpoint "$baseUrl/orders/restaurant/1"
Test-Endpoint "$baseUrl/orders/restaurant/27"

# Test Items endpoints
Write-Host "`n🍕 Testing Items endpoints:" -ForegroundColor Yellow
Test-Endpoint "$baseUrl/items"
Test-Endpoint "$baseUrl/items" "POST" @{
    name = "Test Item"
    price = 10
    description = "Test description"
    category = "Test"
    status = "available"
    restaurantId = 1
}

# Test Menus endpoints
Write-Host "`n📜 Testing Menus endpoints:" -ForegroundColor Yellow
Test-Endpoint "$baseUrl/menus/restaurant/1"
Test-Endpoint "$baseUrl/menus/restaurant/27"

Write-Host "`n📊 Status Code Meanings:" -ForegroundColor Cyan
Write-Host "- 200: Success ✅"
Write-Host "- 404: Not Found ❌"
Write-Host "- 401/403: Authentication Issues 🔐"
Write-Host "- 500: Server Error 💥"

Write-Host "`n🛠️ Quick Fixes:" -ForegroundColor Cyan
Write-Host "1. Use Restaurant ID 1 for testing (known to work)"
Write-Host "2. Check if Restaurant ID 27 exists in your database"
Write-Host "3. Implement missing API routes in your backend"

# Quick localStorage fix
Write-Host "`n💡 Quick JavaScript fix for browser:" -ForegroundColor Green
Write-Host "localStorage.setItem('restaurantId', '1');"
Write-Host "location.reload();"

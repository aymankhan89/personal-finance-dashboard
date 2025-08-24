# Personal Finance Dashboard API Documentation

> **📋 API Version**: v1.0  
> **🚧 Status**: In Development  
> **Base URL**: `https://localhost:3000/api` (Development)  
> **Authentication**: JWT Bearer Token

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Accounts](#accounts)
- [Transactions](#transactions)
- [Categories](#categories)
- [Budgets](#budgets)
- [Goals](#goals)
- [Analytics](#analytics)
- [AI Insights](#ai-insights)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## Authentication

### Login
```
POST /api/auth/login
```

**Request Body:**
```
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatarUrl": "https://example.com/avatar.jpg"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900
  }
}
```

### Register
```
POST /api/auth/register
```

**Request Body:**
```
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Refresh Token
```
POST /api/auth/refresh
```

**Request Body:**
```
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Logout
```
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <accessToken>
```

## Users

### Get User Profile
```
GET /api/users/profile
```

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
}
```

### Update User Profile
```
PUT /api/users/profile
```

**Request Body:**
```
{
  "firstName": "John",
  "lastName": "Doe",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

## Accounts

### List Accounts
```
GET /api/accounts
```

**Query Parameters:**
- `type` (optional): `checking`, `savings`, `credit`, `investment`
- `isActive` (optional): `true`, `false`

**Response:**
```
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Main Checking",
      "type": "checking",
      "balance": 2500.00,
      "currency": "USD",
      "isActive": true,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Create Account
```
POST /api/accounts
```

**Request Body:**
```
{
  "name": "Savings Account",
  "type": "savings",
  "balance": 1000.00,
  "currency": "USD"
}
```

### Get Account
```
GET /api/accounts/{id}
```

### Update Account
```
PUT /api/accounts/{id}
```

### Delete Account
```
DELETE /api/accounts/{id}
```

## Transactions

### List Transactions
```
GET /api/transactions
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50, max: 100)
- `accountId` (optional): Filter by account ID
- `categoryId` (optional): Filter by category ID  
- `type` (optional): `income`, `expense`, `transfer`
- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `search` (optional): Search in description
- `tags` (optional): Comma-separated tags

**Response:**
```
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "accountId": "uuid",
        "categoryId": "uuid",
        "amount": 25.50,
        "type": "expense",
        "description": "Coffee shop",
        "date": "2025-01-15",
        "receiptUrl": "https://example.com/receipt.jpg",
        "tags": ["food", "coffee"],
        "isRecurring": false,
        "category": {
          "id": "uuid",
          "name": "Food & Dining",
          "color": "#FF6B6B",
          "icon": "utensils"
        },
        "account": {
          "id": "uuid",
          "name": "Main Checking",
          "type": "checking"
        },
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Create Transaction
```
POST /api/transactions
```

**Request Body:**
```
{
  "accountId": "uuid",
  "categoryId": "uuid",
  "amount": 25.50,
  "type": "expense",
  "description": "Coffee shop",
  "date": "2025-01-15",
  "receiptUrl": "https://example.com/receipt.jpg",
  "tags": ["food", "coffee"],
  "isRecurring": false,
  "recurringPattern": {
    "frequency": "monthly",
    "interval": 1,
    "endDate": "2025-12-31"
  }
}
```

### Get Transaction
```
GET /api/transactions/{id}
```

### Update Transaction
```
PUT /api/transactions/{id}
```

### Delete Transaction
```
DELETE /api/transactions/{id}
```

### Bulk Import Transactions
```
POST /api/transactions/bulk
```

**Request Body (CSV):**
```
Content-Type: multipart/form-data

file: transactions.csv
accountId: uuid
```

**CSV Format:**
```
date,amount,type,description,category
2025-01-15,25.50,expense,Coffee shop,Food & Dining
2025-01-14,2500.00,income,Salary,Income
```

### Export Transactions
```
GET /api/transactions/export
```

**Query Parameters:**
- `format`: `csv`, `pdf`
- `dateFrom`: Start date
- `dateTo`: End date
- `accountId` (optional): Filter by account

## Categories

### List Categories
```
GET /api/categories
```

**Response:**
```
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Food & Dining",
      "color": "#FF6B6B",
      "icon": "utensils",
      "parentId": null,
      "children": [
        {
          "id": "uuid",
          "name": "Restaurants",
          "color": "#FF6B6B",
          "icon": "utensils",
          "parentId": "uuid"
        }
      ],
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Create Category
```
POST /api/categories
```

**Request Body:**
```
{
  "name": "Food & Dining",
  "color": "#FF6B6B",
  "icon": "utensils",
  "parentId": null
}
```

### Update Category
```
PUT /api/categories/{id}
```

### Delete Category
```
DELETE /api/categories/{id}
```

## Budgets

### List Budgets
```
GET /api/budgets
```

**Query Parameters:**
- `period`: `weekly`, `monthly`, `yearly`
- `isActive`: `true`, `false`

**Response:**
```
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "categoryId": "uuid",
      "amount": 500.00,
      "period": "monthly",
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "isActive": true,
      "spent": 325.50,
      "remaining": 174.50,
      "percentUsed": 65.1,
      "category": {
        "id": "uuid",
        "name": "Food & Dining",
        "color": "#FF6B6B",
        "icon": "utensils"
      },
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Create Budget
```
POST /api/budgets
```

**Request Body:**
```
{
  "categoryId": "uuid",
  "amount": 500.00,
  "period": "monthly",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}
```

### Get Budget Progress
```
GET /api/budgets/progress
```

**Query Parameters:**
- `period`: `current`, `month`, `year`

## Goals

### List Goals
```
GET /api/goals
```

**Response:**
```
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Emergency Fund",
      "targetAmount": 10000.00,
      "currentAmount": 3500.00,
      "targetDate": "2025-12-31",
      "category": "Emergency",
      "isAchieved": false,
      "progress": 35.0,
      "monthlyTarget": 650.00,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Create Goal
```
POST /api/goals
```

**Request Body:**
```
{
  "name": "Emergency Fund",
  "targetAmount": 10000.00,
  "currentAmount": 0.00,
  "targetDate": "2025-12-31",
  "category": "Emergency"
}
```

### Update Goal Progress
```
PUT /api/goals/{id}/progress
```

**Request Body:**
```
{
  "amount": 500.00
}
```

## Analytics

### Spending Trends
```
GET /api/analytics/spending-trends
```

**Query Parameters:**
- `period`: `week`, `month`, `year`
- `groupBy`: `day`, `week`, `month`

**Response:**
```
{
  "success": true,
  "data": {
    "trends": [
      {
        "period": "2025-01",
        "income": 5000.00,
        "expenses": 3500.00,
        "net": 1500.00
      }
    ],
    "summary": {
      "totalIncome": 5000.00,
      "totalExpenses": 3500.00,
      "netFlow": 1500.00,
      "averageDaily": 116.67
    }
  }
}
```

### Category Breakdown
```
GET /api/analytics/category-breakdown
```

**Query Parameters:**
- `period`: `week`, `month`, `year`
- `type`: `income`, `expense`

**Response:**
```
{
  "success": true,
  "data": [
    {
      "categoryId": "uuid",
      "categoryName": "Food & Dining",
      "amount": 850.00,
      "percentage": 24.3,
      "transactionCount": 15,
      "color": "#FF6B6B"
    }
  ]
}
```

### Income vs Expense
```
GET /api/analytics/income-vs-expense
```

### Budget Performance
```
GET /api/analytics/budget-performance
```

## AI Insights

### Generate AI Analysis
```
POST /api/insights/ai-analysis
```

**Request Body:**
```
{
  "timeframe": "30days",
  "categories": ["all"],
  "analysisType": "spending_patterns"
}
```

**Response:**
```
{
  "success": true,
  "data": {
    "insights": [
      {
        "id": "uuid",
        "type": "spending_alert",
        "title": "Increased Food Spending",
        "description": "You spent 20% more on food this month compared to last month ($850 vs $708). Consider meal planning to reduce costs.",
        "severity": "warning",
        "data": {
          "currentMonth": 850.00,
          "previousMonth": 708.00,
          "increase": 20.0,
          "category": "Food & Dining"
        },
        "recommendations": [
          "Try meal planning for the week",
          "Look for grocery store deals",
          "Consider cooking at home more often"
        ],
        "createdAt": "2025-01-15T12:00:00Z"
      }
    ],
    "summary": {
      "totalInsights": 5,
      "criticalAlerts": 1,
      "recommendations": 3,
      "positiveInsights": 1
    }
  }
}
```

### Get Insight History
```
GET /api/insights/history
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `type`: Insight type
- `severity`: `info`, `warning`, `critical`

### Mark Insight as Read
```
PUT /api/insights/{id}/read
```

## File Upload

### Upload Receipt/Document
```
POST /api/upload
```

**Request Body:**
```
Content-Type: multipart/form-data

file: receipt.jpg
type: receipt
```

**Response:**
```
{
  "success": true,
  "data": {
    "url": "https://cloudinary.com/image/upload/receipt.jpg",
    "publicId": "receipts/uuid",
    "format": "jpg",
    "size": 245760
  }
}
```

## Error Handling

### Error Response Format
```
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Invalid or missing authentication
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests

## Rate Limiting

**Limits:**
- Authentication endpoints: 5 requests per minute
- CRUD operations: 100 requests per minute
- Analytics endpoints: 20 requests per minute
- File upload: 10 requests per minute

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks (Coming Soon)

### Events
- `transaction.created`
- `transaction.updated`
- `transaction.deleted`
- `budget.exceeded`
- `goal.achieved`
- `insight.generated`

---

**📝 Note**: This API is currently in development. Endpoints and response formats may change. Please refer to the latest version in the repository.

**🔗 Base URL**: Update the base URL when deploying to production  
**🔐 Authentication**: All endpoints (except auth) require a valid JWT token  
**📊 Pagination**: List endpoints support pagination with `page` and `limit` parameters  
**🔍 Filtering**: Most endpoints support filtering and search capabilities  

For technical implementation details, see the [Architecture Documentation](./ARCHITECTURE.md).

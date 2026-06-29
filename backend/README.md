# E-commerce Backend API

Node.js/Express/TypeScript backend with PostgreSQL and Prisma ORM.

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Database
- **Prisma** - ORM for database operations

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure PostgreSQL

Make sure PostgreSQL is running and create a database:

```sql
CREATE DATABASE ecommerce_db;
```

### 3. Update Environment Variables

Edit `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/ecommerce_db?schema=public"
PORT=3001
```

### 4. Run Prisma Migrations

Generate Prisma client and create database tables:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders

- `GET /api/orders` - Get all orders (with customer and items)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

## Example Requests

### Create Product

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

### Create Customer

```bash
curl -X POST http://localhost:3001/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St"
  }'
```

### Create Order

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "customer-uuid",
    "total": 1999.98,
    "status": "pending",
    "items": [
      {
        "productId": "product-uuid",
        "quantity": 2,
        "price": 999.99
      }
    ]
  }'
```

## Database Schema

- **Product**: id, name, description, price, stock, category, timestamps
- **Customer**: id, name, email (unique), phone, address, timestamps
- **Order**: id, customerId, total, status, timestamps
- **OrderItem**: id, orderId, productId, quantity, price

## Additional Commands

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

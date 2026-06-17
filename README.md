# FashionMart - E-commerce Platform

Modern e-commerce platform for modest fashion with React frontend and Laravel backend.

## 🏗️ Project Structure

```
fashionmart/
├── src/                    # React Frontend (Vite + TypeScript)
│   ├── components/         # React components
│   ├── lib/               # Utilities & API services
│   └── assets/            # Images & static files
├── backend/               # Laravel Backend API
│   ├── app/              # Laravel application
│   ├── database/         # Migrations & seeders
│   └── routes/           # API routes
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ or Bun
- SQLite (included with PHP)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Database is already configured (SQLite)**
   - Migrations are already run
   - Sample data is seeded

4. **Start Laravel server:**
   ```bash
   php artisan serve
   ```
   Backend will run at: `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```
   Frontend will run at: `http://localhost:5173`

## 📡 API Endpoints

Base URL: `http://127.0.0.1:8000/api/v1`

### Categories
- `GET /categories` - Get all categories
- `GET /categories/{slug}` - Get category by slug

### Products
- `GET /products` - Get all products (with filters)
  - Query params: `category_id`, `search`, `featured`, `per_page`
- `GET /products/{slug}` - Get product by slug

### Orders
- `POST /orders` - Create new order
- `GET /orders/{orderNumber}` - Get order by order number

## 🗄️ Database Schema

### Categories
- id, name, slug, image, description, is_active

### Products
- id, slug, title, sku, description, price, old_price
- image, gallery (JSON), category_id, stock
- is_active, is_featured

### Orders
- id, order_number, customer details, shipping info
- subtotal, shipping_cost, total
- status, payment_status, payment_method

### Order Items
- id, order_id, product_id, product details
- price, quantity, subtotal

## 🔧 Configuration

### Backend (.env)
Located at: `backend/.env`
- Database: SQLite (already configured)
- CORS: Enabled for all origins

### Frontend (.env)
Located at: `.env`
```
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

## 📦 Features

### Frontend
- ✅ Modern React + TypeScript
- ✅ Vite for fast development
- ✅ TailwindCSS for styling
- ✅ Zustand for state management
- ✅ React Router for navigation
- ✅ Responsive design

### Backend
- ✅ Laravel 12 REST API
- ✅ RESTful endpoints
- ✅ Database migrations & seeders
- ✅ CORS enabled
- ✅ Eloquent ORM relationships
- ✅ Input validation

## 🛠️ Development Commands

### Backend
```bash
cd backend

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Fresh migration with seed
php artisan migrate:fresh --seed

# Create new model
php artisan make:model ModelName -m

# Create new controller
php artisan make:controller ControllerName
```

### Frontend
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Sample Data

The database is pre-seeded with:
- 4 Categories (Hijab, Abaya, Salat Khimar, Abaya Gown)
- Sample products in each category
- Admin user: `admin@fashionmart.com`

## 🔐 Admin Access

### Admin Login Credentials:
- **URL:** `http://127.0.0.1:8000/login`
- **Email:** `admin@fashionmart.com`
- **Password:** `password`

### Admin Dashboard Features:
- ✅ Dashboard with statistics
- ✅ Products Management (Create, Edit, Delete)
- ✅ Orders Management (View, Update Status)
- ✅ Categories Management
- ✅ Real-time order tracking

### Admin Routes:
- `/admin` - Dashboard
- `/admin/products` - Products list
- `/admin/products/create` - Add new product
- `/admin/orders` - Orders list
- `/admin/orders/{id}` - Order details
- `/admin/categories` - Categories list

Currently, the backend has basic API endpoints. To add admin panel:

### Option 1: Laravel Breeze (Simple)
```bash
cd backend
composer require laravel/breeze --dev
php artisan breeze:install
```

### Option 2: Filament (Advanced)
```bash
cd backend
# Enable PHP intl extension first in php.ini
composer require filament/filament
php artisan filament:install --panels
php artisan make:filament-user
```

## 🌐 Deployment

### Frontend
- Build: `npm run build`
- Deploy `dist/` folder to any static hosting (Vercel, Netlify, etc.)

### Backend
- Deploy to any PHP hosting with Laravel support
- Update `.env` with production database credentials
- Run migrations on production

## 📄 License

This project is open-source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

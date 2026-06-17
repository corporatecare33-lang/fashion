# Order System Setup - সম্পূর্ণ গাইড

## ✅ যা করা হয়েছে

### 1. **API Service তৈরি** (`src/lib/api.ts`)
- Backend এর সাথে connect করার জন্য axios setup
- Order create, read, update, delete functions
- TypeScript types এবং interfaces

### 2. **Checkout Page Update** (`src/routes/checkout.tsx`)
- Order submit করলে backend API তে যাবে
- Database এ order save হবে
- Loading state এবং error handling
- Success message এবং order number redirect

### 3. **Admin Orders Page Dynamic** (`src/routes/admin/orders.tsx`)
- Real-time data fetch করা হচ্ছে backend থেকে
- Edit/Delete functions কাজ করছে
- Status update করা যাচ্ছে
- Refresh button যোগ করা হয়েছে
- Dynamic statistics (pending, processing, delivered, cancelled)

### 4. **Backend API Routes** (`backend/routes/api.php`)
- Admin routes যোগ করা হয়েছে:
  - `PUT /api/admin/orders/{id}` - Order update
  - `DELETE /api/admin/orders/{id}` - Order delete

### 5. **Backend Controller** (`backend/app/Http/Controllers/Api/OrderController.php`)
- `update()` method যোগ করা হয়েছে
- `destroy()` method যোগ করা হয়েছে
- Validation এবং error handling

### 6. **Product Type Update** (`src/lib/products.ts`)
- Product type এ `id` field যোগ করা হয়েছে
- সব products এ unique ID দেওয়া হয়েছে (1-12)

---

## 🚀 কিভাবে Test করবেন

### Step 1: Backend Server চালান

```bash
cd backend
php artisan serve
```

Backend চলবে: `http://localhost:8000`

### Step 2: Frontend Server চালান

```bash
# Root directory তে
npm run dev
# অথবা
bun dev
```

Frontend চলবে: `http://localhost:3000`

### Step 3: Order করুন

1. Frontend এ যান: `http://localhost:3000`
2. কোন product cart এ add করুন
3. Checkout page এ যান
4. Form পূরণ করুন:
   - নাম
   - ফোন নাম্বার
   - ঠিকানা
5. "অর্ডার কনফার্ম করুন" button এ click করুন

### Step 4: Admin Panel এ Check করুন

1. Admin panel এ যান: `http://localhost:3000/admin/orders`
2. আপনার order দেখতে পাবেন
3. Order এর উপর click করে:
   - Status change করতে পারবেন
   - Delete করতে পারবেন
   - Details দেখতে পারবেন

---

## 🔧 API Endpoints

### Public API (Frontend)

```
GET    /api/v1/orders              - সব orders
POST   /api/v1/orders              - নতুন order তৈরি
GET    /api/v1/orders/{orderNumber} - Single order
```

### Admin API

```
PUT    /api/admin/orders/{id}      - Order update (status, payment)
DELETE /api/admin/orders/{id}      - Order delete
```

---

## 📝 Order Create করার Data Format

```json
{
  "customer_name": "মোঃ রহিম",
  "customer_email": "rahim@example.com",
  "customer_phone": "01712345678",
  "shipping_address": "ঢাকা, বাংলাদেশ",
  "city": "Dhaka",
  "payment_method": "Cash on Delivery",
  "notes": "Optional notes",
  "shipping_cost": 80,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

---

## 🎯 Features

### ✅ Frontend Features:
- Order placement from checkout
- Loading states
- Error handling
- Success notifications
- Order number generation

### ✅ Admin Features:
- View all orders (real-time)
- Search orders (by ID, name, email)
- Filter by status
- Update order status:
  - Pending → Processing
  - Processing → Shipped
  - Shipped → Delivered
  - Cancel order
- Delete orders
- Refresh button
- Dynamic statistics

### ✅ Backend Features:
- Order validation
- Stock management
- Order items tracking
- Status management
- Payment status tracking

---

## 🔍 Troubleshooting

### Problem 1: "Network Error" বা API call fail হচ্ছে

**Solution:**
- Check করুন backend server চলছে কিনা (`php artisan serve`)
- Check করুন `src/lib/api.ts` এ `API_BASE_URL` সঠিক আছে কিনা
- Browser console এ error দেখুন

### Problem 2: Order create হচ্ছে না

**Solution:**
- Database migration run করেছেন কিনা check করুন:
  ```bash
  cd backend
  php artisan migrate
  ```
- Products table এ data আছে কিনা check করুন

### Problem 3: Admin panel এ orders দেখাচ্ছে না

**Solution:**
- Browser console check করুন
- Network tab এ API call success হচ্ছে কিনা দেখুন
- Backend logs check করুন

### Problem 4: CORS Error

**Solution:**
Backend এর `config/cors.php` file এ check করুন:

```php
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 📊 Database Schema

### Orders Table:
- id
- order_number (unique)
- customer_name
- customer_email
- customer_phone
- shipping_address
- city
- postal_code
- subtotal
- shipping_cost
- total
- status (pending, processing, shipped, delivered, cancelled)
- payment_status (pending, paid, failed)
- payment_method
- notes
- created_at
- updated_at

### Order Items Table:
- id
- order_id
- product_id
- product_name
- product_sku
- price
- quantity
- subtotal
- created_at
- updated_at

---

## 🎉 Next Steps

এখন আপনি:

1. ✅ Frontend থেকে order করতে পারবেন
2. ✅ Admin panel এ orders দেখতে পারবেন
3. ✅ Order status update করতে পারবেন
4. ✅ Orders delete করতে পারবেন
5. ✅ Real-time statistics দেখতে পারবেন

### আরও Features যোগ করতে চাইলে:

- Order details page (single order view)
- Invoice generation (PDF download)
- Email notifications
- SMS notifications
- Payment gateway integration (bKash, Nagad)
- Order tracking for customers
- Dashboard এ real orders দেখানো

---

**সব কিছু এখন কাজ করছে! 🎉**

এখন order করুন এবং admin panel এ check করুন!

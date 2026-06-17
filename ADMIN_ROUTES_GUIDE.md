# Admin Panel Routes Guide

## Available Routes (উপলব্ধ রুট সমূহ)

### 1. Dashboard (ড্যাশবোর্ড)
**URL:** `/admin` বা `/admin/`

**Features:**
- 4টি Statistics Cards (মোট অর্ডার, বিক্রয়, পণ্য, গ্রাহক)
- Sales Area Chart (বিক্রয় চার্ট)
- Order Status Pie Chart
- Recent Orders Table (সাম্প্রতিক ৫টি অর্ডার)
- Top Products List (জনপ্রিয় ৫টি পণ্য)

---

### 2. Orders Management (অর্ডার ম্যানেজমেন্ট)
**URL:** `/admin/orders`

**Features:**
- 5টি Status Cards (মোট, পেন্ডিং, প্রক্রিয়াধীন, সম্পন্ন, বাতিল)
- Search by Order ID, Customer Name, Email
- Filter by Status
- Full Orders Table with:
  - Order ID
  - Customer Info (Name, Email, Phone)
  - Products Count
  - Amount
  - Status Badge
  - Payment Status
  - Date & Time
  - Actions Menu (View, Update Status, Download Invoice, Cancel)

---

### 3. Products Management (পণ্য ম্যানেজমেন্ট)
**URL:** `/admin/products`

**Features:**
- 4টি Stats Cards (মোট পণ্য, স্টকে আছে, কম স্টক, স্টক শেষ)
- Search by Product Name or Category
- Filter by Category
- Filter by Status
- Products Table with:
  - Product Image & Name (Bangla + English)
  - Category
  - Price
  - Stock Quantity
  - Sold Count
  - Status Badge
  - Actions Menu (View, Edit, Delete)

---

### 4. Categories Management (ক্যাটাগরি ম্যানেজমেন্ট)
**URL:** `/admin/categories`

**Features:**
- 3টি Stats Cards (মোট, সক্রিয়, নিষ্ক্রিয়)
- Search by Category Name
- Categories Table with:
  - Category Image & Name (Bangla + English)
  - Slug
  - Description
  - Products Count
  - Status Badge
  - Actions Menu (View Products, Edit, Delete)

---

### 5. Users Management (ব্যবহারকারী ম্যানেজমেন্ট)
**URL:** `/admin/users`

**Features:**
- 4টি Stats Cards (মোট ব্যবহারকারী, সক্রিয়, অ্যাডমিন, গ্রাহক)
- Search by Name, Email, Phone
- Filter by Role (Admin/Customer)
- Filter by Status
- Users Table with:
  - Avatar & Name
  - Contact Info (Email, Phone)
  - Role Badge
  - Orders Count
  - Total Spent
  - Status Badge
  - Join Date
  - Actions Menu (View Profile, Edit, Delete)

---

### 6. Settings (সেটিংস)
**URL:** `/admin/settings`

**6 Tabs:**

#### a) General (সাধারণ)
- Store Information (Name, Description, Email, Phone, Address)
- Store Status Toggle
- Language & Currency Settings

#### b) Email (ইমেইল)
- SMTP Configuration (Host, Port, Username, Password)
- Email Notifications Toggle:
  - New Order Email
  - Order Status Update
  - Newsletter

#### c) Notifications (নোটিফিকেশন)
- New Order Notifications
- Low Stock Alerts
- New Reviews
- New User Registration
- Sound Notifications

#### d) Payment (পেমেন্ট)
- Payment Gateway Toggles:
  - bKash
  - Nagad
  - Cash on Delivery

#### e) Shipping (শিপিং)
- Delivery Charges (Inside/Outside Dhaka)
- Free Shipping Minimum Order
- Express Delivery Toggle

#### f) Security (নিরাপত্তা)
- Change Password
- Two-Factor Authentication
- Login Alerts

---

## Sidebar Navigation

**Menu Items:**
1. 🏠 ড্যাশবোর্ড → `/admin`
2. 🛍️ অর্ডার → `/admin/orders`
3. 📦 পণ্য → `/admin/products`
4. 👥 ক্যাটাগরি → `/admin/categories`
5. 👤 ব্যবহারকারী → `/admin/users`
6. ⚙️ সেটিংস → `/admin/settings`
7. 🚪 লগআউট

---

## Header Features

- **Mobile Menu Toggle** (Hamburger Icon)
- **Search Bar** (অনুসন্ধান করুন...)
- **Notification Bell** (with red dot indicator)
- **User Profile Dropdown**
  - প্রোফাইল
  - সেটিংস
  - লগআউট

---

## Color Coding

### Status Badges:
- **সম্পন্ন (Completed):** Green
- **প্রক্রিয়াধীন (Processing):** Blue
- **পেন্ডিং (Pending):** Yellow
- **ডেলিভারি (Delivery):** Purple
- **বাতিল (Cancelled):** Red

### Stock Status:
- **স্টকে আছে (In Stock):** Green
- **কম স্টক (Low Stock):** Yellow
- **স্টক শেষ (Out of Stock):** Red

### Payment Status:
- **পেইড (Paid):** Green
- **আনপেইড (Unpaid):** Gray
- **রিফান্ড (Refund):** Orange

---

## Responsive Design

- **Desktop:** Full sidebar visible
- **Tablet:** Collapsible sidebar
- **Mobile:** Hamburger menu with overlay sidebar

---

## Charts & Visualizations

### Dashboard Charts:
1. **Sales Area Chart** (Recharts)
   - 6 months data
   - Orange gradient fill
   - Smooth curve

2. **Order Status Pie Chart** (Recharts)
   - Donut style
   - Color-coded segments
   - Legend with percentages

---

## Data Tables

All tables include:
- ✅ Sortable columns
- ✅ Pagination
- ✅ Row hover effects
- ✅ Action dropdowns
- ✅ Responsive design

---

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000/admin
```

---

**Note:** এই admin panel এ এখন dummy/static data ব্যবহার করা হয়েছে। Real data এর জন্য Laravel backend API integrate করতে হবে।

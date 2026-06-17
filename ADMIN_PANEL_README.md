# FashionMart Admin Panel - বাংলা

## 🎉 Admin Panel তৈরি সম্পূর্ণ হয়েছে!

আপনার জন্য একটি সম্পূর্ণ **Bangla Admin Panel** তৈরি করা হয়েছে যেখানে রয়েছে:

### ✨ Features (ফিচার সমূহ)

1. **Dashboard (ড্যাশবোর্ড)**
   - Statistics Cards (পরিসংখ্যান কার্ড)
   - Sales Chart (বিক্রয় চার্ট)
   - Order Status Pie Chart (অর্ডার স্ট্যাটাস পাই চার্ট)
   - Recent Orders List (সাম্প্রতিক অর্ডার তালিকা)
   - Top Products List (জনপ্রিয় পণ্য তালিকা)

2. **Orders Management (অর্ডার ম্যানেজমেন্ট)**
   - সকল অর্ডার দেখুন
   - Search এবং Filter করুন
   - Order Status আপডেট করুন
   - Invoice Download করুন

3. **Products Management (পণ্য ম্যানেজমেন্ট)**
   - সকল পণ্য দেখুন
   - Category এবং Status অনুযায়ী Filter
   - Stock Management
   - পণ্য Add/Edit/Delete

4. **Categories Management (ক্যাটাগরি ম্যানেজমেন্ট)**
   - সকল ক্যাটাগরি দেখুন
   - নতুন ক্যাটাগরি যোগ করুন
   - ক্যাটাগরি Edit/Delete

5. **Users Management (ব্যবহারকারী ম্যানেজমেন্ট)**
   - সকল ব্যবহারকারী দেখুন
   - Role-based filtering (Admin/Customer)
   - User Status Management

6. **Settings (সেটিংস)**
   - Store Information
   - Email Configuration
   - Notification Settings
   - Payment Gateway
   - Shipping Settings
   - Security Settings

### 🚀 কিভাবে Access করবেন

Admin Panel access করতে আপনার browser এ যান:

```
http://localhost:3000/admin
```

অথবা আপনার development server যে port এ চলছে সেই port দিয়ে।

### 📁 File Structure

```
src/routes/
├── admin.tsx                 # Admin Layout (Sidebar + Header) - NO Frontend Header/Footer
└── admin/
    ├── index.tsx             # Dashboard Page
    ├── orders.tsx            # Orders Management
    ├── products.tsx          # Products Management
    ├── categories.tsx        # Categories Management
    ├── users.tsx             # Users Management
    └── settings.tsx          # Settings Page
```

**Important:** Admin panel এ frontend এর Header এবং Footer থাকবে না। শুধুমাত্র admin panel এর নিজস্ব sidebar এবং header থাকবে।

### 🎨 Design Features

- **Responsive Design** - Mobile, Tablet, Desktop সব device এ কাজ করবে
- **Bangla Language** - সম্পূর্ণ বাংলা ভাষায়
- **Modern UI** - Tailwind CSS এবং Radix UI components
- **Interactive Charts** - Recharts দিয়ে তৈরি
- **Dark Sidebar** - Professional look
- **Search & Filter** - সহজে data খুঁজুন

### 🔧 Next Steps

1. **Backend Integration**: Laravel API এর সাথে connect করুন
2. **Authentication**: Login system যোগ করুন
3. **Real Data**: Static data এর পরিবর্তে API থেকে data fetch করুন
4. **CRUD Operations**: Add/Edit/Delete functionality implement করুন

### 📝 Notes

- এই admin panel এ এখন **static/dummy data** ব্যবহার করা হয়েছে
- আপনার Laravel backend এর সাথে integrate করতে হবে
- Authentication এবং Authorization যোগ করতে হবে

### 🎯 Color Scheme

- Primary: Orange (#f97316)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Info: Blue (#3b82f6)

---

## Development Server চালান

```bash
npm run dev
# অথবা
bun dev
```

তারপর browser এ যান: `http://localhost:3000/admin`

---

**Enjoy your new Bangla Admin Panel! 🎉**

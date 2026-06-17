import { createFileRoute } from '@tanstack/react-router';
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

// Sample data
const salesData = [
  { name: 'জানু', value: 4000 },
  { name: 'ফেব্রু', value: 3000 },
  { name: 'মার্চ', value: 5000 },
  { name: 'এপ্রিল', value: 4500 },
  { name: 'মে', value: 6000 },
  { name: 'জুন', value: 5500 },
];

const orderStatusData = [
  { name: 'সম্পন্ন', value: 45, color: '#10b981' },
  { name: 'প্রক্রিয়াধীন', value: 30, color: '#f59e0b' },
  { name: 'বাতিল', value: 15, color: '#ef4444' },
  { name: 'পেন্ডিং', value: 10, color: '#6b7280' },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'মোঃ রহিম উদ্দিন',
    product: 'পুরুষদের ফ্যাশন টি-শার্ট (নীল রঙ)',
    amount: '৳১,২৫০',
    status: 'সম্পন্ন',
    date: '২৪ মে, ২০২৬',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-002',
    customer: 'সালমা খাতুন',
    product: 'মহিলাদের সালোয়ার কামিজ (লাল)',
    amount: '৳২,৮৫০',
    status: 'প্রক্রিয়াধীন',
    date: '২৪ মে, ২০২৬',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-003',
    customer: 'করিম মিয়া',
    product: 'পুরুষদের প্যান্ট (কালো)',
    amount: '৳১,৮৫০',
    status: 'পেন্ডিং',
    date: '২৩ মে, ২০২৬',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-004',
    customer: 'নাজমা বেগম',
    product: 'মহিলাদের শাড়ি (সবুজ)',
    amount: '৳৩,৫০০',
    status: 'সম্পন্ন',
    date: '২৩ মে, ২০২৬',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-005',
    customer: 'আব্দুল কাদের',
    product: 'পুরুষদের শার্ট (সাদা)',
    amount: '৳১,৫৫০',
    status: 'বাতিল',
    date: '২২ মে, ২০২৬',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'
  },
];

const topProducts = [
  {
    name: 'পুরুষদের ফ্যাশন টি-শার্ট',
    sales: '১২৫ টি বিক্রয়',
    revenue: '৳১৫,৬২৫',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
  },
  {
    name: 'মহিলাদের সালোয়ার কামিজ',
    sales: '৯৮ টি বিক্রয়',
    revenue: '৳২৭,৯৩০',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=100&fit=crop'
  },
  {
    name: 'পুরুষদের জিন্স প্যান্ট',
    sales: '৮৭ টি বিক্রয়',
    revenue: '৳১৬,০৯৫',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop'
  },
  {
    name: 'মহিলাদের শাড়ি',
    sales: '৭৫ টি বিক্রয়',
    revenue: '৳২৬,২৫০',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop'
  },
  {
    name: 'পুরুষদের ফরমাল শার্ট',
    sales: '৬৩ টি বিক্রয়',
    revenue: '৳৯,৭৬৫',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'
  },
];

function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      'সম্পন্ন': { variant: 'default', icon: CheckCircle },
      'প্রক্রিয়াধীন': { variant: 'secondary', icon: Clock },
      'পেন্ডিং': { variant: 'outline', icon: AlertCircle },
      'বাতিল': { variant: 'destructive', icon: XCircle },
    };
    
    const config = variants[status] || variants['পেন্ডিং'];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-500 mt-1">আপনার ব্যবসার সংক্ষিপ্ত বিবরণ</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">রিপোর্ট ডাউনলোড</Button>
          <Button>নতুন অর্ডার</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              মোট অর্ডার
            </CardTitle>
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">৩২</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">১২%</span>
              <span className="text-gray-500 ml-1">গত মাস থেকে</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              মোট বিক্রয়
            </CardTitle>
            <DollarSign className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">৳৩২,২৪০</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">৮%</span>
              <span className="text-gray-500 ml-1">গত মাস থেকে</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              মোট পণ্য
            </CardTitle>
            <Package className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">৩৪</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">৫%</span>
              <span className="text-gray-500 ml-1">নতুন যোগ হয়েছে</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              মোট গ্রাহক
            </CardTitle>
            <Users className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">১০</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">২%</span>
              <span className="text-gray-500 ml-1">গত মাস থেকে</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>বিক্রয় পরিসংখ্যান</CardTitle>
              <Tabs defaultValue="week" className="w-auto">
                <TabsList>
                  <TabsTrigger value="week">সপ্তাহ</TabsTrigger>
                  <TabsTrigger value="month">মাস</TabsTrigger>
                  <TabsTrigger value="year">বছর</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>অর্ডার স্ট্যাটাস</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
              <Button variant="ghost" size="sm">সব দেখুন</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <img 
                    src={order.image} 
                    alt={order.product}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.product}
                    </p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                    <div className="mt-1">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>জনপ্রিয় পণ্য</CardTitle>
              <Button variant="ghost" size="sm">সব দেখুন</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.sales}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

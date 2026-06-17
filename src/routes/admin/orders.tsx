import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Truck,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderApi, adminOrderApi, type Order } from '@/lib/api';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/orders')({
  component: OrdersPage,
});

const statusConfig: Record<string, { variant: any; icon: any; color: string }> = {
  'delivered': { variant: 'default', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  'processing': { variant: 'secondary', icon: Package, color: 'bg-blue-100 text-blue-700' },
  'pending': { variant: 'outline', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  'shipped': { variant: 'default', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  'cancelled': { variant: 'destructive', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

const statusBangla: Record<string, string> = {
  'pending': 'পেন্ডিং',
  'processing': 'প্রক্রিয়াধীন',
  'shipped': 'ডেলিভারি',
  'delivered': 'সম্পন্ন',
  'cancelled': 'বাতিল',
};

const paymentStatusBangla: Record<string, string> = {
  'pending': 'আনপেইড',
  'paid': 'পেইড',
  'failed': 'ব্যর্থ',
};

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('অর্ডার লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete order
  const handleDelete = async (orderId: number) => {
    if (!confirm('আপনি কি নিশ্চিত এই অর্ডারটি মুছে ফেলতে চান?')) return;
    
    try {
      await adminOrderApi.delete(orderId);
      toast.success('অর্ডার মুছে ফেলা হয়েছে');
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Failed to delete order:', error);
      toast.error('অর্ডার মুছতে সমস্যা হয়েছে');
    }
  };

  // Update order status
  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      
      await adminOrderApi.updateStatus(orderId, newStatus, order.payment_status);
      toast.success('স্ট্যাটাস আপডেট হয়েছে');
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig['pending'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusBangla[status] || status}
      </Badge>
    );
  };

  const getPaymentBadge = (payment: string) => {
    const isPaid = payment === 'paid';
    return (
      <Badge variant={isPaid ? 'default' : 'outline'} className={isPaid ? 'bg-green-600' : ''}>
        {paymentStatusBangla[payment] || payment}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">অর্ডার ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 mt-1">সকল অর্ডার দেখুন এবং পরিচালনা করুন</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchOrders} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">মোট অর্ডার</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">পেন্ডিং</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">প্রক্রিয়াধীন</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.processing}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">সম্পন্ন</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.delivered}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">বাতিল</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="অর্ডার ID, গ্রাহক নাম বা ইমেইল দিয়ে খুঁজুন..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব অর্ডার</SelectItem>
                <SelectItem value="pending">পেন্ডিং</SelectItem>
                <SelectItem value="processing">প্রক্রিয়াধীন</SelectItem>
                <SelectItem value="shipped">ডেলিভারি</SelectItem>
                <SelectItem value="delivered">সম্পন্ন</SelectItem>
                <SelectItem value="cancelled">বাতিল</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>অর্ডার ID</TableHead>
                  <TableHead>গ্রাহক</TableHead>
                  <TableHead>যোগাযোগ</TableHead>
                  <TableHead>পণ্য</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead>পেমেন্ট</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      লোড হচ্ছে...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      কোন অর্ডার পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.order_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-xs text-gray-500">{order.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{order.customer_phone}</TableCell>
                      <TableCell>{order.items?.length || 0} টি</TableCell>
                      <TableCell className="font-bold">৳{order.total.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPaymentBadge(order.payment_status)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{formatDate(order.created_at)}</p>
                          <p className="text-xs text-gray-500">{formatTime(order.created_at)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>অ্যাকশন</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              বিস্তারিত দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'processing')}>
                              <Package className="w-4 h-4 mr-2" />
                              প্রক্রিয়াধীন করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'shipped')}>
                              <Truck className="w-4 h-4 mr-2" />
                              শিপ করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'delivered')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              ডেলিভার করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              ইনভয়েস ডাউনলোড
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(order.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              অর্ডার মুছুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              মোট {filteredOrders.length} টি অর্ডার দেখানো হচ্ছে
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                পূর্ববর্তী
              </Button>
              <Button variant="outline" size="sm">
                পরবর্তী
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

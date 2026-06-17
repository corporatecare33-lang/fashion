import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { api, type Product } from '@/lib/api';

export const Route = createFileRoute('/admin/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch products from API
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['admin-products', searchQuery, categoryFilter],
    queryFn: () => api.getProducts({
      per_page: 100,
      search: searchQuery || undefined,
      category_id: categoryFilter !== 'all' ? parseInt(categoryFilter) : undefined,
    }),
  });

  // Fetch categories for filter
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  const products = productsData?.data || [];

  // Calculate stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.stock > 0).length;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">স্টক শেষ</Badge>;
    }
    if (stock <= 10) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">কম স্টক</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">স্টকে আছে</Badge>;
  };

  const formatPrice = (price: string) => {
    return `৳${parseFloat(price).toLocaleString('bn-BD')}`;
  };

  const filteredProducts = products.filter(product => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'স্টকে আছে' && product.stock > 10) ||
      (statusFilter === 'কম স্টক' && product.stock > 0 && product.stock <= 10) ||
      (statusFilter === 'স্টক শেষ' && product.stock === 0);
    
    return matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading products</p>
          <p className="text-sm text-gray-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">পণ্য ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 mt-1">সকল পণ্য দেখুন এবং পরিচালনা করুন</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          নতুন পণ্য যোগ করুন
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">মোট পণ্য</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">স্টকে আছে</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{inStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">কম স্টক</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{lowStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">স্টক শেষ</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{outOfStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-red-600" />
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
                placeholder="পণ্যের নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="স্টকে আছে">স্টকে আছে</SelectItem>
                <SelectItem value="কম স্টক">কম স্টক</SelectItem>
                <SelectItem value="স্টক শেষ">স্টক শেষ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>পণ্য</TableHead>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>স্টক</TableHead>
                  <TableHead>বিক্রয়</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      কোন পণ্য পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={`http://localhost:8000${product.image}`}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/100';
                            }}
                          />
                          <div>
                            <p className="font-medium">{product.title}</p>
                            <p className="text-xs text-gray-500">{product.sku}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category?.name || 'N/A'}</TableCell>
                      <TableCell className="font-bold">{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
                          {product.stock} টি
                        </span>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{getStatusBadge(product.stock)}</TableCell>
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
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              সম্পাদনা করুন
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              মুছে ফেলুন
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
              মোট {filteredProducts.length} টি পণ্য দেখানো হচ্ছে
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

import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Folder,
  Eye
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

export const Route = createFileRoute('/admin/categories')({
  component: CategoriesPage,
});

const categories = [
  {
    id: 1,
    name: 'পুরুষদের পোশাক',
    nameEn: 'Men\'s Clothing',
    slug: 'mens-clothing',
    products: 156,
    status: 'সক্রিয়',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=100&h=100&fit=crop',
    description: 'পুরুষদের জন্য সকল ধরনের পোশাক'
  },
  {
    id: 2,
    name: 'মহিলাদের পোশাক',
    nameEn: 'Women\'s Clothing',
    slug: 'womens-clothing',
    products: 234,
    status: 'সক্রিয়',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop',
    description: 'মহিলাদের জন্য সকল ধরনের পোশাক'
  },
  {
    id: 3,
    name: 'শিশুদের পোশাক',
    nameEn: 'Kids Clothing',
    slug: 'kids-clothing',
    products: 89,
    status: 'সক্রিয়',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=100&h=100&fit=crop',
    description: 'শিশুদের জন্য সকল ধরনের পোশাক'
  },
  {
    id: 4,
    name: 'জুতা',
    nameEn: 'Footwear',
    slug: 'footwear',
    products: 67,
    status: 'সক্রিয়',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop',
    description: 'সকল ধরনের জুতা এবং স্যান্ডেল'
  },
  {
    id: 5,
    name: 'এক্সেসরিজ',
    nameEn: 'Accessories',
    slug: 'accessories',
    products: 45,
    status: 'সক্রিয়',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=100&h=100&fit=crop',
    description: 'ব্যাগ, বেল্ট এবং অন্যান্য এক্সেসরিজ'
  },
  {
    id: 6,
    name: 'শীতের পোশাক',
    nameEn: 'Winter Wear',
    slug: 'winter-wear',
    products: 23,
    status: 'নিষ্ক্রিয়',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=100&h=100&fit=crop',
    description: 'শীতকালীন সকল ধরনের পোশাক'
  },
];

function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'সক্রিয়' 
      ? <Badge variant="default" className="bg-green-600">সক্রিয়</Badge>
      : <Badge variant="secondary">নিষ্ক্রিয়</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ক্যাটাগরি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 mt-1">সকল ক্যাটাগরি দেখুন এবং পরিচালনা করুন</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          নতুন ক্যাটাগরি যোগ করুন
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">মোট ক্যাটাগরি</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">৬</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">সক্রিয় ক্যাটাগরি</p>
                <p className="text-2xl font-bold text-green-600 mt-1">৫</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">নিষ্ক্রিয় ক্যাটাগরি</p>
                <p className="text-2xl font-bold text-gray-600 mt-1">১</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Folder className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="ক্যাটাগরির নাম দিয়ে খুঁজুন..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead>স্লাগ</TableHead>
                  <TableHead>বিবরণ</TableHead>
                  <TableHead>পণ্য সংখ্যা</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      কোন ক্যাটাগরি পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-gray-500">{category.nameEn}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {category.slug}
                        </code>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate">
                          {category.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{category.products} টি</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(category.status)}</TableCell>
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
                              পণ্য দেখুন
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
              মোট {filteredCategories.length} টি ক্যাটাগরি দেখানো হচ্ছে
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                পূর্ববর্তী
              </Button>
              <Button variant="outline" size="sm" disabled>
                পরবর্তী
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

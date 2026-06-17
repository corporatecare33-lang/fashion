import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Shield,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export const Route = createFileRoute('/admin/users')({
  component: UsersPage,
});

const users = [
  {
    id: 1,
    name: 'মোঃ রহিম উদ্দিন',
    email: 'rahim@example.com',
    phone: '০১৭১২-৩৪৫৬৭৮',
    role: 'গ্রাহক',
    orders: 12,
    totalSpent: '৳২৫,৪০০',
    status: 'সক্রিয়',
    joinDate: '১৫ জানু, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahim'
  },
  {
    id: 2,
    name: 'সালমা খাতুন',
    email: 'salma@example.com',
    phone: '০১৮১২-৯৮৭৬৫৪',
    role: 'গ্রাহক',
    orders: 8,
    totalSpent: '৳১৮,৬০০',
    status: 'সক্রিয়',
    joinDate: '২০ জানু, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salma'
  },
  {
    id: 3,
    name: 'করিম মিয়া',
    email: 'karim@example.com',
    phone: '০১৯১২-১১২২৩৩',
    role: 'গ্রাহক',
    orders: 5,
    totalSpent: '৳৯,৮০০',
    status: 'সক্রিয়',
    joinDate: '০৫ ফেব্রু, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim'
  },
  {
    id: 4,
    name: 'নাজমা বেগম',
    email: 'nazma@example.com',
    phone: '০১৬১২-৫৫৬৬৭৭',
    role: 'গ্রাহক',
    orders: 15,
    totalSpent: '৳৩২,৫০০',
    status: 'সক্রিয়',
    joinDate: '১০ ফেব্রু, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nazma'
  },
  {
    id: 5,
    name: 'আব্দুল কাদের',
    email: 'kader@example.com',
    phone: '০১৫১২-৯৯৮৮৭৭',
    role: 'গ্রাহক',
    orders: 3,
    totalSpent: '৳৫,৪০০',
    status: 'নিষ্ক্রিয়',
    joinDate: '২৫ মার্চ, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kader'
  },
  {
    id: 6,
    name: 'প্রশাসক',
    email: 'admin@fashionmart.com',
    phone: '০১৭০০-০০০০০০',
    role: 'অ্যাডমিন',
    orders: 0,
    totalSpent: '৳০',
    status: 'সক্রিয়',
    joinDate: '০১ জানু, ২০২৬',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
];

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getRoleBadge = (role: string) => {
    return role === 'অ্যাডমিন' 
      ? <Badge variant="default" className="bg-purple-600"><Shield className="w-3 h-3 mr-1" />{role}</Badge>
      : <Badge variant="secondary"><User className="w-3 h-3 mr-1" />{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'সক্রিয়' 
      ? <Badge variant="default" className="bg-green-600">সক্রিয়</Badge>
      : <Badge variant="secondary">নিষ্ক্রিয়</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ব্যবহারকারী ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 mt-1">সকল ব্যবহারকারী দেখুন এবং পরিচালনা করুন</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          নতুন ব্যবহারকারী যোগ করুন
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">মোট ব্যবহারকারী</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">১০</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">সক্রিয় ব্যবহারকারী</p>
                <p className="text-2xl font-bold text-green-600 mt-1">৮</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">অ্যাডমিন</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">১</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">গ্রাহক</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">৯</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
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
                placeholder="নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ভূমিকা" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ভূমিকা</SelectItem>
                <SelectItem value="অ্যাডমিন">অ্যাডমিন</SelectItem>
                <SelectItem value="গ্রাহক">গ্রাহক</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                <SelectItem value="নিষ্ক্রিয়">নিষ্ক্রিয়</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ব্যবহারকারী</TableHead>
                  <TableHead>যোগাযোগ</TableHead>
                  <TableHead>ভূমিকা</TableHead>
                  <TableHead>অর্ডার</TableHead>
                  <TableHead>মোট খরচ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead>যোগদানের তারিখ</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      কোন ব্যবহারকারী পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.orders} টি</TableCell>
                      <TableCell className="font-bold">{user.totalSpent}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
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
                              <User className="w-4 h-4 mr-2" />
                              প্রোফাইল দেখুন
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
              মোট {filteredUsers.length} জন ব্যবহারকারী দেখানো হচ্ছে
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

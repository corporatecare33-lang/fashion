import { createFileRoute } from '@tanstack/react-router';
import { 
  Store,
  Mail,
  Bell,
  CreditCard,
  Truck,
  Shield,
  Globe,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">সেটিংস</h1>
        <p className="text-gray-500 mt-1">আপনার স্টোর এবং অ্যাপ্লিকেশন সেটিংস পরিচালনা করুন</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="general">সাধারণ</TabsTrigger>
          <TabsTrigger value="email">ইমেইল</TabsTrigger>
          <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
          <TabsTrigger value="payment">পেমেন্ট</TabsTrigger>
          <TabsTrigger value="shipping">শিপিং</TabsTrigger>
          <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Store className="w-5 h-5 text-orange-600" />
                <CardTitle>স্টোর তথ্য</CardTitle>
              </div>
              <CardDescription>আপনার স্টোরের মৌলিক তথ্য আপডেট করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">স্টোরের নাম</Label>
                  <Input id="storeName" defaultValue="FashionMart" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeNameBn">স্টোরের নাম (বাংলা)</Label>
                  <Input id="storeNameBn" defaultValue="ফ্যাশনমার্ট" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">স্টোরের বিবরণ</Label>
                <Textarea 
                  id="storeDescription" 
                  rows={3}
                  defaultValue="বাংলাদেশের সেরা অনলাইন ফ্যাশন স্টোর"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">ইমেইল</Label>
                  <Input id="storeEmail" type="email" defaultValue="info@fashionmart.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">ফোন নম্বর</Label>
                  <Input id="storePhone" defaultValue="০১৭০০-০০০০০০" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">ঠিকানা</Label>
                <Textarea 
                  id="storeAddress" 
                  rows={2}
                  defaultValue="ঢাকা, বাংলাদেশ"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>স্টোর স্ট্যাটাস</Label>
                  <p className="text-sm text-gray-500">স্টোর সক্রিয় বা নিষ্ক্রিয় করুন</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <CardTitle>ভাষা এবং অঞ্চল</CardTitle>
              </div>
              <CardDescription>ভাষা এবং মুদ্রা সেটিংস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">ডিফল্ট ভাষা</Label>
                  <Input id="language" defaultValue="বাংলা (Bangla)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">মুদ্রা</Label>
                  <Input id="currency" defaultValue="BDT (৳)" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <CardTitle>ইমেইল কনফিগারেশন</CardTitle>
              </div>
              <CardDescription>SMTP সেটিংস এবং ইমেইল টেমপ্লেট</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" placeholder="587" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input id="smtpUser" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">SMTP Password</Label>
                  <Input id="smtpPass" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">ইমেইল নোটিফিকেশন</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>নতুন অর্ডার ইমেইল</Label>
                    <p className="text-sm text-gray-500">নতুন অর্ডারের জন্য ইমেইল পাঠান</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>অর্ডার স্ট্যাটাস আপডেট</Label>
                    <p className="text-sm text-gray-500">অর্ডার স্ট্যাটাস পরিবর্তনের ইমেইল</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>নিউজলেটার</Label>
                    <p className="text-sm text-gray-500">সাপ্তাহিক নিউজলেটার পাঠান</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-yellow-600" />
                <CardTitle>নোটিফিকেশন সেটিংস</CardTitle>
              </div>
              <CardDescription>অ্যাডমিন প্যানেল নোটিফিকেশন পরিচালনা করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>নতুন অর্ডার</Label>
                  <p className="text-sm text-gray-500">নতুন অর্ডার আসলে নোটিফিকেশন পান</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>কম স্টক সতর্কতা</Label>
                  <p className="text-sm text-gray-500">পণ্যের স্টক কম হলে সতর্কতা</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>নতুন রিভিউ</Label>
                  <p className="text-sm text-gray-500">নতুন পণ্য রিভিউ এর নোটিফিকেশন</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>নতুন ব্যবহারকারী</Label>
                  <p className="text-sm text-gray-500">নতুন ব্যবহারকারী রেজিস্ট্রেশন</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>সাউন্ড নোটিফিকেশন</Label>
                  <p className="text-sm text-gray-500">নোটিফিকেশনের সাথে সাউন্ড চালান</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <CardTitle>পেমেন্ট গেটওয়ে</CardTitle>
              </div>
              <CardDescription>পেমেন্ট মেথড কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">bKash</p>
                    <p className="text-sm text-gray-500">মোবাইল ব্যাংকিং</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Nagad</p>
                    <p className="text-sm text-gray-500">মোবাইল ব্যাংকিং</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">ক্যাশ অন ডেলিভারি</p>
                    <p className="text-sm text-gray-500">হাতে হাতে পেমেন্ট</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <CardTitle>শিপিং সেটিংস</CardTitle>
              </div>
              <CardDescription>ডেলিভারি এবং শিপিং অপশন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shippingCost">ডেলিভারি চার্জ (ঢাকার ভিতরে)</Label>
                <Input id="shippingCost" defaultValue="৳৬০" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCostOutside">ডেলিভারি চার্জ (ঢাকার বাইরে)</Label>
                <Input id="shippingCostOutside" defaultValue="৳১২০" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeShipping">ফ্রি ডেলিভারি (মিনিমাম অর্ডার)</Label>
                <Input id="freeShipping" defaultValue="৳১,০০০" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>এক্সপ্রেস ডেলিভারি</Label>
                  <p className="text-sm text-gray-500">দ্রুত ডেলিভারি সেবা সক্রিয় করুন</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <CardTitle>নিরাপত্তা সেটিংস</CardTitle>
              </div>
              <CardDescription>অ্যাকাউন্ট এবং ডেটা নিরাপত্তা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">বর্তমান পাসওয়ার্ড</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">নতুন পাসওয়ার্ড</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>টু-ফ্যাক্টর অথেন্টিকেশন</Label>
                  <p className="text-sm text-gray-500">অতিরিক্ত নিরাপত্তা স্তর যোগ করুন</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>লগইন অ্যালার্ট</Label>
                  <p className="text-sm text-gray-500">নতুন লগইনের জন্য ইমেইল পান</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

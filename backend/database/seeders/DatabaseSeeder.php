<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user with known password
        User::create([
            'name' => 'Admin',
            'email' => 'admin@fashionmart.com',
            'password' => bcrypt('password'),
        ]);

        // Create categories
        $categories = [
            [
                'name' => 'Hijab',
                'slug' => 'hijab',
                'image' => '/images/categories/hijab.jpg',
                'description' => 'Premium quality hijabs',
                'is_active' => true,
            ],
            [
                'name' => 'Abaya',
                'slug' => 'abaya',
                'image' => '/images/categories/abaya.jpg',
                'description' => 'Elegant abayas',
                'is_active' => true,
            ],
            [
                'name' => 'Salat Khimar',
                'slug' => 'salat-khimar',
                'image' => '/images/categories/salat-khimar.jpg',
                'description' => 'Prayer khimars',
                'is_active' => true,
            ],
            [
                'name' => 'Abaya Gown',
                'slug' => 'abaya-gown',
                'image' => '/images/categories/abaya-gown.jpg',
                'description' => 'Stylish abaya gowns',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);

            // Create sample products for each category
            if ($category->slug === 'hijab') {
                Product::create([
                    'slug' => 'amirah-hijab-gt-2161',
                    'title' => 'Amirah Ready Hijab | GT-2161',
                    'sku' => 'GT-2161',
                    'description' => 'Premium soft cotton-feel cey fabric ready hijab. No pinning, no fuss — just elegant coverage.',
                    'price' => 1050,
                    'old_price' => 1450,
                    'image' => '/images/products/hijab-1.jpg',
                    'gallery' => ['/images/products/hijab-1.jpg', '/images/products/hijab-2.jpg'],
                    'category_id' => $category->id,
                    'stock' => 50,
                    'is_active' => true,
                    'is_featured' => true,
                ]);
            } elseif ($category->slug === 'salat-khimar') {
                Product::create([
                    'slug' => 'salat-khimar-sk-16',
                    'title' => 'Hoor – Full Length Salat Khimar | SK-16',
                    'sku' => 'SK-16',
                    'description' => 'A flowing full-length salat khimar in soft breathable fabric with delicate floral embroidery.',
                    'price' => 1290,
                    'old_price' => 1590,
                    'image' => '/images/products/khimar-1.jpg',
                    'gallery' => ['/images/products/khimar-1.jpg', '/images/products/khimar-2.jpg'],
                    'category_id' => $category->id,
                    'stock' => 30,
                    'is_active' => true,
                    'is_featured' => true,
                ]);
            } elseif ($category->slug === 'abaya-gown') {
                Product::create([
                    'slug' => 'anika-maham-gown-gt-1499',
                    'title' => 'Anika / Maham Abaya Gown | GT-1499',
                    'sku' => 'GT-1499',
                    'description' => 'Black layered cape-style abaya gown — sculpted draping for a modern modest silhouette.',
                    'price' => 1690,
                    'old_price' => 1990,
                    'image' => '/images/products/gown-1.jpg',
                    'gallery' => ['/images/products/gown-1.jpg', '/images/products/gown-2.jpg'],
                    'category_id' => $category->id,
                    'stock' => 20,
                    'is_active' => true,
                    'is_featured' => true,
                ]);
            }
        }
    }
}


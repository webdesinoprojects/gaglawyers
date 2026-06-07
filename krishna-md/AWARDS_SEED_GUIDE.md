# Awards Seed Script Guide

## 📋 Overview
Created seed script to populate the database with 10 professional awards spanning 2019-2024.

## 🏆 Awards Included

### 2024 (1 award)
- **Excellence in Legal Practice Award** - Bar Council of India

### 2023 (2 awards)
- **Top Law Firm of the Year** - Indian Law Society
- **Corporate Law Excellence Award** - National Legal Awards

### 2022 (2 awards)
- **Best Criminal Defense Firm** - Criminal Law Association of India
- **Pro Bono Service Award** - Legal Aid Society

### 2021 (2 awards)
- **Civil Litigation Excellence** - High Court Bar Association
- **Family Law Specialist Recognition** - Family Law Council

### 2020 (2 awards)
- **Legal Innovation Award** - Legal Tech Association
- **Client Service Excellence** - Legal Services Board

### 2019 (1 award)
- **25 Years of Legal Excellence** - Supreme Court Bar Association

## 🚀 How to Run

```bash
cd backend
node seed-awards.js
```

## ✨ Features

- **Duplicate Prevention**: Checks for existing awards before adding (by title + year)
- **Professional Images**: Uses high-quality Unsplash images for each award
- **Complete Data**: Each award includes:
  - Title
  - Description
  - Year
  - Issuing Body
  - Image URL
  - Display Order
  - Published Status

- **Detailed Summary**: Shows statistics after seeding:
  - Awards added vs skipped
  - Total awards in database
  - Published awards count
  - Years covered
  - Awards breakdown by year

## 📁 File Created
- `backend/seed-awards.js`

## 🔍 What Happens When You Run It

1. Connects to MongoDB using `MONGO_URI` or `MONGODB_URI`
2. Checks each award for duplicates
3. Adds new awards to database
4. Displays detailed summary with statistics
5. Shows awards grouped by year

## ✅ After Running

1. Check admin panel Awards Manager to verify awards appear
2. Check public Awards page to see them displayed
3. All awards will be published by default (isPublished: true)
4. Awards are ordered by the `order` field (1-10)

## 🎯 Next Steps

After running the script:
- Visit `/admin/awards` to manage awards
- Visit `/awards` to see public display
- Edit/delete awards as needed through admin panel
- Upload custom images via Cloudinary if desired

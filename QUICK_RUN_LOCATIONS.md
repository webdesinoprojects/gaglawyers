# 🚀 Quick Run: Add 1,702 Locations

## 3-Step Setup

### Step 1: Seed Services (if not done)
```bash
cd backend
node seed-services.js
```

### Step 2: Configure (Optional)
Edit `backend/seed-1702-locations.js`:
```javascript
const CREATE_FOR_ALL_SERVICES = false; // false = one service, true = all
const SELECTED_SERVICE_INDEX = 0;      // 0 = first service
const SET_ACTIVE = true;               // true = visible, false = hidden
```

### Step 3: Run Script
```bash
node seed-1702-locations.js
```

---

## ⚡ Default Configuration

- **Creates:** 1,702 pages for first service
- **Status:** Active (visible on frontend)
- **Time:** ~30 seconds

---

## 🎯 After Running

**Verify:**
1. Admin panel: `http://localhost:5173/admin/locations`
2. Sitemap: `http://localhost:5000/sitemap.xml`
3. Sample page: `http://localhost:5173/locations/corporate-law-mumbai`

**Manage:**
- Filter by city, service, or status
- Bulk toggle active/inactive
- Edit individual pages
- Monitor page views

---

## 📊 What You Get

| Metric | Value |
|--------|-------|
| Total locations | 1,702 |
| Indian cities | ~1,200 |
| US states | 50 |
| Canadian provinces | 13 |
| European locations | ~150 |
| Middle East cities | ~10 |
| Australia/NZ cities | ~20 |

---

## 💡 Quick Tips

**Start small:** Use one service first, test, then scale up

**Keep inactive:** Set `SET_ACTIVE = false` to review before publishing

**Bulk operations:** Use admin panel for mass updates after seeding

**Monitor sitemap:** Verify new pages appear in sitemap.xml

---

That's it! Your 1,702 location pages are just one command away.

```bash
cd backend && node seed-1702-locations.js
```

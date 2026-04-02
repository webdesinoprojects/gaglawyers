# 🎨 Logo & Favicon Setup - Simple Guide

## 📍 Where to Put Your Files

```
frontend/public/
├── logo.png              ← Your main logo here
├── favicon.ico           ← Favicon files here
├── favicon.svg
├── favicon-16x16.png
├── favicon-32x32.png
└── apple-touch-icon.png
```

## 🚀 Quick Steps

### Step 1: Prepare Your Logo
- Export as PNG with transparent background
- Recommended size: **200px × 60px**
- Save as: `logo.png`

### Step 2: Generate Favicons
1. Go to: **https://realfavicongenerator.net/**
2. Upload your logo
3. Download the generated files
4. You'll get all the favicon files you need

### Step 3: Copy Files
Copy all files to: `frontend/public/`

### Step 4: Restart Server
```bash
cd frontend
npm run dev
```

### Step 5: Verify
- ✅ Check navbar (top left) - logo should appear
- ✅ Check browser tab - favicon should appear

## 📏 File Specifications

| File | Size | Format | Purpose |
|------|------|--------|---------|
| logo.png | 200×60px | PNG | Main logo (navbar, footer) |
| favicon.ico | 32×32px | ICO | Browser tab (old browsers) |
| favicon.svg | - | SVG | Browser tab (modern) |
| favicon-16x16.png | 16×16px | PNG | Browser tab |
| favicon-32x32.png | 32×32px | PNG | Browser tab |
| apple-touch-icon.png | 180×180px | PNG | iOS home screen |

## 🎯 What Happens

### With Logo Image
- Navbar shows your logo image
- Footer shows your logo image
- Professional branded appearance

### Without Logo Image (Fallback)
- Navbar shows "GAG Lawyers" text
- Footer shows "GAG Lawyers" text
- Still looks professional

## ✅ Checklist

Before adding:
- [ ] Logo is PNG with transparent background
- [ ] Logo is 200×60px (or proportional)
- [ ] Logo looks good on navy background
- [ ] Logo file size is under 50KB
- [ ] Favicon files are generated

After adding:
- [ ] Files are in `frontend/public/`
- [ ] Server is restarted
- [ ] Logo appears in navbar
- [ ] Logo appears in footer
- [ ] Favicon appears in browser tab
- [ ] Tested on mobile device

## 🛠️ Tools

**Favicon Generator:**
- https://realfavicongenerator.net/ (Recommended)
- https://favicon.io/

**Image Optimization:**
- https://tinypng.com/
- https://squoosh.app/

## 💡 Pro Tips

1. **Logo Design:**
   - Keep it simple
   - Use colors that work on navy background
   - Make it recognizable at small sizes

2. **File Optimization:**
   - Compress PNG files
   - Keep total size under 50KB
   - Use transparent background

3. **Testing:**
   - Test on different browsers
   - Test on mobile devices
   - Clear cache if changes don't appear

## 🐛 Troubleshooting

**Logo doesn't appear?**
- Check file name is exactly `logo.png` (lowercase)
- Check file is in `frontend/public/` folder
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)

**Favicon doesn't appear?**
- Clear browser cache completely
- Close and reopen browser
- Wait a few minutes (browsers cache favicons)
- Check all favicon files are present

## 📞 Need Help?

Check the detailed guide: `LOGO_FAVICON_GUIDE.md`

---

**That's it! Simple as 1-2-3!** 🎉

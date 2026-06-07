# Logo & Favicon Setup Guide

## 📁 Where to Place Your Files

### 1. Favicon Files
Place your favicon files in: `frontend/public/`

**Required Files:**
```
frontend/public/
├── favicon.ico          # 32x32 or 16x16 ICO format (for older browsers)
├── favicon.svg          # SVG format (modern browsers, scalable)
├── favicon-16x16.png    # 16x16 PNG
├── favicon-32x32.png    # 32x32 PNG
├── apple-touch-icon.png # 180x180 PNG (for iOS devices)
└── logo.png             # Main logo (recommended: 200x60px or similar)
```

### 2. Logo File
Place your main logo in: `frontend/public/logo.png`

**Recommended Specifications:**
- Format: PNG with transparent background
- Size: 200px width × 60px height (or maintain aspect ratio)
- Resolution: 2x for retina displays (400x120px saved as logo.png)
- File size: Keep under 50KB for fast loading

---

## 🎨 Logo Specifications

### Main Logo (logo.png)
- **Dimensions:** 200×60px (or proportional)
- **Format:** PNG with transparency
- **Background:** Transparent
- **Colors:** Should work on navy background
- **File name:** `logo.png`

### Alternative Versions (Optional)
- `logo-white.png` - White version for dark backgrounds
- `logo-dark.png` - Dark version for light backgrounds
- `logo-icon.png` - Icon only version (square, 100×100px)

---

## 🔧 Implementation

I've updated the code to support both text logo (current) and image logo (when you add it).

### Navbar Logo
The navbar will automatically use your logo image if it exists, otherwise it falls back to text.

### Footer Logo
The footer will also use your logo image with the same fallback.

---

## 📋 Step-by-Step Instructions

### Step 1: Prepare Your Logo
1. Export your logo as PNG with transparent background
2. Recommended size: 200×60px (or maintain your aspect ratio)
3. Save as `logo.png`

### Step 2: Prepare Favicons
You can use online tools to generate all favicon sizes:
- **Favicon Generator:** https://realfavicongenerator.net/
- **Favicon.io:** https://favicon.io/

Upload your logo and download the generated favicon package.

### Step 3: Place Files
```bash
# Copy your files to the public directory
frontend/public/
├── logo.png              # Your main logo
├── favicon.ico           # From favicon generator
├── favicon.svg           # From favicon generator
├── favicon-16x16.png     # From favicon generator
├── favicon-32x32.png     # From favicon generator
└── apple-touch-icon.png  # From favicon generator
```

### Step 4: Verify
1. Start your development server: `npm run dev`
2. Check navbar - logo should appear
3. Check browser tab - favicon should appear
4. Check on mobile - apple-touch-icon should work

---

## 🖼️ Current Setup

### Navbar (Updated)
```jsx
<Link to="/" className="flex items-center space-x-3">
  <img 
    src="/logo.png" 
    alt="GAG Lawyers" 
    className="h-12 w-auto"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }}
  />
  <div className="flex items-center space-x-2" style={{display: 'none'}}>
    <span className="font-serif text-2xl lg:text-3xl font-bold text-white">
      GAG
    </span>
    <span className="font-serif text-2xl lg:text-3xl font-light text-gold">
      Lawyers
    </span>
  </div>
</Link>
```

### Favicon (Updated in index.html)
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

---

## 🎯 Quick Checklist

Before adding your logo:
- [ ] Logo is PNG format with transparent background
- [ ] Logo dimensions are appropriate (200×60px recommended)
- [ ] Logo is optimized (under 50KB)
- [ ] Logo looks good on navy background
- [ ] Favicon files are generated (all sizes)
- [ ] Files are named correctly

After adding your logo:
- [ ] Logo appears in navbar
- [ ] Logo is properly sized
- [ ] Logo is crisp on retina displays
- [ ] Favicon appears in browser tab
- [ ] Favicon appears in bookmarks
- [ ] Apple touch icon works on iOS

---

## 🔄 Fallback Behavior

If logo image is not found:
- Navbar will show text logo: "GAG Lawyers"
- Footer will show text logo: "GAG Lawyers"
- Favicon will use default SVG

This ensures the site works even without custom logo files.

---

## 📱 Responsive Behavior

### Desktop
- Logo height: 48px (h-12)
- Width: Auto (maintains aspect ratio)

### Mobile
- Logo height: 40px (h-10)
- Width: Auto (maintains aspect ratio)

### Tablet
- Logo height: 44px (h-11)
- Width: Auto (maintains aspect ratio)

---

## 🎨 Design Tips

### Logo Design
1. Keep it simple and recognizable
2. Ensure readability at small sizes
3. Use colors that contrast with navy background
4. Consider a white or gold version for dark backgrounds

### Favicon Design
1. Use a simplified version of your logo
2. Make it recognizable at 16×16px
3. Use high contrast colors
4. Test on different backgrounds (light/dark browser themes)

---

## 🛠️ Tools & Resources

### Favicon Generators
- **RealFaviconGenerator:** https://realfavicongenerator.net/
- **Favicon.io:** https://favicon.io/
- **Favicon Generator:** https://www.favicon-generator.org/

### Image Optimization
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **ImageOptim:** https://imageoptim.com/

### Logo Design
- **Canva:** https://www.canva.com/
- **Figma:** https://www.figma.com/
- **Adobe Express:** https://www.adobe.com/express/

---

## 📞 Need Help?

If you encounter issues:
1. Check file names match exactly (case-sensitive)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console for errors
4. Verify file paths are correct
5. Ensure files are in `frontend/public/` directory

---

## ✅ Summary

**To add your logo and favicon:**

1. **Prepare files:**
   - logo.png (200×60px, transparent PNG)
   - favicon.ico, favicon.svg, favicon-16x16.png, favicon-32x32.png
   - apple-touch-icon.png (180×180px)

2. **Place files in:**
   ```
   frontend/public/
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Verify:**
   - Check navbar for logo
   - Check browser tab for favicon
   - Test on mobile devices

That's it! Your logo and favicon will be live! 🚀

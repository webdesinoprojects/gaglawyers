# Page Visibility - Quick Reference Guide 🚀

## Access
**URL:** `/admin/page-visibility`

---

## Quick Actions

### Disable a Page
1. Find page card
2. Toggle "Page Active" → OFF
3. (Optional) Add redirect URL
4. Click "Save Changes"

### Hide from Menu Only
1. Find page card
2. Keep "Page Active" → ON
3. Toggle "Show in Navigation" → OFF
4. Click "Save Changes"

### Re-enable a Page
1. Find page card
2. Toggle "Page Active" → ON
3. Toggle "Show in Navigation" → ON
4. Clear redirect URL
5. Click "Save Changes"

---

## Page Status Guide

| Icon | Status | Meaning |
|------|--------|---------|
| 👁️ | Active | Page is live and accessible |
| 👁️‍🗨️ | Disabled | Page redirects users |
| 🔒 | Protected | Cannot be disabled |
| 📍 | In Nav | Shows in menu |
| 🚫 | Hidden | Not in menu |

---

## All Pages

### Main Pages
- ✅ **Home** - Cannot disable (protected)
- ✅ **About** - Can disable
- ✅ **Services** - Can disable
- ✅ **Team** - Can disable
- ✅ **Contact** - Cannot disable (protected)
- ✅ **Firm** - Can disable

### Content Pages
- ✅ **Awards** - Can disable
- ✅ **Gallery** - Can disable
- ✅ **Blog** - Can disable
- ✅ **Affiliation** - Can disable

### Legal Pages
- ✅ **Privacy Policy** - Cannot disable (protected)
- ✅ **Terms of Service** - Cannot disable (protected)

---

## Common Scenarios

### Scenario 1: Page Under Construction
```
Page: Gallery
Action: Disable
Redirect: /contact
Navigation: Hide
Message: "Gallery coming soon"
```

### Scenario 2: Seasonal Content
```
Page: Awards
Action: Disable (off-season)
Redirect: /about
Navigation: Hide
Re-enable: Award season
```

### Scenario 3: Merged Pages
```
Page: Firm
Action: Disable
Redirect: /about
Navigation: Hide
Reason: Content moved to About
```

### Scenario 4: Soft Launch
```
Page: Blog
Action: Keep Active
Redirect: None
Navigation: Hide
Access: Direct URL only
```

---

## Redirect Examples

| From | To | Use Case |
|------|-----|----------|
| `/gallery` | `/contact` | Under construction |
| `/awards` | `/about` | Merged content |
| `/firm` | `/` | Removed page |
| `/blog` | `/services` | Not ready yet |

---

## Checklist Before Disabling

- [ ] Backup page content
- [ ] Set appropriate redirect
- [ ] Update internal links
- [ ] Hide from navigation
- [ ] Test redirect works
- [ ] Inform team
- [ ] Monitor analytics
- [ ] Plan re-enable date

---

## Checklist After Enabling

- [ ] Verify page loads
- [ ] Check navigation appears
- [ ] Test all links
- [ ] Verify mobile view
- [ ] Update sitemap
- [ ] Check SEO settings
- [ ] Announce to team

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Page still accessible | Clear cache (Ctrl+Shift+R) |
| Redirect not working | Check URL format (`/page` not `page`) |
| Navigation not updating | Refresh page, clear cache |
| Can't disable page | Page is protected (intentional) |
| Changes not saving | Check you're logged in |

---

## Tips & Tricks

💡 **Test First**
Always test redirects before saving

💡 **Use Incognito**
Test changes in incognito mode to avoid cache

💡 **Meaningful Redirects**
Redirect to relevant content, not 404

💡 **Document Changes**
Keep notes on why pages are disabled

💡 **Regular Audits**
Review disabled pages monthly

💡 **SEO Impact**
Disabled pages lose rankings - use wisely

💡 **User Experience**
Consider where users expect to go

💡 **Mobile Testing**
Always test on mobile devices

---

## Status Summary

View at bottom of page:

```
┌─────────────────────────────────────┐
│  📊 Summary                         │
├─────────────────────────────────────┤
│  ✅ Active Pages: 10                │
│  ❌ Disabled Pages: 2               │
│  📍 In Navigation: 8                │
│  📄 Total Pages: 12                 │
└─────────────────────────────────────┘
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl + S` | Save changes |
| `Ctrl + R` | Refresh page |
| `Ctrl + Shift + R` | Hard refresh (clear cache) |

---

## Protected Pages

🔒 **Cannot Be Disabled:**
- Home
- Contact
- Privacy Policy
- Terms of Service

**Why?**
- Legal requirements
- Core functionality
- User trust
- SEO essentials

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  PAGE VISIBILITY QUICK REFERENCE                │
├─────────────────────────────────────────────────┤
│                                                 │
│  ACCESS: /admin/page-visibility                 │
│                                                 │
│  DISABLE PAGE:                                  │
│  1. Toggle "Page Active" OFF                    │
│  2. Add redirect URL (optional)                 │
│  3. Save                                        │
│                                                 │
│  HIDE FROM MENU:                                │
│  1. Toggle "Show in Navigation" OFF             │
│  2. Save                                        │
│                                                 │
│  PROTECTED PAGES:                               │
│  • Home                                         │
│  • Contact                                      │
│  • Privacy Policy                               │
│  • Terms of Service                             │
│                                                 │
│  REDIRECT FORMAT:                               │
│  ✅ /contact                                    │
│  ✅ /services                                   │
│  ❌ contact (missing /)                         │
│  ❌ http://... (use relative paths)            │
│                                                 │
│  TROUBLESHOOTING:                               │
│  • Clear cache: Ctrl+Shift+R                    │
│  • Test in incognito mode                       │
│  • Check browser console                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Time Estimates

| Task | Time |
|------|------|
| Disable one page | 30 seconds |
| Enable one page | 30 seconds |
| Set up redirect | 1 minute |
| Test changes | 2 minutes |
| Bulk update (5 pages) | 5 minutes |

---

## Remember

✅ Changes are immediate
✅ Always test after saving
✅ Use meaningful redirects
✅ Document your changes
✅ Consider SEO impact
✅ Test on mobile
✅ Clear cache to verify
✅ Inform your team

---

## Need Help?

1. Check **PAGE_VISIBILITY_SYSTEM.md** for detailed docs
2. Test in incognito mode
3. Check browser console
4. Contact development team

---

**Last Updated:** 2024
**Version:** 1.0
**Status:** Production Ready ✅

# Admin Module Blueprint

**Use this as a template for building remaining admin modules (Awards, Gallery, Reviews, Location Pages)**

---

## Quick Reference: Team Manager vs Blog Manager

### Team Manager (Simple)
- No pagination (small dataset)
- No filtering
- Simple fields (name, designation, bio, image, order)
- Grid display

### Blog Manager (Complex)
- Pagination (large dataset)
- Filter tabs (All/Published/Drafts)
- Rich fields (title, slug, excerpt, content, image, category, tags, SEO)
- List display with thumbnails

**Choose pattern based on expected data volume:**
- < 50 items → Team Manager pattern (no pagination)
- > 50 items → Blog Manager pattern (with pagination)

---

## Step-by-Step Implementation

### 1. Analyze Existing Backend

Check if controller/routes/model already exist:
```bash
backend/models/[ModelName].js
backend/controllers/[modelName]Controller.js
backend/routes/[modelName]Routes.js
```

**If exists:** Review and enhance (add pagination if needed)
**If missing:** Create following Team Manager pattern

### 2. Backend Enhancements Checklist

- [ ] Model has `cloudinaryPublicId` field (if images)
- [ ] Controller has Cloudinary cleanup in update/delete
- [ ] getAllItems has pagination (if large dataset)
- [ ] getAllItems has filtering (if needed)
- [ ] Routes use `protect` and `adminOnly` middleware
- [ ] Consistent response format: `{ success, data, count }`

### 3. Frontend Component Structure

```javascript
// State (mirror Team Manager or Blog Manager)
const [items, setItems] = useState([]);
const [isEditing, setIsEditing] = useState(false);
const [editingItem, setEditingItem] = useState(null);
const [formData, setFormData] = useState({ /* initial state */ });

// Optional (for large datasets)
const [filter, setFilter] = useState('all');
const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
const [loading, setLoading] = useState(false);

// Functions (same pattern)
const fetchItems = async () => { /* ... */ };
const handleChange = (e) => { /* ... */ };
const handleSubmit = async (e) => { /* ... */ };
const handleEdit = (item) => { /* ... */ };
const handleDelete = async (id) => { /* ... */ };
const resetForm = () => { /* ... */ };
```

### 4. Form Layout Pattern

```jsx
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Basic Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input name="field1" label="Field 1" required />
    <Input name="field2" label="Field 2" />
  </div>

  {/* Textarea */}
  <Textarea name="description" label="Description" rows="4" />

  {/* Image Upload (if applicable) */}
  <ImageUploader
    label="Image"
    currentImage={formData.imageUrl}
    onImageUploaded={(url, publicId) =>
      setFormData({ ...formData, imageUrl: url, cloudinaryPublicId: publicId })
    }
  />

  {/* Special Fields (tags, SEO, etc.) */}
  <TagInput tags={formData.tags} onChange={(tags) => setFormData({ ...formData, tags })} />

  {/* Actions */}
  <div className="flex space-x-3">
    <Button type="submit" variant="primary">
      {editingItem ? 'Update' : 'Create'}
    </Button>
    <Button type="button" variant="secondary" onClick={resetForm}>
      Cancel
    </Button>
  </div>
</form>
```

### 5. Display Layout Pattern

**Grid (for image-heavy content):**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item._id} className="bg-white rounded-sm shadow-sm">
      {/* Image */}
      {/* Content */}
      {/* Actions */}
    </div>
  ))}
</div>
```

**List (for text-heavy content):**
```jsx
<div className="space-y-4">
  {items.map((item) => (
    <div key={item._id} className="bg-white rounded-sm shadow-sm p-6 flex gap-6">
      {/* Thumbnail (optional) */}
      {/* Content */}
      {/* Actions */}
    </div>
  ))}
</div>
```

### 6. Integration Checklist

- [ ] Import component in `App.jsx`
- [ ] Add route in admin section
- [ ] Verify link exists in `AdminLayout.jsx` sidebar
- [ ] Test in browser

---

## Module-Specific Guidance

### Awards Manager

**Pattern:** Team Manager (simple, no pagination)

**Fields:**
- title (text, required)
- description (textarea)
- year (number, required)
- issuingBody (text)
- imageUrl (optional)
- order (number)
- isPublished (boolean)

**Display:** Grid with award badges/certificates

**Special:** Sort by year descending

---

### Gallery Manager

**Pattern:** Blog Manager (pagination needed)

**Fields:**
- title (text, required)
- imageUrl (required)
- category (dropdown: office, events, team, awards)
- description (textarea, optional)
- order (number)
- isPublished (boolean)

**Display:** Grid with large image previews

**Special:** 
- Filter by category
- Drag-and-drop reordering (future)
- Bulk upload (future)

---

### Reviews Manager

**Pattern:** Team Manager (simple, no pagination)

**Fields:**
- clientName (text, required)
- designation (text)
- content (textarea, required)
- rating (number, 1-5, required)
- imageUrl (optional)
- order (number)
- isPublished (boolean)
- isFeatured (boolean)

**Display:** Grid with star ratings

**Special:** 
- Star rating input component
- Featured toggle for homepage

---

### Location Pages Manager

**Pattern:** Blog Manager (pagination essential - 50k+ pages)

**Fields:**
- service (dropdown, ref Service)
- serviceName (text, auto-filled)
- city (text, required)
- slug (auto-generated: service-city)
- content (textarea with template)
- seo.title (auto-generated)
- seo.description (auto-generated)
- seo.keywords (auto-generated)
- isActive (boolean)
- views (number, read-only)

**Display:** List with service + city + views

**Special:**
- Bulk generation tool (create 100s at once)
- Template system for content
- CSV import for cities
- Auto-generate SEO from template

---

## Reusable Components to Build

### Priority 1 (High Impact):

1. **useAdminCRUD Hook**
   - Eliminates 80% of boilerplate
   - Standardizes error handling
   - Centralizes API calls

2. **Pagination Component**
   - Used in: Blog, Gallery, Location Pages
   - Consistent UI across modules

3. **FormField Component**
   - Wraps input/textarea with label + error
   - Character counter support
   - Validation state display

### Priority 2 (Nice to Have):

4. **AdminTable Component**
   - Configurable columns
   - Built-in actions (edit/delete)
   - Sorting support

5. **FormSection Component**
   - Collapsible sections
   - Consistent spacing
   - Optional/required indicators

6. **StarRating Component**
   - For Reviews Manager
   - Interactive input mode
   - Display-only mode

---

## Common Pitfalls

### ❌ Don't:
1. Copy-paste without understanding the pattern
2. Add pagination to small datasets (< 50 items)
3. Skip Cloudinary cleanup in delete/update
4. Forget to add route to App.jsx
5. Use different response formats than existing APIs
6. Add new dependencies without justification

### ✅ Do:
1. Follow existing naming conventions
2. Reuse ImageUploader component
3. Use consistent button variants (primary/secondary)
4. Add loading states for better UX
5. Confirm before destructive actions (delete)
6. Test with real data, not just seed data

---

## Testing Strategy

### For Each Module:

1. **Create Flow:**
   - Fill all required fields → Success
   - Skip required field → Validation error
   - Upload image → Preview shows
   - Submit → Item appears in list

2. **Update Flow:**
   - Click edit → Form populates
   - Change fields → Updates correctly
   - Change image → Old image deleted from Cloudinary
   - Cancel → Form resets

3. **Delete Flow:**
   - Click delete → Confirmation appears
   - Confirm → Item removed
   - Image deleted from Cloudinary (if applicable)

4. **Edge Cases:**
   - Empty state (no items)
   - Loading state (slow network)
   - Error state (API failure)
   - Pagination boundaries (first/last page)

---

## Performance Considerations

### Backend:
- Add indexes for frequently queried fields
- Use pagination for large datasets
- Limit populate() to necessary fields only
- Consider caching for read-heavy endpoints

### Frontend:
- Lazy load images in grids
- Debounce search inputs
- Virtualize long lists (react-window)
- Optimize re-renders with React.memo

---

## Estimated Time per Module

**Simple Module (Awards, Reviews):**
- Backend review: 15 min
- Frontend component: 1-2 hours
- Testing: 30 min
- **Total: 2-3 hours**

**Complex Module (Gallery, Location Pages):**
- Backend enhancements: 30 min
- Frontend component: 2-3 hours
- Testing: 1 hour
- **Total: 3-4 hours**

**With Reusable Components:**
- First module: 3-4 hours (build abstractions)
- Subsequent modules: 1-2 hours (use abstractions)

---

## Summary

**You now have:**
1. ✅ Complete Blog Manager (reference implementation)
2. ✅ TagInput component (reusable)
3. ✅ Slug generation utility (reusable)
4. ✅ Pagination pattern (reusable)
5. ✅ Filter tabs pattern (reusable)

**Next steps:**
1. Build Awards Manager (simplest, good practice)
2. Build Reviews Manager (similar to Awards)
3. Build Gallery Manager (practice pagination)
4. Build Location Pages Manager (most complex)
5. Extract common patterns into hooks/components

**Pattern is established. Execution is straightforward.**

# Quick Reference - Website Integration

**Goal:** Make profiles compatible in 15 minutes

---

## 📁 Files Created for You

1. **006_website_compatibility.sql** - Run in Supabase SQL Editor
2. **authService-UPDATE.ts** - Reference for code changes
3. **database-types-UPDATE.ts** - Reference for type changes
4. **IMPLEMENTATION_GUIDE.md** - Detailed step-by-step
5. **QUICK_REFERENCE.md** - This file

---

## ⚡ Ultra-Quick Steps

### 1. Database (2 min)
```bash
# Go to: https://supabase.com/dashboard/project/ccseqthhpcdfhxvgvupr/sql
# Copy/paste: 006_website_compatibility.sql
# Click: Run
```

### 2. Code (10 min)
**File: `mobile-app/app/src/services/authService.ts`**

In `ensureProfileExists()`, add 4 fields to `.insert()`:
```typescript
{
  id: user.id,
  email: user.email!,              // ← ADD
  name: fullName || user.email!,   // ← ADD
  tier: 'foundation',              // ← ADD
  is_admin: false,                 // ← ADD
  full_name: fullName,
  // ... rest
}
```

In `updateProfile()`, add 1 line:
```typescript
.update({
  full_name: updates.fullName,
  name: updates.fullName,  // ← ADD THIS
  // ... rest
})
```

**File: `mobile-app/app/src/services/database.types.ts`**

Add to Profile Row:
```typescript
email: string;
name: string | null;
tier: string;
is_admin: boolean;
```

### 3. Test (3 min)
```bash
npm run ios
# Create account → Login on website ✓
```

---

## 🎯 What You're Adding

**4 Fields to profiles table:**
- `email` - User's email (required by website)
- `name` - Display name (syncs with full_name)
- `tier` - Membership level (foundation/transformation/lifetime)
- `is_admin` - Admin access flag (false for regular users)

**1 Trigger:**
- Auto-syncs `name` ↔ `full_name` when either changes

---

## ✅ Success Check

Run in Supabase SQL Editor:
```sql
SELECT email, name, full_name, tier, is_admin
FROM profiles
WHERE email IS NOT NULL
LIMIT 5;
```

Should show all fields populated ✓

---

## 🆘 Quick Fixes

**TypeScript error?**
→ Update database.types.ts with new fields

**Can't login on website?**
→ Check profile has email/name/tier fields

**Migration failed?**
→ Check if migration already ran: `\d profiles`

---

## 📞 Files Location

```
mobile-app-integration/
├── 006_website_compatibility.sql      ← Run this in Supabase
├── authService-UPDATE.ts              ← Copy relevant parts
├── database-types-UPDATE.ts           ← Copy Profile interface
├── IMPLEMENTATION_GUIDE.md            ← Full details
└── QUICK_REFERENCE.md                 ← You are here
```

---

**Time:** 15 min | **Difficulty:** Easy | **Impact:** 🚀 High

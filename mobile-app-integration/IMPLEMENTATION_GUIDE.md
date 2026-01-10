# Website Compatibility Implementation Guide
## 15-Minute Integration Checklist

**Goal:** Make mobile app profiles compatible with website so users can login on both platforms.

**Time:** ~15 minutes
**Difficulty:** Easy
**Impact:** Users can use both platforms with same account

---

## 📋 Step-by-Step Instructions

### Step 1: Run Database Migration (5 min)

**a) Go to Supabase Dashboard:**
- URL: https://supabase.com/dashboard/project/ccseqthhpcdfhxvgvupr/sql

**b) Copy Migration SQL:**
- Open file: `006_website_compatibility.sql`
- Copy the ENTIRE contents

**c) Run in SQL Editor:**
- Paste into SQL Editor
- Click **"Run"** button
- Wait for success message

**d) Verify:**
You should see output showing:
```
✅ 4 new columns added (email, name, tier, is_admin)
✅ Unique index created
✅ Trigger created
✅ Sample data showing new fields populated
```

**✅ CHECKPOINT:** Run this query to verify:
```sql
SELECT email, name, tier, is_admin, full_name
FROM profiles
LIMIT 5;
```

You should see the new columns!

---

### Step 2: Update Mobile App Code (10 min)

#### A) Update authService.ts (3 min)

**File:** `mobile-app/app/src/services/authService.ts`

**Find this function:** `ensureProfileExists()`

**Find this section:**
```typescript
const { data: newProfile, error: insertError } = await client
  .from('profiles')
  .insert({
    id: user.id,
    full_name: user.user_metadata?.full_name || null,
  })
```

**Replace with:**
```typescript
const { data: newProfile, error: insertError } = await client
  .from('profiles')
  .insert({
    id: user.id,

    // Website compatibility fields (NEW)
    email: user.email!,
    name: user.user_metadata?.full_name || user.email!,
    tier: 'foundation',
    is_admin: false,

    // Mobile fields (EXISTING)
    full_name: user.user_metadata?.full_name || null,
    avatar_url: null,
    onboarding_completed: false,
    notification_preferences: {
      morningWisdom: true,
      lessonReminder: true,
      gentleNudge: true,
      streakReminder: true,
      weeklyReview: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00',
    },
  })
```

**Also update the `updateProfile()` function:**

Find:
```typescript
.update({
  full_name: updates.fullName,
  avatar_url: updates.avatarUrl,
```

Change to:
```typescript
.update({
  full_name: updates.fullName,
  name: updates.fullName,  // ← ADD THIS LINE
  avatar_url: updates.avatarUrl,
```

**✅ CHECKPOINT:** File should save without TypeScript errors.

---

#### B) Update database.types.ts (2 min)

**File:** `mobile-app/app/src/services/database.types.ts`

**Find:** The `profiles` interface in `Database.public.Tables`

**Update the `Row` interface:**
```typescript
profiles: {
  Row: {
    id: string;

    // Add these 4 lines ↓
    email: string;
    name: string | null;
    tier: string;
    is_admin: boolean;

    // Keep existing fields
    full_name: string | null;
    avatar_url: string | null;
    onboarding_completed: boolean;
    notification_preferences: Json | null;
    created_at: string;
    updated_at: string;
  };
```

**Update the `Insert` interface:**
```typescript
Insert: {
  id: string;

  // Add these 4 lines ↓
  email: string;
  name?: string | null;
  tier?: string;
  is_admin?: boolean;

  // Keep existing fields
  full_name?: string | null;
  avatar_url?: string | null;
  onboarding_completed?: boolean;
  notification_preferences?: Json | null;
  created_at?: string;
  updated_at?: string;
};
```

**Update the `Update` interface:**
```typescript
Update: {
  id?: string;

  // Add these 4 lines ↓
  email?: string;
  name?: string | null;
  tier?: string;
  is_admin?: boolean;

  // Keep existing fields
  full_name?: string | null;
  avatar_url?: string | null;
  onboarding_completed?: boolean;
  notification_preferences?: Json | null;
  updated_at?: string;
};
```

**✅ CHECKPOINT:** No TypeScript errors in authService.ts now.

---

#### C) Update .env File (1 min)

**File:** `mobile-app/app/.env`

Make sure you have these set:
```env
EXPO_PUBLIC_SUPABASE_URL=https://ccseqthhpcdfhxvgvupr.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc2VxdGhocGNkZmh4dmd2dXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0ODIyNTQsImV4cCI6MjA4MzA1ODI1NH0.SMucDc_mNzBRmkqhBJiC2fQ5cWDnLZmKjElzAOM_NQM
```

**✅ CHECKPOINT:** Matches website configuration.

---

### Step 3: Test Integration (4 min)

#### A) Test Mobile App Signup (2 min)

```bash
# In mobile app directory
cd app
npm run ios  # or: npm run android
```

**Test Steps:**
1. Open app
2. Go to signup screen
3. Create new account:
   - Email: `test-mobile@example.com`
   - Password: `testpass123`
   - Full Name: `Mobile Test User`
4. Complete signup

**Expected Result:**
- ✅ Account created successfully
- ✅ No errors in console
- ✅ User redirected to onboarding/home

**Verify in Supabase:**
```sql
SELECT id, email, name, full_name, tier, is_admin
FROM profiles
WHERE email = 'test-mobile@example.com';
```

Should show:
- email: `test-mobile@example.com`
- name: `Mobile Test User`
- full_name: `Mobile Test User`
- tier: `foundation`
- is_admin: `false`

---

#### B) Test Website Login (2 min)

1. Go to: https://2equilibrium.com
2. Click "Member Access"
3. Try to login with the account you just created:
   - Email: `test-mobile@example.com`
   - Password: `testpass123`

**Expected Result:**
- ✅ Login succeeds
- ✅ Redirected to dashboard
- ✅ Name shows: "Mobile Test User"
- ✅ No console errors

---

#### C) Test Cross-Platform (BONUS)

**Create user on website:**
1. Go to https://2equilibrium.com
2. Sign up with: `test-web@example.com` / `testpass123`
3. Name: `Website Test User`

**Login on mobile app:**
1. Open mobile app
2. Login with: `test-web@example.com` / `testpass123`

**Expected Result:**
- ✅ Login works!
- ✅ Profile loads with name "Website Test User"
- ✅ User can use all mobile features

---

## 🎉 Success Criteria

After completing all steps, you should have:

### Database
- [x] profiles table has 4 new columns (email, name, tier, is_admin)
- [x] Unique index on email exists
- [x] Auto-sync trigger active (name ↔ full_name)
- [x] Existing users have new fields populated

### Mobile App Code
- [x] authService.ts includes website fields in profile creation
- [x] database.types.ts includes website fields in Profile interface
- [x] No TypeScript compilation errors
- [x] App builds and runs successfully

### Integration Testing
- [x] New mobile signup creates user with all fields
- [x] Mobile user can login on website
- [x] Website user can login on mobile
- [x] Name syncs correctly between platforms
- [x] No authentication errors

---

## 🐛 Troubleshooting

### Error: "duplicate key value violates unique constraint"
**Cause:** Email already exists in profiles table
**Fix:** Use a different test email

### Error: "null value in column 'email' violates not-null constraint"
**Cause:** Migration didn't run or code not updated
**Fix:**
1. Verify migration ran: `SELECT email FROM profiles LIMIT 1;`
2. Check authService.ts includes `email: user.email!`

### Error: Profile fetch returns null
**Cause:** RLS policies might be blocking
**Fix:** Check that these policies exist:
```sql
SELECT policyname FROM pg_policies WHERE tablename = 'profiles';
```

Should see:
- "select_own_profile"
- "insert_own_profile"
- "update_own_profile"

### TypeScript errors in authService.ts
**Cause:** database.types.ts not updated
**Fix:** Make sure Profile interface includes email, name, tier, is_admin

### Mobile app won't build
**Cause:** Syntax error in code changes
**Fix:** Compare your changes with `authService-UPDATE.ts` reference file

---

## 📊 Before & After Comparison

### BEFORE (Incompatible)
```typescript
// Mobile creates profile
{ id, full_name, avatar_url }

// Website expects profile
{ id, email, name, tier, is_admin }

// Result: ❌ Doesn't work!
```

### AFTER (Compatible)
```typescript
// Mobile creates profile
{
  id, email, name, tier, is_admin,     // ← For website
  full_name, avatar_url                // ← For mobile
}

// Website expects profile
{ id, email, name, tier, is_admin }    // ← Found!

// Result: ✅ Works perfectly!
```

---

## 🚀 Next Steps

After successful integration:

**Immediate:**
- ✅ Continue building your mobile app features
- ✅ Badge system works ✓
- ✅ Community features work ✓
- ✅ Journal, nutrition, health tracking work ✓

**Short Term (1-2 weeks):**
- Test with real beta users
- Verify edge cases
- Monitor error logs

**Long Term (After Mobile Launch):**
- Sync journal_entries ↔ check_ins
- Show website messages in mobile
- Unified progress tracking
- Admin panel shows mobile data

---

## 📞 Need Help?

If you run into issues:

1. **Check the migration ran:** Look in Supabase → Database → Tables → profiles
2. **Check TypeScript:** Run `npm run build` to see any errors
3. **Check console:** Look for Supabase errors in app console
4. **Test query:** Try selecting from profiles table directly

**Reference Files:**
- `006_website_compatibility.sql` - Database migration
- `authService-UPDATE.ts` - Complete updated auth service
- `database-types-UPDATE.ts` - Complete updated types

---

**Estimated Total Time:** 15 minutes
**Difficulty:** Easy ⭐
**Risk:** Low 🟢
**Impact:** High 🚀

**You got this! 💪**

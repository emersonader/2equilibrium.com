# Integration Test Checklist
## Website + Mobile App Compatibility Testing

**Status:** Ready to test
**Date:** January 9, 2026

---

## ✅ Pre-Test Setup

### 1. Verify Database Migration
Go to: https://supabase.com/dashboard/project/ccseqthhpcdfhxvgvupr/sql

**Run this query:**
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY column_name;
```

**Expected columns:**
- ✅ `avatar_url` (text)
- ✅ `created_at` (timestamp)
- ✅ `email` (text) ← **Website field**
- ✅ `full_name` (text) ← **Mobile field**
- ✅ `id` (uuid)
- ✅ `is_admin` (boolean) ← **Website field**
- ✅ `name` (text) ← **Website field**
- ✅ `notification_preferences` (jsonb) ← **Mobile field**
- ✅ `onboarding_completed` (boolean) ← **Mobile field**
- ✅ `tier` (text) ← **Website field**
- ✅ `updated_at` (timestamp)

**If any fields are missing:** Run the migration from `mobile-app-integration/006_mobile_app_fields.sql`

---

## 🧪 Test Scenarios

### Test 1: Website Signup & Login ✅

**Steps:**
1. Go to: https://2equilibrium.com
2. Click "Member Access"
3. Create a new account:
   - Email: `test-web-${timestamp}@gmail.com`
   - Password: `TestPass123!`
   - Name: `Web Test User`
4. Login successfully
5. Check dashboard loads

**Verify in Supabase:**
```sql
SELECT email, name, full_name, tier, is_admin, onboarding_completed
FROM profiles
WHERE email LIKE 'test-web-%'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected result:**
```
email: test-web-...@gmail.com
name: Web Test User
full_name: Web Test User  ← Should be auto-synced by trigger
tier: foundation
is_admin: false
onboarding_completed: false
```

---

### Test 2: Mobile App Signup ✅

**Steps:**
1. Open mobile app:
   ```bash
   cd /Users/grumpy/Downloads/2equilibrium-app/app
   npm run ios  # or: npm run android
   ```

2. Create a new account:
   - Email: `test-mobile-${timestamp}@gmail.com`
   - Password: `TestPass123!`
   - Full Name: `Mobile Test User`

3. Complete signup process

**Verify in Supabase:**
```sql
SELECT email, name, full_name, tier, is_admin, onboarding_completed
FROM profiles
WHERE email LIKE 'test-mobile-%'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected result:**
```
email: test-mobile-...@gmail.com
name: Mobile Test User  ← Set by mobile app
full_name: Mobile Test User
tier: foundation  ← Set by mobile app
is_admin: false  ← Set by mobile app
onboarding_completed: false
```

---

### Test 3: Cross-Platform Login - Mobile → Website 🔄

**Steps:**
1. Use the account created in Test 2 (mobile account)
2. Go to: https://2equilibrium.com
3. Click "Member Access"
4. Login with mobile account credentials
5. Dashboard should load successfully

**Expected:**
- ✅ Login succeeds
- ✅ Dashboard shows user name
- ✅ No console errors
- ✅ User can access member features

---

### Test 4: Cross-Platform Login - Website → Mobile 🔄

**Steps:**
1. Use the account created in Test 1 (website account)
2. Open mobile app
3. Login with website account credentials
4. App should load successfully

**Expected:**
- ✅ Login succeeds
- ✅ Profile loads
- ✅ App shows user name
- ✅ User can access mobile features
- ✅ Onboarding may show (expected if `onboarding_completed = false`)

---

### Test 5: Name Sync - Update on Website 🔁

**Steps:**
1. Login on website
2. Go to profile settings
3. Update your name to "Updated Name Test"
4. Save changes

**Verify in Supabase:**
```sql
SELECT name, full_name
FROM profiles
WHERE id = '<your-user-id>';
```

**Expected:**
```
name: Updated Name Test
full_name: Updated Name Test  ← Should be synced by trigger
```

5. Open mobile app
6. Check profile shows "Updated Name Test"

---

### Test 6: Name Sync - Update on Mobile 🔁

**Steps:**
1. Login on mobile app
2. Go to profile settings
3. Update your name to "Mobile Updated Name"
4. Save changes

**Verify in Supabase:**
```sql
SELECT name, full_name
FROM profiles
WHERE id = '<your-user-id>';
```

**Expected:**
```
name: Mobile Updated Name  ← Should be synced by code + trigger
full_name: Mobile Updated Name
```

5. Login on website
6. Check profile shows "Mobile Updated Name"

---

## 🐛 Troubleshooting

### Issue: "Cannot read properties of null (reading 'email')"
**Cause:** Profile not created after signup
**Fix:** Check RLS policies allow INSERT for authenticated users

**Run this to check policies:**
```sql
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'profiles';
```

**Should have:**
- `insert_own_profile` (INSERT)
- `select_own_profile` (SELECT)
- `update_own_profile` (UPDATE)

---

### Issue: "Column does not exist" error
**Cause:** Migration not applied
**Fix:** Run `006_mobile_app_fields.sql` in Supabase SQL Editor

---

### Issue: Name not syncing between platforms
**Cause:** Trigger not working or not created
**Fix:** Check if trigger exists:

```sql
SELECT trigger_name, event_manipulation
FROM information_schema.triggers
WHERE event_object_table = 'profiles'
  AND trigger_name = 'sync_names_trigger';
```

If missing, re-run the trigger section from migration file.

---

### Issue: Mobile app won't build
**Cause:** TypeScript type errors
**Fix:** Verify `database.types.ts` has all fields (website + mobile)

---

### Issue: Can't login on website after mobile signup
**Cause:** Website fields not set during mobile signup
**Fix:** Verify `authService.ts` includes:
```typescript
email: user.email!,
name: fullName || user.email!,
tier: 'foundation',
is_admin: false,
```

---

## ✅ Success Criteria

After all tests pass, you should have:

### Database
- [x] profiles table has 11 total columns
- [x] Website fields: email, name, tier, is_admin
- [x] Mobile fields: full_name, avatar_url, onboarding_completed, notification_preferences
- [x] Auto-sync trigger active

### Website
- [x] New users can sign up
- [x] Login works
- [x] Dashboard loads
- [x] Can update profile
- [x] No console errors

### Mobile App
- [x] New users can sign up
- [x] Login works
- [x] Profile loads
- [x] App features work
- [x] No errors in console

### Cross-Platform
- [x] Mobile users can login on website
- [x] Website users can login on mobile app
- [x] Name updates sync between platforms
- [x] Both platforms show same user data

---

## 📊 Test Results Template

```
Date: [date]
Tester: [name]

Test 1: Website Signup & Login
Status: [ ] Pass [ ] Fail
Notes:

Test 2: Mobile App Signup
Status: [ ] Pass [ ] Fail
Notes:

Test 3: Mobile → Website Login
Status: [ ] Pass [ ] Fail
Notes:

Test 4: Website → Mobile Login
Status: [ ] Pass [ ] Fail
Notes:

Test 5: Name Sync (Website)
Status: [ ] Pass [ ] Fail
Notes:

Test 6: Name Sync (Mobile)
Status: [ ] Pass [ ] Fail
Notes:

Overall Status: [ ] All Pass [ ] Some Issues
```

---

## 🚀 Next Steps After Successful Testing

1. **Remove test accounts** from database:
   ```sql
   DELETE FROM profiles WHERE email LIKE 'test-%';
   ```

2. **Document any issues found** and create fixes

3. **Continue mobile app development** - integration is complete!

4. **Monitor production** for any authentication issues

5. **Consider future enhancements:**
   - Sync journal entries between platforms
   - Unified progress tracking
   - Admin panel shows mobile data
   - Cross-platform notifications

---

**Questions?** Refer to:
- `IMPLEMENTATION_GUIDE.md` - Full integration details
- `QUICK_REFERENCE.md` - Quick summary
- `006_mobile_app_fields.sql` - Database migration

**Support:** Check console logs for detailed error messages

-- ============================================
-- MIGRATION 006: Website Compatibility
-- ============================================
-- Adds website-required fields to profiles table
-- Allows users to login on both website and mobile app
-- Run this in Supabase SQL Editor
-- Date: January 9, 2026

-- ============================================
-- 1. ADD WEBSITE FIELDS TO PROFILES TABLE
-- ============================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'foundation' CHECK (tier IN ('foundation', 'transformation', 'lifetime')),
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- ============================================
-- 2. ADD UNIQUE CONSTRAINT ON EMAIL
-- ============================================

CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx
  ON profiles(email)
  WHERE email IS NOT NULL;

-- ============================================
-- 3. AUTO-SYNC NAME AND FULL_NAME
-- ============================================

CREATE OR REPLACE FUNCTION sync_profile_names()
RETURNS TRIGGER AS $$
BEGIN
  -- If full_name is set, sync to name
  IF NEW.full_name IS NOT NULL AND NEW.full_name != '' THEN
    NEW.name = NEW.full_name;
  END IF;

  -- If name is set but full_name is not, sync to full_name
  IF NEW.name IS NOT NULL AND NEW.name != '' AND (NEW.full_name IS NULL OR NEW.full_name = '') THEN
    NEW.full_name = NEW.name;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists (for re-running migration)
DROP TRIGGER IF EXISTS sync_names_trigger ON profiles;

-- Create trigger
CREATE TRIGGER sync_names_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_profile_names();

-- ============================================
-- 4. BACKFILL EXISTING DATA
-- ============================================

-- Update existing profiles to populate new fields
UPDATE profiles
SET
  email = auth.users.email,
  name = COALESCE(full_name, auth.users.email),
  tier = 'foundation',
  is_admin = FALSE
FROM auth.users
WHERE profiles.id = auth.users.id
  AND profiles.email IS NULL;

-- ============================================
-- 5. VERIFY MIGRATION
-- ============================================

-- Check that fields were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('email', 'name', 'tier', 'is_admin')
ORDER BY column_name;

-- Check sample data
SELECT
  id,
  email,
  name,
  full_name,
  tier,
  is_admin,
  onboarding_completed
FROM profiles
LIMIT 5;

-- ============================================
-- EXPECTED RESULTS:
-- ============================================
-- 1. profiles table should have 4 new columns
-- 2. Unique index on email should exist
-- 3. Trigger sync_names_trigger should be active
-- 4. Existing users should have email, name populated
-- 5. name and full_name should match for existing users

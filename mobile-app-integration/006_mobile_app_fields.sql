-- ============================================
-- MIGRATION 006: Add Mobile App Fields
-- ============================================
-- Adds mobile app fields to existing website profiles table
-- Current schema has: id, email, name, tier, is_admin
-- Adding: full_name, avatar_url, onboarding_completed, notification_preferences
-- Date: January 9, 2026

-- ============================================
-- 1. ADD MOBILE APP FIELDS TO PROFILES TABLE
-- ============================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{
    "morningWisdom": true,
    "lessonReminder": true,
    "gentleNudge": true,
    "streakReminder": true,
    "weeklyReview": true,
    "quietHoursStart": "22:00",
    "quietHoursEnd": "07:00"
  }'::jsonb;

-- ============================================
-- 2. BACKFILL EXISTING DATA
-- ============================================

-- Copy existing name to full_name for existing users
UPDATE profiles
SET full_name = name
WHERE full_name IS NULL AND name IS NOT NULL;

-- ============================================
-- 3. AUTO-SYNC NAME AND FULL_NAME
-- ============================================

CREATE OR REPLACE FUNCTION sync_profile_names()
RETURNS TRIGGER AS $$
BEGIN
  -- If full_name changes, sync to name
  IF NEW.full_name IS NOT NULL AND NEW.full_name != '' THEN
    NEW.name = NEW.full_name;
  END IF;

  -- If name changes, sync to full_name
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
-- 4. VERIFY MIGRATION
-- ============================================

-- Check that new columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('full_name', 'avatar_url', 'onboarding_completed', 'notification_preferences')
ORDER BY column_name;

-- Check that data was backfilled
SELECT
  id,
  email,
  name,
  full_name,
  tier,
  is_admin,
  onboarding_completed,
  avatar_url
FROM profiles
LIMIT 5;

-- ============================================
-- EXPECTED RESULTS:
-- ============================================
-- 1. profiles table should have 4 new columns
-- 2. Existing users should have name = full_name
-- 3. Trigger sync_names_trigger should be active
-- 4. notification_preferences should have default values

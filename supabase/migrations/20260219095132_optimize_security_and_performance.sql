/*
  # Optimize Security and Performance

  ## Overview
  This migration addresses several security and performance issues identified in the Supabase dashboard:
  - Optimizes RLS policies to prevent re-evaluation of auth functions per row
  - Removes unused database index
  - Fixes function search_path security issue

  ## Changes

  ### 1. RLS Policy Optimization
  Recreates INSERT, UPDATE, and DELETE policies on the projects table to use subqueries for auth.uid().
  This prevents the auth function from being re-evaluated for each row, significantly improving query performance at scale.
  
  **Affected Policies:**
  - "Users can create their own projects" (INSERT)
  - "Users can update their own projects" (UPDATE)
  - "Users can delete their own projects" (DELETE)

  ### 2. Remove Unused Index
  Drops the `idx_projects_user_id` index which is not being used by any queries.
  The foreign key constraint already provides necessary lookup performance.

  ### 3. Fix Function Search Path
  Updates the `delete_user` function to use an immutable search_path, preventing potential security vulnerabilities
  from search_path manipulation attacks.

  ## Security Impact
  - **Performance**: RLS policies will execute more efficiently with fewer function calls
  - **Security**: Function search_path is now immutable, preventing injection attacks
  - **Storage**: Removes unused index, freeing up storage space
*/

-- Drop existing policies that need optimization
DROP POLICY IF EXISTS "Users can create their own projects" ON projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;

-- Recreate policies with optimized auth function calls using subqueries
CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Remove unused index
DROP INDEX IF EXISTS idx_projects_user_id;

-- Recreate delete_user function with secure search_path
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;

/*
  # Add delete_user function

  1. New Functions
    - `delete_user()` - Deletes the authenticated user's account from auth.users
  
  2. Security
    - Function is SECURITY DEFINER to allow deletion of auth records
    - Only allows users to delete their own account
    - Checks authentication before deletion
*/

CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;
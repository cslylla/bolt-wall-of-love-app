/*
  # Create projects table for Wall of Love

  ## Overview
  This migration creates the projects table for the Wall of Love application where users can share their Bolt.new projects.

  ## New Tables
  
  ### `projects`
  - `id` (uuid, primary key) - Unique identifier for each project
  - `user_id` (uuid, not null) - References auth.users, identifies the project owner
  - `author_name` (text, not null) - Display name of the project author
  - `title` (text, not null) - Project title, max 80 characters
  - `description` (text, not null) - Project description, max 400 characters
  - `project_url` (text, not null) - URL to the live project
  - `stripe_payment_url` (text, nullable) - Optional Stripe payment link for future monetization
  - `created_at` (timestamptz) - Timestamp when project was shared

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the projects table
  - All authenticated users can view all projects (SELECT policy)
  - Users can only create projects with their own user_id (INSERT policy)
  - Users can only update their own projects (UPDATE policy)
  - Users can only delete their own projects (DELETE policy)

  ## Constraints
  - Title limited to 80 characters via CHECK constraint
  - Description limited to 400 characters via CHECK constraint
  - Foreign key constraint ensures user_id references valid auth users
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  title text NOT NULL CHECK (char_length(title) <= 80),
  description text NOT NULL CHECK (char_length(description) <= 400),
  project_url text NOT NULL,
  stripe_payment_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view all projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

# Wall of Love — A Community Showcase for Bolt.new Creators

## Project Overview

Wall of Love is a community showcase app, it lets Bolt.new creators share projects they've built, discover what others have made, and get inspired. Built entirely with Bolt.new.

## Key Features

- 🔐 Secure signup and login with display name (Supabase Auth)
- 📝 Post, edit, and delete your own projects
- 🎨 Community wall displaying all projects as cards
- ✅ Confirmation modals for destructive actions
- 🗑️ Delete account with full data cleanup
- 📱 Responsive card grid with hover effects
- 🛡️ Protected routes — wall only accessible to logged-in users
- 🎯 Bolt.new-inspired dark design (#111114, #46A1FD
- ⚡ Support creators with a one-time payment via Stripe

## Live App

https://cslylla-bolt-wall-of-70aa.bolt.host

## Using the App

1. Open the live URL
2. Sign up with your display name, email and password
3. Browse the Wall of Love
4. Click "Share your project" to post your own
5. Edit or delete your own cards using the icons on your cards
6. Access account options via your initials avatar in the top right

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL), Stripe (one-time payments via Supabase edge functions)
- **Auth:** Supabase Auth (email/password)
- **Hosting:** Bolt.new built-in hosting

## Running Locally

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with your Supabase URL and anon key (see `.env.example` if available)
4. Run `npm run dev`
5. Open http://localhost:3000

## Known Limitations

- Password reset emails redirect to localhost when testing from the local Bolt preview. This works correctly on the published URL after setting the Site URL in Supabase Authentication settings.
- The Stripe Support button is only visible on other users' cards, not your own.
- Stripe integration requires JWT verification to be disabled on the stripe-checkout edge function — this is a known Supabase edge runtime behavior where the Authorization header is stripped after JWT verification before reaching the function handler.

## Project Context

Built as part of an assessment at Bolt.new, with a focus on experimenting with the product, understanding the user experience, and shipping a working app end to end.

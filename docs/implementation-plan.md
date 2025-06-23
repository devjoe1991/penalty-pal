PenaltyPal: Detailed Implementation Plan
This plan breaks down the project into phases and actionable tasks. Cursor AI should read this file, execute tasks sequentially, mark them as complete by changing [ ] to [x], and commit after each task.

Project Repository: https://github.com/devjoe1991/penalty-pal.git
Branching Strategy: Use feature/[feature-name] branches for development. Merge to main after completion.

Phase 0: Project Setup & Configuration
Objective: Initialize the project, set up the core technologies, and establish the development environment.

Notes: This is the foundation. Ensure all environment variables and connections are correctly configured before moving on.

[x] P0-T1: Initialize Next.js project using create-next-app with TypeScript, Tailwind CSS, and App Router.

Notes from Cursor:

[ ] P0-T2: Set up Supabase project. Get project URL and anon key.

Notes from Cursor:

[ ] P0-T3: Integrate Supabase with Next.js. Create a Supabase client helper (/lib/supabase/client.ts). Store Supabase URL and keys in .env.local.

Notes from Cursor:

[ ] P0-T4: Install and configure shadcn/ui. Initialize it for the project.

Notes from Cursor:

[ ] P0-T5: Set up Git repository and push initial project structure to GitHub. Create main and develop branches.

Notes from Cursor:

[ ] P0-T6: Define database schema in SQL. Create a /supabase/migrations file for profiles, vehicles, and fines tables with appropriate columns, types, and relationships. Run the migration.

Notes from Cursor:

[ ] P0-T7: Implement basic Row Level Security (RLS) policies for all tables. Ensure users can only select/insert/update/delete their own data.

Notes from Cursor:

Phase 1: Landing Page & Static Content
Objective: Build the public-facing, visually stunning marketing website.

Notes: This phase focuses purely on the frontend and requires no authentication. The goal is to create a beautiful and convincing storefront for the service.

[ ] P1-T1: Create the main layout file (/app/layout.tsx) with a shared Navbar and Footer component structure.

Notes from Cursor:

[ ] P1-T2: Build the Navbar component (/components/layout/Navbar.tsx). It should be responsive, with navigation links (Features, Pricing), a "Login" button, and a "Sign Up" CTA button.

Notes from Cursor:

[ ] P1-T3: Build the Footer component (/components/layout/Footer.tsx). Include links to legal pages (Terms, Privacy) and social media.

Notes from Cursor:

[ ] P1-T4: Build the Hero Section for the homepage (/app/page.tsx). Must be visually striking and include a headline, sub-headline, and a mock AI chat conversation component to showcase the product's capability.

Notes from Cursor: This is a key visual element. Spend time on the styling and animation of the mock chat.

[ ] P1-T5: Build the Features Section. Create a component that details 3-4 key features with icons and short descriptions (e.g., "AI-Powered Appeals," "Dashboard Management," "Expert Knowledge").

Notes from Cursor:

[ ] P1-T6: Build the "How It Works" Section. Create a 3 or 4-step visual guide (e.g., 1. Tell us what happened -> 2. Get your AI-generated appeal -> 3. Submit and track).

Notes from Cursor:

[ ] P1-T7: Build the Pricing Section. Create a component displaying the three tiers: Freemium, Premium (Individual), and Fleet (Business). Clearly list the features of each.

Notes from Cursor:

[ ] P1-T8: Build a Testimonials/Social Proof Section. Use placeholder content for now.

Notes from Cursor:

[ ] P1-T9: Build a final Call-to-Action (CTA) Section at the bottom of the page, urging users to sign up.

Notes from Cursor:

[ ] P1-T10: Ensure the entire landing page is fully responsive and looks polished on mobile, tablet, and desktop screens.

Notes from Cursor: Test thoroughly on different viewport sizes.

Phase 2: Authentication & User Accounts
Objective: Implement secure user registration and login functionality.

Notes: Use the Supabase Auth UI helpers or build custom components for a more branded experience.

[ ] P2-T1: Create the Sign-Up page (/app/signup/page.tsx). Build a form for email and password registration. Hook it up to the Supabase signUp method.

Notes from Cursor:

[ ] P2-T2: Create the Login page (/app/login/page.tsx). Build a form for email and password login. Hook it up to the Supabase signInWithPassword method.

Notes from Cursor:

[ ] P2-T3: Implement a server-side trigger using Supabase SQL to automatically create a new row in the public.profiles table when a new user signs up in auth.users.

Notes from Cursor: This is a crucial step for linking auth users to public data.

[ ] P2-T4: Implement logout functionality. Add a "Logout" button to the authenticated user's view (e.g., in a dropdown in the navbar).

Notes from Cursor:

[ ] P2-T5: Create protected routes. Implement logic in a middleware file (/middleware.ts) to redirect unauthenticated users away from dashboard pages to the login page.

Notes from Cursor:

[ ] P2-T6: Update the Navbar to conditionally display "Login/Sign Up" for guests and "Dashboard/Logout" for authenticated users.

Notes from Cursor:

Phase 3: Core Application - Dashboard & Fine Management
Objective: Build the authenticated user's main dashboard for managing vehicles and fines.

Notes: This is the core of the user-facing application. Data fetching from Supabase and state management are key.

[ ] P3-T1: Create the main dashboard layout (/app/dashboard/layout.tsx) with a persistent sidebar for navigation.

Notes from Cursor:

[ ] P3-T2: Build the Sidebar component (/components/dashboard/Sidebar.tsx). Include links to "Dashboard Home", "My Vehicles", and a prominent "Contest New Fine" button.

Notes from Cursor:

[ ] P3-T3: Build the main dashboard page (/app/dashboard/page.tsx). This page should fetch and display a summary: number of vehicles, number of active appeals, and a list of the 5 most recent fines.

Notes from Cursor: Use a Server Component for the initial data fetch.

[ ] P3-T4: Build the "My Vehicles" page (/app/dashboard/vehicles/page.tsx). Fetch and display a list of the user's vehicles. Include an "Add New Vehicle" button.

Notes from Cursor:

[ ] P3-T5: Implement the "Add New Vehicle" functionality. Create a modal or form where a user can input a registration plate. On submit, insert a new record into the vehicles table.

Notes from Cursor: Enforce the 1-vehicle limit for freemium users at the database level using RLS or a check function.

[ ] P3-T6: Build the fine list component. This will be reused on the main dashboard. It should fetch and display a user's fines from the fines table in a data table (shadcn/ui table).

Notes from Cursor:

[ ] P3-T7: Implement the ability to update a fine's status from the dashboard list (e.g., using a dropdown). This should trigger an update call to Supabase.

Notes from Cursor:

Phase 4: AI Appeal Generation
Objective: Implement the core AI chat functionality.

Notes: This involves both frontend UI and secure backend logic in a serverless function.

[ ] P4-T1: Create the Supabase Edge Function generate-appeal. Set up the initial file structure in /supabase/functions/generate-appeal/index.ts.

Notes from Cursor:

[ ] P4-T2: In the Edge Function, write the logic to receive a request, securely call the chosen LLM API (e.g., OpenAI) with a well-structured prompt, and return the response. Store the LLM API key as a Supabase secret.

Notes from Cursor: The prompt engineering here is critical. The prompt should instruct the AI to act as a UK PCN expert.

[ ] P4-T3: Deploy the Edge Function to Supabase.

Notes from Cursor:

[ ] P4-T4: Build the frontend chat interface (/app/contest/page.tsx). Use a library like ai/react or build a custom component to manage the conversation flow.

Notes from Cursor:

[ ] P4-T5: Implement the multi-step form-like conversation flow as described in the workflow document. Gather all necessary PCN details from the user.

Notes from Cursor:

[ ] P4-T6: Connect the frontend chat UI to the generate-appeal Edge Function. When the user provides their story, call the function and display the streaming response in the UI.

Notes from Cursor:

[ ] P4-T7: Add the "Copy Appeal Text" and "Save to Dashboard" buttons after the appeal is generated. The "Save" button should insert the data into the fines table.

Notes from Cursor: Enforce the 5-appeal limit for freemium users.

Phase 5: Subscriptions & Billing
Objective: Integrate Stripe for handling premium subscriptions.

Notes: This is a Post-MVP feature but the plan is included for future reference.

[ ] P5-T1: Set up a Stripe account and create products for "Premium Individual" and "Fleet Management".

Notes from Cursor:

[ ] P5-T2: Integrate the Stripe Node.js library into a new set of Supabase Edge Functions for handling webhooks and creating checkout sessions.

Notes from Cursor:

[ ] P5-T3: Create a subscriptions table in Supabase to track user subscription status, current period end, etc.

Notes from Cursor:

[ ] P5-T4: Build a billing/upgrade page in the user's dashboard where they can manage their subscription.

Notes from Cursor:

[ ] P5-T5: Use Stripe webhooks to listen for successful payments and update the user's status in the subscriptions table.

Notes from Cursor: This is essential for syncing Stripe data with your app.
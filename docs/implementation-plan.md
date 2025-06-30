PenaltyPal: Detailed Implementation Plan
This plan breaks down the project into phases and actionable tasks. Cursor AI should read this file, execute tasks sequentially, mark them as complete by changing [ ] to [x], and commit after each task.

Project Repository: https://github.com/devjoe1991/penalty-pal.git
Branching Strategy: Use feature/[feature-name] branches for development. Merge to main after completion.

Phase 0: Project Setup & Configuration
Objective: Initialize the project, set up the core technologies, and establish the development environment.
Notes: This is the foundation. Ensure all environment variables and connections are correctly configured before moving on.

[x] P0-T1: Initialize Next.js project using create-next-app with TypeScript, Tailwind CSS, and App Router.

[x] P0-T2: Set up Supabase project. Get project URL and anon key.

[x] P0-T3: Integrate Supabase with Next.js. Create a Supabase client helper (/lib/supabase/client.ts). Store Supabase URL and keys in .env.local.

[x] P0-T4: Install and configure shadcn/ui. Initialize it for the project.

[x] P0-T5: Set up Git repository and push initial project structure to GitHub. Create main and develop branches.

[x] P0-T6: Define database schema in SQL. Create a /supabase/migrations file for profiles, vehicles, and fines tables with appropriate columns, types, and relationships. Run the migration.

[x] P0-T7: (New) Add a subscriptions table to the database schema. This table should link to user_id and include columns for status (e.g., 'active', 'cancelled'), plan (e.g., 'freemium', 'premium', 'fleet'), and usage counts.

[x] P0-T8: Implement basic Row Level Security (RLS) policies for all tables. Ensure users can only select/insert/update/delete their own data.

Phase 1: Landing Page & Static Content
Objective: Build the public-facing, visually stunning marketing website.
Notes: Completed.

[x] P1-T1: Create the main layout file (/app/layout.tsx) with a shared Navbar and Footer component structure.

[x] P1-T2: Build the Navbar component (/components/layout/Navbar.tsx).

[x] P1-T3: Build the Footer component (/components/layout/Footer.tsx).

[x] P1-T4: Build the Hero Section for the homepage (/app/page.tsx).

[x] P1-T5: Build the Features Section.

[x] P1-T6: Build the "How It Works" Section.

[x] P1-T7: Build the Pricing Section.

[x] P1-T8: Build a Testimonials/Social Proof Section.

[x] P1-T9: Build a final Call-to-Action (CTA) Section.

[x] P1-T10: Ensure the entire landing page is fully responsive.

Phase 2: Authentication & User Accounts
Objective: Implement secure user registration and login functionality.

[x] P2-T1: Create the Sign-Up page (/app/signup/page.tsx). Hook it up to the Supabase signUp method.

[x] P2-T2: Create the Login page (/app/login/page.tsx). Hook it up to the Supabase signInWithPassword method.

[x] P2-T3: Implement a server-side trigger using Supabase SQL to automatically create a new row in public.profiles AND public.subscriptions (with a default 'freemium' plan) when a new user signs up in auth.users.

[ ] P2-T4: Implement logout functionality.

[ ] P2-T5: Create protected routes. Implement logic in a middleware file (/middleware.ts) to redirect unauthenticated users away from dashboard pages.

[ ] P2-T6: Update the Navbar to conditionally display "Login/Sign Up" for guests and "Dashboard/Logout" for authenticated users.

Phase 3: Core Application - Dashboard & Fine Management
Objective: Build the authenticated user's main dashboard for managing vehicles and fines.

[ ] P3-T1: Create the main dashboard layout (/app/dashboard/layout.tsx) with a persistent sidebar.

[ ] P3-T2: Build the Sidebar component (/components/dashboard/Sidebar.tsx).

[ ] P3-T3: Build the main dashboard page (/app/dashboard/page.tsx).

[ ] P3-T4: Build the "My Vehicles" page (/app/dashboard/vehicles/page.tsx).

[ ] P3-T5: Implement the "Add New Vehicle" functionality.

[ ] P3-T6: Build the fine list component.

[ ] P3-T7: Implement the ability to update a fine's status from the dashboard list.

Phase 4: AI Appeal Generation (Revised)
Objective: Implement the dynamic and context-aware AI chat functionality.

[ ] P4-T1: Create the Supabase Edge Function appeal-generation-flow. Set up the file structure in /supabase/functions/appeal-generation-flow/index.ts.

[ ] P4-T2: Edge Function: Implement logic to receive a request and first query the subscriptions and fines tables to fetch the user's role, plan, and current usage counts.

[ ] P4-T3: Edge Function: Implement the Freemium limit check. If the user's limits are exceeded, the function must return a specific error/message to the client, preventing further execution.

[ ] P4-T4: Edge Function (V2 Feature): Implement PCN image handling. If an image is part of the request, call a multimodal LLM (e.g., Gemini Vision) to perform OCR and extract key details into a JSON object.

[ ] P4-T5: Edge Function: Implement the core LLM call logic. Construct the dynamic master prompt from the AI dev plan, injecting the user's role, usage data, and any extracted PCN info. Securely call the main LLM API.

[ ] P4-T6: Build the frontend chat interface (/app/contest/page.tsx). The UI must include an "Upload Ticket" button and be able to handle multiple states (e.g., manual input, confirming extracted data, displaying "upgrade required" messages).

[ ] P4-T7: Implement the multi-step manual conversation flow as a primary input method.

[ ] P4-T8: Connect the frontend chat UI to the appeal-generation-flow Edge Function. Ensure the client can handle both streaming text responses for the appeal and structured messages (like the upgrade prompt).

[ ] P4-T9: Add the "Copy Appeal Text" and "Save to Dashboard" buttons. The "Save" button should insert the PCN data and the final generated appeal text into the fines table.

Phase 5: Subscriptions & Billing
Objective: Integrate Stripe for handling premium subscriptions.
Notes: This is a Post-MVP feature but the plan is included for future reference.

[ ] P5-T1: Set up a Stripe account and create products for "Premium Individual" and "Fleet Management".

[ ] P5-T2: Integrate the Stripe Node.js library into a new set of Supabase Edge Functions for handling webhooks and creating checkout sessions.

[ ] P5-T3: Build a billing/upgrade page in the user's dashboard where they can manage their subscription.

[ ] P5-T4: Use Stripe webhooks to listen for successful payments and update the user's status in the subscriptions table accordingly.
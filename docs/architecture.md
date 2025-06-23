PenaltyPal: System Architecture
This document describes the high-level architecture of the PenaltyPal application, detailing how the different components of the tech stack interact.

1. High-Level Overview
The architecture is based on a Jamstack philosophy, utilizing a decoupled structure where the frontend (Next.js on Vercel) and backend (Supabase) are separate services that communicate via APIs. This enhances scalability, security, and developer experience.


(A visual placeholder for the architecture diagram)

Client (Browser)
|
V

Frontend (Vercel)
Next.js 14 Application

Serves static assets & server-rendered pages

Handles routing & UI rendering

Client-side interaction with Supabase
|
V (HTTPS/API Calls)
|----------------------------------------------|
|                                              |

Backend (Supabase) ### AI Service (Serverless)
PostgreSQL DB: Stores users, profiles, vehicles, fines.

Auth: Manages user sessions & JWTs.

Storage: Stores uploaded ticket images.

Edge Functions:

Listens for DB webhooks.

Exposes secure endpoints.
|
V (Secure API Call)
### LLM API (OpenAI/Gemini)
* Processes prompts.
* Generates appeal text.

2. Component Breakdown
2.1. Frontend (Next.js on Vercel)
Responsibilities:

UI/UX: Renders all user interfaces, including the public landing page, dashboard, and AI chat interface using React, Tailwind CSS, and Shadcn/UI components.

Routing: The Next.js App Router handles all page navigation.

Data Fetching:

Server Components: Fetch initial data (e.g., list of fines for the dashboard) on the server for fast page loads and SEO.

Client Components: Interact directly with the Supabase JS client library (supabase-js) for real-time data, authentication, and user-driven updates (e.g., adding a vehicle, updating a fine's status).

State Management: Manages UI state and caches fetched data.

2.2. Backend as a Service (Supabase)
PostgreSQL Database:

The single source of truth for all application data.

Key Tables:

users (managed by Supabase Auth)

profiles (public data like username, linked to users)

vehicles (linked to profiles, stores registration plates)

fines (linked to vehicles, stores PCN details, generated appeals, status)

subscriptions (linked to users, stores pricing plan and status)

Row Level Security (RLS): RLS policies are critical. They will be heavily used to ensure a user can only access and modify their own data. For example, a policy on the fines table would be: (auth.uid() = user_id).

Authentication:

Handles all user sign-ups, logins, and session management.

When a user logs in, Supabase issues a JSON Web Token (JWT), which is then used by the Next.js client to make authenticated requests to the database.

Storage:

Used for the V2 feature of uploading PCN images/PDFs.

Access is controlled by storage policies, ensuring users can only upload to their own designated folders.

Edge Functions:

These are serverless Deno functions that execute backend logic.

Primary Use Case: To act as a secure proxy for the LLM API.

Workflow:

The Next.js client calls a Supabase Edge Function named generate-appeal.

The Edge Function receives the user's authenticated JWT and the fine details.

It validates the request and constructs a detailed prompt for the LLM.

It securely calls the OpenAI/Gemini API using a secret API key stored in Supabase secrets.

It receives the response from the LLM, formats it, and returns it to the client.

Benefit: This prevents the LLM API key from ever being exposed to the client-side browser.

3. Scalability & Performance
Vercel Edge Network: Deploys the Next.js frontend to a global CDN, ensuring low latency for users worldwide.

Supabase: Built to scale automatically. The PostgreSQL database is robust and can be scaled as needed.

Serverless Functions: Edge Functions scale automatically with demand, so the AI generation service can handle concurrent requests without manual intervention.
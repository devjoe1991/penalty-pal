PenaltyPal: Project Memory Bank
This document contains key information about the PenaltyPal project for reference.

Project Name: PenaltyPal

Core Mission: An AI-powered web app to help UK motorists contest Penalty Charge Notices (PCNs) and other traffic fines.

Primary User: Individuals and small businesses (fleet management).

Key Feature: An AI chatbot that gathers incident details and generates a legally-sound appeal email.

User Dashboard: Central hub for users to manage vehicles (by registration plate) and track the status of all current and past appeals.

Business Model: Freemium.

Free Tier: 5 free appeals, 1 vehicle.

Paid Tiers: Upgrades for individuals (unlimited appeals, multiple vehicles) and a dedicated plan for business fleets.

Tech Stack:

Frontend: Next.js (App Router), Tailwind CSS, Shadcn/UI.

Backend/DB: Supabase (PostgreSQL, Auth, Storage, Edge Functions).

AI: An external LLM API (like OpenAI/Gemini) called securely via a Supabase Edge Function.

Deployment: Vercel.

Design Philosophy: Modern, visually stunning, clean, fresh UI/UX. Fully responsive.

GitHub Repository: https://github.com/devjoe1991/penalty-pal.git
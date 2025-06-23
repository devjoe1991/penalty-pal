PenaltyPal: Product Requirements Document (PRD)
1. Introduction
This document outlines the key product requirements for PenaltyPal, a web application designed to help UK motorists contest Penalty Charge Notices (PCNs) and other fines using an AI-powered agent.

2. User Personas
Priya, the Daily Commuter:

Goal: Quickly contest a confusing fine for stopping in a yellow box junction without spending hours on research.

Needs: A simple, guided process; a high chance of success; minimal time investment.

Dave, the Small Business Owner:

Goal: Manage fines for his 10 delivery vans efficiently.

Needs: A centralized dashboard to track all fines across his fleet; a way to reduce the cost of fines; reporting on appeal outcomes.

Tom, the Tech-Savvy User:

Goal: Use a modern, slick service that feels trustworthy and efficient.

Needs: A beautiful UI/UX; responsive design for use on his phone; transparent pricing.

3. Features & Functional Requirements
3.1. MVP (Minimum Viable Product) Features
Feature ID

Feature Name

Description

User Stories

Priority

AUTH-01

User Authentication

Users can sign up, log in, and log out using email/password. Secure session management.

"As a user, I want to create a secure account to save my vehicle details and track my appeals."

Must-Have

VEH-01

Vehicle Management

Users can add, view, and delete a vehicle (by registration plate) in their account. Freemium users are limited to one vehicle.

"As a user, I want to add my car's registration plate so I can associate fines with it."

Must-Have

AI-01

AI Appeal Chatbot (Core)

An interactive chat interface where users can describe their fine. The AI asks clarifying questions to gather necessary details (PCN number, date, location, alleged contravention).

"As an appealer, I want to chat with an AI agent to explain the circumstances of my ticket."

Must-Have

AI-02

Manual Data Entry

Users manually input the details of their fine as prompted by the AI.

"As a user, I need to provide the PCN details to the AI so it can generate an appeal."

Must-Have

AI-03

Appeal Generation

Based on the user's input, the AI identifies the best grounds for appeal and generates a complete, formatted appeal letter/email.

"As a user, I want the AI to write a professional appeal letter for me based on the strongest legal grounds."

Must-Have

DASH-01

User Dashboard

A central page for authenticated users. Displays their registered vehicle(s) and a list of their current and past appeals.

"As a user, I want a dashboard to see all my contested fines at a glance."

Must-Have

FINE-01

Fine Tracking

Users can save a generated appeal, which creates a "fine" record in their dashboard. They can manually update the status (e.g., Submitted, Won, Lost, Awaiting Response).

"As a user, I want to track the status of my appeal so I know what's happening."

Must-Have

LP-01

Marketing Landing Page

A visually stunning, public-facing landing page explaining the service, its benefits, and a clear call-to-action to sign up. Includes sections on features, a mock AI chat, and pricing tiers.

"As a new visitor, I want to understand what PenaltyPal does and why I should use it."

Must-Have

SUB-01

Freemium Model Logic

The system enforces the 5-appeal/1-vehicle limit for free users.

"As a platform owner, I want to limit free usage to encourage upgrades."

Must-Have

3.2. Post-MVP / V2 Features
Feature ID

Feature Name

Description

User Stories

Priority

AI-04

PCN Document Upload

Users can upload a photo or PDF of their PCN. The AI uses OCR to extract key details automatically.

"As a user, I want to upload a picture of my ticket to save time on manual entry."

High

SUB-02

Subscription & Payments

Integration with Stripe to handle premium subscriptions for individuals and fleet managers.

"As a user, I want to upgrade to a paid plan to manage more vehicles and get unlimited appeals."

High

DASH-02

Advanced Filtering

Users can filter fines on their dashboard by vehicle registration, date, or appeal status.

"As a fleet manager, I want to filter fines to see all tickets for a specific van."

Medium

AI-05

Follow-up Appeals

If the initial appeal is rejected, the user can input the rejection reason, and the AI will generate a stronger appeal for the next stage (e.g., to the independent adjudicator).

"As a user, if my first appeal fails, I want the AI to help me with the next step."

High

NOTIF-01

Email Notifications

The system sends users email notifications for key events, like successful sign-up or reminders to check their appeal status.

"As a user, I want an email reminder to check if the council has responded to my appeal."

Medium

4. Non-Functional Requirements
Performance: The web app must be fast and responsive. Page loads should be under 2 seconds. The AI response generation should take no more than 15 seconds.

Usability: The UI must be clean, modern, intuitive, and follow best practices for accessibility (WCAG 2.1 AA).

Responsive Design: The application must be fully usable and visually appealing on all major devices: mobile, tablet, and desktop.

Security: All user data, especially personal information and appeal details, must be encrypted at rest and in transit. Authentication must be secure.

Scalability: The architecture should be able to handle a growing number of users and appeals without significant degradation in performance.

5. Assumptions & Dependencies
Dependency: The core functionality relies on a powerful LLM (like GPT-4 or Gemini) via an API. The quality of AI responses is directly tied to the capability of the underlying model and the quality of the fine-tuned knowledge base.

Assumption: Users will have access to their PCN details (number, date, etc.) to input into the system.

Assumption: UK councils and authorities provide online portals for submitting appeals, and the links to these can be curated and maintained.
PenaltyPal: Pricing & Monetisation Strategy (V2 - Simplified)
1. Core Philosophy
Our monetisation strategy is built on a "value-first" model. The goal is to allow every user to experience the core benefit of the service (generating a high-quality appeal) with a Free Trial, creating a powerful incentive to upgrade to a subscription for continued use and advanced features. This eliminates the confusing and conflicting credit-based system.

2. Pricing Tiers
This new structure is simple and focuses on a clear value proposition at each level.

Tier 1: Free Trial
The perfect, no-risk introduction to PenaltyPal. Every new user starts here.

Cost: £0

Features:

1 Free Appeal Credit (one-time, upon sign-up).

Manage 1 Vehicle.

Standard AI analysis and appeal generation.

Full dashboard access for tracking the appeal.

Goal: User acquisition and product validation. Let the user win their first appeal for free to experience the "wow" moment and understand the product's value. After using their one credit, they must upgrade to continue.

Tier 2: Premium (Subscription)
The complete solution for individuals and power users who want total peace of mind.

Cost:

Monthly: £7.99 / month

Yearly: £79.99 / year (Effectively 2 months free)

Features:

Unlimited Appeal Generations.

Manage up to 5 Vehicles.

PCN Image Scanning (V2 Feature).

Advanced AI Analysis: Access to stronger, evidence-backed appeal strategies (future RAG feature).

Priority Support.

Goal: Create a clear, high-value recurring revenue stream. The value proposition is simple: for less than the cost of one fine, get unlimited protection and advanced tools.

Tier 3: Fleet (Business)
A custom solution for businesses managing multiple vehicles.

Cost: "Contact Us for a Quote"

Features:

Unlimited Vehicles.

Unlimited Appeal Generations.

Multi-user access.

Advanced Dashboard Analytics.

Dedicated Account Manager.

Goal: Capture the high-value B2B market with a tailored, scalable solution.

3. Implementation Changes
To support this new model:

Database (subscriptions table):

The credits column is no longer the primary driver for paid users. It will now primarily be used to track the single credit for freemium users. We can set it to a very high number (or null) for premium users to represent "unlimited".

The plan column (freemium, premium, fleet) remains the source of truth for user access.

Stripe: We will simplify our Stripe products significantly. We only need one Product ("PenaltyPal Premium") with two recurring prices (monthly and yearly). The one-time credit packs will be removed.
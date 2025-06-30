PenaltyPal: Pricing & Monetisation Strategy
1. Core Philosophy
Our monetisation strategy is built on a "value-first" hybrid model. The goal is to allow users to experience the core benefit of the service (generating a high-quality appeal) with minimal friction, while offering clear, compelling reasons to upgrade for more features and higher usage.

We will combine three approaches:

Freemium: A free tier to attract a large user base and let them see the product's power.

Pay-as-you-go (Credits): For users who get fined infrequently but need a powerful tool when it happens.

Subscriptions: For individuals with multiple vehicles or businesses who need ongoing management and volume discounts.

2. The Credit System
The core paid unit of the platform is an "Appeal Credit".

1 Credit = 1 Full Appeal Generation. This includes the initial AI analysis, generation of the appeal letter, and saving it to the dashboard.

V2 Features: Advanced features, like a second-stage appeal (challenging a rejection), may consume an additional credit.

No Expiry: To build user trust, purchased credits will not expire.

3. Pricing Tiers
Here is the proposed structure that will be displayed on the pricing page. Prices are illustrative and can be adjusted based on market testing.

Tier 1: Freemium
The perfect introduction to PenaltyPal.

Cost: £0

Features:

1 Free Appeal Credit (one-time, upon sign-up).

Manage 1 Vehicle.

Manual data entry only.

Standard AI analysis and appeal generation.

Full dashboard access for tracking the single appeal.

Goal: User acquisition and product validation. Let the user win their first appeal for free and experience the "wow" moment.

Tier 2: Pay-as-you-go
For the occasional driver. Pay only for what you need.

Cost:

1 Credit Pack: £9.99

3 Credit Pack: £24.99 (Save ~16%)

Features:

Includes all Freemium features.

Manage up to 2 Vehicles.

Unlocks PCN Image Scanning (OCR) feature.

Credits do not expire.

Goal: Monetise the infrequent user who gets 1-3 fines per year. The cost is positioned significantly lower than paying the fine, making it an easy decision.

Tier 3: Premium (Subscription)
For individuals or families with multiple vehicles who want peace of mind.

Cost: £7.99 / month (or £79.99 / year - 2 months free)

Features:

5 Appeal Credits per month (these can roll over up to a maximum of 20).

Manage up to 5 Vehicles.

All Pay-as-you-go features (including image scanning).

Priority Support.

V2 Feature Access: Unlocks advanced features like generating second-stage appeals to independent adjudicators.

Goal: Create a recurring revenue stream from higher-value individual users. The monthly cost is a fraction of a single PCN, providing a strong sense of "insurance" and value.

Tier 4: Fleet (Business)
Custom solution for businesses managing multiple vehicles.

Cost: "Contact Us for a Quote"

Features:

Unlimited Vehicles.

Custom Credit Pools: A large, shared pool of credits for all fleet vehicles.

Multi-user access (allow different managers to log in).

Advanced Dashboard: Reporting and analytics on appeal success rates, common fine locations, etc.

Dedicated Account Manager.

Goal: Capture the high-value B2B market. The needs of a business with 10+ vehicles are different, and a custom plan allows for tailored pricing and features.

4. Implementation in Supabase
To support this model, the database schema will need to be updated:

subscriptions table: This table (as defined in implementation-plan.md) is correct. It will store the user's plan ('freemium', 'premium', 'fleet') and their subscription status.

Add a credits column: A new column, credits (integer type), should be added to the profiles or subscriptions table to store a user's current Appeal Credit balance.

For Freemium users, this starts at 1.

For Pay-as-you-go users, this balance is topped up via purchases.

For Premium users, this balance is reset/topped up to 5 each month via a cron job or webhook.
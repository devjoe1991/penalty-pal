-- /supabase/migrations/0002_subscriptions_and_credits.sql

-- Create custom types for plan and status for better data integrity.
create type public.app_plan as enum ('freemium', 'pay_as_you_go', 'premium', 'fleet');
create type public.subscription_status as enum ('active', 'trialing', 'past_due', 'canceled');

-- SUBSCRIPTIONS TABLE
-- Stores subscription and credit data for each user.
create table public.subscriptions (
  id uuid primary key references auth.users(id) on delete cascade not null,
  plan public.app_plan default 'freemium'::public.app_plan not null,
  status public.subscription_status default 'active'::public.subscription_status not null,
  
  -- Credits column to manage appeal usage as per pricing-structure.md
  -- Freemium users get 1 free credit upon creation.
  credits integer default 1 not null,

  -- Stripe-related columns for future integration (Phase 5)
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  current_period_end timestamp with time zone,

  -- Ensure one user has only one subscription record.
  unique(stripe_customer_id),
  unique(stripe_subscription_id)
);

-- Add comments to explain the schema.
comment on table public.subscriptions is 'Manages user subscriptions, plans, and appeal credit balances.';
comment on column public.subscriptions.credits is 'Number of appeal credits a user has available.';

-- Add RLS policies for the subscriptions table.
alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription."
  on public.subscriptions for select
  using ( auth.uid() = id );

create policy "Users can update their own subscription."
  on public.subscriptions for update
  using ( auth.uid() = id ); 
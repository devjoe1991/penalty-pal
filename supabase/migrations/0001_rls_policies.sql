-- /supabase/migrations/0001_rls_policies.sql

-- First, enable Row Level Security (RLS) for each table.
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table fines enable row level security;

-- Create policies for the "profiles" table.
-- 1. Users can view their own profile.
create policy "Users can view their own profile."
  on profiles for select
  using ( auth.uid() = id );

-- 2. Users can insert their own profile.
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

-- 3. Users can update their own profile.
create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );


-- Create policies for the "vehicles" table.
-- 1. Users can view their own vehicles.
create policy "Users can view their own vehicles."
  on vehicles for select
  using ( auth.uid() = user_id );

-- 2. Users can add new vehicles for themselves.
create policy "Users can add their own vehicles."
  on vehicles for insert
  with check ( auth.uid() = user_id );

-- 3. Users can update their own vehicles.
create policy "Users can update their own vehicles."
  on vehicles for update
  using ( auth.uid() = user_id );

-- 4. Users can delete their own vehicles.
create policy "Users can delete their own vehicles."
  on vehicles for delete
  using ( auth.uid() = user_id );


-- Create policies for the "fines" table.
-- 1. Users can view their own fines.
create policy "Users can view their own fines."
  on fines for select
  using ( auth.uid() = user_id );

-- 2. Users can create fines for themselves.
create policy "Users can create their own fines."
  on fines for insert
  with check ( auth.uid() = user_id );

-- 3. Users can update their own fines.
create policy "Users can update their own fines."
  on fines for update
  using ( auth.uid() = user_id );

-- 4. Users can delete their own fines.
create policy "Users can delete their own fines."
  on fines for delete
  using ( auth.uid() = user_id ); 
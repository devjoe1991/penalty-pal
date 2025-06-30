-- /supabase/migrations/0003_auto_create_profile_and_subscription.sql

-- Create a function to handle new user setup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Create a new profile for the user
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  -- Create a default freemium subscription for the user
  insert into public.subscriptions (id, plan, status, credits)
  values (new.id, 'freemium', 'active', 1);
  
  return new;
end;
$$;

-- Create a trigger to execute the function after a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 
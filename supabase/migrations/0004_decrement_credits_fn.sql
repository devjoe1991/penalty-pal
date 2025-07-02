-- /supabase/migrations/0004_decrement_credits_fn.sql (Updated)
create or replace function public.decrement_credits(user_id_in uuid)
returns void
language plpgsql
as $$
begin
  update public.subscriptions
  set credits = credits - 1
  where id = user_id_in and credits > 0; -- This condition prevents going below 0
end;
$$; 
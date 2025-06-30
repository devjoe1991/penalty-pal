-- /supabase/migrations/0004_decrement_credits_fn.sql
create or replace function public.decrement_credits(user_id_in uuid)
returns void
language plpgsql
as $$
begin
  update public.subscriptions
  set credits = credits - 1
  where user_id = user_id_in;
end;
$$; 
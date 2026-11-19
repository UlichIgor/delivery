-- Feast Sushi: buyer/admin roles, owned order history and admin-only order mutations.
-- Apply after 202611190001_admin_access.sql in Supabase SQL Editor.

create or replace function public.assign_default_buyer_role()
returns trigger language plpgsql security definer
set search_path = pg_catalog, public
as $$
begin
  if not (coalesce(new.raw_app_meta_data, '{}'::jsonb) ? 'role') then
    update auth.users
    set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'buyer')
    where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_assign_role on auth.users;
create trigger on_auth_user_created_assign_role after insert on auth.users
for each row execute function public.assign_default_buyer_role();

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'buyer')
where not (coalesce(raw_app_meta_data, '{}'::jsonb) ? 'role');

alter table public.orders
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists customer_name text,
  add column if not exists customer_phone text;

update public.orders o
set customer_name = c.name, customer_phone = c.phone
from public.customers c
where c.id = o.customer_id
  and (o.customer_name is null or o.customer_phone is null);

alter table public.orders alter column customer_name set not null;
alter table public.orders alter column customer_phone set not null;

create index if not exists orders_user_created_at_idx on public.orders(user_id, created_at desc);

create or replace function public.set_order_owner_and_customer_snapshot()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
begin
  if new.user_id is null then new.user_id := auth.uid(); end if;
  if new.customer_name is null or new.customer_phone is null then
    select c.name, c.phone into new.customer_name, new.customer_phone
    from public.customers c where c.id = new.customer_id;
  end if;
  if new.customer_name is null or new.customer_phone is null then
    raise exception 'Не вдалося визначити контактні дані покупця';
  end if;
  return new;
end;
$$;

drop trigger if exists set_order_owner_and_customer_snapshot on public.orders;
create trigger set_order_owner_and_customer_snapshot before insert on public.orders
for each row execute function public.set_order_owner_and_customer_snapshot();

drop policy if exists "Buyers can read own orders" on public.orders;
create policy "Buyers can read own orders" on public.orders
for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "Buyers can read own order items" on public.order_items;
create policy "Buyers can read own order items" on public.order_items
for select to authenticated using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = (select auth.uid())
  )
);

grant delete on public.orders to authenticated;
drop policy if exists "Admins can delete orders" on public.orders;
create policy "Admins can delete orders" on public.orders
for delete to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update order status" on public.orders;
create policy "Admins can update order status" on public.orders
for update to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Restrict direct table privileges as well as RLS. Order creation remains available
-- through the SECURITY DEFINER submit_order RPC, including anonymous guest checkout.
revoke all on public.orders from anon, authenticated;
grant select, update (status), delete on public.orders to authenticated;

revoke all on public.customers from anon, authenticated;
grant select on public.customers to authenticated;

revoke all on public.order_items from anon, authenticated;
grant select on public.order_items to authenticated;

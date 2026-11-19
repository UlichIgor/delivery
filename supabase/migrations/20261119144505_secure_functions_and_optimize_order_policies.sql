-- Harden trigger-only SECURITY DEFINER functions and optimize order access.
-- Guest checkout intentionally retains EXECUTE on submit_order for anon/authenticated.

begin;

revoke all on function public.assign_default_buyer_role() from public, anon, authenticated;
revoke all on function public.set_order_owner_and_customer_snapshot() from public, anon, authenticated;
revoke all on function public.submit_order(text, text, text, text, jsonb) from public;
grant execute on function public.submit_order(text, text, text, text, jsonb) to anon, authenticated;

alter function public.assign_default_buyer_role() set search_path = pg_catalog, public, pg_temp;
alter function public.set_order_owner_and_customer_snapshot() set search_path = pg_catalog, public, pg_temp;
alter function public.submit_order(text, text, text, text, jsonb) set search_path = pg_catalog, public, pg_temp;

create index if not exists order_items_product_id_idx on public.order_items(product_id);
create index if not exists orders_customer_id_idx on public.orders(customer_id);

drop policy if exists "Admins can read orders" on public.orders;
drop policy if exists "Buyers can read own orders" on public.orders;
drop policy if exists "Admins and buyers can read orders" on public.orders;
create policy "Admins and buyers can read orders" on public.orders
for select to authenticated
using (
  (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  or user_id = (select auth.uid())
);

drop policy if exists "Admins can read order items" on public.order_items;
drop policy if exists "Buyers can read own order items" on public.order_items;
drop policy if exists "Admins and buyers can read order items" on public.order_items;
create policy "Admins and buyers can read order items" on public.order_items
for select to authenticated
using (
  (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  or exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can delete orders" on public.orders;
create policy "Admins can delete orders" on public.orders
for delete to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update order status" on public.orders;
create policy "Admins can update order status" on public.orders
for update to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can read customers" on public.customers;
create policy "Admins can read customers" on public.customers
for select to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

commit;

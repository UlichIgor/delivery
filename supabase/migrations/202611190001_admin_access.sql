-- Admin role must be assigned to auth.users.app_metadata by a trusted server/admin tool.
-- Never assign this role from browser code or user-editable user_metadata.
grant select on public.orders, public.customers, public.order_items to authenticated;
grant update (status) on public.orders to authenticated;

drop policy if exists "Admins can read orders" on public.orders;
create policy "Admins can read orders" on public.orders for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update order status" on public.orders;
create policy "Admins can update order status" on public.orders for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can read customers" on public.customers;
create policy "Admins can read customers" on public.customers for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can read order items" on public.order_items;
create policy "Admins can read order items" on public.order_items for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

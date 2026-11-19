# Налаштування адмін-панелі Feast Sushi

Адреса адмін-панелі після публікації: `https://ulichigor.github.io/delivery/#/admin`.

## 1. Застосувати SQL-міграцію

У Supabase Dashboard відкрийте **SQL Editor**, вставте та виконайте вміст файлу:

`supabase/migrations/202611190001_admin_access.sql`

Вона надає авторизованим користувачам лише ті права, які потрібні адмін-панелі, а RLS дозволяє читати замовлення/клієнтів/позиції та змінювати статус тільки користувачам з `app_metadata.role = admin`.

## 2. Створити обліковий запис адміністратора

У Supabase Dashboard відкрийте **Authentication → Users → Add user** і створіть користувача з email та надійним паролем. Публічної реєстрації в адмін-панелі немає.

## 3. Надати роль admin

У SQL Editor виконайте запит, замінивши email на email створеного користувача:

```sql
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
WHERE email = 'YOUR_ADMIN_EMAIL';
```

Перевірити роль можна так:

```sql
SELECT email, raw_app_meta_data ->> 'role' AS role
FROM auth.users
WHERE email = 'YOUR_ADMIN_EMAIL';
```

Роль записується в `app_metadata`, а не в редаговані користувачем `user_metadata`. Не призначайте цю роль із браузерного коду. Після зміни ролі вийдіть із системи та увійдіть знову, щоб отримати оновлений JWT.

## 4. Перевірити роботу

1. Відкрийте `/#/admin`.
2. Увійдіть створеним користувачем.
3. Перевірте, що відображаються замовлення та їхні позиції.
4. Змініть статус тестового замовлення.

Якщо бачите помилку доступу до таблиці, перевірте, чи виконана міграція та чи роль користувача дорівнює `admin`.

**Безпека:** не додавайте `service_role` або `sb_secret` ключі до React-змінних середовища. Для браузера використовується лише publishable/anon key; обмеження доступу забезпечують RLS-політики.


## 5. Buyer accounts and order history

Apply the next migration after the admin migration:

`supabase/migrations/202611190002_buyer_roles_and_order_history.sql`

It assigns the `buyer` role to new customer accounts (and existing accounts that do not already have a role), adds a secure owner link to orders created while signed in, and adds RLS policies so buyers can read only their own orders and order items. Only admins can update order status or delete orders.

Customers can register or sign in at:

`https://ulichigor.github.io/delivery/#/account`

The normal checkout remains available without registration. Guest orders have no account owner and are visible only to admins. Orders made before a buyer account is used are not automatically attached to that account by phone number; this avoids exposing someone else's historical orders without identity verification.

After applying the migration, sign out and sign in again so Supabase Auth refreshes the JWT with the `buyer` role. Existing admin accounts keep their `admin` role.

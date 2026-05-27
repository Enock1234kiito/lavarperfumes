# Firebase setup — Lavara stock manager

The `/admin` page lets you upload new perfumes (image + name + category + price
+ notes) directly into Firestore + Storage. Best Sellers on the homepage reads
from that same Firestore collection live, so every upload appears immediately.

Before any of that works you need to:

## 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com).
2. Click **Add project** → name it (e.g. `lavara-prod`) → finish setup.
3. In the project, **Build → Authentication → Get started → Email/Password →
   Enable**.
4. **Build → Firestore Database → Create database** (start in production mode,
   pick a region close to your customers).
5. **Build → Storage → Get started** (same region as Firestore).

## 2. Create your admin user

In **Authentication → Users → Add user**, enter the email + password you'll
sign in with on `/admin`. Save them somewhere safe.

## 3. Wire env vars

1. In Firebase Console, **Project Settings → Your apps → Web app → Config**.
2. Copy the values into a new `.env.local` file in this repo (use
   `.env.local.example` as the template).
3. Set `NEXT_PUBLIC_ADMIN_EMAIL` to the same email you created in step 2.
4. Restart `npm run dev` so Next picks up the env vars.

## 4. Set Firestore + Storage security rules

These rules let everyone *read* products (so the public homepage works) and
let only your admin email *write* them.

### Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "YOUR_ADMIN_EMAIL_HERE";
    }
    match /testimonials/{id} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "YOUR_ADMIN_EMAIL_HERE";
    }
  }
}
```

### Storage rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{file=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "YOUR_ADMIN_EMAIL_HERE";
    }
  }
}
```

Replace `YOUR_ADMIN_EMAIL_HERE` with your admin email in both files, then
publish them in the Firebase Console.

## 5. Seed the starter products (optional)

1. Open `http://localhost:3000/admin`.
2. Sign in with the admin account.
3. Click **Seed initial 4** — this fetches the four PNGs from `/public/images/`,
   uploads them to Storage, and writes the corresponding Firestore docs.
4. The button greys out once products exist; from then on use the
   **Add product** form.

## What's where in the codebase

| File | What it does |
|---|---|
| `lib/firebase.ts` | Initializes Firebase app, Firestore, Storage, Auth |
| `lib/products.ts` | `subscribeProducts`, `createProduct`, `deleteProduct` |
| `lib/useAdminAuth.ts` | `useAdminAuth()` hook — exposes `user`, `isAdmin` |
| `components/BestSellers.tsx` | Subscribes to products live; falls back to `lib/data.ts` until Firestore returns rows |
| `app/admin/page.tsx` | Auth gate: not configured / loading / login / not authorized / panel |
| `app/admin/LoginForm.tsx` | Email + password sign-in |
| `app/admin/AdminPanel.tsx` | Upload form, product grid with delete, seed button |

## Public reads — no env vars yet?

If you haven't filled in `.env.local`, the homepage still renders using the
hardcoded products in `lib/data.ts`. Once Firebase is configured *and* a
products doc exists, the live data takes over automatically.

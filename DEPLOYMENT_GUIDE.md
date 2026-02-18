# 🚀 Canton Fair India — Deployment Guide

> **Goal:** Migrate Local WordPress → Hostinger, deploy Next.js frontend.

---

## Architecture Overview

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Vercel (FREE)     │ GraphQL │   Hostinger              │
│   Next.js Frontend  │────────▶│   WordPress Backend      │
│   cantonfairindia.in │        │   wp.cantonfairindia.in   │
└─────────────────────┘         └──────────────────────────┘
```

> ⚠️ **Important:** Hostinger shared hosting does NOT support Node.js. Use **Vercel** (free tier) for Next.js and **Hostinger** for WordPress only. This is the industry-standard "headless" setup.

---

## Part 1: Migrate WordPress to Hostinger

### Step 1: Export Local WordPress

#### Option A: Using "All-in-One WP Migration" Plugin (Easiest)
1. In your **Local WP** site, go to **Plugins → Add New**.
2. Search for **"All-in-One WP Migration"** → Install & Activate.
3. Go to **All-in-One WP Migration → Export**.
4. Click **Export To → File**.
5. Download the `.wpress` file (save it to your Desktop).

#### Option B: Manual Export (if plugin doesn't work)
1. **Export Database:**
   ```bash
   # Find your Local WP database credentials in Local WP app
   # Right-click your site → "Open Site Shell"
   
   wp db export ~/Desktop/cantonfairindia_db.sql
   ```

2. **Copy Files:**
   ```bash
   # Copy wp-content folder (themes, plugins, uploads)
   cp -r /Users/mac/Local\ Sites/cantonfairindiacom/app/public/wp-content ~/Desktop/wp-content-backup
   ```

### Step 2: Set Up WordPress on Hostinger

1. **Log in to Hostinger** → Go to **hPanel**.
2. Go to **Websites → Create or Manage**.
3. If you have a WordPress hosting plan:
   - Click **Auto Installer → WordPress**.
   - Install WordPress on your domain (e.g., `wp.cantonfairindia.com` or `cantonfairindia.com`).
4. Note down:
   - **WordPress Admin URL:** `https://yourdomain.com/wp-admin`
   - **FTP/File Manager access**

### Step 3: Import to Hostinger

#### Option A: Using "All-in-One WP Migration" (Matching Step 1A)
1. Log in to your **new Hostinger WordPress** admin.
2. Install **"All-in-One WP Migration"** plugin.
3. Go to **All-in-One WP Migration → Import**.
4. Upload the `.wpress` file you exported.
5. Done! All content, plugins, and settings are migrated.

#### Option B: Manual Import (Matching Step 1B)
1. **Import Database:**
   - Go to Hostinger **hPanel → Databases → phpMyAdmin**.
   - Select your WordPress database.
   - Click **Import** → upload `cantonfairindia_db.sql`.

2. **Upload Files:**
   - Go to Hostinger **hPanel → File Manager**.
   - Navigate to `public_html/wp-content/`.
   - Upload your backed-up `mu-plugins/`, `uploads/`, `plugins/`, and `themes/` folders.

3. **Update `wp-config.php`:**
   - In File Manager, edit `public_html/wp-config.php`.
   - Verify `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` match your Hostinger database credentials.

### Step 4: Update URLs (Search & Replace)

After migration, your database still references `cantonfairindiacom.local`. Fix this:

1. Install the **"Better Search Replace"** plugin on the Hostinger WordPress.
2. Go to **Tools → Better Search Replace**.
3. Search for: `http://cantonfairindiacom.local`
4. Replace with: `https://yourdomain.com`
5. Select **all tables** → Run.
6. Also search/replace any port-specific URLs (e.g., `cantonfairindiacom.local:10033`).

### Step 5: Install Required Plugins on Hostinger

Make sure these are active on your Hostinger WordPress:

| Plugin | Purpose | How to Install |
|--------|---------|----------------|
| **WPGraphQL** | GraphQL API for Next.js | Plugins → Add New → Search "WPGraphQL" |
| **MU-Plugin** | Custom post types & leads | Already in `wp-content/mu-plugins/` (auto-active) |

### Step 6: Enable SSL

1. In Hostinger **hPanel → SSL** → Enable **Free SSL** for your domain.
2. This ensures `https://` works (required for GraphQL).

### Step 7: Verify WordPress

1. Visit `https://yourdomain.com/wp-admin` → Confirm login works.
2. Visit `https://yourdomain.com/graphql` → You should see the GraphQL IDE.
3. Check **Site Content**, **Trips**, **FAQs**, **Visa Leads** are all present.

---

## Part 2: Deploy Next.js Frontend on Vercel (FREE)

### Step 1: Prepare Your Repository

Your GitHub repo is already set up at `https://github.com/naresh699/cantonfair.git`.

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub**.
2. Authorize Vercel to access your GitHub account.

### Step 3: Import Project

1. Click **"Add New" → "Project"**.
2. Select your repository: `naresh699/cantonfair`.
3. Vercel will detect it's a Next.js project.
4. **Configure:**
   - **Root Directory:** `frontend` (click "Edit" next to Root Directory)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

### Step 4: Set Environment Variables

In the Vercel project settings, go to **Settings → Environment Variables** and add:

```
WORDPRESS_API_URL = https://yourdomain.com/graphql
```

> Replace `yourdomain.com` with your actual Hostinger WordPress domain.

### Step 5: Deploy

1. Click **"Deploy"** — Vercel will build and deploy automatically.
2. You'll get a URL like `cantonfair-[hash].vercel.app`.
3. Every future `git push` to `main` will auto-deploy.

### Step 6: Connect Custom Domain

1. In Vercel → **Settings → Domains**.
2. Add your domain: `cantonfairindia.com`.
3. Vercel will show you DNS records to add.
4. In Hostinger **hPanel → DNS Zone Editor**:
   - Add an **A record**: `@` → `76.76.21.21` (Vercel's IP)
   - Add a **CNAME record**: `www` → `cname.vercel-dns.com`
5. Wait 5-30 minutes for DNS propagation.
6. Vercel auto-provisions SSL.

---

## Part 3: DNS Configuration Summary

| Record | Host | Value | Purpose |
|--------|------|-------|---------|
| A | `@` | `76.76.21.21` | Points main domain to Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | www subdomain to Vercel |
| A | `wp` | Hostinger server IP | WordPress admin subdomain |

> **Option 1:** Main domain → Vercel, `wp.yourdomain.com` → Hostinger WordPress  
> **Option 2:** Main domain → Vercel, WordPress stays on Hostinger's default subdomain

---

## Part 4: Post-Deployment Checklist

- [ ] WordPress is live on Hostinger with SSL
- [ ] WPGraphQL plugin is active
- [ ] MU-plugin (`cantonfairindia-leads.php`) is in `mu-plugins/`
- [ ] GraphQL endpoint responds: `https://yourdomain.com/graphql`
- [ ] All content migrated (Trips, FAQs, Site Content, Posts)
- [ ] URLs updated via Better Search Replace
- [ ] Vercel project created with `frontend/` as root directory
- [ ] `WORDPRESS_API_URL` environment variable set in Vercel
- [ ] Custom domain connected and SSL active
- [ ] Visa form submission working (test a submission)
- [ ] WhatsApp button working
- [ ] Email notifications working
- [ ] All pages rendering correctly

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GraphQL returns 404 | Ensure WPGraphQL plugin is active. Go to WP Admin → Settings → Permalinks → click "Save" |
| CORS errors | Install "WPGraphQL CORS" plugin or add headers in WordPress `.htaccess` |
| Images not loading | Run Better Search Replace to update old Local WP URLs |
| Form submission fails | Verify the API route sends to the correct WordPress URL |
| Slow first load | Normal — ISR caches after first visit (60s revalidation) |
| Build fails on Vercel | Check that Root Directory is set to `frontend` |

---

## Cost Summary

| Service | Cost |
|---------|------|
| Hostinger (WordPress hosting) | ~$2.99/month (Business plan recommended) |
| Vercel (Next.js hosting) | **FREE** (Hobby tier, perfect for this project) |
| Domain | Included with Hostinger or ~$10/year |
| **Total** | **~$3-4/month** |

---

**Need help?** Follow these steps in order. If you get stuck at any step, share the error message and I'll help you through it.

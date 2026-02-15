# Canton Fair India — WordPress Admin User Guide

> **Audience:** Site owner / non-technical administrator  
> **Purpose:** How to update every page on the website from the WordPress dashboard — no code changes needed.

---

## Table of Contents

1. [Logging In](#1-logging-in)
2. [Understanding the Dashboard](#2-understanding-the-dashboard)
3. [Updating the Home Page](#3-updating-the-home-page)
4. [Managing Sourcing Trips](#4-managing-sourcing-trips)
5. [Managing Blog Posts](#5-managing-blog-posts)
6. [Managing FAQs](#6-managing-faqs)
7. [Updating the Visa Page](#7-updating-the-visa-page)
8. [Updating the Canton Fair Page](#8-updating-the-canton-fair-page)
9. [Updating the Footer](#9-updating-the-footer)
10. [Managing Navigation Menus](#10-managing-navigation-menus)
11. [Managing Guidance Pages](#11-managing-guidance-pages)
12. [Managing Legal Pages](#12-managing-legal-pages)
13. [Viewing Visa Leads](#13-viewing-visa-leads)
14. [Adding Images](#14-adding-images)
15. [Important Notes](#15-important-notes)

---

## 1. Logging In

1. Go to `https://yourdomain.com/wp-admin` (replace with your actual domain).
2. Enter your **Username** and **Password**.
3. Click **Log In**.

You will see the WordPress Dashboard.

---

## 2. Understanding the Dashboard

The left sidebar contains all the content sections you can manage:

| Sidebar Item          | What It Controls                                             |
|-----------------------|--------------------------------------------------------------|
| **Site Content**      | Home page hero text, visa page features, footer text, canton fair "Why Us" section |
| **Trips**             | Sourcing trip cards shown on the home page and trips page    |
| **Posts**             | Blog articles shown on the Blog page                        |
| **FAQs**              | Questions & answers on the FAQ page                          |
| **Pages**             | Static pages like Visa, Canton Fair, Guidance, Terms, Privacy|
| **Visa Leads**        | Form submissions from visitors (read-only, for your review)  |
| **Menus** (Appearance)| Navigation links in the header and footer                    |

---

## 3. Updating the Home Page

The home page displays three things:

### A. Hero Section (Big Banner at the Top)
1. Go to **Site Content** in the sidebar.
2. Find the item titled **"Hero Section"** (slug: `hero-section`).
3. Click **Edit**.
4. **Title field** → This is the main heading (e.g., "China Business Excellence").
5. **Content editor** → This is the tagline text below the heading.
6. Click **Custom Fields** (you may need to enable it via Screen Options at the top):
   - `hero_heading` → Alternative heading text.
7. Click **Update** to save.

### B. Sourcing Trips Grid
See [Section 4: Managing Sourcing Trips](#4-managing-sourcing-trips).

### C. Blog Preview (Latest 3 Posts)
See [Section 5: Managing Blog Posts](#5-managing-blog-posts).

---

## 4. Managing Sourcing Trips

Trips appear as cards on the **Home Page** and the **Trips Page** (`/trips`).

### Adding a New Trip
1. Go to **Trips** → **Add New**.
2. **Title** → Name of the trip (e.g., "Guangzhou Canton Fair Tour — April 2026").
3. **Content** → Write a detailed description of the trip. This appears on the individual trip page.
4. **Custom Fields** (scroll down or enable via Screen Options):

| Field Name        | What It Does                               | Example Value                              |
|-------------------|--------------------------------------------|--------------------------------------------|
| `trip_price`      | Price shown on the card                    | `₹1,85,000 per person`                    |
| `trip_city`       | City badge on the trip card                | `Guangzhou`                                |
| `trip_features`   | Comma-separated feature list               | `B2B Matchmaking, Factory Visits, Visa Help`|
| `trip_image_url`  | URL to the trip's cover image              | `https://yourdomain.com/wp-content/uploads/trip1.jpg` |

5. Click **Publish**.

### Editing an Existing Trip
1. Go to **Trips** → click the trip name → make your changes → click **Update**.

### Deleting a Trip
1. Hover over the trip name → click **Trash**.

---

## 5. Managing Blog Posts

Blog posts appear on the **Blog page** (`/blog`) and the latest 3 are also shown on the **Home Page**.

### Adding a New Blog Post
1. Go to **Posts** → **Add New**.
2. **Title** → The headline of the article.
3. **Content** → Write your article using the editor (supports headings, lists, images, tables).
4. **Featured Image** (right sidebar) → Click **Set featured image** and upload a cover photo.
5. Click **Publish**.

### Editing / Deleting
- Same as Trips: click the post name to edit, or hover → Trash to delete.

---

## 6. Managing FAQs

FAQs appear on the **FAQ page** (`/faq`) as an accordion (click to expand).

### Adding a New FAQ
1. Go to **FAQs** → **Add New**.
2. **Title** → The question (e.g., "Do I need a business invitation for a Chinese Visa?").
3. **Content** → The answer to the question.
4. Click **Publish**.

### Reordering FAQs
FAQs are displayed in the order they were published (newest first). To change the order, update the published date of each FAQ.

---

## 7. Updating the Visa Page

The Visa page (`/visa`) has two dynamic parts:

### A. Main Page Content (Left Column)
1. Go to **Pages** → find **"Visa"** (or search for it).
2. Edit the content → Click **Update**.
3. The title and content will appear on the left side of the Visa page.

### B. Features & Form Title (Right Column)
1. Go to **Site Content** → find **"Visa Page Features"** (slug: `visa-features`).
2. Click **Edit**.
3. In **Custom Fields**, find `content_json`. It contains a JSON object:

```json
{
  "features": [
    "Official document handling",
    "Fast processing (3-5 days)",
    "Business Invitations included"
  ],
  "form_title": "Start Your Application"
}
```

4. Edit the text inside the quotes to change features or the form title.
5. Click **Update**.

> ⚠️ **Be careful** with the JSON format. Always keep the quotes, commas, and brackets intact.

---

## 8. Updating the Canton Fair Page

### A. Main Content (Left Column)
1. Go to **Pages** → find **"Canton Fair"**.
2. Edit the content → Click **Update**.
3. This content appears in the main body of the Canton Fair page.

### B. "Why Attend With Us?" Cards
1. Go to **Site Content** → find **"Canton Fair Page Content"** (slug: `canton-page-content`).
2. In **Custom Fields**, find `content_json`. It contains:

```json
{
  "why_us": [
    {
      "icon": "Users",
      "title": "Expert Delegation Leader",
      "description": "Travel with a seasoned China trade expert..."
    },
    {
      "icon": "ShieldCheck",
      "title": "Visa & Invitation Handled",
      "description": "We handle your Business Visa..."
    }
  ]
}
```

3. You can edit the `title` and `description` of each card.
4. **Available icon names**: `Users`, `ShieldCheck`, `Building2`, `Target`, `CreditCard`, `Trophy`, `Calendar`, `MapPin`, `Globe`, `Star`, `Zap`, `Heart`
5. Click **Update**.

---

## 9. Updating the Footer

1. Go to **Site Content** → find **"Footer Content"** (slug: `footer-content`).
2. In **Custom Fields**, find `content_json`:

```json
{
  "tagline_main": "Canton Fair India. Expert-led business guidance.",
  "tagline_sub": "Bridging Indo-China Business Alliances.",
  "copyright": "© 2026 Canton Fair India. All rights reserved."
}
```

3. Edit the values → Click **Update**.

---

## 10. Managing Navigation Menus

### Header Menu
1. Go to **Appearance** → **Menus**.
2. Select the menu named **"Header"** (or create one with slug `header`).
3. Add/remove/reorder menu items.
4. Click **Save Menu**.
5. The website will automatically pick up the changes.

### Footer Menu
1. Same process, but select/create a menu with slug **"Footer"**.
2. Typically contains: Terms & Conditions, Privacy Policy.

---

## 11. Managing Guidance Pages

Guidance pages (`/guidance`) are standard WordPress **Pages** with a parent page called **"Guidance"**.

### Adding a New Guide
1. Go to **Pages** → **Add New**.
2. Write the title and content.
3. In the right sidebar, under **Page Attributes** → set **Parent** to **"Guidance"**.
4. Add an **Excerpt** (short description shown on the overview page).
5. Click **Publish**.

### Editing
1. Go to **Pages** → find your guide → edit → **Update**.

---

## 12. Managing Legal Pages

Pages like **Terms & Conditions** and **Privacy Policy** are regular WordPress pages.

1. Go to **Pages** → find the relevant page.
2. Edit the content using the editor → Click **Update**.
3. These pages are accessible via their slug (e.g., `/terms-and-conditions`, `/privacy-policy`).

---

## 13. Viewing Visa Leads

When visitors submit the Visa form on the website, their details are saved automatically.

1. Go to **Visa Leads** in the sidebar.
2. You will see a table with columns: **Name, Email, Phone, Occupation, Requirement, Date**.
3. Click on any lead to view full details.
4. **You also receive email and WhatsApp notifications** for each new submission.

> 📌 Leads are **read-only** records. You cannot edit them from the frontend.

---

## 14. Adding Images

### Uploading Images
1. Go to **Media** → **Add New**.
2. Drag and drop or click to upload images.
3. After uploading, click the image → copy the **URL** from the right sidebar.

### Using Images in Trip Cards
Paste the copied URL into the `trip_image_url` custom field of the Trip.

### Using Images in Blog Posts
In the editor, click the **+** button → select **Image** → upload or select from Media Library.

---

## 15. Important Notes

| Topic                    | Details                                                                                 |
|--------------------------|-----------------------------------------------------------------------------------------|
| **Changes are not instant** | The website caches content for ~60 seconds. Wait a minute after updating to see your changes. |
| **JSON fields**          | Be very careful when editing `content_json` fields. Invalid JSON will break the section. |
| **Images**               | Always upload images to WordPress Media Library and use the WordPress URL.              |
| **Don't delete slugs**   | Pages with slugs like `visa`, `canton-fair`, `guidance`, `faq` must keep their slugs. Changing the slug will break the page. |
| **Menu slugs**           | Header menu must have slug `header`, footer menu must have slug `footer`.               |
| **Site Content slugs**   | Do not change slugs of Site Content items (`hero-section`, `visa-features`, `footer-content`, `canton-page-content`). |

---

**Need help?** Contact your developer for any changes beyond what's listed in this guide.

# 🇨🇳 Canton Fair India

**India's premier platform for Canton Fair sourcing trips, visa assistance, and China business guidance.**

> Built as a headless CMS: **WordPress** backend + **Next.js 16** frontend.

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- WordPress instance with [WPGraphQL](https://www.wpgraphql.com/) plugin installed
- MU-plugin (`cantonfairindia-leads.php`) deployed to `wp-content/mu-plugins/`

### Development
```bash
cd frontend
cp .env.local.example .env.local   # Set WORDPRESS_API_URL
npm install
npm run dev                        # → http://localhost:3000
```

### Production
```bash
cd frontend
npm run build
npm start
```

---

## Project Structure

```
cantonfairindiacom/
├── README.md                          ← You are here
├── TECHNICAL_ARCHITECTURE.md          ← Full technical deep-dive
├── USER_GUIDE.md                      ← WordPress admin guide (non-technical)
│
├── frontend/                          ← Next.js 16 Application
│   ├── app/                           ← App Router pages & API routes
│   ├── components/                    ← React components
│   ├── lib/wordpress.js               ← GraphQL client
│   ├── public/images/                 ← Static assets
│   └── .env.local                     ← WORDPRESS_API_URL
│
├── app/public/wp-content/mu-plugins/
│   └── cantonfairindia-leads.php      ← WordPress plugin (auto-active)
│
└── publish_post.py                    ← Blog seeding script
```

---

## Features

| Feature | Description |
|---------|-------------|
| **Sourcing Trips** | Dynamic trip listings managed via WordPress CPT |
| **Visa Assistance** | Multi-field form → stored as WP lead + email + WhatsApp notification |
| **Canton Fair Guide** | Official resources, badge process, phases, and "Why Us" section |
| **Blog** | SEO-optimized posts with featured images, pulled from WordPress |
| **FAQ** | Accordion-style Q&A, managed from WordPress dashboard |
| **Guidance Hub** | Child pages under a "Guidance" parent page |
| **WhatsApp Integration** | Floating chat button + post-submission lead forwarding |
| **Dynamic Content** | Footer, hero, visa features, and page content all from WordPress |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, Framer Motion |
| Backend | WordPress (headless), WPGraphQL |
| Icons | Lucide React |
| Fonts | Outfit + Inter (Google Fonts) |
| Notifications | wp_mail (Email) + CallMeBot (WhatsApp) |

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```
WORDPRESS_API_URL=http://your-wordpress-site.com/graphql
```

---

## Deployment

| Component | Recommended Platform |
|-----------|---------------------|
| Frontend | [Vercel](https://vercel.com) (auto-deploy from GitHub) |
| Backend | Hostinger / any WordPress host with HTTPS |
| Domain | Point A record to Vercel, optional subdomain for WP admin |

---

## Documentation

| Document | Audience | Contents |
|----------|----------|----------|
| [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md) | Developers | System design, data flow, APIs, component architecture, security |
| [USER_GUIDE.md](./USER_GUIDE.md) | Site Admin | Step-by-step WordPress dashboard instructions for all content updates |

---

## WordPress Custom Post Types

| Post Type | Dashboard Location | Website Section |
|-----------|--------------------|-----------------|
| `trip` | Trips | Home page cards + `/trips` |
| `faq` | FAQs | `/faq` page |
| `site_content` | Site Content | Hero, footer, visa features, canton fair cards |
| `visa_lead` | Visa Leads | Form submissions (read-only) |
| `itinerary_day` | Itinerary Days | Trip detail pages |

---

## License

Private project — © 2026 Canton Fair India. All rights reserved.

# 🚀 How to Update Your Live Site from Antigravity

This guide explains how to push changes to your live Canton Fair India website (Frontend + Backend) directly from this chat or your terminal.

---

## ⚡ The "Magic Command"
When you want to deploy **EVERYTHING** (Next.js design changes + WordPress theme/plugin code), just tell Antigravity:

> "Deploy my changes"

Or run this command in your terminal:

```bash
git add . && git commit -m "Update site" && git push origin main
```

---

## 🛠️ Setup Required (One-Time)

### 1. Vercel (Frontend)
**Status:** ✅ Already Configured
- Vercel automatically watches your GitHub repository.
- Any `git push` updates the `https://cantonfair.vercel.app/` frontend immediately.

### 2. Hostinger WordPress (Backend)
**Status:** ⚠️ Needs Configuration
To make WordPress update automatically when you push code, you need to add your FTP credentials to GitHub.

1.  **Get FTP Details** from Hostinger (hPanel → Files → FTP Accounts):
    -   **FTP Host** (e.g., `ftp.cantonfairindia.in`)
    -   **FTP Username** (e.g., `u123456789`)
    -   **FTP Password** (the one you set)

2.  **Add to GitHub Secrets**:
    -   Go to your Repo: [https://github.com/naresh699/cantonfair/settings/secrets/actions](https://github.com/naresh699/cantonfair/settings/secrets/actions)
    -   Click **"New repository secret"**.
    -   Add these 3 secrets:
        -   `FTP_SERVER`
        -   `FTP_USERNAME`
        -   `FTP_PASSWORD`

---

## 🔄 What Updates What?

| If you change... | Usage | How it updates |
| :--- | :--- | :--- |
| **Frontend Code** (`frontend/**`) | Design, layouts, Next.js pages | **Automatic** via Vercel (Instant) |
| **WordPress Themes/Plugins** (`app/public/wp-content/**`) | Custom PHP, functions, styles | **Automatic** via GitHub Actions (Requires Setup above) |
| **Site Content** (Posts, Pages) | Text, images, prices | **Manual** in WP Admin Dashboard (No deploy needed) |

---

## 🛑 Updates Not Working?

If WordPress changes aren't showing up:
1.  Check the **Actions** tab in GitHub to see if the deploy failed using [This Link](https://github.com/naresh699/cantonfair/actions).
2.  Ensure you didn't edit files directly on Hostinger (File Manager), or they might be overwritten.

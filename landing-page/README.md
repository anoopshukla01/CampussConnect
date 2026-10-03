# Campus Connect — Marketing Landing Page

The official marketing landing page for **Campus Connect**, built with **React + Vite** and plain, modular CSS matching the core application design system tokens.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd landing-page
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The dev server starts on [http://localhost:5174](http://localhost:5174).

### 3. Build for Production
```bash
npm run build
```
This outputs production assets to `landing-page/dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## ⚙️ Configuration Constants

All deployment-specific links and placeholders are centralized in [`src/constants/config.js`](./src/constants/config.js).

| Constant | Description | Default Value |
|---|---|---|
| `APP_URL` | Production destination URL for all "Open the app" CTA buttons (`target="_blank"`, `rel="noopener noreferrer"`) | `'https://campussconnect.me'` |
| `CONTACT_EMAIL` | Destination email address for the "Email us" CTA | `'YOUR-EMAIL@example.com'` |

---

## 🌐 Deployment (Vercel)

This application deploys as its own independent Vercel project:

1. **Framework Preset:** Vite
2. **Root Directory:** `landing-page`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`

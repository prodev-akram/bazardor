# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্য — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা — এর আজকের দাম এক নজরে দেখার ওয়েব অ্যাপ।
BazarDor is a responsive Bangla price-tracker that shows today's market prices, daily changes and per-market price ranges.

- **Live:** _add your deployed link here_
- **Repository:** _add your GitHub link here_

## Technologies

Next.js 14 (App Router) · TypeScript · Tailwind CSS · DaisyUI · BetterAuth (email/password, Google, GitHub) · MongoDB · react-hot-toast

## Key features

1. **Live price ticker** – an infinitely scrolling strip with emoji, price per unit and ▲/▼ change.
2. **Daily risers & fallers** – the top 6 products whose price went up or down today, plus the full product grid.
3. **Category pages with sorting** – sort by default, price low→high or high→low (numeric sort, Bengali digits handled).
4. **Product details with market breakdown** – min / max / average price and today's price in every market, grouped by division (protected route).
5. **Authentication** – BetterAuth email/password + Google + GitHub, toast feedback, protected-route redirects, profile page and name update.
6. Skeleton loaders, 404 pages with a way back home, and a layout that works on mobile, tablet and desktop.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Environment variables are described in `.env.example`. You need a MongoDB database (MongoDB Atlas free tier is fine) and, for social login, Google/GitHub OAuth apps whose callback URLs are `<BETTER_AUTH_URL>/api/auth/callback/google` and `/github`.

## Data

Prices come from the public API (`/products`, `/categories`) with an automatic fallback to the alternative base URL.

## Deployment (Vercel)

Import the repo, add the environment variables from `.env.example` (set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel URL), and deploy. Dynamic routes (`/product/[slug]`, `/category/[slug]`) work on refresh out of the box.

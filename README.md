# TazaMart — Fresh Groceries Delivered

**TazaMart** ("Fresh Food, Happy Life") is a complete online grocery store for
Karachi, Pakistan. Built with **Next.js 16**, **React 19**, **TypeScript** and
**Tailwind CSS v4**, it includes a full shopping flow: browse, search, filter,
cart, checkout, order tracking and account management — all client-side with
localStorage persistence (no backend required).

## Features

- **Home** — hero with search, category grid, promo banners, product tabs,
  deals countdown, rewards promos, "shop by needs" and best sellers
- **Shop** — live search (`?q=`), category / price / rating / on-sale filters,
  sorting, mobile filter drawer
- **Category pages** — banner header + sortable product grid
- **Deals** — countdown timer, deals of the day, all discounted items
- **Product pages** — gallery, ratings, quantity stepper, Buy Now, wishlist,
  description/reviews tabs, related products
- **Cart** — slide-over drawer + cart page, coupon codes
  (`WELCOME` = 10% off up to Rs 500, `FREESHIP` = free delivery),
  free-delivery progress bar (free over Rs 2,000)
- **Checkout** — 3 steps: contact/address → delivery slot + payment (COD, card,
  bank transfer) → review, with order confirmation screen
- **Track Order** — order ID lookup with a 4-stage delivery timeline
  (demo timeline for unknown `TM-` IDs), recent orders list
- **Account** — profile, order history, wishlist, saved addresses
- **About / Contact** — story, stats, values, contact form, FAQ accordion

## Getting Started

Requirements: **Node.js 18+** and npm.

```bash
cd tazamart
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # production build (must pass with zero errors)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project Structure

```
app/
  page.tsx                 Home page
  shop/                    Shop with filters & search
  category/[slug]/         Category pages (statically generated)
  product/[slug]/          Product detail pages (statically generated)
  deals/                   Deals & countdown
  cart/                    Cart page
  checkout/                3-step checkout
  track-order/             Order tracking
  account/                 Profile, orders, wishlist, addresses
  wishlist/                Wishlist page
  about/  contact/         Static pages
  layout.tsx               Font, providers, header/footer
  globals.css              Tailwind v4 theme (brand colors, font)
components/                Header, Footer, CartDrawer, ProductCard, ...
lib/
  data.ts                  8 categories, 36 products, helpers (formatRs, ...)
  store.tsx                Cart/wishlist/orders/user context + localStorage
```

## Notes

- Prices are in **Pakistani Rupees** (`Rs 1,850` via `toLocaleString("en-PK")`).
- Product images load from Unsplash (`images.unsplash.com` remote pattern).
- Orders, cart, wishlist, profile and addresses persist in the browser's
  `localStorage` — clearing site data resets them.

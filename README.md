# ShopLite — Product Listing & Detail

Amazon-style product listing and detail pages built for a frontend engineering assessment.

**API:** [DummyJSON Products](https://dummyjson.com/docs/products)  
**Stack:** React (Vite) · React Router · Context · Axios · SCSS

---

## Setup Instructions

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Features

- Product listing with image, title, price, discount, rating stars, and category badge
- Combined filters: search, multi-select category, multi-select brand, price range (Apply)
- Client-side pagination
- Collapsible filter sidebar (viewport-height with internal scroll)
- Product detail page with gallery, tags, reviews, specs, shipping/warranty/returns
- Filters preserved when navigating to detail and back (React Context)
- Loading, error + retry, and empty states

---

## Assumptions Made

1. **Catalog size is small enough for client-side work.** DummyJSON returns a limited product set, so the full catalog is loaded once and filtering/pagination run in the browser.
2. **Only two APIs are needed on app load:**  
   - `GET /products?limit=0&select=...` — full product list  
   - `GET /products/category-list` — category options  
   Product detail uses a third call: `GET /products/:id`.
3. **Brand options are derived from the loaded product list**, not a separate brands API.
4. **Filters are stored in React Context** (not URL search params), so back navigation restores them without syncing to the URL.
5. **Price filtering is applied only when the user clicks Apply**, after validation (e.g. min ≤ max).
6. **Search matches title, brand, and category** (case-insensitive) and works together with sidebar filters (AND logic).
7. **Styling is custom SCSS** — no UI component library (Material UI, etc.).
8. **Cart icon is display-only** for now (no cart state or checkout flow).

---

## Architectural Decisions

### Feature-based structure

```text
src/
├── api/                 # Shared Axios client + endpoint constants
├── app/                 # App shell, dynamic router config
├── features/
│   ├── filters/         # Filter UI, FilterContext, validation
│   └── products/        # Catalog, listing, detail, product API/hooks
├── layouts/             # Default layout (header, search, cart icon)
└── shared/              # Reusable UI (Pagination, Checkbox, StarRating, …)
```

Each feature owns its API wrappers, hooks, components, and (where needed) context.

### Dynamic routing

Routes are declared as config objects (`routes.js` + `routeConstants.js`) and mapped through `RouteWrapper` into `createBrowserRouter`. Adding a page means adding one config entry (with optional layout + lazy import).

### Catalog Context vs Filter Context

| Context | Responsibility |
|---------|----------------|
| `ProductCatalogProvider` | Fetch products + categories once; expose brands derived from products |
| `FilterProvider` | Hold UI filter state (search, categories, brands, price, page) and actions |

Both wrap the router so state survives listing ↔ detail navigation.

### Client-side filtering & pagination

After the initial catalog fetch:

1. Apply search  
2. Apply category (multi)  
3. Apply brand (multi)  
4. Apply price range  
5. Paginate the filtered result  

No extra list API calls on filter or page changes.

### Separation of concerns

| Layer | Role |
|-------|------|
| `productApi.js` | Thin Axios wrappers |
| Hooks (`useProducts`, `useProductDetail`, `useFilters`) | Data/state orchestration |
| Pages | Compose UI + wire hooks |
| Presentational components | Render only (e.g. `ProductCard`, `ProductGallery`) |
| Shared components | Reusable across features (`Pagination`, `CheckboxGroup`, `StarRating`) |

### Why Context (not Redux / React Query)

- Assessment scope is small; Context avoids prop drilling and preserves filters on back navigation.
- A single catalog fetch does not need React Query’s cache/stale-while-revalidate model.
- Explicit actions (`toggleCategory`, `applyPrice`, `setPage`) keep validation and “reset page to 1” in one place.

### Price Apply + validation

Draft min/max values live in `PriceFilter` until Apply. `validatePrice` runs in context; errors surface via `FormField`. Invalid ranges are not committed.

---

## Improvements If Given More Time

1. **Sync filters to URL search params** — shareable/bookmarkable listing links; restore state on hard refresh.
2. **React Query (or similar)** — cache catalog/detail, background refresh, request deduplication.
3. **Real cart** — cart context, add-to-cart from detail, badge count on the header icon, cart drawer/page.
4. **Skeletons** — replace plain “Loading…” with card/detail skeletons for better perceived performance.
5. **Accessibility pass** — focus management when opening/closing the sidebar, keyboard support for gallery, stronger labels.
6. **Unit tests** — especially `productHelpers` filter/pagination and `validatePrice`.
7. **Virtualized grid** — if the dataset grew much larger.
8. **TypeScript** — stronger contracts for product/filter shapes.
9. **Image optimization / lazy gallery** — progressive loading and blur placeholders.
10. **Deploy demo** — e.g. Vercel/Netlify with a public demo link in this README.

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## License

Private assessment project.

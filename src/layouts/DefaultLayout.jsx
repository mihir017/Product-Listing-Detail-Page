import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import SearchBar from '@/shared/components/SearchBar';
import ScrollToTop from '@/shared/components/ScrollToTop';
import './DefaultLayout.scss';

export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <ScrollToTop />

      <header className="default-layout__header">
        <Link to={ROUTES.HOME} className="default-layout__brand">
          ShopLite
        </Link>

        <SearchBar />

        <button
          type="button"
          className="default-layout__cart"
          aria-label="Cart"
        >
          <svg
            className="default-layout__cart-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2.3 4.2c-.2.4 0 .8.4.8H19M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
      <main className="default-layout__main">{children ?? <Outlet />}</main>
    </div>
  );
}

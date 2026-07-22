import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import SearchBar from '@/shared/components/SearchBar';
import './DefaultLayout.scss';

export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <header className="default-layout__header">
        <Link to={ROUTES.HOME} className="default-layout__brand">
          ShopLite
        </Link>

        <SearchBar />

        <p className="default-layout__tagline">Product listing & details</p>
      </header>
      <main className="default-layout__main">{children ?? <Outlet />}</main>
    </div>
  );
}

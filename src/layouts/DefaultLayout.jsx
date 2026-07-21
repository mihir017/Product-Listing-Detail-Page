import { Outlet } from 'react-router-dom';
import './DefaultLayout.scss';

export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <header className="default-layout__header">
        <div className="default-layout__brand">ShopLite</div>
        <p className="default-layout__tagline">Product listing & details</p>
      </header>
      <main className="default-layout__main">{children ?? <Outlet />}</main>
    </div>
  );
}

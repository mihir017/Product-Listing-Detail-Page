import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME}>Go to products</Link>
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <section>
      <Link to={ROUTES.HOME}>← Back to products</Link>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
    </section>
  );
}

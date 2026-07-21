import { useNavigate, useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import useProductDetail from '../hooks/useProductDetail';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useProductDetail(id);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div className="product-detail-page__error">
        <h2>{error}</h2>
        <button type="button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-page">
      <button
        type="button"
        className="product-detail-page__back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;

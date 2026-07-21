import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import './ProductGrid.scss';

const ProductGrid = ({ products }) => {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;

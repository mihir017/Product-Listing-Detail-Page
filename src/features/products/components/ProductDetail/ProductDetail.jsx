import PropTypes from 'prop-types';
import ProductGallery from '../ProductGallery';
import './ProductDetail.scss';

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <ProductGallery
        key={product.id}
        images={product.images}
        thumbnail={product.thumbnail}
        title={product.title}
      />

      <div className="product-detail__content">
        <h1>{product.title}</h1>

        <p className="product-detail__category">{product.category}</p>

        <p className="product-detail__description">{product.description}</p>

        <h2>${product.price}</h2>

        <p>⭐ {product.rating}</p>

        <p>Stock : {product.stock}</p>

        <p>Brand : {product.brand || '—'}</p>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetail;

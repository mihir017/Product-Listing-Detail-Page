import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import './ProductCard.scss';

const ProductCard = ({ product, key }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id));
  };

  return (
    <article className="product-card" key={key} onClick={handleClick}>
      <div className="product-card__image">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>

        <p className="product-card__category">{product.category}</p>

        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <span className="product-card__rating">⭐ {product.rating}</span>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default memo(ProductCard);

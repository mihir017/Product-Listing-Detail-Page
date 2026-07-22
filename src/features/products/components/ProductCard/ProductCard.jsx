import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import StarRating from '@/shared/components/StarRating';
import './ProductCard.scss';

const formatPrice = (price) => {
  const amount = Number(price);

  if (Number.isNaN(amount)) {
    return '—';
  }

  return `$${amount.toFixed(2)}`;
};

const getOriginalPrice = (price, discountPercentage) => {
  const amount = Number(price);
  const discount = Number(discountPercentage);

  if (Number.isNaN(amount) || Number.isNaN(discount) || discount <= 0) {
    return null;
  }

  return amount / (1 - discount / 100);
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : 0;
  const discount = Number(product.discountPercentage);
  const hasDiscount = !Number.isNaN(discount) && discount > 0;
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage
  );

  const handleClick = () => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id));
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="product-card__image">
        <span className="product-card__badge">{product.category}</span>
        {hasDiscount ? (
          <span className="product-card__discount-badge">
            -{discount.toFixed(0)}%
          </span>
        ) : null}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__price-row">
          <p className="product-card__price">{formatPrice(product.price)}</p>
          {originalPrice ? (
            <p className="product-card__price-original">
              {formatPrice(originalPrice)}
            </p>
          ) : null}
        </div>

        {product.stock != null ? (
          <p className="product-card__meta">
            {product.stock} {product.stock === 1 ? 'item' : 'items'} available
          </p>
        ) : product.brand ? (
          <p className="product-card__meta">{product.brand} available</p>
        ) : null}

        <StarRating rating={product.rating} count={reviewCount} />
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default memo(ProductCard);

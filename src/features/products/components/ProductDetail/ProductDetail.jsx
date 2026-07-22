import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/router/routeConstants';
import StarRating from '@/shared/components/StarRating';
import ProductGallery from '../ProductGallery';
import ProductReviews from '../ProductReviews';
import './ProductDetail.scss';

const formatPrice = (price) => {
  const amount = Number(price);
  if (Number.isNaN(amount)) return '—';
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

const ProductDetail = ({ product }) => {
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const tags = Array.isArray(product.tags) ? product.tags : [];
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage
  );
  const summary =
    product.description?.split('.')[0]?.trim() ||
    product.description ||
    '';

  return (
    <div className="product-detail">
      <div className="product-detail__layout">
        <div className="product-detail__info">

          {tags.length > 0 ? (
            <div className="product-detail__tags">
              {tags.map((tag) => (
                <span key={tag} className="product-detail__tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="product-detail__title">{product.title}</h1>

          {summary ? (
            <p className="product-detail__summary">{summary}.</p>
          ) : null}

          <div className="product-detail__rating-row">
            <StarRating
              rating={product.rating}
              showValue
              valueInParens
            />
            <span className="product-detail__rating-meta">
              {reviews.length} Customer Review{reviews.length === 1 ? '' : 's'}
            </span>
            {product.stock != null ? (
              <span className="product-detail__rating-meta">
                {product.stock} in stock
              </span>
            ) : null}
          </div>

          <div className="product-detail__price-block">
            <div className="product-detail__price-row">
              <span className="product-detail__price">
                {formatPrice(product.price)}
              </span>
              {originalPrice ? (
                <span className="product-detail__price-original">
                  {formatPrice(originalPrice)}
                </span>
              ) : null}
              {product.discountPercentage ? (
                <span className="product-detail__discount">
                  -{Number(product.discountPercentage).toFixed(0)}%
                </span>
              ) : null}
            </div>
            <p className="product-detail__payment-note">
              {product.availabilityStatus || 'In Stock'}
              {product.minimumOrderQuantity
                ? ` · Min. order ${product.minimumOrderQuantity}`
                : ''}
            </p>
          </div>

          <div className="product-detail__divider" />

          <div className="product-detail__specs">
            {product.brand ? (
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            ) : null}
            {product.sku ? (
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
            ) : null}
            {product.weight != null ? (
              <p>
                <strong>Weight:</strong> {product.weight}
              </p>
            ) : null}
            {product.dimensions ? (
              <p>
                <strong>Dimensions:</strong>{' '}
                {product.dimensions.width} × {product.dimensions.height} ×{' '}
                {product.dimensions.depth}
              </p>
            ) : null}
          </div>

          <div className="product-detail__description-block">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-detail__features">
            {product.shippingInformation ? (
              <div className="product-detail__feature">
                <span className="product-detail__feature-icon" aria-hidden="true">
                  🚚
                </span>
                <div>
                  <p className="product-detail__feature-title">Shipping</p>
                  <p className="product-detail__feature-text">
                    {product.shippingInformation}
                  </p>
                </div>
              </div>
            ) : null}

            {product.warrantyInformation ? (
              <div className="product-detail__feature">
                <span className="product-detail__feature-icon" aria-hidden="true">
                  🛡️
                </span>
                <div>
                  <p className="product-detail__feature-title">Warranty</p>
                  <p className="product-detail__feature-text">
                    {product.warrantyInformation}
                  </p>
                </div>
              </div>
            ) : null}

            {product.returnPolicy ? (
              <div className="product-detail__feature">
                <span className="product-detail__feature-icon" aria-hidden="true">
                  ↺
                </span>
                <div>
                  <p className="product-detail__feature-title">Returns</p>
                  <p className="product-detail__feature-text">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <ProductGallery
          key={product.id}
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
        />
      </div>

      <ProductReviews reviews={reviews} />
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetail;

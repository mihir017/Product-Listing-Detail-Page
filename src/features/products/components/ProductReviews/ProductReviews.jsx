import PropTypes from 'prop-types';
import StarRating from '@/shared/components/StarRating';
import './ProductReviews.scss';

const formatReviewDate = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

const ProductReviews = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <section className="product-reviews">
        <h2 className="product-reviews__heading">Customer Reviews</h2>
        <p className="product-reviews__empty">No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="product-reviews">
      <h2 className="product-reviews__heading">
        Customer Reviews ({reviews.length})
      </h2>

      <ul className="product-reviews__list">
        {reviews.map((review, index) => (
          <li
            key={`${review.reviewerEmail}-${index}`}
            className="product-reviews__item"
          >
            <div className="product-reviews__item-header">
              <div>
                <p className="product-reviews__name">{review.reviewerName}</p>
                <p className="product-reviews__date">
                  {formatReviewDate(review.date)}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="product-reviews__comment">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

ProductReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

export default ProductReviews;

import PropTypes from 'prop-types';
import './StarRating.scss';

const STARS = [1, 2, 3, 4, 5];

const StarRating = ({
  rating = 0,
  count,
  showValue = false,
  valueInParens = false,
}) => {
  const value = Number(rating) || 0;
  const clamped = Math.min(5, Math.max(0, value));
  const reviewCount = Number(count);
  const formattedValue = clamped.toFixed(2);

  return (
    <div
      className="star-rating"
      role="img"
      aria-label={`Rating ${formattedValue} out of 5`}
    >
      <div className="star-rating__stars">
        {STARS.map((star) => {
          const fill = Math.min(1, Math.max(0, clamped - (star - 1))) * 100;

          return (
            <span key={star} className="star-rating__star">
              <span className="star-rating__star-empty" aria-hidden="true">
                ★
              </span>
              <span
                className="star-rating__star-filled"
                style={{ width: `${fill}%` }}
                aria-hidden="true"
              >
                ★
              </span>
            </span>
          );
        })}
      </div>

      {showValue ? (
        <span className="star-rating__value">
          {valueInParens ? `(${formattedValue})` : formattedValue}
        </span>
      ) : null}

      {Number.isFinite(reviewCount) ? (
        <span className="star-rating__count">({reviewCount})</span>
      ) : null}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showValue: PropTypes.bool,
  valueInParens: PropTypes.bool,
};

export default StarRating;

import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './ProductGallery.scss';

const ProductGallery = ({ images = [], thumbnail, title }) => {
  const galleryImages = useMemo(() => {
    const list = Array.isArray(images) ? images.filter(Boolean) : [];

    if (list.length > 0) {
      return list;
    }

    return thumbnail ? [thumbnail] : [];
  }, [images, thumbnail]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex] || galleryImages[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <img src={activeImage} alt={title} />
      </div>

      {galleryImages.length > 1 ? (
        <div className="product-gallery__thumbs">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-gallery__thumb ${
                index === activeIndex ? 'is-active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

export default ProductGallery;

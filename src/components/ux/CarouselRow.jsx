/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import PropTypes from 'prop-types';
import ItemCard from '../Card/ItemCard';
import { formatNumber, loopArray } from '../../utils';

/**
 * CarouselRow — horizontally scrolling, infinitely looping row of image-based items.
 *
 * @param {Object[]} items - Array of items to render. Each item:
 *   @param {string} items[].image - Image URL for the item (required).
 *   @param {string} items[].name  - Display name for the item (required).
 *
 * @param {'left'|'right'} [direction='left'] - Scroll direction of the carousel.
 * @param {string} [speed='20s'] - Animation duration, e.g. '15s', '30s'.
 * @param {boolean} [pauseOnHover=true] - Whether to pause scrolling when hovered.
 * @param {string} [carouselClass=''] - Extra CSS/Tailwind classes for the outer container.
 * @param {string} [itemClass='min-w-[150px]'] - Extra CSS/Tailwind classes for each item.
 * @param {string} [itemSpacing='1rem'] - Gap between items; any valid CSS length.
 *
 * Designed for seamless infinite loops—duplicate items in the render logic as needed.
 * Tailwind classes can adjust styling without modifying component code.
 */
function CarouselRow({
  items,
  direction = 'left',
  speed = '20s',
  pauseOnHover = true,
  carouselClass = '',
  itemClass = 'min-w-[150px]',
  itemSpacing = '1rem',
}) {
  const animationClass =
    direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
  const hoverPauseClass = pauseOnHover
    ? 'hover:[animation-play-state:paused]'
    : '';
  const duplicatedItems = loopArray(items); // Duplicate items for seamless scrolling

  return (
    <div
      className={`overflow-hidden w-full will-change-transform ${carouselClass}`}
    >
      <div
        className={`flex justify-center items-center w-fit whitespace-nowrap ${animationClass} ${hoverPauseClass}`}
        style={{
          '--gap': formatNumber(itemSpacing, 2),
          gap: itemSpacing,
          animationDuration: speed,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`carousel-item-${index}`}
            className={`${itemClass}`}
          >
            <ItemCard
              imageSrc={item.image}
              name={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

CarouselRow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
  speed: PropTypes.string,
  pauseOnHover: PropTypes.bool,
  carouselClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemSpacing: PropTypes.string,
};

CarouselRow.defaultProps = {
  direction: 'left',
  speed: '20s',
  pauseOnHover: true,
  carouselClass: '',
  itemClass: 'min-w-[150px]',
  itemSpacing: '1rem',
};

export default CarouselRow;

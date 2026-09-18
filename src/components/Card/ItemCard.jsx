import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * **Description**
 *
 * A presentational component that displays an image, title, and optional link.
 *
 * **Props**
 *
 * @param {string} image - Image URL to display. Required.
 * @param {string} name  - Text label or title shown below/alongside the image. Required.
 * @param {string} [address] - Optional URL. If provided, it navigates to this address.
 *
 * **Styling/Structure:**
 * - Supports responsive scaling when used in grid, flex, or carousel contexts.
 *
 * **Best Practices:**
 * - Pass optimized image sizes to avoid layout shifts and performance penalties.
 * - Ensure `name` is concise yet descriptive for accessibility and clarity.
 */

function ItemCard({ imageSrc, name, address }) {
  return (
    <div className="w-full h-full">
      <img
        src={imageSrc}
        alt={name}
        className="object-cover"
        loading="lazy"
      />
      {name && (
        <>
          <p className="mt-2 text-sm">{name}</p>
          <hr className="w-10 my-2 border-red-700 rounded-3xl" />
        </>
      )}
      {address && (
        <Link
          to={address}
          className="text-blue-600 hover:text-blue-900"
        >
          More Details
        </Link>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string,
  address: PropTypes.string,
};

ItemCard.defaultProps = {
  name: '',
  address: '',
};

export default ItemCard;

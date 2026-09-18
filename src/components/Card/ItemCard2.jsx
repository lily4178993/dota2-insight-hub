/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';

function ItemCard2({ imageSrc, title, description }) {
  return (
    <div className="p-6 text-center border group rounded-3xl lg:p-9 md:border-none">
      <img
        src={imageSrc}
        alt={title}
        className="object-cover p-1 mx-auto mb-5 size-12"
        loading="lazy"
      />
      {title && (
        <span className="text-lg text-[#f1c607]/90 duration-1000 group-hover:text-[#f1c607] mb-3">
          {title}
        </span>
      )}
      {description && (
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      )}
    </div>
  );
}

ItemCard2.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ItemCard2;

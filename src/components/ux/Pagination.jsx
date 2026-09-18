import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

/**
 * Pagination component for navigating through paged data.
 *
 * @param {Object} props - Component props.
 * @param {number} props.itemsPerPage - Number of items displayed per page.
 * @param {number} props.itemCount - Total number of items.
 * @param {function} props.onPageChange - Callback function called
 * with the new item offset when the page changes.
 * @param {number} props.itemOffset - Current offset (index) of the first item displayed.
 * @returns {JSX.Element} The rendered pagination controls.
 */
function Pagination({
  itemsPerPage, itemCount, onPageChange, itemOffset,
}) {
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handlePageClick = (event) => {
    onPageChange(event.selected * itemsPerPage);
  };

  const showPreviousButton = itemOffset !== 0;
  const currentPage = Math.floor(itemOffset / itemsPerPage);
  const showNextButton = currentPage < pageCount - 1;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        showNextButton ? (
          <span className="ml-2 text-xl font-semibold">{'>'}</span>
        ) : null
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={
        showPreviousButton ? (
          <span className="mr-2 text-xl font-semibold">{'<'}</span>
        ) : null
      }
      renderOnZeroPageCount={null}
      containerClassName="flex gap-0.5 justify-center items-center mt-8 mb-4 px-4"
      pageClassName="block border-solid bg-white text-slate-700 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/50 focus-within:bg-white/50"
      pageLinkClassName="w-6 h-6 text-center rounded-full"
      breakLinkClassName="mx-2"
      activeLinkClassName="text-white bg-slate-900"
    />
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemOffset: PropTypes.number.isRequired,
};

export default Pagination;

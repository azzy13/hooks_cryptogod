import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

const Pagination = ({ page, totalPages, handlePagination }) => {
  return (
    <div className='Pagination'>
      <button
        className='Pagination-button'
        onClick={() => handlePagination('prev')}
        disabled={page <= 1}
      >
        &larr;
      </button>

      <span className='Pagination-info'>
        page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        className='Pagination-button'
        onClick={() => handlePagination('next')}
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
};

export default Pagination;

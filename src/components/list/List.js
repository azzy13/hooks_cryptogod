import React, { Fragment, useEffect, useState } from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Table from './Table';
import Loading from '../common/Loading';
import Pagination from '../list/Pagination';

const List = () => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;

        setCurrencies(currencies);
        settotalPages(totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.errorMessage);
      });
  }, [page]);

  const handlePagination = (direction) => {
    let nextPage = page;

    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    setPage(nextPage);
  };

  // below lines work if loading is set to true
  if (loading) {
    return (
      <div className='loading-container'>
        <Loading />
      </div>
    );
  }

  // Checks for errors
  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <Fragment>
      <Table currencies={currencies} />
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </Fragment>
  );
};

export default List;

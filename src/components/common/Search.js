import React, { useState } from 'react';
import Loading from './Loading';
import { withRouter } from 'react-router-dom';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import './Search.css';

const Search = ({ history }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    // if query is not present dont send request to the API
    if (!searchValue) {
      return '';
    }

    setLoading(true);

    fetch(`${API_URL}/autocomplete?searchQuery=${searchValue}`)
      .then(handleResponse)
      .then((result) => {
        console.log(result);

        setLoading(false);
        setSearchResults(result);
      });
  };

  const handleRedirect = (currencyId) => {
    // Clear state
    setSearchQuery('');
    setSearchResults([]);

    history.push(`/hooks_cryptogod/currency/${currencyId}`);
  };

  const displayResults = () => {
    if (!searchQuery) {
      return '';
    }

    if (searchResults.length > 0) {
      return (
        <div className='Search-result-container'>
          {searchResults.map((result) => (
            <div
              key={result.id}
              className='Search-result'
              onClick={() => handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className='Search-result-container'>
          <div className='Search-no-result'>No results found.</div>
        </div>
      );
    }
  };

  return (
    <div className='Search'>
      <span className='Search-icon' />

      <input
        className='Search-input'
        type='text'
        placeholder='Currency name'
        onChange={handleChange}
        value={searchQuery}
      />

      {loading && (
        <div className='Search-loading'>
          <Loading width='12px' height='12px' />
        </div>
      )}

      {displayResults()}
    </div>
  );
};

export default withRouter(Search);

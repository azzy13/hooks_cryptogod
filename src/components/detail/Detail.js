import React, { useEffect, useState } from 'react';
import './Detail.css';
import { handleResponse, changePercent } from '../../helper';
import { API_URL } from '../../config';
import Loading from '../common/Loading';

const Detail = (props) => {
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencyId = props.match.params.id;
  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        setLoading(false);
        setError(null);
        setCurrencies(currency);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.errorMessage);
      });
  }, [currencyId]);

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

  console.log('currency', currencies);

  return (
    <div className='Detail'>
      <h1 className='Detail-heading'>
        {currencies.name} ({currencies.symbol})
      </h1>

      <div className='Detail-container'>
        <div className='Detail-item'>
          Price <span className='Detail-value'>$ {currencies.price}</span>
        </div>
        <div className='Detail-item'>
          Rank <span className='Detail-value'> {currencies.rank}</span>
        </div>
        <div className='Detail-item'>
          24h Change
          <span className='Detail-value'>
            {changePercent(currencies.percentChange24h)}
          </span>
        </div>
        <div className='Detail-item'>
          <span className='Detail-title'>Market Cap</span>
          <span className='Detail-dollar'>$</span>
          {currencies.marketCap}
        </div>
        <div className='Detail-item'>
          <span className='Detail-title'>24H Volume</span>
          <span className='Detail-dollar'>$</span>
          {currencies.volume24h}
        </div>
        <div className='Detail-item'>
          <span className='Detail-title'>Total Supply</span>
          {currencies.totalSupply}
        </div>
      </div>
    </div>
  );
};

export default Detail;

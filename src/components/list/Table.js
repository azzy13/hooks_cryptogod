import React from 'react';
import { withRouter } from 'react-router-dom';
import './Table.css';
import PropTypes from 'prop-types';
import { changePercent } from '../../helper';

const Table = ({ currencies, history }) => {
  return (
    <div>
      <div className='Table-container'>
        <table className='Table'>
          <thead className='Table-head'>
            <tr>
              <th>CryptoCurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody className='Table-body'>
            {currencies.map((currency) => (
              <tr
                key={currency.id}
                onClick={() =>
                  history.push(`/hooks_cryptogod/currency/${currency.id}`)
                }
              >
                <td>
                  <span className='Table-rank'>{currency.rank}</span>
                  {currency.name}
                </td>
                <td>
                  <span className='Table-dollar'>$ </span>
                  {currency.price}
                </td>
                <td>
                  <span className='Table-dollar'>$ </span>
                  {currency.marketCap}
                </td>
                <td>{changePercent(currency.percentChange24h)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  currencies: PropTypes.array.isRequired,
};

export default withRouter(Table);

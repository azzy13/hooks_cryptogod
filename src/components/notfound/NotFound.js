import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <h1 className='NotFound-title'>Oops! Page Not Found </h1>

      <Link to='/hooks_cryptogod/' className='NotFound-link'>
        Go To Homepage
      </Link>
    </div>
  );
};

export default NotFound;

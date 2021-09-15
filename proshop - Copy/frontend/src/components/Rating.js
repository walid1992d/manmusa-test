import React from 'react';

const Rating = ({ value, text, color }) => {
  return (
    <div className='my-3'>
      <span>
        {' '}
        <i style={{ color }} className={value > 0.5 ? 'fas fa-star' : value === 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color }} className={value > 1.5 ? 'fas fa-star' : value === 0.5 ? 'fas fa-half-star' : 'far fa-star'}></i>
      </span>
      <span>
        {' '}
        <i style={{ color }} className={value > 2.5 ? 'fas fa-star' : value === 0.5 ? 'fas fa-half-star' : 'far fa-star'}></i>
      </span>
      <span>
        {' '}
        <i style={{ color }} className={value > 3.5 ? 'fas fa-star' : value === 0.5 ? 'fas fa-half-star' : 'far fa-star'}></i>
      </span>
      <span>
        {' '}
        <i style={{ color }} className={value > 4.5 ? 'fas fa-star' : value === 0.5 ? 'fas fa-half-star' : 'far fa-star'}></i>
      </span>
      <p></p>
      <span style={{ fontSize: '.8rem' }}>{text ? `from ${text} reviews ` : 0}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825'
};

export default Rating;

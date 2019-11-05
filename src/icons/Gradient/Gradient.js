import React from 'react';

const Gradient = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="63" height="26" viewBox="0 0 63 26">
      <defs>
        <linearGradient id="a" x1="0%" x2="28.416%" y1="50%" y2="50%">
            <stop offset="0%" stopColor="#0097A7" stopOpacity="0"/>
            <stop offset="100%" stopColor="#0097A7"/>
        </linearGradient>
      </defs>
      <path fill="url(#a)" fillRule="evenodd" d="M0 14h63v26H0z" transform="translate(0 -14)"/>
    </svg>
  );
};

export default Gradient;
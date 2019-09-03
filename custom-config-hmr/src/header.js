import React from 'react';

function Header ({ title, color }) {
  return <p style={{ fontWeight: 'lighter', fontSize: '32px', color }}>{title}</p>;
};

export default Header;

import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>MCA Portal</h1>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
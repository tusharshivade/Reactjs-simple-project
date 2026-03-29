import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px', height: '100vh', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
      <h3>MCA Resources</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Syllabus</a></li>
        <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Notes</a></li>
        <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Projects</a></li>
        <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Assignments</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
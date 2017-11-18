import React from 'react';
import jwtDecode from 'jwt-decode';


const EditorNavbar = () => (
  <nav className="editor-navbar">
    <ul>
      <h3 id='username'>{jwtDecode(localStorage.token).username}</h3>
    </ul>
  </nav>
);

export default EditorNavbar;

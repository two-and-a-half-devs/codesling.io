import React from 'react';
import jwtDecode from 'jwt-decode';


const EditorNavbar = () => (
  <nav className="editor-navbar">
    <ul>
      <li id='username'>{jwtDecode(localStorage.token).username}</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </nav>
);

export default EditorNavbar;

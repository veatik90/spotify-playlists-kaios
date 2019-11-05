 import React from 'react';

 const login = () => (
  <a id="login" href={`${process.env.REACT_APP_SPOTIFY_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&show_dialog=true`}>Login</a>
 );

 export default login;
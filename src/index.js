import React, { useState,useEffect  } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import AuthContext from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MainApp = () => {




  const initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
useEffect(() => {
  const validateToken = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error.message || 'Token invalid'
        );
      }

      console.log('Token Valid');
    } catch (err) {
      console.log('Token Expired');

      logoutHandler();
    }
  };

  validateToken();
}, [token]);
  const loginHandler = (token) => {
    setToken(token);

    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);

    localStorage.removeItem('token');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

root.render(<MainApp />);
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import AuthContext from './store/auth-context';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();

  const adjExpirationTime =
    new Date(expirationTime).getTime();

  const remainingDuration =
    adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedEmail = localStorage.getItem('email');

  const storedExpirationTime =
    localStorage.getItem('expirationTime');

  const remainingTime =
    calculateRemainingTime(
      storedExpirationTime
    );

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    localStorage.removeItem(
      'expirationTime'
    );

    return null;
  }

  return {
    token: storedToken,
    email: storedEmail,
    duration: remainingTime,
  };
};

const tokenData = retrieveStoredToken();

const MainApp = () => {
  let initialToken;
  let initialEmail;

  if (tokenData) {
    initialToken = tokenData.token;
    initialEmail = tokenData.email;
  }

  const [token, setToken] =
    useState(initialToken);

  const [email, setEmail] =
    useState(initialEmail);

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
              'Content-Type':
                'application/json',
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error.message
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

  const loginHandler = (token, userEmail) => {
    setToken(token);
    setEmail(userEmail);

    localStorage.setItem(
      'token',
      token
    );

    localStorage.setItem(
      'email',
      userEmail
    );

    const expirationTime = new Date(
       new Date().getTime() + 5 * 60 * 1000

    );

    localStorage.setItem(
      'expirationTime',
      expirationTime.toISOString()
    );
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'email'
    );

    localStorage.removeItem(
      'expirationTime'
    );
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

root.render(<MainApp />);
import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    setError('');
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Authentication failed');
      }

      console.log('TOKEN:', data.idToken);

      authCtx.login(data.idToken);

      // Redirect to products page after successful login
      history.replace('/products');
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>

          <input
            type='email'
            id='email'
            required
            ref={emailInputRef}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>

          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>

        {error && <p className={classes.error}>{error}</p>}

        <div className={classes.actions}>
          {!isLoading && (
            <button>
              Login
            </button>
          )}

          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
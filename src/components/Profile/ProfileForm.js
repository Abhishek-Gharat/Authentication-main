import { useRef, useContext } from 'react';

import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword =
      passwordInputRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error.message || 'Failed to change password'
        );
      }

      console.log(data);

      alert('Password changed successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}
    >
      <div className={classes.control}>
        <label htmlFor='new-password'>
          New Password
        </label>

        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={passwordInputRef}
        />
      </div>

      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
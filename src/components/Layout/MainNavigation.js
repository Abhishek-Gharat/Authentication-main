import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <NavLink to='/' className={classes.logo}>
        React Auth
      </NavLink>

      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <NavLink to='/auth'>Login</NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <Fragment>
              <li>
                <NavLink to='/profile'>Profile</NavLink>
              </li>

              <li>
                <button onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
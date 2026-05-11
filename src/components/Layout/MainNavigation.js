import { Fragment, useContext } from 'react';
import {
  NavLink,
  useHistory,
} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();

    history.replace('/auth');
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
                <NavLink to='/profile'>
                  Profile
                </NavLink>
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
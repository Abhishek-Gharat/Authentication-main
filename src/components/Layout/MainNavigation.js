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

    history.replace('/');
  };

  return (
    <header className={classes.header}>
      <NavLink to='/' className={classes.logo}>
        React Auth
      </NavLink>

      <nav>
        <ul>
          <li>
            <NavLink to='/' exact>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to='/about'>
              About
            </NavLink>
          </li>

          {!authCtx.isLoggedIn && (
            <li>
              <NavLink to='/auth'>Login</NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <Fragment>
              <li>
                <NavLink to='/products'>
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to='/cart'>
                  Cart
                </NavLink>
              </li>

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
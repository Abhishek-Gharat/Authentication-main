import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        <Route path='/about'>
          <AboutPage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path='/profile'>
            <UserProfile />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path='/products'>
            <ProductsPage />
          </Route>
        )}

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';

import Layout from './components/Layout/Layout';
import AuthContext from './store/auth-context';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const UserProfile = lazy(() => import('./components/Profile/UserProfile'));

// Loading Fallback Component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: '#333'
  }}>
    ⏳ Loading...
  </div>
);

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
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

          {!authCtx.isLoggedIn && (
            <Route path='/products'>
              <Redirect to='/auth' />
            </Route>
          )}

          {!authCtx.isLoggedIn && (
            <Route path='/cart'>
              <Redirect to='/auth' />
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

          {authCtx.isLoggedIn && (
            <Route path='/cart'>
              <CartPage />
            </Route>
          )}

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
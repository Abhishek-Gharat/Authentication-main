import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Cart.module.css';
import AuthContext from '../../store/auth-context';
import { cleanEmailForAPI } from '../../utils/emailUtils';

const Cart = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, [authCtx.email]);

  const fetchCartItems = async () => {
    if (!authCtx.email) {
      setError('User email not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const cleanedEmail = cleanEmailForAPI(authCtx.email);
const apiUrl = `https://crudcrud.com/api/dacd659f75754c6f92765a0702d8bed8/cart-${cleanedEmail}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          // No items in cart yet
          setCartItems([]);
        } else {
          throw new Error('Failed to fetch cart items');
        }
      } else {
        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      }

    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCartHandler = async (itemId) => {
    if (!authCtx.email) {
      setError('User email not found. Please log in again.');
      return;
    }

    try {
      setDeletingId(itemId);

      const cleanedEmail = cleanEmailForAPI(authCtx.email);
      const apiUrl = `https://crudcrud.com/api/dacd659f75754c6f92765a0702d8bed8/cart${cleanedEmail}/${itemId}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }

      // Remove item from local state
      setCartItems(cartItems.filter(item => item._id !== itemId));
      
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove product from cart. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <section className={classes.cart}>
        <h1>Shopping Cart</h1>
        <p>Loading cart items...</p>
      </section>
    );
  }

  return (
    <section className={classes.cart}>
      <h1>Shopping Cart</h1>
      
      {error && <p className={classes.error}>{error}</p>}

      {cartItems.length === 0 ? (
        <div className={classes.emptyCart}>
          <p>Your cart is empty</p>
          <button onClick={() => history.push('/products')} className={classes.continueBtn}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className={classes.cartItems}>
            {cartItems.map((item) => (
              <div key={item._id} className={classes.cartItem}>
                <div className={classes.itemInfo}>
                  <h3>{item.name}</h3>
                  <p className={classes.description}>{item.description}</p>
                  <div className={classes.priceQuantity}>
                    <span className={classes.price}>${item.price.toFixed(2)}</span>
                    <span className={classes.quantity}>Qty: {item.quantity || 1}</span>
                  </div>
                </div>
                <button
                  className={classes.removeBtn}
                  onClick={() => removeFromCartHandler(item._id)}
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id ? 'Removing...' : 'Remove'}
                </button>
              </div>
            ))}
          </div>

          <div className={classes.cartSummary}>
            <div className={classes.total}>
              <span>Total Price:</span>
              <span className={classes.totalAmount}>${calculateTotal()}</span>
            </div>
            <div className={classes.actions}>
              <button 
                onClick={() => history.push('/products')} 
                className={classes.continueBtn}
              >
                Continue Shopping
              </button>
              <button className={classes.checkoutBtn}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;

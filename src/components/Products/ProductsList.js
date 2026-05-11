import { useState, useEffect, useContext } from 'react';
import classes from './ProductsList.module.css';
import AuthContext from '../../store/auth-context';
import { cleanEmailForAPI } from '../../utils/emailUtils';

const ProductsList = () => {
  const authCtx = useContext(AuthContext);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulated products data
    // In a real app, this would fetch from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        price: 29.99,
        description: 'High-quality product',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 39.99,
        description: 'Best seller item',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 49.99,
        description: 'Premium quality',
      },
      {
        id: 4,
        name: 'Product 4',
        price: 59.99,
        description: 'Exclusive collection',
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const addToCartHandler = async (product) => {
    if (!authCtx.email) {
      setError('User email not found. Please log in again.');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');

      const cleanedEmail = cleanEmailForAPI(authCtx.email);
const apiUrl = `https://crudcrud.com/api/76950c8237b64ffbaaf54811f1d6646c/cart-${cleanedEmail}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: 1,
          addedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
      
      setSuccessMessage(`${product.name} added to cart!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) {
    return <section className={classes.products}><p>Loading products...</p></section>;
  }

  return (
    <section className={classes.products}>
      <h1>Our Products</h1>
      {error && <p className={classes.error}>{error}</p>}
      {successMessage && <p className={classes.success}>{successMessage}</p>}
      <div className={classes.productsList}>
        {products.map((product) => (
          <div key={product.id} className={classes.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={classes.price}>${product.price.toFixed(2)}</p>
            <button 
              className={classes.addBtn}
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;

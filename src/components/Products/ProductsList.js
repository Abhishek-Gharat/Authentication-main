import { useState, useEffect } from 'react';
import classes from './ProductsList.module.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulated products data
    // In a real app, this would fetch from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        price: '$29.99',
        description: 'High-quality product',
      },
      {
        id: 2,
        name: 'Product 2',
        price: '$39.99',
        description: 'Best seller item',
      },
      {
        id: 3,
        name: 'Product 3',
        price: '$49.99',
        description: 'Premium quality',
      },
      {
        id: 4,
        name: 'Product 4',
        price: '$59.99',
        description: 'Exclusive collection',
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return <section className={classes.products}><p>Loading products...</p></section>;
  }

  return (
    <section className={classes.products}>
      <h1>Our Products</h1>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.productsList}>
        {products.map((product) => (
          <div key={product.id} className={classes.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={classes.price}>{product.price}</p>
            <button className={classes.addBtn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;

import classes from './AboutContent.module.css';

const AboutContent = () => {
  return (
    <section className={classes.about}>
      <h1>About Us</h1>
      <p>
        Welcome to our React Authentication Application. This platform provides
        secure user authentication using Firebase Authentication API.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Secure login and logout functionality</li>
        <li>Firebase Authentication integration</li>
        <li>Token-based session management</li>
        <li>Protected routes for authenticated users</li>
        <li>Product browsing for logged-in users</li>
      </ul>
      <h2>How it Works</h2>
      <p>
        Simply log in with your credentials, and you'll have access to our
        product catalog. Your session is securely stored and verified on every
        page load.
      </p>
    </section>
  );
};

export default AboutContent;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerSection">
        <div className="footerColumn">
          <h4>Customer Support</h4>
          <ul>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Returns & Exchanges</li>
            <li>Bestkind Buy Gift Cards</li>
            <li>About Bestkind Marketplace</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h4>My Best Buy Account</h4>
          <ul>
            <li>Order Status</li>
            <li>Manage Account</li>
            <li>Preference Center</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h4>Services</h4>
          <ul>
            <li>Nerd Group</li>
            <li>Bestkind Membership</li>
            <li>Monthly Subscription</li>
            <li>Bestkind Financing</li>
            <li>Bestkind Health</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h4>About Us</h4>
          <ul>
            <li>Careers</li>
            <li>Corporate Information</li>
            <li>Newsroom</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h4>Partner With Us</h4>
          <ul>
            <li>Advertise with Bestkind Buy</li>
            <li>Become a Bestkind Affiliate</li>
            <li>Sell on Bestkind Marketplace</li>
          </ul>
        </div>
        <div className="footerColumn newsletter">
          <h4>Be the first to know</h4>
          <p>
            Sign up to stay in the loop about the hottest deals, coolest new
            products, and exclusive sales events.
          </p>
          <form className="newsletterForm">
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

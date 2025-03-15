import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="footer2-section section section-padding">
        <div className="container">
          <div className="row learts-mb-n40">

            <div className="col-lg-6 learts-mb-40">
              <div className="widget-about">
                <img src="/assets/images/logo/logo-2.webp" alt="Learts Logo" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque recusandae commodi mollitia facere iure nisi, laudantium quis quas perferendis a minus dolores.</p>
              </div>
            </div>

            <div className="col-lg-4 learts-mb-40">
              <div className="row">
                <div className="col">
                  <ul className="widget-list">
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/store-location">Store location</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="widget-list">
                    <li><Link to="/returns">Returns</Link></li>
                    <li><Link to="/support-policy">Support Policy</Link></li>
                    <li><Link to="/size-guide">Size Guide</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-2 learts-mb-40">
              <ul className="widget-list">
                <li><i className="fab fa-twitter"></i> <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><i className="fab fa-facebook-f"></i> <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><i className="fab fa-instagram"></i> <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><i className="fab fa-youtube"></i> <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Youtube</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      
      <div className="footer2-copyright section">
        <div className="container">
          <p className="copyright text-center">© {new Date().getFullYear()} learts. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;



import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@el7a2ni.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Business Hours</h5>
            <p>Saturday - Thursday : 8:00 AM - 5:00 PM</p>
            <p>Friday: Closed</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faFacebook} />{' '}
                <a href="#/">Facebook</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faTwitter} />{' '}
                <a href="#/">Twitter</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faLinkedin} />{' '}
                <a href="#/">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 el7a2ni. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

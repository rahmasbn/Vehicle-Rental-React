import React from 'react';
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

import "./footer.css"

function Footer() {
    return (
        <footer>
        <div className="container">
            <div className="row">
                <div className="description col-lg-3">
                    <img src={logo} alt="logo" className="logo-footer" />
                    <p>
                        <br />
                        Plan and book your perfect trip with expert advice, travel trip
                        for vehicle information from us
                    </p>
                    <p className="copyright">
                        &copy;2020 Vehicle Rental Center. All right reserved </p><br />
                </div>
                <div className="footer-col destination col-sm-4 col-md-4 col-lg-3">
                    <p>Destinations</p>
                    <ul>
                        <li><Link to="#">Bali</Link></li>
                        <li><Link to="#">Yogyakarta</Link></li>
                        <li><Link to="#">Jakarta</Link></li>
                        <li><Link to="#">Kalimantan</Link></li>
                        <li><Link to="#">Malang</Link></li>
                    </ul>
                </div>
                <div className="footer-col col-sm-4 col-md-4 col-lg-3">
                    <p>Vehicles</p>
                    <ul>
                        <li><Link to="#">Bike</Link></li>
                        <li><Link to="#">Cars</Link></li>
                        <li><Link to="#">Motorbike</Link></li>
                        <li><Link to="#">Return Times</Link></li>
                        <li><Link to="#">FAQs</Link></li>
                    </ul>
                </div>
                <div className="footer-col interest col-sm-4 col-md-4 col-lg-3">
                    <p>Interests</p>
                    <ul>
                        <li><Link to="#">Advanture Travel</Link></li>
                        <li><Link to="#">Art And Culture</Link></li>
                        <li><Link to="#">Wildlife And Nature</Link></li>
                        <li><Link to="#">Family Holidays</Link></li>
                        <li><Link to="#">Culinary Trip</Link></li>
                    </ul>
                </div>
            </div>
            <br />
            <hr />
        </div>
        <div className="social-links">
            <Link to="#"><i className="fab fa-twitter"></i></Link>
            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
            <Link to="#"><i className="fab fa-youtube"></i></Link>
        </div>
    </footer>
    )
}

export default Footer

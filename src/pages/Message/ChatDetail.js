import React from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
import fixieGray from "../../assets/images/fixie-gray.webp";
import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";

function ChatDetail() {
    return (
        <>
        <Header/>
        <div className="container">
        <header className="info-user">
          <div className="img-arrow">
            <Link to="/message">
              <img src={leftArrowIcon} alt="left arrow" />
            </Link>
          </div>
          
        </header>
        </div>

        <Footer/>
            
        </>
    )
}

export default ChatDetail

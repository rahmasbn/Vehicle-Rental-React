import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./message.css";

import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";
import SearchBar from "../../components/SearchBar";

function Message() {
  return (
    <>
      <Header />

      <div className="container">
        <section className="search-filter">
          <div className="row">
            {/* <SearchBar /> */}
          </div>
        </section>
        <div className="message">
          <div className="wrapper-msg-1">
            <div className="row">
              <div className="img-profile-user col-lg-1 col-md-1 col-sm-1 col-2">
                <img
                  src={samanthaPic}
                  alt="img-profile-user"
                  className="rounded-circle"
                />
              </div>
              <div className="chat-text col-lg-10 col-md-8 col-sm-7 col-7">
                <p>User 1</p>
                <p className="chat-preview">
                  Hey, is the vespa still available?
                </p>
              </div>
              <div className="msg-time col-lg-1 col-md-2 col-sm-2 col-3">
                <p>Just now</p>
                <p className="qty-msg">1</p>
              </div>
            </div>
          </div>
          <div className="wrapper-msg-2">
            <div className="row">
              <div className="img-profile-user col-lg-1 col-md-1 col-sm-1 col-2">
                <img
                  src={samanthaPic}
                  alt="img-profile-user"
                  className="rounded-circle"
                />
              </div>
              <div className="chat-text col-lg-10 col-md-8 col-sm-7 col-7">
                <p>User 2</p>
                <p className="chat-preview-old">Thank you</p>
              </div>
              <div className="msg-time col-lg-1 col-md-2 col-sm-2 col-3">
                <p>Yesterday</p>
              </div>
            </div>
          </div>
          <div className="wrapper-msg-1">
            <div className="row">
              <div className="img-profile-user col-lg-1 col-md-1 col-sm-1 col-2">
                <img
                  src={samanthaPic}
                  alt="img-profile-user"
                  className="rounded-circle"
                />
              </div>
              <div className="chat-text col-lg-10 col-md-8 col-sm-7 col-7">
                <p>User 1</p>
                <p className="chat-preview">
                  Hey, is the vespa still available?
                </p>
              </div>
              <div className="msg-time col-lg-1 col-md-2 col-sm-2 col-3">
                <p>Just now</p>
                <p className="qty-msg">1</p>
              </div>
            </div>
          </div>
          <div className="wrapper-msg-2 last">
            <div className="row">
              <div className="img-profile-user col-lg-1 col-md-1 col-sm-1 col-2">
                <img
                  src={samanthaPic}
                  alt="img-profile-user"
                  className="rounded-circle"
                />
              </div>
              <div className="chat-text col-lg-10 col-md-8 col-sm-7 col-7">
                <p>User 2</p>
                <p className="chat-preview-old">Thank you</p>
              </div>
              <div className="msg-time col-lg-1 col-md-2 col-sm-2 col-3">
                <p>Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Message;

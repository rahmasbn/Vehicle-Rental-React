import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./message.css";

import samanthaPic from "../../assets/images/girl-with-red-clothes.webp";
import searchIcon from "../../assets/icons/search.svg";
// import SearchBar from "../../components/SearchBar";
// import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Message() {
  return (
    <>
      <Header />

      <div className="container">
        <section className="row searchBar">
          <div className="search-chat col-lg-10 col-md-9 col-sm-8 col-8">
            {/* <div className="row"> */}
            {/* <SearchBar placeholder="Search chat" /> */}
            <div className="search-input d-flex">
              <input type="text" placeholder="Search Chat" />
            </div>
            <div className="iconSearch">
              {/* <div className="search-icon"> */}
                <img
                  src={searchIcon}
                  alt="search button"
                  className="search-button"
                  width={30}
                  height={30}
                />
              {/* </div> */}
            </div>
          </div>
          <div className="type-chat col-lg-2 col-md-3 col-sm-4 col-4">
            <select id="messages" className="sort-chat">
              <option value="">Sort By</option>
              <option value="">Read Date</option>
              <option value="">Date Added</option>
              <option value="">Name</option>
            </select>
          </div>
        </section>

        <div className="message">
          <Link to="/room-chat">
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
          </Link>
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

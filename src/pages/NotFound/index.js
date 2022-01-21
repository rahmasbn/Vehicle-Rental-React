import React from "react";
import { Link } from "react-router-dom";

import invalidRoute from "../../assets/images/404.jpg";

function NotFound() {
  return (
    <>
      <div className="img-notFound">
        <img
          src={invalidRoute}
          alt="404"
          style={{
            width: "40%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
      <p className="text-center" style={{ color: "coral", fontSize: "1.5rem" }}>
        The page you are looking for can't be found.{" "}
        <Link to="/" style={{ textDecoration: "none" }}>
          Back to home.
        </Link>
      </p>
    </>
  );
}

export default NotFound;

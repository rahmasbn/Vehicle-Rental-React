import React from "react";

import "./loading.css";

function Loading() {
  return (
    <div className="loadingWrapper">
      <div className="titleSkeleton"></div>
      <div className="contentSkeleton"></div>
    </div>
  );
}

export default Loading;

import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Cart from "./Cart";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Cart,
  errorBoundary(err, info, props) {
    return <div>Error</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

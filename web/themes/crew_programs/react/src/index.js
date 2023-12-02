import React, { useState } from "react";
import { render } from "react-dom";
import Navbar from "./components/Navbar";

const Root = () => {
  // global menu state for passing to Navbar component
  const [active, setActive] = useState(false);
  const clickHandler = () => {
    setActive(!active);
  };
  return <Navbar clickHandler={clickHandler} active={active} />;
  // return (
  //   <div>
  //     <button onClick={clickHandler}>{active ? "active" : "disabled"}</button>
  //     Other text.
  //   </div>
  // );
};

render(<Root />, document.querySelector("#programs-header"));

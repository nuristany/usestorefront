import React from "react";

const HumbergurMenu = () => {
  return (
    <div className="navigation" >
      <div className="menu" onClick="onClickMenu()">
        <div id="bar1" className="bar"></div>
        <div id="bar2" className="bar"></div>
        <div id="bar3" className="bar"></div>
      </div>
      <ul className="humberger-nav" id="humberger-nav">
        <li a href="#">About</li>
        <li a href="#">About</li>
        <li a href="#">About</li>
      </ul>
    </div>
  );
};

export default HumbergurMenu;

import React from "react";
import "../css/style.css";

const Next = (props) => {
  let style = {
    // color: "#fff",
    backgroundImage: `${"url(http://localhost:5004/netherland.png)"}`,

    position: "absolute",
    zIndex: 0,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.5,
  };
  return (
    <div>
      <div style={style}>Welcome</div>
    </div>
  );
};
export default Next;

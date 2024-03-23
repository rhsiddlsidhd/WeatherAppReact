import React from "react";

const Loading = () => {
  const imgPath = process.env.REACT_APP_IMG_PATH;

  return (
    <>
      <img src={`${imgPath}/Loading.gif`} style={{ width: "50px" }}></img>
    </>
  );
};

export default Loading;

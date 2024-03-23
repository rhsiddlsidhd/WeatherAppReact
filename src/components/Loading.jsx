import React from "react";

const Loading = () => {
  const imgPath = process.env.REACT_APP_IMG_PATH;

  return (
    <>
      <img
        src={`${imgPath}/Loading.gif`}
        alt="이미지"
        style={{ width: "50px" }}
      />
    </>
  );
};

export default Loading;

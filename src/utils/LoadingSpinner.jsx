import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <>
      <div className="absolute top-0 z-10 h-[100vh] w-[100vw] bg-black opacity-80"></div>
      <div className="absolute top-0  z-20 flex h-[100vh] w-[100vw] items-center justify-center">
        <SyncLoader color={"#7C3AED"} loading={true} size={15} />
      </div>
    </>
  );
};

export default LoadingSpinner;

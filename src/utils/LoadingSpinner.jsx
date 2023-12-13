import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <>
      <div className="absolute z-10 h-[100vh] w-[100vw] bg-black opacity-80"></div>
      <div className="absolute z-20  flex h-[100vh] w-[100vw] items-center justify-center">
        <SyncLoader color={"#18b7f7"} loading={true} size={15} />
      </div>
    </>
  );
};

export default LoadingSpinner;

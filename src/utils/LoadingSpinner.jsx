import React, { useEffect } from "react";
import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-black opacity-80"></div>
      <div className="fixed left-0 top-0 z-[100] flex h-[100vh] w-[100vw] items-center justify-center">
        <SyncLoader color={"#7C3AED"} loading={true} size={15} />
      </div>
    </>
  );
};

export default LoadingSpinner;

import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth ?? 0; // Handle null or undefined
      setIsMobile(width <= 768);
    };

    const handleResize = () => checkIsMobile();

    window.addEventListener("resize", handleResize);
    checkIsMobile();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}

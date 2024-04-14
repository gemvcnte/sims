import React, { useEffect, useState } from "react";
import { EnrollmentProvider } from "./useEnrollment";
import Header from "./partials/Header";

export default function EnrollmentLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <main className="flex h-[100svh] items-center justify-center px-4">
        <p className="text-center">
          Enrollment form is only accessible through the MRMNHS computer lab.
          <br />
          <br />
          <br />
          If you need assistance, feel free to reach out to our friendly
          administrators! 🤝
        </p>
      </main>
    );
  }

  return (
    <EnrollmentProvider>
      <Header />

      {children}
    </EnrollmentProvider>
  );
}

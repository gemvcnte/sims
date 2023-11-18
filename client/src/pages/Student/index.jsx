import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return <div></div>;
}

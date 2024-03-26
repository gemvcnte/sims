import { useLocation } from "react-router-dom";

// Custom hook to determine active classes for sidebar items based on the current location and provided paths
const useActiveClasses = (paths) => {
  const location = useLocation();
  const isActive = paths.some((path) => {
    if (typeof path === "string") {
      return location.pathname === path;
    } else if (path instanceof RegExp) {
      return path.test(location.pathname);
    }
    return false;
  });

  const activeClasses = isActive ? "bg-primary text-background" : "";

  return activeClasses;
};

export default useActiveClasses;

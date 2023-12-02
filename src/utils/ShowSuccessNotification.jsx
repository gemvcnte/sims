import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
  });
};

export default showSuccessNotification;

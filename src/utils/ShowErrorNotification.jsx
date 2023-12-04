import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showErrorNotification = (message) => {
  toast.error(message, {
    position: "top-right",
  });
};

export default showErrorNotification;

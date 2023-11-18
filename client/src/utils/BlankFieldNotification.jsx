import { toast } from "react-toastify";

const notify = () => {
  toast.warn("Please fill in all required fields (*)", {
    theme: "light",
  });
};

export default notify;

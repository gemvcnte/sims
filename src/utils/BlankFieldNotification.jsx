import { toast } from "react-toastify";

const notify = () => {
  toast.warn(
    <div>
      Please fill in all required fields (
      <span style={{ color: "red" }}>*</span>)
    </div>,
    {
      theme: "light",
    },
  );
};

export default notify;

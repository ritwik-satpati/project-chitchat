import { useEffect } from "react";
import toast from "react-hot-toast";

const useApiErrors = (isError, error, fallback) => {
  useEffect(() => {
    if (isError) {
      if (fallback) {
        fallback();
      } else {
        toast.error(error?.data?.message || "Something went wrong !");
      }
    }
  }, [isError, error, fallback]);
};

export default useApiErrors;

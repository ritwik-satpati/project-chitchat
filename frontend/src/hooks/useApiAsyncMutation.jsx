import { useState } from "react";
import toast from "react-hot-toast";

const useApiAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Processing ...");

    try {
      const res = await mutate(args);

      if (res.data) {
        toast.success(res?.data?.message || "Successful", { id: toastId });
        setIsSuccess(true);
        setData(res?.data?.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong !", {
          id: toastId,
        });
        setIsSuccess(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, isSuccess, data];
};

export default useApiAsyncMutation;

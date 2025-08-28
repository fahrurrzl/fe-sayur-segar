import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useActivation = () => {
  const activationService = async (code: string) => {
    const res = await authService.activation(code);
    return res.data.data;
  };

  const { mutate: mutateActivation, isPending: isPendingActivation } =
    useMutation({
      mutationFn: (code: string) => activationService(code),
      onSuccess: () => {},
      onError: (error) => {
        console.log(error);
      },
    });

  return {
    mutateActivation,
    isPendingActivation,
  };
};

export default useActivation;

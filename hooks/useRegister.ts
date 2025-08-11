import { useState } from "react";

const useRegister = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return {
    isVisiblePassword,
    setIsVisiblePassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
  };
};

export default useRegister;

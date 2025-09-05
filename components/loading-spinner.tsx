import { Spinner } from "@heroui/react";

const LoadingSpinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner size="lg" color="success" />
    </div>
  );
};
export default LoadingSpinner;

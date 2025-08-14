"use client";

import { Spinner } from "@heroui/react";

const loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner size="lg" color="success" />
    </div>
  );
};

export default loading;

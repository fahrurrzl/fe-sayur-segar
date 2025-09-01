"use client";

import { Button } from "@heroui/button";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="bordered"
            onPress={() => router.push("/")}
            className="shrink-0"
          >
            <FiArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-800 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-200 text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

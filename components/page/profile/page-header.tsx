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
    <div className="bg-white shadow-sm sticky top-0 z-50">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

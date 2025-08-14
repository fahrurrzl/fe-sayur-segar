import cn from "@/utils/cn";
import { ChangeEvent, useEffect, useId, useRef } from "react";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import { Button, Spinner } from "@heroui/react";
import { FiTrash } from "react-icons/fi";

interface PropTypes {
  className?: string;
  name: string;
  isDroppable?: boolean;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  isUploading?: boolean;
  isDeleting?: boolean;
  preview?: string;
}

const InputFile = (props: PropTypes) => {
  const {
    className,
    name,
    isDroppable = false,
    onUpload,
    onDelete,
    preview,
    isUploading,
    isDeleting,
  } = props;

  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDroppable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };
  return (
    <label
      ref={drop}
      htmlFor={`file-dropzone-${dropzoneId}`}
      className={cn(
        "flex min-h-32 w-full cursor-pointer flex-col rounded-md border-2 border-dashed border-gray-400 bg-gray-50 hover:bg-gray-100",
        className
      )}
    >
      {preview ? (
        <div className="flex flex-col items-center justify-center p-4 relative">
          <div className="mb-2 w-1/2 relative">
            {/* Delete Button */}
            <Button
              className="absolute top-2 right-2 z-50"
              color="danger"
              isIconOnly
              onPress={onDelete}
              isLoading={isDeleting}
              disabled={isDeleting}
            >
              <FiTrash />
            </Button>
            <Image
              src={preview}
              alt="image"
              fill
              className="!relative rounded-lg"
            />
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">
            {preview.split("/").pop()}
          </p>
        </div>
      ) : (
        !preview && (
          <div className="m-auto flex w-1/2 flex-col items-center justify-center gap-2">
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <p className="text-center text-sm font-semibold text-gray-500">
                  Uploading...
                </p>
              </div>
            ) : (
              <>
                <BsUpload size={32} className="text-gray-500" />
                <p className="text-center text-sm font-semibold text-gray-500">
                  {isDroppable
                    ? "Drag and drop or click here to upload image"
                    : "Click here to upload image"}
                </p>
              </>
            )}
          </div>
        )
      )}

      <input
        type="file"
        name={name}
        id={`file-dropzone-${dropzoneId}`}
        className="hidden"
        accept="image/*"
        onChange={handleOnUpload}
        disabled={preview !== "" || isUploading}
        onClick={(e) => {
          e.currentTarget.value = "";
          e.target.dispatchEvent(new Event("change", { bubbles: true }));
        }}
      />
    </label>
  );
};
export default InputFile;

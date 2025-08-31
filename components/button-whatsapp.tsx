import { Button } from "@heroui/button";
import { MdWhatsapp } from "react-icons/md";

interface PropTypes {
  phone: string;
  message: string;
  size?: "sm" | "md" | "lg";
  variant?:
    | "shadow"
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "ghost";
}

const ButtonWhatsapp = ({
  message,
  phone,
  size = "sm",
  variant = "solid",
}: PropTypes) => {
  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      variant={variant}
      size={size}
      color="success"
      className="text-white"
      startContent={<MdWhatsapp />}
      onPress={handleClick}
    >
      WhatsApp
    </Button>
  );
};

export default ButtonWhatsapp;

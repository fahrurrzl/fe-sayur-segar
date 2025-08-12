import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onPress={scrollToTop}
      className="fixed bottom-8 right-8 z-50 text-white"
      isIconOnly
      aria-label="Scroll to top"
      color="success"
      variant="shadow"
    >
      <FiChevronUp className="h-4 w-4" />
    </Button>
  );
};

export default ScrollToTop;

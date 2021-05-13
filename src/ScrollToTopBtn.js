import React, { useEffect, useState } from "react";
import { Button } from "theme-ui";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      onClick={scrollToTop}
      sx={{
        position: "sticky",
        bottom: 0,
        bg: "black",
        display: visible ? "inline" : "none",
      }}
    >
      Scroll to Top
    </Button>
  );
};

export default ScrollButton;

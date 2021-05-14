import React, { useState } from "react";
import { Button } from "theme-ui";

const ScrollButton = () => {
  // visible state used to
  const [visible, setVisible] = useState(false);

  // function that changes visible state when it is scrolled past a certain distance from the top
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // trigger that takes the window back to the top of root
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

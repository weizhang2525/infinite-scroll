import InfiniteScroll from "./InfiniteScroll";
import React, { useState } from "react";

function App() {
  const [interval, setInterval] = useState(1500348260);

  const [hasMore, setHasMore] = useState(true);

  const [thumbnails, setThumbnails] = useState([]);

  const fetchImages = () => {
    let tempInterval = interval;
    for (let i = 0; i < 30; i++) {
      const url = `https://hiring.verkada.com/thumbs/${tempInterval}.jpg`;
      if (tempInterval === 1503031520) {
        setHasMore(false);
        break;
      }
      setThumbnails((prev) => [...prev, url]);
      tempInterval += 20;
    }
    setInterval(tempInterval);
  };

  return (
    <InfiniteScroll
      fetchContent={fetchImages}
      hasMore={hasMore}
      content={thumbnails}
    />
  );
}

export default App;

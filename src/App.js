import InfiniteScroll from "./InfiniteScroll";
import React, { useState } from "react";
import ScrollToTopBtn from "./ScrollToTopBtn";

function App() {
  // state to hold the interval
  const [interval, setInterval] = useState(1500348260);

  // state used to fetch/stop fetching images once interval is met
  const [hasMore, setHasMore] = useState(true);

  // thumbnails content that is essentially an array of string sources
  const [thumbnails, setThumbnails] = useState([]);

  // fetch method used to "fetch" more images from the url, sets the content state which gets rendered
  // in the infinite scroll component
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
    <>
      <InfiniteScroll
        fetchContent={fetchImages}
        hasMore={hasMore}
        content={thumbnails}
      />
      <ScrollToTopBtn />
    </>
  );
}

export default App;

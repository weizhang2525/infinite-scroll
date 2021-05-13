/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Paragraph } from "theme-ui";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
`;

const InfiniteScroll = ({ startInterval, endInterval }) => {
  const [interval, setInterval] = useState(startInterval);

  const [page, setPage] = useState(1);

  const [thumbnails, setThumbnails] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastThumbnailRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchImages(30);
  }, [page]);

  const fetchImages = async (num) => {
    setLoading(true);
    let tempInterval = interval;
    for (let i = 0; i < num; i++) {
      const url = `https://hiring.verkada.com/thumbs/${tempInterval}.jpg`;
      if (tempInterval === endInterval) {
        setHasMore(false);
        break;
      } else {
        setHasMore(true);
      }
      setThumbnails((prev) => [...prev, url]);
      tempInterval += 20;
    }
    setInterval(tempInterval);
    setLoading(false);
  };

  return (
    <>
      <Grid columns={[3, null, 3]}>
        {thumbnails.map((thumbnail, key) => {
          return key === thumbnails.length - 1 ? (
            <StyledImage
              src={thumbnail}
              alt={`thumbnail${key}`}
              key={key}
              ref={lastThumbnailRef}
            />
          ) : (
            <StyledImage src={thumbnail} alt={`thumbnail${key}`} key={key} />
          );
        })}
      </Grid>
      {loading && <Paragraph>Loading...</Paragraph>}
    </>
  );
};

export default InfiniteScroll;

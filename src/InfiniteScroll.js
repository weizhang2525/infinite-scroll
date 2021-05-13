/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Paragraph } from "theme-ui";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
`;

const InfiniteScroll = ({ fetchContent, hasMore, content }) => {
  // helper hooks
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  // this callback function is attached to the last element of the content. it checks if the last element of the content being render
  // is visible or not.
  // if it is visible, it adds 1 to the page state which then triggers the useeffect to grab fetch more data if there is more to fetch.
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

  // useEffect hook to rerender content based on the page state changes
  useEffect(() => {
    setLoading(true);
    fetchContent();
    setLoading(false);
  }, [page]);

  return (
    <>
      <Grid columns={[3, null, 3]}>
        {content.map((c, key) => {
          return key === content.length - 1 ? (
            <StyledImage
              src={c}
              alt={`picture${key}`}
              key={key}
              ref={lastThumbnailRef}
            />
          ) : (
            <StyledImage src={c} alt={`picture${key}`} key={key} />
          );
        })}
      </Grid>
      {loading && <Paragraph>Loading...</Paragraph>}
    </>
  );
};

export default InfiniteScroll;

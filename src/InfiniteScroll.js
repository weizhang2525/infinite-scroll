/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Paragraph } from "theme-ui";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
`;

const InfiniteScroll = ({ fetchContent, hasMore, content }) => {
  const [page, setPage] = useState(1);

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

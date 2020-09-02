import React, { useState, useEffect, useRef } from "react";
import {
  MainContentWrapper,
  Container,
  Row,
  TabContent,
  Column,
  ContentNav,
  ContentTitle,
  Title,
  ContentSort,
  ContentTabs,
  TabItem,
  TabLink,
  TabPane,
  GridRow,
  GridContent,
} from "./MainContent.styles";

//Components
import GridItem from "./GridItem/GridItem.component";
import Pagination from "./Pagination/Pagination.component";

import Skeleton from "./Skeleton/Skeleton.component";

const MainContent = ({ refProp }) => {
  const REACT_APP_MOVIES_URL = process.env.REACT_APP_MOVIES_URL;
  const REACT_APP_TV_URL = process.env.REACT_APP_TV_URL;
  const REACT_APP_ANIME_URL = process.env.REACT_APP_ANIME_URL;
  const REACT_APP_NEW_RELEASES_URL = process.env.REACT_APP_NEW_RELEASES_URL;

  const [grid, setGrid] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [apiUrl, setUrl] = useState(REACT_APP_MOVIES_URL);
  const [page, setPage] = useState(1);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const useMountEffect = (effect) => useEffect(effect, []);

  const tabRef = useRef(null);
  useMountEffect(() => scrollToRef(tabRef));

  const moviesURL = () => {
    setPage(1);
    setUrl(REACT_APP_MOVIES_URL);
  };
  const tvURL = () => {
    setPage(1);
    setUrl(REACT_APP_TV_URL);
  };
  const animeURL = () => {
    setPage(1);
    setUrl(REACT_APP_ANIME_URL);
  };
  
  const newReleases = () => {
    setPage(1);
    setUrl(REACT_APP_NEW_RELEASES_URL);
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${apiUrl}${page}`)
      .then((res) => res.json())
      .then((response) => {
        setGrid(response.results);

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, apiUrl]);
  return (
    <MainContentWrapper ref={tabRef}>
      <Container>
        <Row>
          <Column>
            <ContentTitle>
              <Title>New Movies</Title>
            </ContentTitle>
            <ContentNav>
              <ContentTabs>
                <TabItem>
                  <TabLink onClick={newReleases}>New releases</TabLink>
                </TabItem>
                <TabItem>
                  <TabLink onClick={moviesURL}>Movies</TabLink>
                </TabItem>
                <TabItem>
                  <TabLink onClick={tvURL}>Tv series</TabLink>
                </TabItem>
                <TabItem>
                  <TabLink onClick={animeURL}>Anime</TabLink>
                </TabItem>
              </ContentTabs>
              <ContentSort></ContentSort>
            </ContentNav>
          </Column>
        </Row>
        <TabContent>
          <TabPane>
            <GridRow>
              <GridContent>
                {isLoading &&
                  Array(18)
                    .fill()
                    .map((ske, index) => <Skeleton key={index} />)}

                {!isLoading &&
                  grid.slice(2).map((gridItem) => {
                    return <GridItem key={gridItem.id} {...gridItem} />;
                  })}

                <Pagination
                  page={page}
                  setPage={setPage}
                  tabRef={tabRef}
                  scrollToRef={scrollToRef}
                />
              </GridContent>
            </GridRow>
          </TabPane>
        </TabContent>
      </Container>
    </MainContentWrapper>
  );
};

export default MainContent;

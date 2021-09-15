import React, { useEffect } from "react";
import Layout from "../components/layout";
import { useLocation, globalHistory } from "@reach/router";
import { getRandomIntFromInterval, getFilterParam } from "../functions/helpers";
import { graphql, Link } from "gatsby";
import { useFilter } from "../contexts/filter-provider";
import { PropTypes } from "prop-types";
import ProjectsGrid from "../components/projects-grid";

const Index = ({ data }) => {
  const location = useLocation();
  const { currentFilter, setCurrentFilter } = useFilter();
  const { allWpProject } = data;

  // useEffect(() => {
  //   return globalHistory.listen(({ location: { search } }) => {
  //     if (search) {
  //       setCurrentFilter(getFilterParam(search));
  //     } else {
  //       setCurrentFilter("all");
  //     }
  //   });
  // }, [location]);

  const getCategoryNames = (categories) =>
    categories.map((category) => category.name);

  const showProject = (categories) =>
    getCategoryNames(categories).includes(decodeURI(currentFilter)) ||
    currentFilter === "all";

  return (
    <Layout location={location}>
      <ProjectsGrid projects={allWpProject}></ProjectsGrid>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    allWpProject {
      nodes {
        id
        title
        uri
        featuredImage {
          node {
            guid
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  allWpProject: PropTypes.shape({
    nodes: PropTypes.arrayOf([
      PropTypes.shape({
        categories: PropTypes.arrayOf([
          PropTypes.shape({
            nodes: PropTypes.arrayOf([
              PropTypes.shape({
                name: PropTypes.string,
              }),
            ]),
          }),
        ]),
        featuredImage: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        uri: PropTypes.string,
      }),
    ]),
  }),
};

export default Index;

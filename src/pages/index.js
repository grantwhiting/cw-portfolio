import React from "react";
import Layout from "../components/layout";
import { useLocation } from "@reach/router";
import { graphql } from "gatsby";
import { PropTypes } from "prop-types";
import ProjectsGrid from "../components/projects-grid";

const Index = ({ data }) => {
  const location = useLocation();
  const { allWpProject } = data;

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

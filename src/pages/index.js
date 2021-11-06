import React from "react";
import Layout from "../components/layout";
import { useLocation } from "@reach/router";
import { graphql } from "gatsby";
import { PropTypes } from "prop-types";
import ProjectsGrid from "../components/projectsGrid";

const Index = ({ data }) => {
  const location = useLocation();
  const { allWpProject, allWpMediaItem } = data;

  console.log(allWpMediaItem);

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
        content
        featuredImage {
          node {
            guid
          }
        }
        galleryImages {
          guid
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
    allWpMediaItem {
      nodes {
        title
        gridImage
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.shape({
    allWpProject: PropTypes.shape({
      nodes: PropTypes.arrayOf([
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          uri: PropTypes.string,
          content: PropTypes.string,
          featuredImage: PropTypes.shape({
            node: PropTypes.shape({
              guid: PropTypes.string,
            }),
          }),
          galleryImages: PropTypes.arrayOf(
            PropTypes.shape({
              guid: PropTypes.string,
            })
          ),
          categories: PropTypes.arrayOf([
            PropTypes.shape({
              nodes: PropTypes.arrayOf([
                PropTypes.shape({
                  name: PropTypes.string,
                }),
              ]),
            }),
          ]),
        }),
      ]),
    }),
    allWpMediaItem: PropTypes.shape({
      nodes: PropTypes.arrayOf([
        PropTypes.shape({
          title: PropTypes.string,
          gridImage: PropTypes.boolean,
        }),
      ]),
    }),
  }),
};

export default Index;

import React from "react";
import Layout from "../components/layout";
import { useLocation } from "@reach/router";
import { graphql } from "gatsby";
import { PropTypes } from "prop-types";
import ImageGrid from "../components/imageGrid";

const Index = ({ data }) => {
  const location = useLocation();
  const { allWpProject } = data;

  return (
    <Layout location={location}>
      <ImageGrid projects={allWpProject}></ImageGrid>
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
        hasProjectPage
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
  }
`;

Index.propTypes = {
  data: PropTypes.shape({
    allWpProject: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          uri: PropTypes.string,
          content: PropTypes.string,
          hasProjectPage: PropTypes.bool,
          featuredImage: PropTypes.shape({
            node: PropTypes.shape({
              guide: PropTypes.string,
            }),
          }),
          galleryImages: PropTypes.arrayOf(
            PropTypes.shape({
              nodes: PropTypes.arrayOf(
                PropTypes.shape({
                  name: PropTypes.string,
                })
              ),
            })
          ),
          categories: PropTypes.shape({
            nodes: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
              })
            ),
          }),
        })
      ),
    }),
  }),
};

export default Index;

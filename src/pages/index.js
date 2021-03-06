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
    allWpProject(
      filter: {
        categories: {
          nodes: { elemMatch: { name: { eq: "Kids' Lit Illustrations" } } }
        }
      }
    ) {
      nodes {
        id
        title
        uri
        content
        featuredImage {
          node {
            guid
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
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

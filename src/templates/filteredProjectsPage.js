import React from "react";
import Layout from "../components/layout";
import ImageGrid from "../components/imageGrid";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

const FilteredProjectsPage = ({ pageContext }) => {
  const location = useLocation();
  const { projects } = pageContext;

  return (
    <Layout location={location}>
      <ImageGrid projects={projects}></ImageGrid>
    </Layout>
  );
};

FilteredProjectsPage.propTypes = {
  pageContext: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    slug: PropTypes.string,
    projects: PropTypes.shape({
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
  }).isRequired,
};

export default FilteredProjectsPage;

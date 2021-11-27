import React from "react";
import Layout from "../components/layout";
import ImageGrid from "../components/imageGrid";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

const FilteredProjectsPage = ({ pageContext }) => {
  const location = useLocation();
  return (
    <Layout location={location}>
      <ImageGrid projects={pageContext.projects}></ImageGrid>
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
          uri: PropTypes.string,
          title: PropTypes.string,
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
        })
      ),
    }),
  }).isRequired,
};

export default FilteredProjectsPage;

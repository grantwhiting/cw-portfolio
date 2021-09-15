import React from "react";
import Layout from "../components/layout";
import ProjectsGrid from "../components/projects-grid";
import PropTypes from "prop-types";

const FilteredProjects = ({ pageContext }) => (
  <Layout>
    <ProjectsGrid projects={pageContext.projects}></ProjectsGrid>
  </Layout>
);

FilteredProjects.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    projects: PropTypes.shape({
      nodes: PropTypes.arrayOf([
        PropTypes.shape({
          featuredImage: PropTypes.string,
          title: PropTypes.string,
        }),
      ]),
    }),
    slug: PropTypes.string,
  }),
};

export default FilteredProjects;

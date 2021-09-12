import React from "react";
import { PropTypes } from "prop-types";
import { useLocation } from "@reach/router";
import Layout from "../components/layout";

const Project = ({ pageContext }) => {
  const location = useLocation();
  const { content } = pageContext;

  return (
    <Layout location={location}>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    content: PropTypes.string,
  }),
};
import React from "react";
import { PropTypes } from "prop-types";
import Layout from "../components/layout";

const Project = ({ pageContext }) => {
  const { content } = pageContext;

  return (
    <Layout>
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

import React from "react";
import { PropTypes } from "prop-types";
import Layout from "../components/layout";

const About = ({ pageContext }) => {
  console.log(pageContext);
  const { content } = pageContext;

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default About;

About.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
    content: PropTypes.string,
  }),
};

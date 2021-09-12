import React from "react";
import { PropTypes } from "prop-types";
import { useLocation } from "@reach/router";
import Layout from "../components/layout";

const About = ({ pageContext }) => {
  console.log(pageContext);
  const location = useLocation();
  const { content } = pageContext;

  console.log(location);

  return (
    <Layout location={location}>
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

import React from "react";
import { PropTypes } from "prop-types";
import Layout from "../components/layout";
import { motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = ({ pageContext }) => {
  const { content } = pageContext;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex self-center flex-1 lg:order-1"
        >
          <StaticImage src="../images/About-Pic.png" alt="Courtney Whiting" />
        </motion.div>
        <motion.div
          dangerouslySetInnerHTML={{ __html: content }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 lg:mr-6"
        ></motion.div>
      </div>
    </Layout>
  );
};

AboutPage.propTypes = {
  pageContext: PropTypes.shape({
    content: PropTypes.string,
  }),
};

export default AboutPage;

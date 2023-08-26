import React from "react";
import { PropTypes } from "prop-types";
import Layout from "../components/layout";
import { motion } from "framer-motion";

const DownloadablePDFPage = ({ pageContext }) => {
  const { content } = pageContext;

  return (
    <Layout>
      <motion.div
        dangerouslySetInnerHTML={{ __html: content }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      ></motion.div>
    </Layout>
  );
};

DownloadablePDFPage.propTypes = {
  pageContext: PropTypes.shape({
    content: PropTypes.string,
  }),
};

export default DownloadablePDFPage;

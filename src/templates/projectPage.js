import React from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import Carousel from "../components/carousel";

const ProjectPage = ({ pageContext }) => {
  const location = useLocation();
  const { content, title, galleryImages } = pageContext;
  return (
    <Layout location={location}>
      <h1 className="text-4xl text-center">{title}</h1>
      <Carousel images={galleryImages} className="mt-9"></Carousel>
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: content }}
        className="mx-auto mt-6"
        style={{ maxWidth: "1000px" }}
      ></div>
    </Layout>
  );
};

ProjectPage.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    uri: PropTypes.string,
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
  }).isRequired,
};

export default ProjectPage;

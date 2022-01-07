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
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: content }}
        className="mx-auto mt-9"
        style={{ maxWidth: "1000px" }}
      ></div>
      {galleryImages.length > 1 ? (
        <Carousel images={galleryImages} className="mt-9"></Carousel>
      ) : (
        <div className="w-4/5 mx-auto mt-9" style={{ minHeight: "800px" }}>
          <img
            src={galleryImages[0].guid}
            alt={title}
            className="object-contain w-full h-full"
          />
        </div>
      )}
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

import React from "react";
import PropTypes from "prop-types";
import ExpandableImage from "./expandableImage";

const ProjectsGrid = ({ projects }) => {
  const { nodes } = projects;

  console.log(nodes);

  return (
    <div className="grid grid-cols-3 gap-4 masonry-columns">
      {nodes.map((project) => (
        <ExpandableImage
          key={project.id}
          image={project.featuredImage.node.guid}
          title={project.title}
        ></ExpandableImage>
      ))}
    </div>
  );
};

ProjectsGrid.propTypes = {
  projects: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
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
        categories: PropTypes.arrayOf([
          PropTypes.shape({
            nodes: PropTypes.arrayOf([
              PropTypes.shape({
                name: PropTypes.string,
              }),
            ]),
          }),
        ]),
      })
    ),
  }).isRequired,
};

export default ProjectsGrid;

import React from "react";
import PropTypes from "prop-types";
import ExpandableImage from "./expandableImage";

const ImageGrid = ({ projects }) => {
  const { nodes } = projects;

  console.log(nodes);

  return (
    <div className="grid grid-cols-3 gap-4 masonry-columns">
      {nodes.map((item) =>
        item.gridImage ? (
          <ExpandableImage
            key={item.id}
            image={item.guid}
            title={item.title}
          ></ExpandableImage>
        ) : (
          <ExpandableImage
            key={item.id}
            image={item.featuredImage?.node.guid}
            title={item.title}
          ></ExpandableImage>
        )
      )}
    </div>
  );
};

ImageGrid.propTypes = {
  projects: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        uri: PropTypes.string,
        content: PropTypes.string,
        featuredImage: PropTypes.shape({
          node: PropTypes.shape({
            guide: PropTypes.string,
          }),
        }),
        galleryImages: PropTypes.arrayOf(
          PropTypes.shape({
            nodes: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
              })
            ),
          })
        ),
      })
    ),
  }),
};

export default ImageGrid;

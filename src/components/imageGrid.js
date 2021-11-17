import React from "react";
import PropTypes from "prop-types";
import ExpandableImage from "./expandableImage";

const ImageGrid = ({ projects }) => {
  const { nodes } = projects;

  console.log(nodes);

  return (
    <div className="grid grid-cols-3 gap-4 masonry-columns">
      {nodes.map((item) =>
        item.hasProjectPage ? (
          <a
            href={item.uri}
            key={item.id}
            className="relative block w-full mb-3 mr-3 cursor-pointer aspect-ratio-square bg-gray-50 break-inside-avoid"
          >
            <div
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
              style={{
                backgroundImage: `url(${item.featuredImage?.node.guid})`,
              }}
            ></div>
          </a>
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
        hasProjectPage: PropTypes.bool,
        categories: PropTypes.shape({
          nodes: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            })
          ),
        }),
      })
    ),
  }),
};

export default ImageGrid;

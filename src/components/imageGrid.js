import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const ImageGrid = ({ projects }) => {
  const { nodes } = projects;

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 masonry-columns">
      {nodes.map((item) => (
        <Link
          to={item.uri}
          key={item.id}
          className="relative block w-full mb-3 mr-3 cursor-pointer aspect-ratio-square bg-gray-50 break-inside-avoid"
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${item.featuredImage?.node.guid})`,
            }}
          ></div>
          <span className="absolute z-10 w-full text-xl font-bold text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {item.title}
          </span>
        </Link>
      ))}
      ;
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

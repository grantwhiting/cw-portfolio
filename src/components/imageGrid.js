import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const containerVariants = {
  mount: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  unmount: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const childVariants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: -50,
  },
};

const ImageGrid = ({ projects }) => {
  const { nodes } = projects;

  return (
    <motion.div
      variants={containerVariants}
      initial="unmount"
      animate="mount"
      className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 masonry-columns"
    >
      {nodes.map((item) => (
        <motion.div variants={childVariants} key={item.id}>
          <Link
            to={item.uri}
            className="relative block w-full mb-3 mr-3 cursor-pointer aspect-ratio-square break-inside-avoid"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-no-repeat bg-cover"
            >
              <GatsbyImage
                backgroundColor="white"
                image={getImage(item.featuredImage?.node.localFile)}
                alt=""
                className="object-cover w-full h-full rounded-xl"
              />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
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

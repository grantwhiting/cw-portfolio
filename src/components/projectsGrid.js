import React from "react";
import { getRandomIntFromInterval } from "../functions/helpers";
import PropTypes from "prop-types";
import FullScreenDiv, { states } from "./fullScreenDiv";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsGrid = ({ projects }) => {
  const { nodes } = projects;

  console.log(projects);

  return (
    <div className="masonry-columns">
      {nodes.map((project) => (
        <FullScreenDiv
          key={project.id}
          style={{ height: `${getRandomIntFromInterval(250, 450)}px` }}
        >
          {({ open, close, status }) => {
            const inactive =
              status === states.CLOSED || status === states.CLOSING;
            const active = status === states.OPEN || status === states.OPENING;
            return (
              <div
                onClick={() => (active ? close() : open())}
                className="relative block w-full mb-3 mr-3 cursor-pointer bg-gray-50 break-inside-avoid"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {inactive && (
                  <AnimatePresence>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    >
                      {project.title}
                    </motion.span>
                  </AnimatePresence>
                )}
                {active && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    ></motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          }}
        </FullScreenDiv>
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

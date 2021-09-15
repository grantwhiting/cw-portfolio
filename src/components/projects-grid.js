import React from "react";
import { Link } from "gatsby";
import { getRandomIntFromInterval } from "../functions/helpers";
import PropTypes from "prop-types";

const ProjectsGrid = ({ projects }) => (
  <div className="masonry-columns">
    {projects.nodes.map((project) => (
      <Link
        to={project.uri}
        key={project.id}
        className="relative block w-full mb-3 mr-3 bg-gray-50 break-inside-avoid"
        style={{ height: getRandomIntFromInterval(250, 450) }}
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {project.title}
        </span>
      </Link>
    ))}
  </div>
);

ProjectsGrid.propTypes = {
  projects: PropTypes.shape({
    nodes: PropTypes.arrayOf([
      PropTypes.shape({
        featuredImage: PropTypes.string,
        title: PropTypes.string,
      }),
    ]),
  }),
};

export default ProjectsGrid;

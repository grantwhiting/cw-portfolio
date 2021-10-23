import React from "react";
import Layout from "../components/layout";
import ProjectsGrid from "../components/projectsGrid";
import PropTypes from "prop-types";

const ProjectPage = ({ pageContext }) => {
  console.log("Project", pageContext);
  return (
    <Layout>
      <ProjectsGrid projects={pageContext.projects}></ProjectsGrid>
    </Layout>
  );
};

// FilteredProjects.propTypes = {
//   pageContext: PropTypes.shape({
//     name: PropTypes.string,
//     id: PropTypes.string,
//     slug: PropTypes.string,
//     projects: PropTypes.shape({
//       nodes: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.string,
//           uri: PropTypes.string,
//           title: PropTypes.string,
//           content: PropTypes.string,
//           featuredImage: PropTypes.shape({
//             node: PropTypes.shape({
//               guid: PropTypes.string,
//             }),
//           }),
//           galleryImages: PropTypes.arrayOf(
//             PropTypes.shape({
//               guid: PropTypes.string,
//             })
//           ),
//         })
//       ),
//     }),
//   }).isRequired,
// };

export default ProjectPage;

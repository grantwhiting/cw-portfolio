exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
  reporter,
}) => {
  // Pages
  const aboutPage = await graphql(`
    {
      wpPage(id: { eq: "cG9zdDo1Nw==" }) {
        id
        uri
        content
      }
    }
  `);

  if (aboutPage.errors) {
    reporter.error("There was an error fetching the About Page");
  }

  const aboutTemplate = require.resolve("./src/templates/about.js");
  const { wpPage } = aboutPage.data;

  createPage({
    path: wpPage.uri,
    component: aboutTemplate,
    context: wpPage,
  });

  // Projects
  const projects = await graphql(`
    {
      allWpProject {
        nodes {
          id
          title
          uri
          content
          galleryImages {
            guid
          }
          featuredImage {
            node {
              guid
            }
          }
        }
      }
    }
  `);

  if (projects.errors) {
    reporter.error("There was a problem fetching allWpProjects");
  }

  const projectPageTemplate = require.resolve("./src/templates/project.js");

  projects.data.allWpProject.nodes.forEach((project) => {
    createPage({
      path: project.uri,
      component: projectPageTemplate,
      context: project,
    });
  });
};

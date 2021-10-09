const path = require(`path`);

exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
  reporter,
}) => {
  // Pages
  const aboutPage = await graphql(`
    {
      wpPage(title: { eq: "About" }) {
        id
        uri
        content
      }
    }
  `);

  if (aboutPage.errors) {
    reporter.error("There was an error fetching the About Page");
  }

  const aboutTemplate = path.resolve(`./src/templates/about.js`);
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
          featuredImage {
            node {
              guid
            }
          }
          galleryImages {
            guid
          }
        }
      }
    }
  `);

  if (projects.errors) {
    reporter.error("There was a problem fetching allWpProjects");
  }

  const projectPageTemplate = path.resolve(`./src/templates/project.js`);

  projects.data.allWpProject.nodes.forEach((project) => {
    createPage({
      path: project.uri,
      component: projectPageTemplate,
      context: project,
    });
  });

  // Categories
  const categories = await graphql(`
    {
      allWpCategory {
        nodes {
          name
          id
          slug
          projects {
            nodes {
              id
              uri
              title
              featuredImage {
                node {
                  guid
                }
              }
            }
          }
        }
      }
    }
  `);

  if (categories.errors) {
    reporter.error("There was a problem fetching allWpCategory");
  }

  const filteredProjectsPageTemplate = path.resolve(
    `./src/templates/filtered-projects.js`
  );

  categories.data.allWpCategory.nodes.forEach((category) => {
    createPage({
      path: category.slug,
      component: filteredProjectsPageTemplate,
      context: category,
    });
  });
};

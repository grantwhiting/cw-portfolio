const path = require(`path`);

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
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
              title
              uri
              content
              featuredImage {
                node {
                  guid
                  localFile {
                    childImageSharp {
                      gatsbyImageData(placeholder: BLURRED)
                    }
                  }
                }
              }
              galleryImages {
                guid
              }
              categories {
                nodes {
                  name
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
    `${__dirname}/src/templates/filteredProjectsPage.js`
  );

  categories.data.allWpCategory.nodes.forEach((category) => {
    createPage({
      path: category.slug,
      component: filteredProjectsPageTemplate,
      context: category,
    });
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

  const projectPageTemplate = path.resolve(
    `${__dirname}/src/templates/projectPage.js`
  );

  projects.data.allWpProject.nodes.forEach((project) => {
    createPage({
      path: project.uri,
      component: projectPageTemplate,
      context: project,
    });
  });

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

  const aboutPageTemplate = path.resolve(
    `${__dirname}/src/templates/aboutPage.js`
  );

  createPage({
    path: aboutPage.data.wpPage.uri,
    component: aboutPageTemplate,
    context: aboutPage.data.wpPage,
  });

  const downloadablePDFPage = await graphql(`
    {
      wpPage(title: { regex: "/download/i" }) {
        id
        uri
        content
      }
    }
  `);

  if (downloadablePDFPage.errors) {
    reporter.error("There was an error fetching the Downloadable PDF Page");
  }

  const downloadablePDFPageTemplate = path.resolve(
    `${__dirname}/src/templates/pdfDownloadPage.js`
  );

  createPage({
    path: downloadablePDFPage.data.wpPage.uri,
    component: downloadablePDFPageTemplate,
    context: downloadablePDFPage.data.wpPage,
  });
};

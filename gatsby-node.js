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
              uri
              title
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
  const { wpPage } = aboutPage.data;

  createPage({
    path: wpPage.uri,
    component: aboutPageTemplate,
    context: wpPage,
  });
};

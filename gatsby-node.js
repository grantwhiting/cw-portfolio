exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const result = await graphql(`
    {
      wpPage(id: { eq: "cG9zdDo1Nw==" }) {
        id
        uri
        content
      }
    }
  `);

  if (result.errors) {
    reporter.error("There was an error fetching posts");
  }

  const aboutTemplate = require.resolve("./src/templates/About.js");
  const { wpPage } = result.data;

  createPage({
    path: wpPage.uri,
    component: aboutTemplate,
    context: wpPage,
  });
};

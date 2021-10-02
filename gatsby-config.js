module.exports = {
  siteMetadata: {
    siteUrl: "https://www.courtneywhiting.com",
    title: "Courtney Whiting Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          "http://localhost:8880/wordpress/graphql",
        protocol: "https",
        // hostingWPCOM: false,
        // useACF: true,
        includedRoutes: [
          //"**/categories",
          "**/posts",
          "**/pages",
          // "**/media",
          // "**/tags",
          // "**/taxonomies",
          // "**/users",
        ],
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-transition-link",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-client-side-redirect",
  ],
};

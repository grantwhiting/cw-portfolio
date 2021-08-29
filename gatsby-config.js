module.exports = {
  siteMetadata: {
    siteUrl: "https://www.courtneywhiting.com",
    title: "Courtney Whiting Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        // url: "http://localhost:8880/wordpress/graphql",
        url: "https://cwportfoliomaster.gatsbyjs.io/",
        protocol: "http",
        hostingWPCOM: false,
        useACF: true,
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
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          // require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

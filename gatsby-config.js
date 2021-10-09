const url = "http://courtney-whiting-portfolio.local/graphql";

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.courtneywhiting.com",
    title: "Courtney Whiting Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: url,
        protocol: "http",
        hostingWPCOM: false,
        useACF: true,
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
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "templates",
        path: `${__dirname}/src/templates/`,
      },
      __key: "templates",
    },
    "gatsby-plugin-client-side-redirect",
  ],
};

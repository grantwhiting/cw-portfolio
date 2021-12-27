require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.courtneywhiting.com",
    title: "Courtney Whiting Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.GQL_URL,
        auth: {
          htaccess: {
            username: "flywheel",
            password: "learned-ribbon",
          },
        },
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

// https://www.youtube.com/embed/rp89vj3WV-U?rel=0&color=white&origin=https://www.ramseysolutions.com&enablejsapi=1
// https://www.youtube.com/embed/rp89vj3WV-U?rel=0&color=white&origin=https://www.ramseysolutions.com

// const createProxyMiddleware =require('http-proxy-middleware')

module.exports = {
  // developMiddleware: app => {
  //   app.use(
  //     "http://localhost:8000/api",
  //     createProxyMiddleware({
  //       target: "http://tweetsaver.herokuapp.com",
  //       changeOrigin: true,
  //       pathRewrite:{
  //         "http://localhost:8000/api": ""
  //       }
  //     })
  //   )
  // },
  siteMetadata: {
    title: `M's Tweet App`,
    description: `This is M's Tweet App`,
    author: `@MelissaGu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
}

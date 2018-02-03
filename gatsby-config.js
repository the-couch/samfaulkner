module.exports = {
  siteMetadata: {
    title: `Sam Faulkner`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `5vahsvgkro75`,
        accessToken: `d5757998c9a88a4405c7aff60dadc6e4dcb774aca599606c3641bca3cc026a38`
      },
    }
  ],
}

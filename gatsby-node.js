/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

 // const _ = require(`lodash`)
 const Promise = require(`bluebird`)
 const path = require(`path`)
 const slash = require(`slash`)

 // Implement the Gatsby API “createPages”. This is
 // called after the Gatsby bootstrap is finished so you have
 // access to any information necessary to programmatically
 // create pages.
 exports.createPages = ({ graphql, boundActionCreators }) => {
   const { createPage } = boundActionCreators
   return new Promise((resolve, reject) => {
     // The “graphql” function allows us to run arbitrary
     // queries against the local Contentful graphql schema. Think of
     // it like the site has a built-in database constructed
     // from the fetched data that you can run queries against.
     graphql(
       `
       {
        allContentfulCaseStudy(limit: 100, sort: {fields: [createdAt]}) {
          edges {
            node {
              id
              name
              role
              createdAt
              backgroundColor
              image {
                file {
                  url
                  fileName
                  contentType
                }
              }
            }
          }
        }
      }
       `
     )
       .then(result => {
         if (result.errors) {
           reject(result.errors)
         }

         // Create Product pages
         const indexTemplate = path.resolve(`./src/templates/index.js`)

         console.log('edge', result.data.allContentfulCaseStudy.edges)
         createPage({
           path: `/`,
           component: slash(indexTemplate),
           context: {
             studies: result.data.allContentfulCaseStudy.edges
           }
         })

         resolve()
       })
   })
 }


import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Test Page</h1>
    {/* This is how to add images from local files */}
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* This is how to use Gatsby Link */}
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
    <h2>All Paragraph Types</h2>
    <ul>
      {data.allParagraphsTypeParagraphsType.edges.map(({ node }) => (
        <li>{node.label}</li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allParagraphsTypeParagraphsType {
      edges {
        node {
          label
        }
      }
    }
  }
`

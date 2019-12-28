import React from "react"
import {useStaticQuery, graphql} from 'gatsby'

import {Link} from "gatsby"

import BlogItem from "../../BlogItem"

const Blog = () => {
  const data = useStaticQuery(graphql `
    query HomeBlogQuery {
      allMarkdownRemark(
        limit: 3,
        filter: {
          fileAbsolutePath: {regex: "/(blog)/"  },
          frontmatter: {published: {eq: true}}
      }) {
        edges {
          node {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              path
              cover {
                childImageSharp {
                  fixed(width: 300, height: 300) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const post = data.allMarkdownRemark
  return (<section id="blog">
    <div className="container">
      <h1 className="section-title">Blog</h1>
      <div className="container">
        <div className="row">
          {
            post.edges.map((item, key) => (<div className="col-sm" key={key}>
              <BlogItem data={item.node.frontmatter}></BlogItem>
            </div>))
          }
        </div>
        <div className="row">
          <div className="col text-center mt-5">
            <Link to="/blog">
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>

  </section>)
}

export default Blog

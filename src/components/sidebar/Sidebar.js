import PropTypes from "prop-types"
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import "./Sidebar.scss"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/icon.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          description
          image
          title
        }
      }
      allMarkdownRemark {
        categories: group(field: frontmatter___category) {
          name: fieldValue
          count: totalCount
        }
      }
      file(relativePath: { eq: "sidebar.jpg" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  const { author, description, title } = data.site.siteMetadata
  const { categories } = data.allMarkdownRemark
  const { src } = data.file.childImageSharp.fluid
  console.log(src)

  return (
    <div className="sidebar">
      <div className="sidebar-bg" style={{ backgroundImage: `url(${src})` }} />
      <div className="sidebar-contents">
        <div className="sidebar-about">
          <h1>
            <Link to="/">{author}</Link>
          </h1>
          <p>{description}</p>
        </div>
        <div className="sidebar-category">
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            {categories.map(c => (
              <li key={c.name}>
                <Link to="/">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

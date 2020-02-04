import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"

const SidebarBlock = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  transform: translate3d(0, 0, 0);
  contain: strict;
  width: 18rem;
  color: rgba(255, 255, 255, 0.75);
  text-align: left;
  font-family: Lato, sans-serif;

  a {
    color: #fff;
    transition: color 1s, border-color 50ms;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      border-bottom-color: #fff;
      text-decoration: none;
      transition: border-color 0.7s;
    }
  }

  .sidebar-bg {
    position: absolute;
    height: 100%;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #202020 center / cover;
  }

  .sidebar-contents {
    height: 100%;
    position: absolute;
    overflow: auto;
    padding: 5rem 0rem;
    right: 2.5rem;
    left: 2.5rem;
    z-index: 3;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .sidebar-about {
    text-align: center;
    h1 {
      font-size: 2rem;
      line-height: 1.3;
    }
  }

  .sidebar-category {
    a {
      font-weight: 600;
      line-height: 1.75;
      width: 100%;
      display: inline-block;
    }
  }
`

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
    <SidebarBlock>
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
    </SidebarBlock>
  )
}

export default Sidebar

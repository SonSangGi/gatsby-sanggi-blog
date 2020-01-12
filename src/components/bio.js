import React from "react"
import Image from "gatsby-image"
import { Link, graphql, useStaticQuery } from "gatsby"

const Bio = () => {
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
        category: group(field: frontmatter___category) {
          name: fieldValue
          count: totalCount
        }
      }
    }
  `)

  const { author, description, title } = data.site.siteMetadata
  const { category } = data.allMarkdownRemark

  return (
    <div>
      <Link to="/">
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          style={{
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
      <h2>
        <Link to="/">{author}</Link>
      </h2>
      <p>{description}</p>
      <ul>
        {category.map(category => (
          <li>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Bio

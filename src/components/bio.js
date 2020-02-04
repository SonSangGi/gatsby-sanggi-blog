import React from "react"
import Image from "gatsby-image"
import { Link, graphql, useStaticQuery } from "gatsby"

const Bio = () => {
  return (
    <div>
      <h2>
        <Link to="/">{author}</Link>
      </h2>
      <p>{description}</p>
      <ul>
        {category.map(category => (
          <li key={category.name}>{category.name}</li>
        ))}
      </ul>
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
    </div>
  )
}

export default Bio

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Bio from "./bio"
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
      minHeight: `100vh`,
      position: "fixed",
      overflowX: "hidden",
      cursor: "grab",
    }}
  >
    <div
      className="sidebar"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        ></Link>
      </div>
      <Bio></Bio>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

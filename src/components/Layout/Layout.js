import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Sidebar from '../Sidebar';
import './Layout.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Sidebar siteTitle={data.site.siteMetadata.title} />
      <div className="content">
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          <a
            href="https://github.com/sonsanggi"
            target="_blank"
            rel="noopener noreferrer"
          >
            SonSangGi
          </a>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

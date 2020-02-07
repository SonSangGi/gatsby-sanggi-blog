import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Sidebar from '../Sidebar';
import './Layout.scss';
import Icon from '../Icon';

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

  const [open, setOpen] = useState(true);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Sidebar siteTitle={data.site.siteMetadata.title} open={open} />
      <div className="content">
        <a
          style={{ position: 'fixed', top: '20px', left: '0', zIndex: 1 }}
          onClick={() => setOpen(!open)}
        >
          <Icon name="menu" />
        </a>
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

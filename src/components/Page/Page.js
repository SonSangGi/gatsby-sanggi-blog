import React from 'react';
import moment from 'moment';
import './Page.scss';
import { Link } from 'gatsby';

const Page = ({ edges }) => {
  return (
    <div className="page">
      {edges.map(edge => {
        const { category, title, description, date } = edge.node.frontmatter;
        return (
          <div
            className="content-box"
            key={edge.node.fields.slug}
            style={{ padding: '2.5rem 2.1875rem' }}
          >
            <div className="top">
              <span>{moment(date).format('MMMM DD YYYY')}</span>
              <Link className="category" to={`/category/${category}`}>
                <span>{category}</span>
              </Link>
            </div>
            <h2>
              <Link to={edge.node.fields.slug}>{title}</Link>
            </h2>
            {title}
          </div>
        );
      })}
    </div>
  );
};

export default Page;

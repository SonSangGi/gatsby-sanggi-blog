import React from 'react';
import moment from 'moment';
import './Page.scss';
import { Link } from 'gatsby';

const Page = ({ edges }) => {
  return (
    <div className="page">
      {edges.map(edge => {
        const { category, title, description, date } = edge.node.frontmatter;
        console.log(edge);
        return (
          <div className="content-box" key={edge.node.fields.slug}>
            <div className="top">
              <div className="date bookmark">
                {moment(date).format('MMMM DD YYYY')}
                <i className="point" />
              </div>
              <Link className="category bookmark" to={`/category/${category}`}>
                <span>{category}</span>
                <i className="point" />
              </Link>
            </div>
            <h2>
              <Link to={edge.node.fields.slug}>{title}</Link>
            </h2>
            <Link className="desciption" to={edge.node.fields.slug}>
              {edge.node.excerpt}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Page;

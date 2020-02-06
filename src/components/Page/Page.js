import React from 'react';
import moment from 'moment';

const Page = ({ edges }) => {
  moment.locale('ko');
  return (
    <div>
      {edges.map(edge => {
        const { category, title, description, date } = edge.node.frontmatter;
        return (
          <div
            key={edge.node.fields.slug}
            style={{ padding: '2.5rem 2.1875rem' }}
          >
            <p>
              {moment(date).format('MMMM DD YYYY')} <span>{category}</span>
            </p>
            {title}
          </div>
        );
      })}
    </div>
  );
};

export default Page;

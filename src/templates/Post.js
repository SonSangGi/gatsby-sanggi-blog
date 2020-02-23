import React from 'react';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { graphql, Link } from 'gatsby';
import moment from 'moment';

export default props => {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next, test } = props.pageContext;

  console.log(previous, next);
  console.log(test);

  return (
    <Layout>
      <Head title={post.frontmatter.title} description={post.excerpt} />
      {moment(post.frontmatter.date).format('YYYY-MM-DD HH:mm:ss')}
      <h1>{post.frontmatter.title}</h1>
      <hr />
      <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      {next && (
        <div>
          <p>
            다음글 : <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
          </p>
        </div>
      )}
      {previous && (
        <div>
          <p>
            이전글 :{' '}
            <Link to={previous.fields.slug}>{previous.frontmatter.title}</Link>
          </p>
        </div>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        category
      }
    }
  }
`;

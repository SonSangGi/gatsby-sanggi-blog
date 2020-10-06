import React from 'react';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Page from '../components/Page';

const IndexPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Head title="Home" />
      <Page edges={edges} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            category
            date
            title
          }
        }
      }
    }
  }
`;

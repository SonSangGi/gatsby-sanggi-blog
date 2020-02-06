import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Page from '../components/Page';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Page />
  </Layout>
);

export default IndexPage;

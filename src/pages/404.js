import React from "react"

import Layout from "../components/Layout" // 이놈 때문에 here are multiple modules with names that only differ in casing. This can lead to unexpected behavior when compiling on a filesystem with other case-semantic. Use equal casing. 오류..
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage

const path = require(`path`);

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/Post.js`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___date, frontmatter___category]
            order: DESC
          }
          limit: 1000
        ) {
          edges {
            node {
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
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    // 같은 카테고리인 이전 페이지
    const previous =
      index !== posts.length - 1 &&
      posts[index + 1].node.frontmatter.category ===
        post.node.frontmatter.category
        ? posts[index + 1].node
        : null;
    // 같은 카테고리인 다음 페이지
    const next =
      index !== 0 &&
      posts[index - 1].node.frontmatter.category ===
        post.node.frontmatter.category
        ? posts[index - 1].node
        : null;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

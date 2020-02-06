/**
 * 페이지 생성 및 슬러그 생성
 */
const createCategoryPages = require('./gatsby/create-category-page');
const createPostPages = require('./gatsby/create-post-page');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  await createCategoryPages(graphql, actions);
  await createPostPages(graphql, actions);
};

// 슬러그 생성
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    //if (typeof node.frontmatter.slug !== 'undefined') {
    const value = createFilePath({ node, getNode });
    const dirname = getNode(node.parent).relativeDirectory;
    createNodeField({
      node,
      name: `slug`,
      value: `/${dirname}${value}`,
    });
    // } else {
    //   const value = createFilePath({ node, getNode });
    //   createNodeField({
    //     node,
    //     name: `slug`,
    //     value,
    //   });
    // }
  }
};

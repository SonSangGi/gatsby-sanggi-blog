const path = require(`path`);

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const categoryPage = path.resolve(`./src/templates/Category.js`);

  const result = await graphql(`
    {
      allMarkdownRemark {
        categories: group(field: frontmatter___category) {
          name: fieldValue
          count: totalCount
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const categories = result.data.allMarkdownRemark.categories;
  const postPerPage = 2; // 리스트 목록 수

  categories.forEach(category => {
    const numPages = Math.ceil(category.count / postPerPage) + 1; // 페이지 수
    const categoryPath = `/category/${category.name}`;
    for (let i = 1; i < numPages; i++) {
      createPage({
        path: i === 1 ? categoryPath : `${categoryPath}/${i}`,
        component: categoryPage,
        context: {
          category: category.name,
          currentPage: i,
          limit: postPerPage, // 목록 몇개씩 가져올지
          skip: (i - 1) * postPerPage, // 전 페이지까지 목록 개수
          pageRangeDisplayed: 5,
        },
      });
    }
  });
};

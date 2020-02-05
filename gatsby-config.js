/**
 * gatsby plugin 및 사이트 메타데이터 관련 설정
 *
 * 사이트 메타데이터는 추후에 별도의 파일로 빼야겠다.
 */
module.exports = {
  siteMetadata: {
    title: `블로그 이름`,
    description: `"블로그 설명"`,
    author: `SonSangGi`,
    contacts: {
      github: "https://github.com/SonSangGi",
      email: "mailto:ssg3799@gmail.com",
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`, // head에 메타데이터 정보를 넣기 위한 플러그인 (검색엔진 최적화 등)
    `gatsby-plugin-sitemap`, // 크롤링을 위한 플러그인
    {
      resolve: `gatsby-source-filesystem`, // markdown 이나 이미지등 파일을 노드로 변환 (graphql에서 배열 형태로 저장)
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`, // markdown 파일 구문 분석, 노드로 변환 GraphQL (allMarkdownRemark)
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`, // markdown 파일 내에서 이미지 사용
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`, // 마크 다운 파일 내에서 iframe 사용 가능
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`, // 자동 아이콘 생성 (단일 소스에서 여러 아이콘 크기 생성)
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
  ],
}

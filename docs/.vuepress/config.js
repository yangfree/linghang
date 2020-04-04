module.exports = {
  title: "杨洁个人博客 ｜ Code NoteBook",
  description: "Talk is cheap, show me the code.",
  base: "/",
  head: [["link", { rel: "icon", href: "/icon.ico" }]],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    // 顶部导航
    nav: [
      {
        text: "大前端",
        items: [
          {
            text: "前端相关",
            items: [
              {
                text: "Css小书",
                link: "/web/css.md",
              },
              {
                text: "JavaScript知识点梳理",
                link: "/web/javascript.md",
              },
              {
                text: "Es6学习总结",
                link: "/web/es6.md",
              },
              {
                text: "TypeScript学习总结",
                link: "/web/typescript.md",
              },
              {
                text: "Vue笔记",
                link: "/web/vue.md",
              },
              {
                text: "React笔记",
                link: "/web/react.md",
              }
            ],
          },
          {
            text: "Webpack系列",
            items: [
              {
                text: "webpack基础使用",
                link: "/web/webpack/webpack-1.md",
              },
              {
                text: "webpack优化原则",
                link: "/web/webpack/webpack-2.md",
              },
              {
                text: "webpack原理分析",
                link: "/web/webpack/webpack-3.md",
              },
              {
                text: "webpack深入学习",
                link: "/web/webpack/webpack-4.md",
              },
            ],
          },
          {
            text: "杂七杂八",
            items: [
              {
                text: "nginx",
                link: "/web/node.md",
              },
              {
                text: "git查询小册",
                link: "/web/git.md",
              },
              {
                text: "vim快捷键查询",
                link: "/web/vim.md",
              },
            ],
          },
          {
            text: "数据库",
            items: [
              {
                text: "Mongodb",
                link: "/web/mongodb.md",
              },
            ],
          },
        ],
      },
      {
        text: "设计模式",
        link: "/design/",
      },
      {
        text: "算法",
        link: "/algorithm/",
      },
      {
        text: "计算机基础",
        link: "/computer/",
      },
    ],

    sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
    displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
    activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

    // Git 仓库和编辑链接 你的仓库
    repo: "https://jiepp.com",
    // 导航栏上的文本
    repoLabel: "个人小站",

    // editLinks: true,
    // 默认为 "Edit this page"
    // editLinkText: 'Edit this page',
    lastUpdated: "Last Updated", // string | boolean
  },
};

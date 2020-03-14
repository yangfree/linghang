module.exports = {
  title: "杨洁个人博客 ｜ Code NoteBook",
  description: "Talk is cheap, show me the code.",
  base: "/",
  head: [["link", { rel: "icon", href: "/icon.ico" }]],
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  themeConfig: {
    // 顶部导航
    nav: [
      {
        text: '计算机基础',
        link: '/computer/'
      },
      {
        text: "前端基础",
        link: '/web/'
      },
      {
        text: '全栈开发',
        link: '/node/'
      },
      {
        text: '数据库',
        link: '/database/'
      },
      {
        text: "工具类库",
        link: '/tools/'
      },
      {
        text: '设计模式',
        link: '/design/'
      },
      {
        text: '算法',
        link: '/algorithm/'
      },
      // {
      //   text: 'MongoDB',
      //   link: '/mongodb/'
      // },
      // {
      // 	text: 'Node', items: [
      // 		{
      // 			text: '基本概念',
      // 			link: '/node/concept'
      // 		},
      // 		{
      // 			text: 'Node基础',
      // 			link: '/node/node'
      // 		},
      // 		{
      // 			text: 'Express框架',
      // 			link: '/node/express'
      // 		},
      // 	]
      // },
      // {
      //   text: "文章列表",
      //   items: [
      //     {
      //       text: "前端系列文章",
      //       link: "/notes/javascript"
      //     },
      //     {
      //       text: "Js设计模式",
      //       link: "/notes/design"
      //     },
      //     {
      //       text: "Utils工具包",
      //       link: "/notes/utils"
      //     },
      //     {
      //       text: "Git笔记",
      //       link: "/notes/git"
      //     }
      //   ]
      // }
    ],

    // 侧边栏
    // sidebar: {
    //   "/web/": [""],
    //   "/node/": [",", "node"]
    // },
    sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
    displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
    activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

    // Git 仓库和编辑链接 你的仓库
    repo: "https://github.com/yangfree",
    // 导航栏上的文本
    repoLabel: "Github",

    // editLinks: true,
    // 默认为 "Edit this page"
    // editLinkText: 'Edit this page',
    lastUpdated: "Last Updated" // string | boolean
  }
};

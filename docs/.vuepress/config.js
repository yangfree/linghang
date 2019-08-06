module.exports = {
	title: 'WEB Document',
	description: '一个关于web前端的静态文档资源站',
	base: '/',
	head: [
		['link', {rel: 'icon', href: '/icon.ico'}]
	],
	locales: {
		'/': {
			lang: 'zh-CN'
		}
	},
	themeConfig: {
		// 顶部导航
		nav: [
			{text: 'Web', link: '/web/'},
			{text: 'Node', link: '/node/'},
			// {text: 'Python', link: '/python/'},
			{text: 'RegExp', link: '/regexp/'},
			{text: 'About', link: '/about/'}
		],

		// 侧边栏
		sidebar: {
			'/web/': [
				'',
				'html',
				'css',
		'javascript-1',
		'javascript-2',
		'javascript-3',
        'vue',
		'react'
      ],
      '/node/': [
        ',',
        'node'
      ]
		},
		sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
		displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
		activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

		// Git 仓库和编辑链接
		repo: 'https://github.com/yangfree/vuepress/', // 你的仓库
		repoLabel: 'GitHub', // 导航栏上的文本

		// editLinks: true,
		// 默认为 "Edit this page"
		// editLinkText: 'Edit this page',
		lastUpdated: 'Last Updated', // string | boolean
	}
};
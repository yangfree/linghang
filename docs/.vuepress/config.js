module.exports = {
	title: 'WEB Document',
	description: '一个关于web前端的静态文档资源站',
	base: '/',
	head: [
		['link', { rel: 'icon', href: '/icon.ico' }]
	],
	locales: {
		'/': {
			lang: 'zh-CN'
		}
	},
	themeConfig: {
		// 顶部导航
		nav: [
			{
				text: 'Web', items: [
					{
						text: 'MadeHero',
						items: [
							{
								text: 'read',
								link: '/web/read'
							}
						]
					},
					{
						text: 'Css',
						link: '/web/css'
					},
					{
						text: 'JavaScript',
						items: [
							{
								text: 'Js',
								link: '/web/javascript'
							},
							{
								text: 'ES6',
								link: '/web/es6'
							},
						]
					},
					{
						text: 'Frame',
						items: [
							{
								text: 'Vue',
								link: '/web/vue'
							},
							{
								text: 'React',
								link: '/web/react'
							},
						]
					}

				]
			},
			{
				text: 'Webpack', items: [
					{
						text: 'webpack基础',
						link: '/webpack/webpack-1'
					},
					{
						text: 'webpack优化',
						link: '/webpack/webpack-2'
					},
					{
						text: 'webpack原理',
						link: '/webpack/webpack-3'
					},
					{
						text: 'webpack深入',
						link: '/webpack/webpack-4'
					}
				]
			},
			// { text: 'Node', link: '/node/' },
			// { text: 'About', link: '/about/' },
			// {text: 'Python', link: '/python/'},
			// {text: 'RegExp', link: '/regexp/'},
		],

		// 侧边栏
		sidebar: {
			'/web/': [
				'',
			],
			'/node/': [
				',',
				'node'
			]
		},
		sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
		displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
		activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

		// Git 仓库和编辑链接 你的仓库
		repo: 'https://www.webblog.vip/', 
		// 导航栏上的文本
		repoLabel: 'Ambitious Uncle', 

		// editLinks: true,
		// 默认为 "Edit this page"
		// editLinkText: 'Edit this page',
		lastUpdated: 'Last Updated', // string | boolean
	},
};
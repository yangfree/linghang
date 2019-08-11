(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{181:function(t,e,_){"use strict";_.r(e);var i=_(0),r=Object(i.a)({},function(){var t=this,e=t.$createElement,_=t._self._c||e;return _("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),_("p",[t._v("正则表达式非常繁琐，同时也需要极强的逻辑和分析排列思维。在日常开发中，遇到的很多问题虽然最后都得已解决，但过后细想，如果自己正则足够好，就可以少走很多弯路。正则表达式的强大，还是让我下定决心和它死磕（虽然现在也很一般）。")]),t._v(" "),_("p",[t._v("这篇文章是下面两篇教程的精简和理解，由于本人水平有限，可能会有偏差。")]),t._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://www.runoob.com/regexp/regexp-tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("菜鸟联盟-正则表达式教程"),_("OutboundLink")],1)]),t._v(" "),_("li",[_("a",{attrs:{href:"http://deerchao.net/tutorials/regex/regex.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("正则表达式30分钟入门教程"),_("OutboundLink")],1)])]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),_("p",[t._v("我们为什么要学习正则？")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"regexp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#regexp","aria-hidden":"true"}},[this._v("#")]),this._v(" RegExp")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("正则表达式是我学习在"),e("code",[this._v("JavaScript")]),this._v("学习中的一个障碍，初识它时，感觉看着文档感觉没有一点难处。但是合上教程自己想要解决某些问题的时候才发现，根本无从下手。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"正则简介？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#正则简介？","aria-hidden":"true"}},[this._v("#")]),this._v(" 正则简介？")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("我的理解")]),this._v(" "),e("p",[this._v("我理解的正则是一段规则，我们可以通过这段规则在海量数据中提取这段规则定义的内容，从而对其执行我们想要的操作。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"正则"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#正则","aria-hidden":"true"}},[this._v("#")]),this._v(" 正则")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"元字符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#元字符","aria-hidden":"true"}},[this._v("#")]),this._v(" 元字符")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("只要在"),e("code",[this._v("“/.../”")]),this._v("之间包含起来的，都是正则的元字符")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[this._v("元字符")]),this._v(" "),e("th",{staticStyle:{"text-align":"left"}},[this._v("含义")])])]),this._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("\\")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("转义字符(把有意义和没意义的字符来回转)")])])])])},function(){var t=this,e=t.$createElement,_=t._self._c||e;return _("ul",[_("li",[t._v("特殊元字符\n"),_("ul",[_("li",[_("code",[t._v("\\")])]),t._v(" "),_("li",[_("code",[t._v(".")]),t._v(" 除了\\n以外的任意字符")]),t._v(" "),_("li",[_("code",[t._v("\\n")]),t._v(" 换行符")]),t._v(" "),_("li",[_("code",[t._v("^")]),t._v(" 以xxx开始")]),t._v(" "),_("li",[_("code",[t._v("$")]),t._v(" 以xxx结束")]),t._v(" "),_("li",[_("code",[t._v("\\d")]),t._v(" 匹配0-9之间的任意数字  \\D：除了0-9之间数字的任意字符")]),t._v(" "),_("li",[_("code",[t._v("\\b")]),t._v(" 匹配一个边界")]),t._v(" "),_("li",[_("code",[t._v("\\w")]),t._v(" 匹配数字、字母、下划线中的任意字符")]),t._v(" "),_("li",[_("code",[t._v("\\s")]),t._v(" 匹配一个空白字符")]),t._v(" "),_("li",[_("code",[t._v("[xyz]")]),t._v(" x或者y或者z中的一个，例如：[abcd]四个字母中的任意一个")]),t._v(" "),_("li",[_("code",[t._v("[^xyz]")]),t._v(" 除了三个以外的任意字符")]),t._v(" "),_("li",[_("code",[t._v("[a-z]")]),t._v(" 匹配a-z中的任意字符")]),t._v(" "),_("li",[_("code",[t._v("[^a-z]")]),t._v(" 匹配除了a-z中的任意字符")]),t._v(" "),_("li",[_("code",[t._v("x|y")]),t._v(" 匹配x或者y中的任意一个")]),t._v(" "),_("li",[_("code",[t._v("()")]),t._v(" 分组")]),t._v(" "),_("li",[_("code",[t._v("?:")]),t._v(" 只匹配不捕获")]),t._v(" "),_("li",[_("code",[t._v("?=")]),t._v(" 正向预查")]),t._v(" "),_("li",[_("code",[t._v("?!")]),t._v("  负向预查  两个预查也起到了只匹配不捕获的作用")]),t._v(" "),_("li",[t._v("...")])])]),t._v(" "),_("li",[t._v("量词元字符\n"),_("ul",[_("li",[_("code",[t._v("\\*")]),t._v(" 出现零次或者多次")]),t._v(" "),_("li",[_("code",[t._v("?")]),t._v(" 出现零次或者一次")]),t._v(" "),_("li",[_("code",[t._v("\\+")]),t._v(" 出现一次或者多次")]),t._v(" "),_("li",[_("code",[t._v("{n}")]),t._v(" 出现n次")]),t._v(" "),_("li",[_("code",[t._v("{n,}")]),t._v(" 出现n到多次")]),t._v(" "),_("li",[_("code",[t._v("{n,m}")]),t._v(" 出现n到m次")])])]),t._v(" "),_("li",[t._v("普通元字符：代表本身意思的元字符")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"修饰符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修饰符","aria-hidden":"true"}},[this._v("#")]),this._v(" 修饰符")])},function(){var t=this,e=t.$createElement,_=t._self._c||e;return _("ul",[_("li",[_("code",[t._v("i")]),t._v("：ignoreCase 忽略大小写")]),t._v(" "),_("li",[_("code",[t._v("m")]),t._v("：multiline 匹配换行")]),t._v(" "),_("li",[_("code",[t._v("g")]),t._v("：global 全局匹配")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"贪婪性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#贪婪性","aria-hidden":"true"}},[this._v("#")]),this._v(" 贪婪性")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"懒惰性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#懒惰性","aria-hidden":"true"}},[this._v("#")]),this._v(" 懒惰性")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"匹配"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#匹配","aria-hidden":"true"}},[this._v("#")]),this._v(" 匹配")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"捕获"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#捕获","aria-hidden":"true"}},[this._v("#")]),this._v(" 捕获")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"写几个试试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#写几个试试","aria-hidden":"true"}},[this._v("#")]),this._v(" 写几个试试")])}],!1,null,null,null);e.default=r.exports}}]);
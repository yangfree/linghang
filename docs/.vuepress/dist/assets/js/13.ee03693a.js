(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{173:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"原生js（上）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原生js（上）","aria-hidden":"true"}},[t._v("#")]),t._v(" 原生JS（上）")]),t._v(" "),s("blockquote",[s("p",[t._v("原生JS知识点梳理，大多来自对高程三的整理，加上部分自己的理解。")])]),t._v(" "),s("h2",{attrs:{id:"简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简介","aria-hidden":"true"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),s("p",[s("code",[t._v("JavaScript")]),t._v("由核心"),s("code",[t._v("ECMAScript")]),t._v("，文档对象模型（DOM）和浏览器对象模型（BOM）组成。")]),t._v(" "),s("h3",{attrs:{id:"ecmascript组成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ecmascript组成","aria-hidden":"true"}},[t._v("#")]),t._v(" ECMAScript组成")]),t._v(" "),s("ul",[s("li",[t._v("语法")]),t._v(" "),s("li",[t._v("类型")]),t._v(" "),s("li",[t._v("语句")]),t._v(" "),s("li",[t._v("关键字和保留字")]),t._v(" "),s("li",[t._v("操作符")]),t._v(" "),s("li",[t._v("对象")])]),t._v(" "),s("h3",{attrs:{id:"bom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bom","aria-hidden":"true"}},[t._v("#")]),t._v(" BOM")]),t._v(" "),s("ul",[s("li",[t._v("window对象")]),t._v(" "),s("li",[t._v("location对象")]),t._v(" "),s("li",[t._v("navigator对象")]),t._v(" "),s("li",[t._v("screen对象")]),t._v(" "),s("li",[t._v("history对象")])]),t._v(" "),s("h3",{attrs:{id:"dom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM")]),t._v(" "),s("ul",[s("li",[t._v("DOM结构")]),t._v(" "),s("li",[t._v("Node")]),t._v(" "),s("li",[t._v("Document")]),t._v(" "),s("li",[t._v("Element")]),t._v(" "),s("li",[t._v("Text")]),t._v(" "),s("li",[t._v("Comment")]),t._v(" "),s("li",[t._v("CDATASection")]),t._v(" "),s("li",[t._v("DocumentType")]),t._v(" "),s("li",[t._v("DocumentFragment")]),t._v(" "),s("li",[t._v("Attr")])]),t._v(" "),s("h2",{attrs:{id:"语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法","aria-hidden":"true"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),s("ul",[s("li",[t._v("JS中基本数据类型包含"),s("code",[t._v("undefined")]),t._v(","),s("code",[t._v("null")]),t._v(","),s("code",[t._v("boolean")]),t._v(","),s("code",[t._v("string")]),t._v(","),s("code",[t._v("number")]),t._v(","),s("code",[t._v("symbol")]),t._v("(ES6新增)。")]),t._v(" "),s("li",[t._v("JS中也有一种复杂的数据类型，即"),s("code",[t._v("Object")]),t._v("，该类型是所有对象的基础类型。")]),t._v(" "),s("li",[t._v("严格模式"),s("code",[t._v("use strict")]),t._v("为JS中容易出错的地方添加很多限制。")]),t._v(" "),s("li",[t._v("JS中包含了所有语言中的操作符、条件控制、循环、判断等语句。")]),t._v(" "),s("li",[t._v("JS中没有重载，因为其没有函数签名的特性。所有函数都有默认返回值"),s("code",[t._v("undefined")]),t._v("，都可以传入一个或者多个参数，这些参数在函数内容可以通过"),s("code",[t._v("arguments")]),t._v("来获取，获取后是一组类数组值。")]),t._v(" "),s("li",[t._v("JS中遵循驼峰命名法")])]),t._v(" "),s("h2",{attrs:{id:"bom-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bom-2","aria-hidden":"true"}},[t._v("#")]),t._v(" BOM")]),t._v(" "),s("p",[t._v("在浏览器中，"),s("code",[t._v("window")]),t._v("对象有双重身份，它既是顶层对象，又是ECMAScript规定的"),s("code",[t._v("global")]),t._v("对象。")]),t._v(" "),s("h3",{attrs:{id:"获取浏览器窗口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获取浏览器窗口","aria-hidden":"true"}},[t._v("#")]),t._v(" 获取浏览器窗口")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pageWidth "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pageHeight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientHeight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientHeight"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"location对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#location对象","aria-hidden":"true"}},[t._v("#")]),t._v(" Location对象")]),t._v(" "),s("p",[t._v("window.location和document.location访问的是同一个对象，location对象中不仅包含当前的文档信息，还讲URL解析为一个个独立片段。")]),t._v(" "),s("ul",[s("li",[t._v("hash: 返回URL中的"),s("code",[t._v("hash")]),t._v("值，如果没有返回空字符串。")]),t._v(" "),s("li",[t._v("host: 返回服务器名称和端口号。")]),t._v(" "),s("li",[t._v("hostname: 返回服务器名称（不带端口号）。")]),t._v(" "),s("li",[t._v("href: 返回当前页面的完整URL，"),s("code",[t._v("location.toString()")]),t._v("也返回同样的值。")]),t._v(" "),s("li",[t._v("origin: 返回主站点名称（不包括查询参数）")]),t._v(" "),s("li",[t._v("pathname: 返回URL中的目录或者文件名，通常是"),s("code",[t._v("/")]),t._v("后面"),s("code",[t._v("?")]),t._v("之前。")]),t._v(" "),s("li",[t._v("port: 返回端口号，如果没有则为空字符串。")]),t._v(" "),s("li",[t._v("protocol: 返回页面使用的协议，通常是"),s("code",[t._v("http")]),t._v("或者"),s("code",[t._v("https")]),t._v("。")]),t._v(" "),s("li",[t._v("search: 返回URL的查询字符串，通常以"),s("code",[t._v("?")]),t._v("开头的参数。")]),t._v(" "),s("li",[t._v("assign(): 该方法可以用来打开一个新的URL地址并且在历史记录中生成一条记录")]),t._v(" "),s("li",[t._v("replace(): 该方法只接受一个参数，即要导航到的URL，但不会再历史记录中生成新的记录，浏览器"),s("strong",[t._v("后退")]),t._v("按钮禁用。")]),t._v(" "),s("li",[t._v("reload(): 该方法没有参数的时候回从浏览器的缓存中重新加载页面，如果设置为true会从服务器重新加载页面。")])]),t._v(" "),s("h4",{attrs:{id:"通用查询字符串参数方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#通用查询字符串参数方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 通用查询字符串参数方法:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getQueryStringArgs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" qs "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("location"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("search"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" location"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("search"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      items "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" qs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" qs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'&'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      item "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("len "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" items"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("len"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        item "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" items"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'='")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("decodeURIComponent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("items"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("decodeURIComponent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("items"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"navigator对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#navigator对象","aria-hidden":"true"}},[t._v("#")]),t._v(" navigator对象")]),t._v(" "),s("p",[s("code",[t._v("navigator")]),t._v("对象提供了与浏览器有关的信息，常用的"),s("code",[t._v("userAgent")]),t._v("可以用来判断客户端使用的浏览器信息。")]),t._v(" "),s("h3",{attrs:{id:"screen对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#screen对象","aria-hidden":"true"}},[t._v("#")]),t._v(" screen对象")]),t._v(" "),s("p",[s("code",[t._v("screen")]),t._v("对象包含了客户端的浏览器窗口外部显示器信息，一般只用于站点分析。")]),t._v(" "),s("h3",{attrs:{id:"history对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history对象","aria-hidden":"true"}},[t._v("#")]),t._v(" history对象")]),t._v(" "),s("p",[t._v("一般可以用"),s("code",[t._v("history.length")]),t._v("来判断用户历史记录的数量，用以下三个方法实现页面之间切换跳转。")]),t._v(" "),s("ul",[s("li",[t._v("history.go();")]),t._v(" "),s("li",[t._v("history.back();")]),t._v(" "),s("li",[t._v("history.forward();")])]),t._v(" "),s("h2",{attrs:{id:"dom-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-2","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM")]),t._v(" "),s("p",[t._v("DOM学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为DOM其实是描述整个HTML页面中关系节点的图谱。在"),s("code",[t._v("《JavaScript DOM编程艺术第二版》")]),t._v("中，有对DOM的详细解释，有兴趣的可以去看下，这里我简单总结一下。")]),t._v(" "),s("h3",{attrs:{id:"dom简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom简介","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM简介")]),t._v(" "),s("p",[t._v("DOM：Document Object Model")]),t._v(" "),s("p",[t._v("DOM学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为DOM其实是描述整个HTML页面中关系节点的图谱。在"),s("code",[t._v("《JavaScript DOM编程艺术第二版》")]),t._v("中，有对DOM的详细解释，有兴趣的可以去看下，这里我简单总结一下。")]),t._v(" "),s("p",[t._v("DOM中的“D”代表Document是文档的缩写，创建一个网页并把它加载到浏览器中，DOM就会产生，它把你编写的网页文档转化为一个文档对象。")]),t._v(" "),s("p",[t._v("DOM中的“O”代表Object是对象的缩写。在整个JavaScript中，对象分为用户定义对象，内建对象和宿主对象。")]),t._v(" "),s("ul",[s("li",[t._v("1.用户自定义对象：由程序员创建的对象")]),t._v(" "),s("li",[t._v("2.内建对象：JavaScript中自带的对象，如：Date，Array...")]),t._v(" "),s("li",[t._v("3.宿主对象：由浏览器推荐的对象。")])]),t._v(" "),s("p",[t._v("DOM中的“M”代表Model是模型的缩写，关于模型比较抽象，把它理解为族谱或者文档树可能会更加容易接受，如在网页中有这样一份文档，它的模型可以用如下图片来表示：")]),t._v(" "),s("h3",{attrs:{id:"dom中常见的三种节点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom中常见的三种节点","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM中常见的三种节点")]),t._v(" "),s("p",[t._v("其实族谱和文档树还可以用专业的术语来描述，我们把上图的关系网称之为“节点树”，关于节点，我们需要知道，在DOM常用的三种节点：")]),t._v(" "),s("ul",[s("li",[t._v("元素节点：element node\n"),s("ul",[s("li",[t._v("针对上面一份文档，元素节点就是其中的"),s("code",[t._v("<body>")]),t._v(" "),s("code",[t._v("<p>")]),t._v(" "),s("code",[t._v("<ul>")]),t._v(" "),s("code",[t._v("<li>")]),t._v("...元素标签")])])]),t._v(" "),s("li",[t._v("文本节点：text node\n"),s("ul",[s("li",[t._v("文本节点就是其中的文字，也可以简单理解为显示在网页上的文字内容。")])])]),t._v(" "),s("li",[t._v("属性节点：attribute node\n"),s("ul",[s("li",[s("code",[t._v("<ul>")]),t._v("标签有一个类名class的属性，我们称之为属性节点。")])])])]),t._v(" "),s("h3",{attrs:{id:"dom中获取属性的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom中获取属性的方法","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM中获取属性的方法")]),t._v(" "),s("ul",[s("li",[t._v('1.document.getElementById("Id"):通过元素的ID获取元素对象。\n'),s("ul",[s("li",[t._v("1). 如果页面的ID重复了，将获取第一个元素")]),t._v(" "),s("li",[t._v("2). 在IE6,7中，会把表单元素的name属性值当做ID来使用。")]),t._v(" "),s("li",[t._v("3). 在IE6,7中，不区分ID的大小写。")]),t._v(" "),s("li",[t._v("4). 获取范围（上下文）只能是document.")])])])]),t._v(" "),s("p",[s("strong",[t._v("PS：")]),t._v(" 不要让表单元素的name和其他元素的id重复，不要用ID的大小写来区分不同的元素。")]),t._v(" "),s("ul",[s("li",[t._v('2.document.getElementsByTagName("标签名"):通过标签名来获取一组元素（类数组）。')]),t._v(" "),s("li",[t._v("3.context.getElementsByName:通过元素name属性值来的值获取一组元素（类数组）。")])]),t._v(" "),s("p",[s("strong",[t._v("PS：")]),t._v(" 在IE浏览器下，只能对表单元素有作用。")]),t._v(" "),s("ul",[s("li",[t._v('4.context.getElementsByClassName("类名"):不兼容，在ie6,7,8中会报错')]),t._v(" "),s("li",[t._v("5.document.documentElement:获取html元素")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取当前屏幕宽度。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" curWidth"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取当前屏幕高度。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" curHeight"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientHeight"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientHeight\n")])])]),s("ul",[s("li",[t._v("6.document.querySelector();获取一个.")]),t._v(" "),s("li",[s("ol",{attrs:{start:"7"}},[s("li",[t._v("document.querySelectorAll():获取多个、类数组集合.")])])])]),t._v(" "),s("h3",{attrs:{id:"dom节点关系："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom节点关系：","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM节点关系：")]),t._v(" "),s("ul",[s("li",[t._v("childNodes:获取元素所有的子节点。")]),t._v(" "),s("li",[t._v("children：获取元素的所有元素子节点。")]),t._v(" "),s("li",[t._v("parentNode：获取父亲节点。")]),t._v(" "),s("li",[t._v("previousSibling：获取上一个哥哥节点。")]),t._v(" "),s("li",[t._v("nextSibling：获取下一个弟弟节点。")]),t._v(" "),s("li",[t._v("firstChild：获取所有子节点中的第一个。")]),t._v(" "),s("li",[t._v("lastChild：获取所有子节点中的最后一个。")])]),t._v(" "),s("h3",{attrs:{id:"dom中基本节点操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom中基本节点操作","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM中基本节点操作")]),t._v(" "),s("ul",[s("li",[t._v("1.创建节点：createElement，createAttribute，createTextNode")]),t._v(" "),s("li",[t._v("2.插入节点：appendChild，insertBefore还有一个没有DOM中不存在但是常用的insertAfter方法。")]),t._v(" "),s("li",[t._v("3.替换节点：replaceChild")]),t._v(" "),s("li",[t._v("4.复制节点：cloneNode")]),t._v(" "),s("li",[t._v("5.删除节点：removeNode")])]),t._v(" "),s("h3",{attrs:{id:"dom中对属性的基本操作："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom中对属性的基本操作：","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM中对属性的基本操作：")]),t._v(" "),s("ul",[s("li",[t._v("1.获取属性：getAttribute")]),t._v(" "),s("li",[t._v("2.设置属性：setAttribute")]),t._v(" "),s("li",[t._v("3.删除属性：removeAttribute")])])])}],!1,null,null,null);a.default=n.exports}}]);
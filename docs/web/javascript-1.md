# 原生JS（上）

> 原生JS知识点梳理，大多来自对高程三的整理，加上部分自己的理解。

## 简介

`JavaScript`由核心`ECMAScript`，文档对象模型（DOM）和浏览器对象模型（BOM）组成。

### ECMAScript组成

- 语法
- 类型
- 语句
- 关键字和保留字
- 操作符
- 对象

### BOM

- window对象
- location对象
- navigator对象
- screen对象
- history对象

### DOM

- DOM结构
- Node
- Document
- Element
- Text
- Comment
- CDATASection
- DocumentType
- DocumentFragment
- Attr

## 语法

- JS中基本数据类型包含`undefined`,`null`,`boolean`,`string`,`number`,`symbol`(ES6新增)。
- JS中也有一种复杂的数据类型，即`Object`，该类型是所有对象的基础类型。
- 严格模式`use strict`为JS中容易出错的地方添加很多限制。
- JS中包含了所有语言中的操作符、条件控制、循环、判断等语句。
- JS中没有重载，因为其没有函数签名的特性。所有函数都有默认返回值`undefined`，都可以传入一个或者多个参数，这些参数在函数内容可以通过`arguments`来获取，获取后是一组类数组值。
- JS中遵循驼峰命名法

## BOM

在浏览器中，`window`对象有双重身份，它既是顶层对象，又是ECMAScript规定的`global`对象。

### 获取浏览器窗口

```js
const pageWidth = document.documentElement.clientWidth || document.body.clientWidth;
const pageHeight = document.documentElment.clientHeight || document.body.clientHeight;
```
### Location对象

window.location和document.location访问的是同一个对象，location对象中不仅包含当前的文档信息，还讲URL解析为一个个独立片段。

- hash: 返回URL中的`hash`值，如果没有返回空字符串。
- host: 返回服务器名称和端口号。
- hostname: 返回服务器名称（不带端口号）。
- href: 返回当前页面的完整URL，`location.toString()`也返回同样的值。
- origin: 返回主站点名称（不包括查询参数）
- pathname: 返回URL中的目录或者文件名，通常是`/`后面`?`之前。
- port: 返回端口号，如果没有则为空字符串。
- protocol: 返回页面使用的协议，通常是`http`或者`https`。
- search: 返回URL的查询字符串，通常以`?`开头的参数。
- assign(): 该方法可以用来打开一个新的URL地址并且在历史记录中生成一条记录
- replace(): 该方法只接受一个参数，即要导航到的URL，但不会再历史记录中生成新的记录，浏览器**后退**按钮禁用。
- reload(): 该方法没有参数的时候回从浏览器的缓存中重新加载页面，如果设置为true会从服务器重新加载页面。

#### 通用查询字符串参数方法:

```js
function getQueryStringArgs() {
  var qs = (location.search.length>0 ? location.search.substring(1) : ''),
      args = {},
      items = qs.length ? qs.split('&') :[],
      item = null, name = null, value = null,
      i = 0,len = items.length;

      for(i=0; i<len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(items[0]);
        value = decodeURIComponent(items[1]);

        if(name.length) {
          args[name] = value;
        }
      }

      return args;
}
```

### navigator对象

`navigator`对象提供了与浏览器有关的信息，常用的`userAgent`可以用来判断客户端使用的浏览器信息。

### screen对象

`screen`对象包含了客户端的浏览器窗口外部显示器信息，一般只用于站点分析。

### history对象

一般可以用`history.length`来判断用户历史记录的数量，用以下三个方法实现页面之间切换跳转。

- history.go();
- history.back();
- history.forward();

## DOM

DOM学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为DOM其实是描述整个HTML页面中关系节点的图谱。在`《JavaScript DOM编程艺术第二版》`中，有对DOM的详细解释，有兴趣的可以去看下，这里我简单总结一下。

<!--more-->

### DOM简介
DOM：Document Object Model

DOM学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为DOM其实是描述整个HTML页面中关系节点的图谱。在`《JavaScript DOM编程艺术第二版》`中，有对DOM的详细解释，有兴趣的可以去看下，这里我简单总结一下。

DOM中的“D”代表Document是文档的缩写，创建一个网页并把它加载到浏览器中，DOM就会产生，它把你编写的网页文档转化为一个文档对象。

DOM中的“O”代表Object是对象的缩写。在整个JavaScript中，对象分为用户定义对象，内建对象和宿主对象。
- 1.用户自定义对象：由程序员创建的对象
- 2.内建对象：JavaScript中自带的对象，如：Date，Array...
- 3.宿主对象：由浏览器推荐的对象。

DOM中的“M”代表Model是模型的缩写，关于模型比较抽象，把它理解为族谱或者文档树可能会更加容易接受，如在网页中有这样一份文档，它的模型可以用如下图片来表示：
![一个简单的HTML文档](/images/2018-10/dom-node.jpg "一个简单的html文档DOM结构")

### DOM中常见的三种节点
其实族谱和文档树还可以用专业的术语来描述，我们把上图的关系网称之为“节点树”，关于节点，我们需要知道，在DOM常用的三种节点：
- 元素节点：element node
    - 针对上面一份文档，元素节点就是其中的`<body>` `<p>` `<ul>` `<li>`...元素标签
- 文本节点：text node
    - 文本节点就是其中的文字，也可以简单理解为显示在网页上的文字内容。
- 属性节点：attribute node
    - `<ul>`标签有一个类名class的属性，我们称之为属性节点。

### DOM中获取属性的方法
- 1.document.getElementById("Id"):通过元素的ID获取元素对象。
    - 1). 如果页面的ID重复了，将获取第一个元素
    - 2). 在IE6,7中，会把表单元素的name属性值当做ID来使用。
    - 3). 在IE6,7中，不区分ID的大小写。
    - 4). 获取范围（上下文）只能是document.

**PS：** 不要让表单元素的name和其他元素的id重复，不要用ID的大小写来区分不同的元素。
- 2.document.getElementsByTagName("标签名"):通过标签名来获取一组元素（类数组）。
- 3.context.getElementsByName:通过元素name属性值来的值获取一组元素（类数组）。

**PS：** 在IE浏览器下，只能对表单元素有作用。

- 4.context.getElementsByClassName("类名"):不兼容，在ie6,7,8中会报错
- 5.document.documentElement:获取html元素
``` javascript
// 获取当前屏幕宽度。
const curWidth= document.documentElement.clientWidth||document.body.clientWidth
// 获取当前屏幕高度。
const curHeight= document.documentElement.clientHeight||document.body.clientHeight
```
- 6.document.querySelector();获取一个.
- 7. document.querySelectorAll():获取多个、类数组集合.

### DOM节点关系：
- childNodes:获取元素所有的子节点。
- children：获取元素的所有元素子节点。
- parentNode：获取父亲节点。
- previousSibling：获取上一个哥哥节点。
- nextSibling：获取下一个弟弟节点。
- firstChild：获取所有子节点中的第一个。
- lastChild：获取所有子节点中的最后一个。

### DOM中基本节点操作
- 1.创建节点：createElement，createAttribute，createTextNode
- 2.插入节点：appendChild，insertBefore还有一个没有DOM中不存在但是常用的insertAfter方法。
- 3.替换节点：replaceChild
- 4.复制节点：cloneNode
- 5.删除节点：removeNode

### DOM中对属性的基本操作：
- 1.获取属性：getAttribute
- 2.设置属性：setAttribute
- 3.删除属性：removeAttribute

## javascipt盒子模型

> Js盒子模型指的是通过JS中提供的一系列的属性和方法，获取页面中元素的样式信息值。

### client系列

- `clientWidth`: 内容宽度+左右padding.
- `clientHeight`: 内容高度+上下padding.
- `clientLeft`: 获取元素 左边框宽度.
- `clientTop`: 获取元素 上边框宽度 其实就是border【left/top】Width的值.

### offset系列

- `offsetWidth`: clientWidth+左右边框宽度.
- `offsetHeight`: clientHeight+上下边框宽度 和内容是否溢出没有关系.
- `offsetTop`: 元素上边框外边距离父级参照物上偏移量.
- `offsetleft`: 元素左边框外边距离父级参照物左偏移量.
- `offsetParent`: 元素父级参照物，可以修改.

### scroll系

#### 在没有溢出的情况下 

- `scrollWidth`: clientWidth
- `scrollHeight`: clientHeight

#### 溢出情况下

- `scrollWidth`: 真实内容宽度（包含溢出）+左填充
- `scrollHeight`: 真实内容高度（包含溢出）+上填充

PS：获取到的结果都是约等于值，因为：同一个浏览器是否设置overflow='hidden'对最终结果是有影响的；在不同浏览器中，我们获取到的结果也是不相同的.

- `scrollLeft`: 滚动条卷去的宽度.
- `scrollTop`: 滚动条卷去的高度.

### 关于js盒子模型属性取值的问题

1. 我们通过这13个属性值永远不可能出现小数，都是整数，浏览器在获取结果的时候，会在原来真实结果的基础上进行四舍五入.

### 关于操作浏览器本身盒子模型信息

1. `clientWidth/clientHidth`是当前浏览器可视窗口的宽度和高度.
2. `scrollWidth/scrollHeigh`t是当前页面的真实宽度和高度（是个约等于值）。
3. 我们不管那些属性，也不管是什么浏览器，也不管是获取还是设置，想要都兼容，需要写两套 

``` javascript
function win(attr,val) {
  if(typeof val === 'undefined'){
     // 如果第二个参数没传就是获取值
     return document.documentElement[attr] || document.body[attr];
     }
    // 否则就是 设置值
    document.documentElement[attr] = val; document.body[attr] = val; }

```
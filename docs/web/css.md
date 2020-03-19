---
title: Css小书
sidebar: auto
prev: false
next: ./javascript
---

## 前言

作为一个前端工作者， `css` 是我第一个接触最早的，但也是学的最差的，我静下来看 css 可能只有几个小时，我甚至都没有弄懂就已经把网页拼凑起来了，之后在工作中，遇到不懂的就去 google，反正也能应付过去。

我没有消耗过多的精力去学是因为我觉得它简单，但后来的举步维艰让我渐渐意识到，其实它并不简单，因为它没有任何逻辑可言，很多概念需要自己去摸索，去理解，去深入，才可以在实践中运用，得心应手。

这本小书是第二次重新学习 Css 的总结，加入了自己的一些理解，主要从 Css 的基础概念，Css 的作用以及 Css 常用的技巧进行书写。

## Css 的基础概念

### 层叠样式表

`css` 叫做**层叠样式表**，样式表很好理解，那么层叠呢？层叠应该如何去理解？

我的理解有两方面:

1. 比如我们把全文标题元素字体大小设置为 16px，但当我们再次针对某个标题元素设置的时候，它依然会生效。

2. 我们还可以从 css 的引入方式来理解，常见的 `css` 引入方式有 4 种：

   - 行内式
   - 外练式
   - `@import` 引入
   - `style` 标签嵌入

再加上浏览器默认样式，这样，通常在浏览器中我们所看到的页面由这 5 种样式层叠之后所展示出来。针对同一元素，同一种样式，在优先级一样的情况下，后面的会覆盖掉前面。在优先级不一样的情况下，优先级高的会生效。（加了 `!important` 的优先级最高），对于不同种类的样式会叠加。

> **优先级的计算取决于遇到一个 id 就往特指度数值中加 100，遇到一个 class 就往特指度数值中加 10，遇到一个 element 就往特指度数值中加 1。**

### "流"的思考

组成网页的 `html` 元素具备**流**的特性，从大体上划分，块级元素独占一行，默认充满整个宽度，内联元素挨个排列，当宽度达到边界的时候会自动换行。就像我们常见的水流，遇到石头会环绕前行，文字遇到图片也会环绕包围后继续向下延展。如果把整个网页比喻成一条河流，那么在没有任何干扰下，里面的元素会遵循这个规则。

这种特性对 `css` 造成的影响是，如果想要改变布局，就要破坏“流”，我们常见的改变**流**特性的属性是浮动和定位，所以被浮动和定位的元素，共有的一点特征就是脱离之前的文档流（不包含属性值设置为 `static` 和 `relative` 的元素），并且会将元素转化为块级元素。

而 BFC（块级格式化上下文）则是对**流**这种特性的一种补充, 对于**浮动元素**和**绝对定位元素**，**非块级盒子的块级容器**（例如 display 的值为 inline-blocks, table-cells, 和 table-captions），以及 overflow 值不为“visiable”的**块级盒子**，都会为他们的内容创建新的 BFC。 `BFC` 最大的特点就是无论子元素如何设置，都不会影响外部元素，在 BFC 中，两个相邻的块级盒`margin`上下会发生坍塌。

“流”特性有扩展性，即可以随着屏幕的大小而自动充满，或者搭配百分比可以做到一些适配，但其改变的终归是盒子本身，而在盒子中的内容却没有这个特性。所以“流式布局”有它的局限性，他可以使网页的整个结构实现响应式，但在对于结构里的内容却束手无策，需要单独再做处理。另外， `table` 有自己单独的规则，默认情况下并不会充满整个父级元素。

理解“流”的这些特性对于我们书写样式和样式重构有着莫大的帮助。

## Css 的作用

作为一个前端工程师，Css 的编写工作在日常工作中可能会占很大比重，从我们接触到设计图，布局工作其实就已经开始。在 Css 中，有关布局的属性主要有盒子模型，浮动，定位。

### 盒子模型

> Css 的盒子模型分为标准盒模型和怪异盒模型，标准盒模型是 W3C 定义的，它包含了 `content` , `border` , `padding` , `margin` , 而怪异盒模型的 `content` 包含了 `padding` 和 `border` 。 `box-sizing:border-box` 可以让标准盒子模型转化为怪异盒子模型。

`box-sizing`可以改变盒模型的解析模式，`content-box`解析为标准盒模型，`border-box`解析为怪异盒模型，默认值为`content-box`。

![CSS标准盒子模型](/images/box-model.png)

### 浮动

浮动元素会改变非块级元素成为块级元素，脱离了正常页面对文档流，使其父级元素对高度坍塌，不要滥用，切记要用完后要清除浮动，常用清除浮动对方法为:对父元素设置`overflow:hidden`,添加空元素标签设置`clear:both`,和借助伪元素。

### 定位

`static`： 默认值，没有定位。

`absolute`： 生成绝对定位对元素，相对于最近一级定位不是`static`对进行定位

`fixed`： 生成固定定位元素，相对于浏览器窗口或者 iframe 进行定位。

`raletive`： 生成相对定位对元素，相对于元素自身在普通文档流中进行定位。

`sticky`： 生成粘性定位元素，容器对位置相对于文档流正常位置计算得出。

## 常用样式的解决方案

以下是业务中常见对一些 Css 代码总结。

### 隐藏页面中的元素有哪些方法

- 完全隐藏->元素从 dom 中消失，不占据空间。

1. `display: none`.
2. `<div hidden></div>`

- 视觉上的隐藏->屏幕中不可见，占据空间。

1. 利用定位或者距离移除视觉之外，常见但有`margin-left: -9999px; height:0`;`position:absolute;left:-9999px`.
2. 利用`transform: scale(0);height:0;`, `transform:translateX(-9999px);height:0;`, `transform: rotateY(90deg)`
3. 将其大小设置为 0.`width:0;height:0;font-size:0;`
4. 透明度设置为 0.`opacity:0`
5. `visibility: hidden;`
6. 利用定位层级覆盖。
7. `clip-path: polygon(0 0, 0 0, 0 0, 0 0);`

- 语义上的隐藏->读屏软件不可读，但正常占据空间

```html
<div aria-hidden="true"></div>
```

### `css` 中的多余隐藏以... 结尾

- 单行隐藏

```css
.box-demo {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- 多行隐藏

> 在火狐浏览器下无效

```css
.box-demo {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 130px;
}
```

#### 跨浏览器实现

- 利用 `css` 伪元素定位来实现，缺点是每个浏览器解析不太一样，看起来不太自然。

```css
.box-demo {
  position: relative;
  width: 130px;
  height: 2.8em;
  line-height: 1.4em;
  overflow: hidden;
}

.box-demo::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 20px;
  background: -webkit-linear-gradient(to right, transparent, #fff 62%);
  background: -o-linear-gradient(to right, transparent, #fff 62%);
  background: -moz-linear-gradient(to right, transparent, #fff 62%);
  background: linear-gradient(to right, transparent, #fff 62%);
}
```

- `JavaScript` + `css` 实现

```html
<div id="ellipsis" class="ellipsis">
  1961年，执导了京剧《香罗帕》在1981年被评选为全国优秀电视艺术加工文艺节目。1976年参与为毛主席录制传统戏曲曲艺节目，并在湖南拍摄过湘剧传统戏《追鱼记》等上百个湘剧剧目。
</div>
```

```css
.box-demo {
  width: 130px;
  height: 2.8em;
  line-height: 1.4em;
}
```

```javascript
/*
 * @params
 *   num: 截取的字符串
 *   element: 元素ID
 */
function wordsHide(num, element) {
  let contain = document.getElementById(element);
  let maxSize = num;
  let txt = contain.innerHTML;
  if (txt.length > num) {
    txt = txt.substring(0, num - 1) + "...";
    contain.innerHTML = txt;
  } else {
    console.log("error");
  }
}
wordsHide(30, "ellipsis");
```

### 盒子水平垂直居中问题

在工作中我们经常可以遇到，并且在前端面试有非常大的几率会问到，今天总结了一下，有多少种方式可以实现，以及实现的原理。

我们约定默认样式已经清除并且页面结构统一如下:

```html
<body>
  <div class="out">
    <div class="inner"></div>
  </div>
</body>
```

- 绝对定位+ `auto`

```css
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
```

- 绝对定位+ `负边距`

```css
position: absolute;
top: 50%;
left: 50%;
margin-left: -50px;
/*宽的一半*/
margin-top: -40px;
/**高的一半/
```

- 弹性盒模型

```css
display: flex;
justify-content: center;
align-items: center;
```

- 知道父子盒子的高度，利用高度差和 `padding`

```css
box-sizing: border-box;
padding-top: 110px;
/*父子盒子高度差/2*/
```

```css
margin: 0 auto；;
```

- 定位+css3 translate

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

- `margin` + `table-cell`

```css
/*父元素*/
display: table-cell;
vertical-align: middle;
```

```css
/*子元素*/
margin: 0 auto;
```

### 鼠标经过图片放大（带过渡效果）

```css
.image-box {
  width: 300px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ccc;
  margin: 10px auto;
}

.image-box img {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
}

.image-box img:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
```

### 实现动态"..."

```html
<div>内容正在加载中<dot></dot></div>
```

```css
dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -0.25em;
  overflow: hidden;
}

dot::before {
  display: block;
  content: "...\A..\A.";
  white-space: pre-wrap;
  animation: dot 1.5s infinite step-start both;
}

@keyframes dot {
  33% {
    transform: translateY(-2em);
  }

  66% {
    transform: translateY(-1em);
  }
}
```

## 移动端的适配

### flex 布局

任何容器都可以指定为 `flex` 布局。

```css
/* 块级元素 */
.box {
  display: flex;
}

/* 行内元素 */
span {
  display: inline-flex;
}

/* webkit内核必须加前缀 */
.box {
  display: -webkit-flex;
  display: flex;
}
```

**注 :** 设为 `flex` 布局后，子元素的 `float` , `clear` , `vertical-align` 属性将失效。

- 容器的属性

  - flex-direction
  - flex-wrap
  - flex-flow
  - justify-content
  - align-items
  - align-content

- flex-direction 属性

`flex-direction` 属性决定了容器里子元素的排列方向。

```css
.box {
  /* 默认值 水平方向 从左到右排列*/
  flex-direction: row;
  /* 水平方向  从右向左排列 */
  flex-direction: row-reverse;
  /* 垂直方向 从上到下排列 */
  flex-direction: column;
  /* 垂直方向，从下到上排列 */
  flex-direction: column-reverse;
}
```

- flex-wrap 属性

定义如何换行，它有三个值 `nowrap` /(默认)不换行， `wrap` / 换行，起始行在上方, `wrap-reverse` / 换行，起始行在下方。

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- flex-flow 属性

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

- justify-content 属性

`justify-content` 属性定义了子元素的对齐方式

```css
.box {
  /* 默认值 左对齐 */
  justify-content: flex-start;
  /* 右对齐 */
  justify-content: end;
  /* 居中 */
  justify-content: center;
  /* 两端对齐 子元素之间距离相等 */
  justify-content: space-between;
  /* 子元素两侧的间隔相等 */
  justify-content: space-around;
}
```

- align-items 属性

align-items 属性定义了子元素在垂直方向的对齐方式。

```css
.box {
  /* 默认值 如果未设置高度，则高度是整个容器的高度 */
  align-items: stretch;
  /* 垂直方向顶端对齐 */
  align-items: flex-start;
  /* 垂直方向底端对齐 */
  align-items: flex-end;
  /* 垂直居中 */
  align-items: center;
  /* 子元素第一行文字基线对齐 */
  align-items: baseline;
}
```

- align-content 属性

`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  /* 多行子元素充满整个容器高度 */
  align-content: stretch;
  /* 多行子元素基于容器顶端对齐 */
  align-content: flex-start;
  /* 多行子元素基于容器底端对齐 */
  align-content: flex-end;
  /* 多行子元素在容器中居中 */
  align-content: center;
  /* 多行子元素基于容器两端对齐  间隔相等*/
  align-content: space-between;
  /* 多行子元素两侧间隔相等 所以距离顶端和底端是两行子元素之间距离的一半*/
  align-content: space-around;
}
```

- 子元素属性

  - order
  - flex-grow
  - flex-shrink
  - justify-basis
  - flex
  - align-self

- order 属性

`order` 属性定义子元素的排列顺序。数值越小，排列越靠前，默认为 0

```css
.item {
  order: <integer>;
}
```

- flex-grow 属性

`flex-grow` 属性定义子元素的放大比例，默认为 0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>;
  /* default 0 */
}
```

如果所有子元素的 `flex-grow` 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个子元素的 `flex-grow` 属性为 2，其他子元素都为 1，则前者占据的剩余空间将比其他项多一倍。

- flex-shrink 属性

`flex-shrink` 属性定义了子元素的缩小比例，默认为 1，即如果空间不足，该子元素将缩小.

```css
.item {
  flex-shrink: <number>;
  /* default 1 */
}
```

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

- flex-basis 属性

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto;
  /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如 350px），则项目将占据固定空间。

- flex 属性

`flex` 属性是 `flex-grow` , `flex-shrink` 和 `flex-basis` 的简写，默认值为 0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" >];
}
```

该属性有两个快捷值：**auto (1 1 auto)** 和 **none (0 0 auto)**。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

- align-self 属性

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto` ，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch` 。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取 6 个值，除了 auto，其他都与 align-items 属性完全一致。

### rem+百分比

`rem`是一个表示大小对单位，和`em`类似，只不过它是相对于网站根字体大小进行计算。

$ 设备对宽度\设计图对大小 = 根字体对大小\rem $

### 媒体查询

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

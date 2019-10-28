---
title: Css知识汇总
sidebar: auto
prev: false
next: ./javascript
---

此篇文章写的是关于css的一些总结, 作为一个前端工作者， `css` 是我第一个接触最早的，但也是学的最差的，我静下来看css可能只有几个小时，我甚至都没有弄懂就已经把网页拼凑起来了，之后在工作中，遇到不懂的就去google，反正也能应付过去。

我没有消耗过多的精力去学是因为我觉得它简单，但后来的举步维艰让我渐渐意识到，其实它并不简单，甚至还有困难，因为它没有逻辑可言，很多概念需要自己去想想，理解。

## css简介

`css` 叫做**层叠样式表**，样式表很好理解，那么层叠呢？层叠应该如何去理解？

要想理解层叠就要从 `css` 的引入方式来理解， `css` 常见的引入方式有5种，

* 行内式
* 外练式
* `@import` 引入
* `style` 标签嵌入
* 浏览器默认样式

在优先级一样的情况下，同一个样式写在最后面的生效，如果相同的样式名称，后面的会覆盖掉前面。

在优先级不一样的情况下，优先级高的会生效。

优先级的计算取决于**遇到一个id就往特指度数值中加100，遇到一个class就往特指度数值中加10，遇到一个element就往特指度数值中加1, 但是加了 `!important` 的优先级最高。**

### BFC

> `块级格式化上下文` , 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

### 盒子模型

> Css的盒子模型分为标准盒模型和怪异盒模型，标准盒模型是W3C定义的，它包含了 `content` , `border` , `padding` , `margin` , 而怪异盒模型的 `content` 包含了 `padding` 和 `border` 。 `box-sizing:border-box` 可以让标准盒子模型转化为怪异盒子模型。

![CSS标准盒子模型](/images/box-model.gif)

### 元素定位 `position` 

关于定位属性 `position` 一共有五个值，分别是 `inherit` , `static` , `relative` , `absolute` 和 `fixed` , 定位会改变元素的形态，所有的元素均转化为块级元素。

* `inherit` : 规定应该从父元素继承 `position` 属性的值。
* `static` : 元素正常显示，默认值。
* `relative` : 相对定位，元素相对于自身位置进行定位，元素任然保持其未定位前的状态，它原本所占的空间仍然保留。
* `absolute` : 绝对定位，元素脱离文档流，相对于其第一个设置了除 `static` 定位以外的父元素进行定位，并且会转化为块级元素。
* `fixed` : 固定定位，元素脱离文档流，相对于浏览器窗口进行定位，并且会转化为块级元素。

定位经常会与 `z-index` 一起使用， `z-index` 的值为数字，值越大，元素层级越高。

### 元素浮动 `float` 

浮动属性原是为了解决文字环绕图片问题，但后来常用于布局中。 `absolute` , `fixed` 值会让元素脱离当前文档流, 并且会把非块级元素转化为块级元素。浮动大大方便了我们的布局，但是缺陷也是明显的，对于复杂页面，浮动布局会显得凌乱，对于维护来讲，成本较高。

|值|含义|
|:--|:--|
|static|默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。|
|inherit|	规定应该从父元素继承 `position` 属性的值。|
|relative|生成相对定位的元素，相对于其正常位置进行定位。不会脱离文档流，一般用于转化为定位元素，很少用来布局。|
|absolute|生成绝对定位的元素，相对于 `static` 定位以外的第一个父元素进行定位。|
|fixed|生成绝对定位的元素，相对于浏览器窗口进行定位。|

### flex布局

任何容器都可以指定为 `flex` 布局。

``` css
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

* 容器的属性
    - flex-direction
    - flex-wrap
    - flex-flow
    - justify-content
    - align-items
    - align-content

* flex-direction属性

`flex-direction` 属性决定了容器里子元素的排列方向。

``` css
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

* flex-wrap属性

定义如何换行，它有三个值 `nowrap` /(默认)不换行， `wrap` / 换行，起始行在上方, `wrap-reverse` / 换行，起始行在下方。

``` css
.box {
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* flex-flow属性

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

``` css
.box {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

* justify-content属性

`justify-content` 属性定义了子元素的对齐方式

``` css
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

* align-items属性

align-items属性定义了子元素在垂直方向的对齐方式。

``` css
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

* align-content属性

`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

``` css
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

* 子元素属性
    - order
    - flex-grow
    - flex-shrink
    - justify-basis
    - flex
    - align-self

* order属性

`order` 属性定义子元素的排列顺序。数值越小，排列越靠前，默认为0

``` css
.item {
    order: <integer>;
}
```

* flex-grow属性

`flex-grow` 属性定义子元素的放大比例，默认为0，即如果存在剩余空间，也不放大。

``` css
.item {
    flex-grow: <number>;
    /* default 0 */
}
```

如果所有子元素的 `flex-grow` 属性都为1，则它们将等分剩余空间（如果有的话）。如果一个子元素的 `flex-grow` 属性为2，其他子元素都为1，则前者占据的剩余空间将比其他项多一倍。

* flex-shrink属性

`flex-shrink` 属性定义了子元素的缩小比例，默认为1，即如果空间不足，该子元素将缩小.

``` css
.item {
    flex-shrink: <number>;
    /* default 1 */
}
```

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

* flex-basis属性

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

``` css
.item {
    flex-basis: <length> | auto;
    /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如350px），则项目将占据固定空间。

* flex属性

`flex` 属性是 `flex-grow` , `flex-shrink` 和 `flex-basis` 的简写，默认值为0 1 auto。后两个属性可选。

``` css
.item {
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'>]
}
```

该属性有两个快捷值：**auto (1 1 auto)** 和 **none (0 0 auto)**。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

* align-self属性

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto` ，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch` 。

``` css
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

## 常见问题总结

### `css` 中的多余隐藏以... 结尾。

* 单行隐藏

``` css
.box-demo {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

* 多行隐藏

> 在火狐浏览器下无效

``` css
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

* 利用 `css` 伪元素定位来实现，缺点是每个浏览器解析不太一样，看起来不太自然。

``` css
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

* `JavaScript` + `css` 实现

``` html
<div id="ellipsis" class="ellipsis">
    1961年，执导了京剧《香罗帕》在1981年被评选为全国优秀电视艺术加工文艺节目。1976年参与为毛主席录制传统戏曲曲艺节目，并在湖南拍摄过湘剧传统戏《追鱼记》等上百个湘剧剧目。
</div>
```

``` css
.box-demo {
    width: 130px;
    height: 2.8em;
    line-height: 1.4em;
}
```

``` javascript
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
        console.log("error")
    }
};
wordsHide(30, 'ellipsis');
```

### 盒子水平垂直居中问题

在工作中我们经常可以遇到，并且在前端面试有非常大的几率会问到，今天总结了一下，有多少种方式可以实现，以及实现的原理。

我们约定默认样式已经清除并且页面结构统一如下:

``` html
<body>
    <div class="out">
        <div class="inner"></div>
    </div>
</body>
```

* 绝对定位+ `auto` 

``` css
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
```

* 绝对定位+ `负边距` 

``` css
position: absolute;
top: 50%;
left: 50%;
margin-left: -50px;
/*宽的一半*/
margin-top: -40px;
/**高的一半/
```

* 弹性盒模型

``` css
display: flex;
justify-content: center;
align-items: center;
```

* 知道父子盒子的高度，利用高度差和 `padding` 

``` css
box-sizing: border-box;
padding-top: 110px;
/*父子盒子高度差/2*/
```

``` css
margin: 0 auto；
```

* 定位+css3 translate

``` css
position: absolute;
top: 50%;
left: 50%;
transform:translate(-50%, -50%);
```

* `margin` + `table-cell` 

``` css
/*父元素*/
display: table-cell;
vertical-align: middle;
```

``` css
/*子元素*/
margin: 0 auto;
```

### 鼠标经过图片放大（带过渡效果）

``` css
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


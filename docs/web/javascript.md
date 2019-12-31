---
title: 原生JS
sidebar: auto
prev: ./css
next: ./es6
---

> 原生JS知识点梳理，这不是教程，不会由浅入深，更不会有任何逻辑。很多东西加了主观的理解，很有可能它是错的，而之所以要写，是为了**连点成线**。

## 简介

`JavaScript` 由核心 `ECMAScript` ，文档对象模型（DOM）和浏览器对象模型（BOM）组成。

`ECMAScript` 包含语法, 类型, 语句, 关键字和保留字, 操作符, 对象。

`BOM` 是浏览器对象，它包含window对象, location对象, navigator对象, screen对象, history对象。

`DOM` 是节点，一个文档一般都是由很多节点组成，它包含了元素节点，属性节点，文本节点... 而 `DOM` 对象就是提供了一系列方法操作这些节点。

### 必备小知识点

* JS中基本数据类型包含 `undefined` , `null` , `boolean` , `string` , `number` , `symbol` (ES6新增)。
* JS中也有一种复杂的数据类型，即 `Object` ，该类型是所有对象的基础类型。
* 严格模式 `use strict` 为JS中容易出错的地方添加很多限制。
* JS中包含了所有语言中的操作符、条件控制、循环、判断等语句。
* JS中没有重载，因为其没有函数签名的特性。所有函数都有默认返回值 `undefined` ，都可以传入一个或者多个参数，这些参数在函数内容可以通过 `arguments` 来获取，获取后是一组类数组值。
* JS中遵循驼峰命名法。

## BOM

在浏览器中， `window` 对象有双重身份，它既是顶层对象，又是ECMAScript规定的 `global` 对象。

### 获取浏览器窗口

``` js
const pageWidth = document.documentElement.clientWidth || document.body.clientWidth;
const pageHeight = document.documentElment.clientHeight || document.body.clientHeight;
```

### Location对象

`window.location` 和 `document.location` 访问的是同一个对象，location对象中不仅包含当前的文档信息，还讲URL解析为一个个独立片段。

|value|含义|
|:-|:-|
|hash|返回URL中的 `hash` 值，如果没有返回空字符串。|
|host|返回服务器名称和端口号。|
|hostname|返回服务器名称（不带端口号）。|
|href|返回当前页面的完整URL， `location.toString()` 也返回同样的值。|
|origin|返回主站点名称（不包括查询参数）|
|pathname|返回URL中的目录或者文件名，通常是 `/` 后面 `?` 之前。|
|port|返回端口号，如果没有则为空字符串。|
|protocol|返回页面使用的协议，通常是 `http` 或者 `https` 。|
|search|返回URL的查询字符串，通常以 `?` 开头的参数。|
|assign()|该方法可以用来打开一个新的URL地址并且在历史记录中生成一条记录。|
|replace()|该方法只接受一个参数，即要导航到的URL，但不会再历史记录中生成新的记录，浏览器**后退**按钮禁用。|
|reload()|该方法没有参数的时候回从浏览器的缓存中重新加载页面，如果设置为true会从服务器重新加载页面。|

**通用查询字符串参数方法:**

``` js
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(items[0]);
        value = decodeURIComponent(items[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}
```

### navigator对象

`navigator` 对象提供了与浏览器有关的信息，常用的 `userAgent` 可以用来判断客户端使用的浏览器信息。

``` js
window.navigator.userAgent
/**
 * Chrome中显示的信息:
 *  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)
 *   AppleWebKit/537.36 (KHTML, like Gecko) 
 *   Chrome/77.0.3865.120 Safari/537.36"
 *  
 * firefox中显示的信息:
 *  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) 
 *  Gecko/20100101 Firefox/69.0"
 *
 * */
```

### screen对象

`screen` 对象包含了客户端的浏览器窗口外部显示器信息，一般只用于站点分析。

### history对象

一般可以用 `history.length` 来判断用户历史记录的数量，用以下三个方法实现页面之间切换跳转。

|value|含义|
|:-|:-|
|history.go()|传入一个数字，前进或回退跳转N步|
|history.back()|传入一个数字，回退N步|
|history.forward()|传入一个数字，前进N步。|

## DOM

DOM学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为DOM其实是描述整个HTML页面中关系节点的图谱。
在 `《JavaScript DOM编程艺术第二版》` 中，有对DOM的详细解释，有兴趣的可以去看下，这里我简单总结一下。

### DOM Document Object Model

DOM中的“D”代表Document是文档的缩写，创建一个网页并把它加载到浏览器中，DOM就会产生，它把你编写的网页文档转化为一个文档对象。

DOM中的“O”代表Object是对象的缩写。在整个JavaScript中，对象分为用户定义对象，内建对象和宿主对象。

* 1. 用户自定义对象：由程序员创建的对象
* 2. 内建对象：JavaScript中自带的对象，如：Date，Array... 
* 3. 宿主对象：由浏览器推荐的对象。

DOM中的“M”代表Model是模型的缩写，关于模型比较抽象，把它理解为族谱或者文档树可能会更加容易接受，如在网页中有这样一份文档，它的模型可以用如下图片来表示：

### DOM中常见的三种节点

其实族谱和文档树还可以用专业的术语来描述，我们把上图的关系网称之为“节点树”，关于节点，我们需要知道，在DOM常用的三种节点：

* 元素节点：element node
    - 针对上面一份文档，元素节点就是其中的 `<body>`  `<p>`  `<ul>`  `<li>` ...元素标签
* 文本节点：text node
    - 文本节点就是其中的文字，也可以简单理解为显示在网页上的文字内容。
* 属性节点：attribute node
    - `<ul>` 标签有一个类名class的属性，我们称之为属性节点。

### DOM中获取属性的方法

* 1.document.getElementById("Id"): 通过元素的ID获取元素对象。
    - 1). 如果页面的ID重复了，将获取第一个元素
    - 2). 在IE6,7中，会把表单元素的name属性值当做ID来使用。
    - 3). 在IE6,7中，不区分ID的大小写。
    - 4). 获取范围（上下文）只能是document.

**PS：** 不要让表单元素的name和其他元素的id重复，不要用ID的大小写来区分不同的元素。

* 2.document.getElementsByTagName("标签名"): 通过标签名来获取一组元素（类数组）。
* 3.context.getElementsByName: 通过元素name属性值来的值获取一组元素（类数组）。

**PS：** 在IE浏览器下，只能对表单元素有作用。

* 4.context.getElementsByClassName("类名"): 不兼容，在ie6, 7, 8中会报错
* 5.document.documentElement: 获取html元素

``` javascript
// 获取当前屏幕宽度。
const curWidth = document.documentElement.clientWidth || document.body.clientWidth
// 获取当前屏幕高度。
const curHeight = document.documentElement.clientHeight || document.body.clientHeight
```

* 6.document.querySelector(); 获取一个.
* 7.document.querySelectorAll(): 获取多个、类数组集合.

### DOM节点关系：

* childNodes: 获取元素所有的子节点。
* children：获取元素的所有元素子节点。
* parentNode：获取父亲节点。
* previousSibling：获取上一个哥哥节点。
* nextSibling：获取下一个弟弟节点。
* firstChild：获取所有子节点中的第一个。
* lastChild：获取所有子节点中的最后一个。

### DOM中基本节点操作

* 1. 创建节点：createElement，createAttribute，createTextNode
* 2. 插入节点：appendChild，insertBefore还有一个没有DOM中不存在但是常用的insertAfter方法。
* 3. 替换节点：replaceChild
* 4. 复制节点：cloneNode
* 5. 删除节点：removeNode

### DOM中对属性的基本操作：

* 1. 获取属性：getAttribute
* 2. 设置属性：setAttribute
* 3. 删除属性：removeAttribute

## javascipt盒子模型

> Js盒子模型指的是通过JS中提供的一系列的属性和方法，获取页面中元素的样式信息值。

### client系列

* `clientWidth` : 内容宽度+左右padding.
* `clientHeight` : 内容高度+上下padding.
* `clientLeft` : 获取元素 左边框宽度.
* `clientTop` : 获取元素 上边框宽度 其实就是border【left/top】Width的值.

### offset系列

* `offsetWidth` : clientWidth+左右边框宽度.
* `offsetHeight` : clientHeight+上下边框宽度 和内容是否溢出没有关系.
* `offsetTop` : 元素上边框外边距离父级参照物上偏移量.
* `offsetleft` : 元素左边框外边距离父级参照物左偏移量.
* `offsetParent` : 元素父级参照物，可以修改.

### scroll系

#### 在没有溢出的情况下 

* `scrollWidth` : clientWidth
* `scrollHeight` : clientHeight

#### 溢出情况下

* `scrollWidth` : 真实内容宽度（包含溢出）+左填充
* `scrollHeight` : 真实内容高度（包含溢出）+上填充

PS：获取到的结果都是约等于值，因为：同一个浏览器是否设置overflow='hidden'对最终结果是有影响的；在不同浏览器中，我们获取到的结果也是不相同的.

* `scrollLeft` : 滚动条卷去的宽度.
* `scrollTop` : 滚动条卷去的高度.

### 关于js盒子模型属性取值的问题

1. 我们通过这13个属性值永远不可能出现小数，都是整数，浏览器在获取结果的时候，会在原来真实结果的基础上进行四舍五入.

### 关于操作浏览器本身盒子模型信息

1. `clientWidth/clientHidth` 是当前浏览器可视窗口的宽度和高度.
2. `scrollWidth/scrollHeigh` t是当前页面的真实宽度和高度（是个约等于值）。
3. 我们不管那些属性，也不管是什么浏览器，也不管是获取还是设置，想要都兼容，需要写两套 

``` javascript
function win(attr, val) {
    if (typeof val === 'undefined') {
        // 如果第二个参数没传就是获取值
        return document.documentElement[attr] || document.body[attr];
    }
    // 否则就是 设置值
    document.documentElement[attr] = val;
    document.body[attr] = val;
}
```

## 事件

HTML页面与JavaScript之间的交互是通过**事件**实现的。事件时JavaScript中最重要的主题之一，它的功能十分强大，但是我们也不可以滥用事件，在使用事件的时候，我们要考虑性能和内存方面的一些问题。

* 有效的限制一个页面中的事件数量，因为事件太多会占用大量内存，用户会感觉页面卡顿。
* 事件委托可以有效的减少事件处理程序的数量。
* 要及时移除无效的事件处理程序。

### 理解事件流

> 事件流描述的是从页面中接受事件的顺序。

``` html
<!DOCTYPE html>
<html>

<body>
    <div onclick='fn()'></div>
</body>

</html>
```

当点击 `div` 元素，整个流程如下(IE8以下不支持):

* 捕获阶段
  1. Document
  2. Element html
  3. Element body

  

* 事件目标阶段
  1. Element div
* 冒泡阶段
  1. Element body
  2. Element html
  3. Document

### 跨浏览器的事件处理程序

#### DOM2级事件和IE事件处理程序

1. DOM2级事件可以添加到事件的冒泡和捕获阶段，IE事件只能添加到冒泡阶段。

2.this指向不同，DOM2级事件this指向当前元素，IE事件指向 `Wwindow` 。

3. 顺序问题。IE和DOM2级都可以为元素添加多个事件处理程序，但是DOM2级事件处理程序是依次触发，IE则是以相反的顺序触发。
4. 参数问题。DOM2级有三个参数，IE事件处理程序则只有两个参数。

我们可以使用如下代码实现对事件处理程序的兼容处理：

``` js
const eventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            // 采用DOM0级事件处理
            element['on' + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
};
```

### 事件对象

在触发某个事件的时候，会产生一个 `event` 的事件对象，里面存储了关于事件的一些信息，我们可以使用它来完成很多操作。

无论在标准浏览器还是IE浏览器中，事件对象 `event` 都包含如下四个属性/方法:

* 标准浏览器
  1. `stopPropagation()` : 取消事件捕获或者冒泡的行为
  2. `preventDefault()` : 取消事件默认行为。
  3. `target` : 事件的目标。
  4. `type` : 被触发事件的类型，在一个函数处理多个事件时可以根据type属性。
* IE浏览器
  1. `cancelBubble` : 默认值为false，设置为true可以取消事件冒泡。
  2. `returnValue` : 默认值为true，设置为false可以取消事件默认行为，比如a标签的跳转。
  3. `srcElement` : 事件目标
  4. `type` : 被触发的事件类型，在一个函数处理多个事件时可以根据type属性。

### 跨浏览器事件处理

``` js
const eventUtil = {
    addHandler: function(element, type, handler) {
        // ...
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation
        } else {
            event.cancelBubble = true;
        }
    },
    removeHandler: function(element, type, handler) {
        // ...
    }
}
```

### 事件类型

> 由于太多，不做详细介绍和记录，只记录总纲。

* UI事件： 用户与页面上的元素交互时触发。
* 焦点事件： 当元素得到或失去焦点时触发。
* 鼠标事件： 用户使用鼠标在页面上执行操作时候触发。
* 滚轮事件： 用户使用鼠标滚轮时触发。
* 文本事件： 当在文档中输入文本的时触发。
* 键盘事件： 用户通过键盘在页面上执行操作时触发。
* 合成事件:  输入字符时触发（输入法编辑器 没有遇到过）
* 变动事件： DOM底层结构发生变化时触发。

### 模拟事件

* 标准浏览器

  

``` js
let btn = document.getElementById('myBtn');
// 1. 创建事件对象并且传入事件类型
const event = document.createEvent('EventType');
// 2. 初始化
event.initEventType('type', ....);
// 3. 触发事件
btn.dispatchEvent(event);
```

* IE浏览器

``` js
let btn = document.getElementById('myBtn');
// 1. 创建事件对象
const event = document.createEventObject();
// 2. 初始化事件对象
event.screenX = 100;
...
event.button = 0;
// 3. 触发事件
btn.fireEvent('EventType', event);
```

## 数组

> `JavaScript` 中的数组是值的有序集合，每一个值称为一个元素，而每个元素在数组中都有自己对应的位置，以数字表示，称为索引。 `javascript` 中数组的值是无类型的，它甚至可以是数组本身，数组搭配数组或者数组搭配对象可以组成复杂的数据结构。

### 数组基础

``` javascript
// 字面量创建
let ary = [...];
// 实例创建
let ary = new Array();
// 可以指定一个参数代表数据的长度，但是所有的元素都为空
let ary = new Array(10);
```

#### 数组的length属性

`length` 属性是数组区别于其他对象的重要属性， `length` 代表数组中元素的个数，最小为0。

### 数组方法

#### 数组操作(转化，拼接，截取，删除，添加... )

* `join()` 方法将数组转化为字符串，以括号里的参数分割，默认是逗号，返回最后生成的字符串，不会影响原数组。 `join()` 方法是 `String.split()` 方法的逆向操作，后者是将字符串分割成若干块来组成一个数组。

``` javascript
let ary = [1, 2, {
    test: 'hello',
    test1: 'world'
}];
let ary1 = ary.join();
let ary2 = ary.join(' ');
console.log(ary, ary1, ary2);

//[ 1, 2, { test: 'hello', test1: 'world' }]
// 1,2,[object Object]
// 1 2 [object Object]
```

* `concat()` 方法用于数组拼接，返回一个原数组和参数组成的新数组，不会改变原数组，不能扁平化数组，也不能给数组降维。

``` javascript
let ary = [1, 3, 5];
console.log(ary.concat(0, 9));
console.log(ary.concat([0, 9]));
console.log(ary.concat([0, 9, [2]]));
console.log(ary);

// [ 1, 3, 5, 0, 9 ]
// [ 1, 3, 5, 0, 9 ]
// [ 1, 3, 5, 0, 9, [ 2 ] ]
// [ 1, 3, 5 ]
```

* `slice()` 方法返回指定数组的一个片段或子数组。一个参数的时候返回从当前位置到数组末尾，两个参数的时候返回从起始位置到结束位置(不包含)的片段，负数从末尾开始，当传入的参数后面大于前面的时候，返回空数组，不会修改原数组。

``` javascript
let ary = [1, 3, 5, 2, 6, 7];
console.log(ary.slice(1));
console.log(ary.slice(1, 4));
console.log(ary.slice(-4, -1));
console.log(ary.slice(4, 1));
console.log(ary);

// [ 3, 5, 2, 6, 7 ]
// [ 3, 5, 2 ]
// [ 5, 2, 6 ]
// []
// [ 1, 3, 5, 2, 6, 7 ]
```

* `splice()` 方法用于在数组中插入或者删除元素，返回被删除的元素或者空数组。第一个参数指定了起始位置，第二个参数指定了**删除的元素个数**，第三个元素之后指定了要插入的元素， `splice()` 方法会修改原数组。

``` javascript
let ary = [1, 3, 5, 2, 6, 7];
console.log(ary.splice());
// []
// [ 1, 3, 5, 2, 6, 7 ]

console.log(ary.splice(1));
// [ 3, 5, 2, 6, 7 ]
// [ 1 ]

console.log(ary.splice(1, 2));
// [ 3, 5 ]
// [ 1, 2, 6, 7 ]

console.log(ary.splice(1, 2, 'a', [1, 2]));
// [ 3, 5 ]
// [ 1, 'a', [ 1, 2 ], 2, 6, 7 ]

console.log(ary);
```

* `pop()` 方法删除数组末尾一项，返回值是被删除项，改变原数组。
* `push()` 方法在数组末尾添加一项或者多项，返回新数组的 `length` ，改变原数组。
* `shift()` 方法删除数组第一项，返回值是被删除项，改变原数组。
* `unshift()` 方法向数组添加一项或者多项，返回新数组的 `length` ，改变原数组。
* `toString()` 和 `toLacaleString()` 方法将数组转化为字符串，返回被转化后的数组，以逗号分隔，会忽略其他符号，不会改变原数组。

#### 数组排序

* `reverse()` 方法将数组倒序，返回倒序后的数组，影响原数组。

``` javascript
let ary = [1, 5, 6, 8, 11, 'a'];
let ary1 = ary.reverse();
console.log(ary, ary1);

// [ 'a', 11, 8, 6, 5, 1 ]
//[ 'a', 11, 8, 6, 5, 1 ]
```

* `sort()` 方法将数组中的元素排序并且返回排序后的数组, 原数组改变。

``` javascript
let ary = [11, 15, 6, 8, 11, 'a'];

// 默认按字母表顺序排序
let ary1 = ary.sort();

let ary2 = ary.sort(function(a, b) {
    // 正序
    return a - b;
});
let ary3 = ary.sort(function(a, b) {
    // 倒序
    return b - a;
});
```

#### 数组遍历

* `forEach()` 方法遍历数组，为数组每一项调用指定的函数，第一个参数是数组的每一项，第二个参数是索引，第三个参数是数组本身。没有返回值
* `map()` 方法和 `forEach()` 方法大致相同，唯一的区别是有返回一个新数组包含该函数的返回值，不会修改原数组。

``` javascript
let ary = [1, 'a', 5, 2, '6', [7]];
let arr = ary.forEach(function callBack(item, index, ary) {
    return item;
});

let aaa = ary.map(function(item, index, ary) {
    return item;
});
console.log(arr, aaa);

// undefined [ 0, 1, 2, 3, 4, 5 ]
```

* `filter()` 方法用来筛选符合某些条件的数组元素项，返回一个数组，传递的函数是用来逻辑判断的，返回 `true` 或者 `false` 。不会改变原数组。
* `indexOf()` 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

``` javascript
// 利用filter和indexOf可以求数组的差异化
let a = [1, 2, 87, 89];
let b = [2, 4, 5, 7, 87, 89];

function diff(a, b) {
    return a.length < b.length ? b.filter(i => a.indexOf(i) === -1) : null;
}
// [ 4, 5, 7 ]
```

* `every()` 和 `some()` 是数组的逻辑判定，它们对数组元素应用指定的函数进行判定，返回 `true` 或者 `false` . `every()` 针对数组中的所有元素，只有当数组中的所有元素都符合逻辑判定，才会返回 `true` ， `some()` 是只要数组中有一个元素符合，就返回 `true` 。
* `reduce()` 和 `reduceRight()` 方法待详细。
* `indexOf()` 和 `lastIndexOf()` 方法用来寻找给定值在数组中的位置，找到返回第一次找到该元素的索引，找不到返回-1。 `indexOf()` 从前往后找， `lastIndexOf()` 从后往前。

#### ES6中新增方法

* `Array.from()` 方法用于将两类对象转为真正的数组
* `Array.of` 方法用于将一组值，转换为数组。
* `copyWithin()` 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。修改当前数组。

``` javascript
Array.prototype.copyWithin(target, start = 0, end = this.length);

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

* `find()` 方法用于找出符合条件的数组成员，参数是一个回调函数，所有数组成员以此执行，找到为 `true` 的成员返回，找不到返回 `undefiend` 。
* `findIndex()` 方法和 `find()` 方法类似，返回第一个为 `true` 成员的索引，找不到返回-1.
* `fill()` 方法使用给定值，填充一个数组。第一个参数是填充项，第二个参数是起始位置，第三个参数是结束位置（不包含）.

``` javascript
['a', 'b', 'c', 'd'].fill(7, 1, 3);
// [ 'a', 7, 7, 'd' ]
```

* `entries()` 
* `keys()` 
* `values()` 

``` javascript
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

* `includes()` 方法用来判断该数组中是否存在某值，返回一个布尔值。
* `flat()` 方法用于给数组将维。参数代表想要将维的层数。如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。该方法返回一个新数组，对原数组没有影响。

``` javascript
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```

* `flatMap()` 方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。flatMap()只能展开一层数组, flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。

``` javascript
arr.flatMap(function callback(currentValue[, index[, array]]) {
    // ...
} [, thisArg])

// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [
    [x * 2]
])
// [[2], [4], [6], [8]]
```

### 数组类型的检测

``` javascript
let isArray = Function.isArray || function(o) {
    return typeof o === 'object' && Object.prototype.toString.call(o) === "[object Aaary]";
}
```

## 字符串

### 基本概念

> String 全局对象是一个用于字符串或一个字符序列的构造函数。

### 创建字符串

> 字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。JavaScript会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。

``` javascript
var str = '';
var str = new String()
```

### 字符串的 `length` 

> 所有包含在字符串的字符都占一个长度（转义字符"\\"除外），包括空格特殊符号。

``` javascript
var str = 'hello  ';
console.log(str.length) //7
```

### 字符串方法

#### 关于 `HTML` 中的方法

`anchor()` 

用于创建 HTML 锚。

``` javascript
var str = "Google搜索引擎";
document.writeln(str.anchor("g"));
// <a name="g">Google搜索引擎</a>
```

#### 比较方法

`String.prototype.localeCompare()` 

返回一个数字表示是否引用字符串在排序中位于比较字符串的前面，后面，或者二者相同。

#### 正则方法

`String.prototype.match()` 

使用正则表达式与字符串相比较。

`String.prototype.replace()` 

被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。

#### 增删改查的方法

`String.prototype.charAt()` 

返回特定位置的字符。

``` javascript
var str = "CodePlayer";
document.writeln(str.charAt(0)); // C
document.writeln(str.charAt(12)); // (空字符串)
```

`String.prototype.charCodeAt()` 

返回表示给定索引的字符的Unicode的值。

`String.prototype.codePointAt()` 

返回使用UTF-16编码的给定位置的值的非负整数。

`String.prototype.concat()` 

连接两个字符串文本，并返回一个新的字符串。

`String.prototype.indexOf()` 

从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1。

`String.prototype.lastIndexOf()` 

从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1。

`String.prototype.padEnd()` 

在当前字符串尾部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。

`String.prototype.padStart()` 

在当前字符串头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。

`String.prototype.search()` 

对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。

`String.prototype.slice()` 

摘取一个字符串区域，返回一个新的字符串。

#### 其他方法

`String.prototype.includes()` 

判断一个字符串里是否包含其他字符串。

`String.prototype.endsWith()` 

判断一个字符串的结尾是否包含其他字符串中的字符。

`String.prototype.normalize()` 

返回调用字符串值的Unicode标准化形式。

`String.prototype.repeat()` 

返回指定重复次数的由元素组成的字符串对象。

`String.prototype.split()` 

通过分离字符串成字串，将字符串对象分割成字符串数组。

`String.prototype.substr()` 

返回当前字符串中一个连续的片段。

`String.prototype.substring()` 

返回当前字符串中一个连续的片段。

`String.prototype.toLocaleLowerCase()` 

将当前字符串的所有字母转为小写，并返回转换后的字符串。该函数会考虑到宿主环境中的当前区域设置。

`String.prototype.toLocaleUpperCase()` 

将当前字符串中的所有字母转为大写，并返回转换后的字符串。该函数会考虑到宿主环境中的当前区域设置。

`String.prototype.toLowerCase()` 

将当前字符串的所有字母转为小写，并返回转换后的字符串。该函数基于常规的Unicode大小写映射进行转换。

`String.prototype.toUpperCase()` 

将当前字符串中的所有字母转为大写，并返回转换后的字符串。该函数基于常规的Unicode大小写映射进行转换。

`toString()` 

将当前对象以字符串的形式返回。

### 字符串检测

`valueOf()` 

用于返回指定对象的原始值。

``` javascript
// Array：返回数组对象本身
var array = ["CodePlayer", true, 12, -5];
document.writeln(array.valueOf() === array); // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
document.writeln(date.valueOf()); // 1376838719230

// Number：返回数字值
var num = 15.26540;
document.writeln(num.valueOf()); // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
document.writeln(bool.valueOf() === bool); // true
// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
document.writeln(newBool.valueOf() == newBool); // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
document.writeln(newBool.valueOf() === newBool); // false

// Function：返回函数本身
function foo() {}
document.writeln(foo.valueOf() === foo); // true
var foo2 = new Function("x", "y", "return x + y;");
document.writeln(foo2.valueOf() === foo2); // true

// Object：返回对象本身
var obj = {
    name: "张三",
    age: 18
};
document.writeln(obj.valueOf() === obj); // true

// String：返回字符串值
var str = "http://www.365mini.com";
document.writeln(str.valueOf() === str); // true
// new一个字符串对象
var str2 = new String("http://www.365mini.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
document.writeln(str2.valueOf() === str2); // false
```

## RegExp

正则表达式是我学习在 `JavaScript` 学习中的一个障碍，初识它时，感觉看着文档感觉没有一点难处。但是合上教程自己想要解决某些问题的时候才发现，根本无从下手。

正则表达式非常繁琐，同时也需要极强的逻辑和分析排列思维。在日常开发中，遇到的很多问题虽然最后都得已解决，但过后细想，如果自己正则足够好，就可以少走很多弯路。正则表达式的强大，还是让我下定决心和它死磕（虽然现在也很一般）。

::: tip 我的理解
我理解的正则是一段规则，我们可以通过这段规则在海量数据中提取这段规则定义的内容，从而对其执行我们想要的操作。
:::

### 元字符

> 只要在 `“/.../”` 之间包含起来的，都是正则的元字符

|元字符|含义|
|:---|:----|
|\\|转义字符(把有意义和没意义的字符来回转)|
|\d|匹配0-9之间的任意数字  大写的 \D：除了0-9之间数字的任意字符|
|\b|匹配一个边界|
|\w|匹配数字、字母、下划线中的任意字符|
|\s|匹配一个空白字符|
|[xyz]|x或者y或者z中的一个，例如：[abcd]四个字母中的任意一个|
|[^xyz]|表示非 匹配不是中括号中的任意字符|
|[a-z]|表示小写字母从a-z 大写的[A-Z]表示大写字母从A-Z|
|x\|y|表示关系或  匹配符合其中一项即可|
|()|分组 在捕获时候会根据分组来捕获|
|?:|表示只匹配不捕获|
|?=|正向预查 只匹配不捕获|
|?!|负向预查 只匹配不捕获|

* 量词元字符
  + `\*` 出现零次或者多次
  + `?` 出现零次或者一次
  + `\+` 出现一次或者多次 
  + `{n}` 出现n次
  + `{n,}` 出现n到多次
  + `{n,m}` 出现n到m次
* 普通元字符：代表本身意思的元字符

### 修饰符

* `i` ：ignoreCase 忽略大小写
* `m` ：multiline 匹配换行
* `g` ：global 全局匹配

### 方法

> test和exec方法在全局匹配中如果添加了 `g` 修饰符，则下一次匹配会从上一次匹配完成的地方继续向下进行。如下情况:

``` js
 // 密码框的值
 let oldPassword = $('#changeWalletPassword').find('.old-password').val();
 let newPassword = $('#changeWalletPassword').find('.new-password').val();
 // 定义一个匹配包含字母，数字和特殊符号的6~14位的密码的正则
 let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{6,14}$/g;
 /* 
  * 注意《g》修饰符，下面连续使用第一个正确返回，
  * 第二个会和预想中的不一样，因为第一次匹配完成后会继续向下匹配
  */
 let oldPasswordFlag = reg.test(oldPassword);
 let newPasswordFlag = reg.test(newPassword);
```

解决连续两次匹配结果会错误的方案: 1.去掉全局修饰符`g`。2. 把lastIndex重新设置为0。

 - test

 test方法用来检测一个字符串是否符合该正则的匹配规则，如果符合返回 `true` ，否则返回 `false` 。
 

``` js
 reg.test(string)
```

 - exec

 exec用来对符合正则规则的字符串某一部分进行捕获，小括号可以改变其分组，其结果返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 `null` 。
 
 假如我们定义一个用来匹配两个数字和两个小写字母的正则表达式去匹配str字符串。

 

``` js
 let str = '11aa22bb33cc44dd';
 let reg = /(?<first>\d{2})(?<second>[a-z]{2})/;
 reg.exec(str);
 /*
  [
    0: "11aa" 匹配到的结果
    1: "11"  第一个分组匹配结果
    2: "aa"  第二个分组匹配结果
    index: 0  开始匹配的位置
    input: "11aa22bb33cc44dd"  原字符串
    groups: {first: "11", second: "aa"}  具名分组存储
    length: 3  长度
 ]
 */
```

### 常用的正则表达式

```md
 * 
 * 匹配中文: /^[\u4e00-\u9fa5]+$/
 * 匹配双字节字符: /[^\x00-\xff]/igm
 * 匹配行首行尾空格: /(^\s*)|(\s*$)/
 * 匹配url地址: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
 * 过滤特殊字符: /^[\x20\u4E00-\u9FA5A-Za-z0-9]+$/
 * 验证小数点后两位小数: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
 * 验证非零正整数: /^\+?[1-9][0-9]*$/
 * 验证身份证号: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
 * 验证手机号: /^1[345789]\d{9}$/
 * 匹配手机号: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
 * 验证邮箱1: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
 * 验证邮箱2: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
 * 验证邮箱3: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
 * 匹配邮编: /^[1-9]\d{5}(?!\d)$/
 * 匹配日期: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
 * 匹配HTML标签: /<(\S*?) [^>]*>.*?</\1>|<.*?/>/gm
 * 

```


---
title: JavaScript笔记
sidebar: auto
prev: ./css
next: ./es6
---

**原生 JS 知识点梳理，这不是教程，不会由浅入深，更不会有任何逻辑。很多东西加了主观的理解，很有可能它是错的，而之所以要写，是为了连点成线。**

## 简介

`JavaScript` 由核心 `ECMAScript` ，文档对象模型（DOM）和浏览器对象模型（BOM）组成。

`ECMAScript` 包含语法, 类型, 语句, 关键字和保留字, 操作符, 对象。

`BOM` 是浏览器对象，它包含 window 对象, location 对象, navigator 对象, screen 对象, history 对象。

`DOM` 是节点，一个文档一般都是由很多节点组成，它包含了元素节点，属性节点，文本节点... 而 `DOM` 对象就是提供了一系列方法操作这些节点。

### 必备小知识点

- JS 中基本数据类型包含 `undefined` , `null` , `boolean` , `string` , `number` , `symbol` (ES6 新增)。
- JS 中也有一种复杂的数据类型，即 `Object` ，该类型是所有对象的基础类型。
- 严格模式 `use strict` 为 JS 中容易出错的地方添加很多限制。
- JS 中包含了所有语言中的操作符、条件控制、循环、判断等语句。
- JS 中没有重载，因为其没有函数签名的特性。所有函数都有默认返回值 `undefined` ，都可以传入一个或者多个参数，这些参数在函数内容可以通过 `arguments` 来获取，获取后是一组类数组值。
- JS 中遵循驼峰命名法。

## BOM

在浏览器中， `window` 对象有双重身份，它既是顶层对象，又是 ECMAScript 规定的 `global` 对象。

### 获取浏览器窗口

```js
const pageWidth =
  document.documentElement.clientWidth || document.body.clientWidth;
const pageHeight =
  document.documentElment.clientHeight || document.body.clientHeight;
```

### Location 对象

`window.location` 和 `document.location` 访问的是同一个对象，location 对象中不仅包含当前的文档信息，还讲 URL 解析为一个个独立片段。

| value     | 含义                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------- |
| hash      | 返回 URL 中的 `hash` 值，如果没有返回空字符串。                                                  |
| host      | 返回服务器名称和端口号。                                                                         |
| hostname  | 返回服务器名称（不带端口号）。                                                                   |
| href      | 返回当前页面的完整 URL， `location.toString()` 也返回同样的值。                                  |
| origin    | 返回主站点名称（不包括查询参数）                                                                 |
| pathname  | 返回 URL 中的目录或者文件名，通常是 `/` 后面 `?` 之前。                                          |
| port      | 返回端口号，如果没有则为空字符串。                                                               |
| protocol  | 返回页面使用的协议，通常是 `http` 或者 `https` 。                                                |
| search    | 返回 URL 的查询字符串，通常以 `?` 开头的参数。                                                   |
| assign()  | 该方法可以用来打开一个新的 URL 地址并且在历史记录中生成一条记录。                                |
| replace() | 该方法只接受一个参数，即要导航到的 URL，但不会再历史记录中生成新的记录，浏览器**后退**按钮禁用。 |
| reload()  | 该方法没有参数的时候回从浏览器的缓存中重新加载页面，如果设置为 true 会从服务器重新加载页面。     |

**通用查询字符串参数方法:**

```js
function getQueryStringArgs() {
  var qs = location.search.length > 0 ? location.search.substring(1) : "",
    args = {},
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = items.length;

  for (i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(items[0]);
    value = decodeURIComponent(items[1]);

    if (name.length) {
      args[name] = value;
    }
  }

  return args;
}
```

### navigator 对象

`navigator` 对象提供了与浏览器有关的信息，常用的 `userAgent` 可以用来判断客户端使用的浏览器信息。

```js
window.navigator.userAgent;
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

### screen 对象

`screen` 对象包含了客户端的浏览器窗口外部显示器信息，一般只用于站点分析。

### history 对象

一般可以用 `history.length` 来判断用户历史记录的数量，用以下三个方法实现页面之间切换跳转。

| value             | 含义                              |
| :---------------- | :-------------------------------- |
| history.go()      | 传入一个数字，前进或回退跳转 N 步 |
| history.back()    | 传入一个数字，回退 N 步           |
| history.forward() | 传入一个数字，前进 N 步。         |

## DOM

DOM 学术名是“文档对象模型”，这个高端上档次的名称并不适合我们理解，简单来说，个人认为 DOM 其实是描述整个 HTML 页面中关系节点的图谱。
在 `《JavaScript DOM编程艺术第二版》` 中，有对 DOM 的详细解释，有兴趣的可以去看下，这里我简单总结一下。

### 创建新的节点

```js
createDocumentFragment(); // 创建文档碎片
createDocument(); // 创建元素节点
createTextNode(); // 创建一个文本节点
```

### 添加/移除/替换/插入

```js
appendChild();
removeChild();
replaceChild();
insertBefore();
```

### 查找

```js
getElementById(); //通过唯一标识符查找
getElementByTagName(); //通过标签名查找
getElementByName(); //通过标签name属性查找
```

## javascipt 盒子模型

> Js 盒子模型指的是通过 JS 中提供的一系列的属性和方法，获取页面中元素的样式信息值。

### client 系列

- `clientWidth` : 内容宽度+左右 padding.
- `clientHeight` : 内容高度+上下 padding.
- `clientLeft` : 获取元素 左边框宽度.
- `clientTop` : 获取元素 上边框宽度 其实就是 border【left/top】Width 的值.

### offset 系列

- `offsetWidth` : clientWidth+左右边框宽度.
- `offsetHeight` : clientHeight+上下边框宽度 和内容是否溢出没有关系.
- `offsetTop` : 元素上边框外边距离父级参照物上偏移量.
- `offsetleft` : 元素左边框外边距离父级参照物左偏移量.
- `offsetParent` : 元素父级参照物，可以修改.

### scroll 系

#### 在没有溢出的情况下

- `scrollWidth` : clientWidth
- `scrollHeight` : clientHeight

#### 溢出情况下

- `scrollWidth` : 真实内容宽度（包含溢出）+左填充
- `scrollHeight` : 真实内容高度（包含溢出）+上填充

PS：获取到的结果都是约等于值，因为：同一个浏览器是否设置 overflow='hidden'对最终结果是有影响的；在不同浏览器中，我们获取到的结果也是不相同的.

- `scrollLeft` : 滚动条卷去的宽度.
- `scrollTop` : 滚动条卷去的高度.

### 关于 js 盒子模型属性取值的问题

1. 我们通过这 13 个属性值永远不可能出现小数，都是整数，浏览器在获取结果的时候，会在原来真实结果的基础上进行四舍五入.

### 关于操作浏览器本身盒子模型信息

1. `clientWidth/clientHidth` 是当前浏览器可视窗口的宽度和高度.
2. `scrollWidth/scrollHeigh` t 是当前页面的真实宽度和高度（是个约等于值）。
3. 我们不管那些属性，也不管是什么浏览器，也不管是获取还是设置，想要都兼容，需要写两套

```javascript
function win(attr, val) {
  if (typeof val === "undefined") {
    // 如果第二个参数没传就是获取值
    return document.documentElement[attr] || document.body[attr];
  }
  // 否则就是 设置值
  document.documentElement[attr] = val;
  document.body[attr] = val;
}
```

## 事件

HTML 页面与 JavaScript 之间的交互是通过**事件**实现的。事件时 JavaScript 中最重要的主题之一，它的功能十分强大，但是我们也不可以滥用事件，在使用事件的时候，我们要考虑性能和内存方面的一些问题。

- 有效的限制一个页面中的事件数量，因为事件太多会占用大量内存，用户会感觉页面卡顿。
- 事件委托可以有效的减少事件处理程序的数量。
- 要及时移除无效的事件处理程序。

### 理解事件流

> 事件流描述的是从页面中接受事件的顺序。

```html
<!DOCTYPE html>
<html>
  <body>
    <div onclick="fn()"></div>
  </body>
</html>
```

当点击 `div` 元素，整个流程如下(IE8 以下不支持):

- 捕获阶段

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

#### DOM2 级事件和 IE 事件处理程序

1. DOM2 级事件可以添加到事件的冒泡和捕获阶段，IE 事件只能添加到冒泡阶段。

2.this 指向不同，DOM2 级事件 this 指向当前元素，IE 事件指向 `Wwindow` 。

3. 顺序问题。IE 和 DOM2 级都可以为元素添加多个事件处理程序，但是 DOM2 级事件处理程序是依次触发，IE 则是以相反的顺序触发。
4. 参数问题。DOM2 级有三个参数，IE 事件处理程序则只有两个参数。

我们可以使用如下代码实现对事件处理程序的兼容处理：

```js
const eventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      // 采用DOM0级事件处理
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
};
```

### 事件对象

在触发某个事件的时候，会产生一个 `event` 的事件对象，里面存储了关于事件的一些信息，我们可以使用它来完成很多操作。

无论在标准浏览器还是 IE 浏览器中，事件对象 `event` 都包含如下四个属性/方法:

- 标准浏览器
  1. `stopPropagation()` : 取消事件捕获或者冒泡的行为
  2. `preventDefault()` : 取消事件默认行为。
  3. `target` : 事件的目标。
  4. `type` : 被触发事件的类型，在一个函数处理多个事件时可以根据 type 属性。
- IE 浏览器
  1. `cancelBubble` : 默认值为 false，设置为 true 可以取消事件冒泡。
  2. `returnValue` : 默认值为 true，设置为 false 可以取消事件默认行为，比如 a 标签的跳转。
  3. `srcElement` : 事件目标
  4. `type` : 被触发的事件类型，在一个函数处理多个事件时可以根据 type 属性。

### 跨浏览器事件处理

```js
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
      event.stopPropagation;
    } else {
      event.cancelBubble = true;
    }
  },
  removeHandler: function(element, type, handler) {
    // ...
  }
};
```

### 事件类型

> 由于太多，不做详细介绍和记录，只记录总纲。

- UI 事件： 用户与页面上的元素交互时触发。
- 焦点事件： 当元素得到或失去焦点时触发。
- 鼠标事件： 用户使用鼠标在页面上执行操作时候触发。
- 滚轮事件： 用户使用鼠标滚轮时触发。
- 文本事件： 当在文档中输入文本的时触发。
- 键盘事件： 用户通过键盘在页面上执行操作时触发。
- 合成事件: 输入字符时触发（输入法编辑器 没有遇到过）
- 变动事件： DOM 底层结构发生变化时触发。

### 模拟事件

- 标准浏览器

```js
let btn = document.getElementById('myBtn');
// 1. 创建事件对象并且传入事件类型
const event = document.createEvent('EventType');
// 2. 初始化
event.initEventType('type', ....);
// 3. 触发事件
btn.dispatchEvent(event);
```

- IE 浏览器

```js
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

```javascript
// 字面量创建
let ary = [...];
// 实例创建
let ary = new Array();
// 可以指定一个参数代表数据的长度，但是所有的元素都为空
let ary = new Array(10);
```

#### 数组的 length 属性

`length` 属性是数组区别于其他对象的重要属性， `length` 代表数组中元素的个数，最小为 0。

### 数组方法

#### 数组操作(转化，拼接，截取，删除，添加... )

- `join()` 方法将数组转化为字符串，以括号里的参数分割，默认是逗号，返回最后生成的字符串，不会影响原数组。 `join()` 方法是 `String.split()` 方法的逆向操作，后者是将字符串分割成若干块来组成一个数组。

```javascript
let ary = [
  1,
  2,
  {
    test: "hello",
    test1: "world"
  }
];
let ary1 = ary.join();
let ary2 = ary.join(" ");
console.log(ary, ary1, ary2);

//[ 1, 2, { test: 'hello', test1: 'world' }]
// 1,2,[object Object]
// 1 2 [object Object]
```

- `concat()` 方法用于数组拼接，返回一个原数组和参数组成的新数组，不会改变原数组，不能扁平化数组，也不能给数组降维。

```javascript
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

- `slice()` 方法返回指定数组的一个片段或子数组。一个参数的时候返回从当前位置到数组末尾，两个参数的时候返回从起始位置到结束位置(不包含)的片段，负数从末尾开始，当传入的参数后面大于前面的时候，返回空数组，不会修改原数组。

```javascript
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

- `splice()` 方法用于在数组中插入或者删除元素，返回被删除的元素或者空数组。第一个参数指定了起始位置，第二个参数指定了**删除的元素个数**，第三个元素之后指定了要插入的元素， `splice()` 方法会修改原数组。

```javascript
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

console.log(ary.splice(1, 2, "a", [1, 2]));
// [ 3, 5 ]
// [ 1, 'a', [ 1, 2 ], 2, 6, 7 ]

console.log(ary);
```

- `pop()` 方法删除数组末尾一项，返回值是被删除项，改变原数组。
- `push()` 方法在数组末尾添加一项或者多项，返回新数组的 `length` ，改变原数组。
- `shift()` 方法删除数组第一项，返回值是被删除项，改变原数组。
- `unshift()` 方法向数组添加一项或者多项，返回新数组的 `length` ，改变原数组。
- `toString()` 和 `toLacaleString()` 方法将数组转化为字符串，返回被转化后的数组，以逗号分隔，会忽略其他符号，不会改变原数组。

#### 数组排序

- `reverse()` 方法将数组倒序，返回倒序后的数组，影响原数组。

```javascript
let ary = [1, 5, 6, 8, 11, "a"];
let ary1 = ary.reverse();
console.log(ary, ary1);

// [ 'a', 11, 8, 6, 5, 1 ]
//[ 'a', 11, 8, 6, 5, 1 ]
```

- `sort()` 方法将数组中的元素排序并且返回排序后的数组, 原数组改变。

```javascript
let ary = [11, 15, 6, 8, 11, "a"];

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

- `forEach()` 方法遍历数组，为数组每一项调用指定的函数，第一个参数是数组的每一项，第二个参数是索引，第三个参数是数组本身。没有返回值
- `map()` 方法和 `forEach()` 方法大致相同，唯一的区别是有返回一个新数组包含该函数的返回值，不会修改原数组。

```javascript
let ary = [1, "a", 5, 2, "6", [7]];
let arr = ary.forEach(function callBack(item, index, ary) {
  return item;
});

let aaa = ary.map(function(item, index, ary) {
  return item;
});
console.log(arr, aaa);

// undefined [ 0, 1, 2, 3, 4, 5 ]
```

- `filter()` 方法用来筛选符合某些条件的数组元素项，返回一个数组，传递的函数是用来逻辑判断的，返回 `true` 或者 `false` 。不会改变原数组。
- `indexOf()` 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```javascript
// 利用filter和indexOf可以求数组的差异化
let a = [1, 2, 87, 89];
let b = [2, 4, 5, 7, 87, 89];

function diff(a, b) {
  return a.length < b.length ? b.filter(i => a.indexOf(i) === -1) : null;
}
// [ 4, 5, 7 ]
```

- `every()` 和 `some()` 是数组的逻辑判定，它们对数组元素应用指定的函数进行判定，返回 `true` 或者 `false` . `every()` 针对数组中的所有元素，只有当数组中的所有元素都符合逻辑判定，才会返回 `true` ， `some()` 是只要数组中有一个元素符合，就返回 `true` 。
- `reduce()` 和 `reduceRight()` 方法待详细。
- `indexOf()` 和 `lastIndexOf()` 方法用来寻找给定值在数组中的位置，找到返回第一次找到该元素的索引，找不到返回-1。 `indexOf()` 从前往后找， `lastIndexOf()` 从后往前。

#### ES6 中新增方法

- `Array.from()` 方法用于将两类对象转为真正的数组
- `Array.of` 方法用于将一组值，转换为数组。
- `copyWithin()` 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。修改当前数组。

```javascript
Array.prototype.copyWithin(target, (start = 0), (end = this.length));

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
```

- `find()` 方法用于找出符合条件的数组成员，参数是一个回调函数，所有数组成员以此执行，找到为 `true` 的成员返回，找不到返回 `undefiend` 。
- `findIndex()` 方法和 `find()` 方法类似，返回第一个为 `true` 成员的索引，找不到返回-1.
- `fill()` 方法使用给定值，填充一个数组。第一个参数是填充项，第二个参数是起始位置，第三个参数是结束位置（不包含）.

```javascript
["a", "b", "c", "d"].fill(7, 1, 3);
// [ 'a', 7, 7, 'd' ]
```

- `entries()`
- `keys()`
- `values()`

```javascript
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

- `includes()` 方法用来判断该数组中是否存在某值，返回一个布尔值。
- `flat()` 方法用于给数组将维。参数代表想要将维的层数。如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数。该方法返回一个新数组，对原数组没有影响。

```javascript
[1, 2, [3, [4, 5]]]
  .flat()
  [
    // [1, 2, 3, [4, 5]]

    (1, 2, [3, [4, 5]])
  ].flat(2)
  [
    // [1, 2, 3, 4, 5]

    (1, [2, [3]])
  ].flat(Infinity);
// [1, 2, 3]
```

- `flatMap()` 方法对原数组的每个成员执行一个函数（相当于执行 Array.prototype.map()），然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组。flatMap()只能展开一层数组, flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的 this。

```javascript
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

```javascript
let isArray =
  Function.isArray ||
  function(o) {
    return (
      typeof o === "object" &&
      Object.prototype.toString.call(o) === "[object Aaary]"
    );
  };
```

### 数组去重

数组去重主要有三个解决思路，第一个是双循环比对，把结果相等的两项删除，第二个则是借助语言本身的一些方法来实现，最后一个则是借助一些特性，比如 ES6 新出的 `set` 数据结构。

- 双循环

```js
// 最容易想到
function unique(ary) {
  for (let i = 0; i < ary.length; i++) {
    for (let k = i + 1; k < ary.length; k++) {
      if (ary[i] === ary[k]) {
        ary.splice(k, 1);
        k--;
      }
    }
  }
  return ary;
}
// 递归
function unique(ary) {
  function loop(index) {
    if (index >= 1) {
      if (ary[index] === ary[index - 1]) {
        ary.splice(index, 1);
      }
      loop(index - 1);
    }
  }
  loop(ary.length - 1);
  return ary;
}
```

- 借助语言本身的方法

```js
// indexOf
function unique(ary) {
  let array = [];
  for (let index = 0; index < ary.length; index++) {
    if (array.indexOf(ary[index]) === -1) {
      array.push(ary[index]);
    }
  }

  return array;
}
// 利用reduce+includes
function unique(arr) {
  return arr.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    []
  );
}
```

- 数据结构

```js
[...new Set(arr)];
```

## 字符串

### 基本概念

> String 全局对象是一个用于字符串或一个字符序列的构造函数。

### 创建字符串

> 字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。JavaScript 会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。

```javascript
var str = "";
var str = new String();
```

### 字符串的 `length`

> 所有包含在字符串的字符都占一个长度（转义字符"\\"除外），包括空格特殊符号。

```javascript
var str = "hello  ";
console.log(str.length); //7
```

### 字符串方法

#### 关于 `HTML` 中的方法

`anchor()`

用于创建 HTML 锚。

```javascript
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

```javascript
var str = "CodePlayer";
document.writeln(str.charAt(0)); // C
document.writeln(str.charAt(12)); // (空字符串)
```

`String.prototype.charCodeAt()`

返回表示给定索引的字符的 Unicode 的值。

`String.prototype.codePointAt()`

返回使用 UTF-16 编码的给定位置的值的非负整数。

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

返回调用字符串值的 Unicode 标准化形式。

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

将当前字符串的所有字母转为小写，并返回转换后的字符串。该函数基于常规的 Unicode 大小写映射进行转换。

`String.prototype.toUpperCase()`

将当前字符串中的所有字母转为大写，并返回转换后的字符串。该函数基于常规的 Unicode 大小写映射进行转换。

`toString()`

将当前对象以字符串的形式返回。

### 字符串检测

`valueOf()`

用于返回指定对象的原始值。

```javascript
// Array：返回数组对象本身
var array = ["CodePlayer", true, 12, -5];
document.writeln(array.valueOf() === array); // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
document.writeln(date.valueOf()); // 1376838719230

// Number：返回数字值
var num = 15.2654;
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

| 元字符 | 含义                                                           |
| :----- | :------------------------------------------------------------- |
| \\     | 转义字符(把有意义和没意义的字符来回转)                         |
| \d     | 匹配 0-9 之间的任意数字 大写的 \D：除了 0-9 之间数字的任意字符 |
| \b     | 匹配一个边界                                                   |
| \w     | 匹配数字、字母、下划线中的任意字符                             |
| \s     | 匹配一个空白字符                                               |
| [xyz]  | x 或者 y 或者 z 中的一个，例如：[abcd]四个字母中的任意一个     |
| [^xyz] | 表示非 匹配不是中括号中的任意字符                              |
| [a-z]  | 表示小写字母从 a-z 大写的[A-Z]表示大写字母从 A-Z               |
| x\|y   | 表示关系或 匹配符合其中一项即可                                |
| ()     | 分组 在捕获时候会根据分组来捕获                                |
| ?:     | 表示只匹配不捕获                                               |
| ?=     | 正向预查 只匹配不捕获                                          |
| ?!     | 负向预查 只匹配不捕获                                          |

- 量词元字符
  - `\*` 出现零次或者多次
  - `?` 出现零次或者一次
  - `\+` 出现一次或者多次
  - `{n}` 出现 n 次
  - `{n,}` 出现 n 到多次
  - `{n,m}` 出现 n 到 m 次
- 普通元字符：代表本身意思的元字符

### 修饰符

- `i` ：ignoreCase 忽略大小写
- `m` ：multiline 匹配换行
- `g` ：global 全局匹配

### 方法

> test 和 exec 方法在全局匹配中如果添加了 `g` 修饰符，则下一次匹配会从上一次匹配完成的地方继续向下进行。如下情况:

```js
// 密码框的值
let oldPassword = $("#changeWalletPassword")
  .find(".old-password")
  .val();
let newPassword = $("#changeWalletPassword")
  .find(".new-password")
  .val();
// 定义一个匹配包含字母，数字和特殊符号的6~14位的密码的正则
let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{6,14}$/g;
/*
 * 注意《g》修饰符，下面连续使用第一个正确返回，
 * 第二个会和预想中的不一样，因为第一次匹配完成后会继续向下匹配
 */
let oldPasswordFlag = reg.test(oldPassword);
let newPasswordFlag = reg.test(newPassword);
```

解决连续两次匹配结果会错误的方案: 1.去掉全局修饰符`g`。2. 把 lastIndex 重新设置为 0。

- test

test 方法用来检测一个字符串是否符合该正则的匹配规则，如果符合返回 `true` ，否则返回 `false` 。

```js
reg.test(string);
```

- exec

exec 用来对符合正则规则的字符串某一部分进行捕获，小括号可以改变其分组，其结果返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 `null` 。

假如我们定义一个用来匹配两个数字和两个小写字母的正则表达式去匹配 str 字符串。

```js
let str = "11aa22bb33cc44dd";
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
-

- 匹配中文: /^[\u4e00-\u9fa5]+\$/
- 匹配双字节字符: /[^\x00-\xff]/igm
- 匹配行首行尾空格: /(^\s*)|(\s*\$)/
- 匹配 url 地址: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)_(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9\_-](?)?)_)\*\$/i
- 过滤特殊字符: /^[\x20\u4E00-\u9FA5A-Za-z0-9]+\$/
- 验证小数点后两位小数: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}\$)/
- 验证非零正整数: /^\+?[1-9][0-9]\*\$/
- 验证身份证号: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
- 验证手机号: /^1[345789]\d{9}\$/
- 匹配手机号: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}\$/
- 验证邮箱 1: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)_@(?:[\w](?:[\w-]_[\w])?\.)+[\w](?:[\w-]*[\w])?/
- 验证邮箱 2: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})\$/
- 验证邮箱 3: /\w+([-+.]\w+)_@\w+([-.]\w+)_\.\w+([-.]\w+)\*/
- 匹配邮编: /^[1-9]\d{5}(?!\d)\$/
- 匹配日期: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]\$/
- 匹配 HTML 标签: /<(\S*?) [^>]*>._?</\1>|<._?/>/gm
-
```

## 本地存储

### Cookie

cookie 是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过 cookie 来向访问者电脑上存储数据，或者某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）

#### 特点

- 不同的浏览器存放的 cookie 位置不一样，也是不能通用的。
- cookie 的存储是以域名形式进行区分的，不同的域下存储的 cookie 是独立的。
- 我们可以设置 cookie 生效的域（当前设置 cookie 所在域的子域），也就是说，我们能够操作的 cookie 是当前域以及当前域下的所有子域
- 一个域名下存放的 cookie 的个数是有限制的，不同的浏览器存放的个数不一样, 一般为 20 个。
- 每个 cookie 存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为 4KB。
- cookie 也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁

### LocalStorage

`LocalStorage` 是 H5 新推出的一种本地存储方案，在 IE8 及以上浏览器中都可以很好的使用。

#### 特点

- 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
- 存储的信息在同一域中是共享的。
- 当本页操作（新增、修改、删除）了 localStorage 的时候，本页面不会触发 storage 事件, 但是别的页面会触发 storage 事件。
- 大小：据说是 5M（跟浏览器厂商有关系）
- 在非 IE 下的浏览中可以本地打开。IE 浏览器要在服务器中打开。
- `LocalStorage` 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。
- `LocalStorage` 受同源策略的影响。

#### 设置/获取/删除

```js
// 设置
localStorage.setItem("username", "cfangxu");

// 获取
localStorage.getItem("username");
localStorage.key(0);

// 删除
localStorage.removeItem("username");
// 删除所有
localStorage.clear();
```

#### storage 事件

当 storage 发生改变的时候触发。 当前页面对 storage 的操作会触发其他页面的 storage 事件 事件的回调函数中有一个参数 event, 是一个 StorageEvent 对象，提供了一些实用的属性, 如下表：

| Property | Type   | Desciption                                                           |
| :------- | :----- | -------------------------------------------------------------------- |
| key      | String | The named key that was added, removed, or moddified                  |
| oldValue | any    | The previous value(now overwritten), or null if a new item was added |
| newValue | any    | The new value, or null if an item was added                          |
| url/uri  | string | The page that called the method that triggered this change           |

### sessionStorage

参考 `localStorage` .

#### 特点

用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage 即被销毁，或者在新窗口打开同源的另一个页面，sessionStorage 也是没有的。

### cookie、localStorage、sessionStorage 区别

- 相同：在本地（浏览器端）存储数据
- 不同：

1. localStorage、sessionStorage

2. localStorage 只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份 localStorage 数据。

3. sessionStorage 比 localStorage 更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

4. localStorage 是永久存储，除非手动删除。

5. sessionStorage 当会话结束（当前页面关闭的时候，自动销毁）

6. cookie 的数据会在每一次发送 http 请求的时候，同时发送给服务器而 localStorage、sessionStorage 不会。

> [原文地址：https://www.cnblogs.com/qianduantuanzhang/p/8193892.html](https://www.cnblogs.com/qianduantuanzhang/p/8193892.html)

## Fetch

`Fetch` 基于 `Promise` ，与 `XMLHttpRequest` 完全不同，它是 ES2018 新增的 API，用于实现客户端和服务端信息通信，可以借用 `fetch-polyfill` 解析成 ajax 实现兼容大部分浏览器。

### Fetch 和 Ajax 的不同

- `fetch` 仅在网络故障时或请求被阻止时，才会标记为 `reject` ，其余都是 `resolve` , 即使状态码为 404 或者 500.
- 默认情况下， `fetch` 不会从服务端发送或接收任何 `cookies` , 如果站点依赖于用户 `session` ，则会导致未经认证的请求（要发送 `cookies` ，必须设置 `credentials` 选项）。

### fetch 语法

```javascript
Promise < Response > fetch(url[, init]);
```

> `init` 可选参数配置项：

- method: 请求方式
- headers: 请求头信息
- body: 请求的 body 信息，可能是一个 `Blob` 、 `BufferSource` 、 `FormData` 、 `URLSearchParams` 或者 `USVString` 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
- mode: 请求的模式，如 `cors` 、 `no-cors` 或者 `same-origin` 。
- credentials: 请求的 credentials，如 `omit` 、 `same-origin` 或者 **`include`**。
- cache: 请求的 cache 模式: `default` 、 `no-store` 、 `reload` 、 `no-cach` e 、 `force-cache` 或者 `only-if-cached` 。
- redirect: 可用的 redirect 模式: `follow` (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 `manual` (手动处理重定向).
- referrer: 默认是 `client` 。
- referrerPolicy: 指定引用 `HTTP` 头的信息。
- integrity: 包括请求的 `subresource integrity` 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。

### 基本的 fetch 请求

- get 系列请求

```javascript
fetch("http://example.com/get/movies.json")
  .then(res => {
    // 根据状态码做响应的处理
    switch (res.status) {
      case "404":
        throw Error("404错误");
        break;
      case "500":
        throw Error("500错误");
      default:
        // 根据需要返回响应的数据格式
        return res.json();
    }
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

- post 系列请求

```javascript
fetch("http://example.com/post/movies.json", {
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: JSON.stringify(postData)
})
  .then(res => {
    // ...
  })
  .catch(err => {
    // ...
  });
```

### 返回值

> 返回值是一个 `Promise` ，resolve 时回传 Response 对象。

![fetch请求的返回值](/images/fetch.png "fetch返回值示例图")

### 参考文档

- [https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
- [MDN 使用 fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)

## 跨域

### 什么是跨域

广义上的跨域是指一个域下的页面或者脚本去请求另一个域下的资源，但在我们实际的工作中涉及到的跨域都是受到了浏览器同源策略限制的一些请求。那么什么是浏览器的同源策略呢？

#### 同源策略

《协议+域名+端口号》三者都相同的是为同源，只要其中有不同的，就会受到同源策略的限制，以下是一些例子。

```js
// 1. 端口不同
http: //baidu.com:8080
    http: //baidu.com:8081

    // 2. 协议不同
    http: //baidu.com:8080
    https: //baidu.com:8080

    // 3. 域名不同
    http: //doc.baidu.com:8080
    http: //www.baidu.com:8080
```

#### 常涉及到的跨域

- cookie, localstorage...
- DOM 元素也有同源策略
- ajax 也不支持跨域

### 实现跨域

- jsonp 实现
- cors 后端配置实现
- postMessage + iframe 实现
- document.domain + iframe 实现
- window.name + iframe 实现
- local.hash + iframe 实现
- node 中间件设置跨域
- nginx
- websocket

### jsonp

利用 `<script>` 标签不受同源策略的影响实现跨域。

```js
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    window[callback] = function(data) {
      resove(data);
      document.body.removeElement("script");
    };

    params = {
      ...params,
      callback
    };
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }

    script.src = `${url}?${arrs.join("&")}`;
    document.body.appendChild(script);
  });
}
```

- 只能发送 `get` 请求
- 有安全方面的问题 (xss 攻击)

### cors（跨域资源共享）

目前常用的跨域手段，在后台中配置 `Access-Control-Allow-Origin` , 前端无需做任何配置。支持 `get` , `post` , `put` ... 设置 `*` 号表示容许所有。缺点是不能携带 `cookie` ，个人认为配置比较繁琐，但是安全性高。

### postMessage + iframe

`postMessage` 是 HTML5 XMLHttpRequest Level 2 中的 API，且是为数不多可以跨域操作的 window 属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的 iframe 消息传递

用法： `postMessage(data,origin)` 方法接受两个参数

1. `data` ： html5 规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用 JSON.stringify()序列化。
2. `origin` ： 协议+主机+端口号，也可以设置为"\*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

1.）a.html：(http://www.demo1.com/a.html)

```js
< iframe id = "iframe"
src = "http://www.demo2.com/b.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');
iframe.onload = function() {
    var data = {
        name: 'aym'
    };
    // 向domain2传送跨域数据
    iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.demo2.com');
};

// 接受domain2返回数据
window.addEventListener('message', function(e) {
    alert('data from demo2 ---> ' + e.data);
}, false); <
/script>
```

2.）b.html：(http://www.demo2.com/b.html)

```js
< script >
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from demo1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.demo1.com');
        }
    }, false); <
/script>
```

### window.name + iframe

window.name 属性的独特之处：name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

1.）a.html：(http://www.demo1.com/a.html)

```js
var proxy = function(url, callback) {
  var state = 0;
  var iframe = document.createElement("iframe");

  // 加载跨域页面
  iframe.src = url;

  // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
  iframe.onload = function() {
    if (state === 1) {
      // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
      callback(iframe.contentWindow.name);
      destoryFrame();
    } else if (state === 0) {
      // 第1次onload(跨域页)成功后，切换到同域代理页面
      iframe.contentWindow.location = "http://www.demo1.com/proxy.html";
      state = 1;
    }
  };

  document.body.appendChild(iframe);

  // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
  function destoryFrame() {
    iframe.contentWindow.document.write("");
    iframe.contentWindow.close();
    document.body.removeChild(iframe);
  }
};

// 请求跨域b页面数据
proxy("http://www.demo2.com/b.html", function(data) {
  alert(data);
});
```

2.）proxy.html：(http://www.demo1.com/proxy....), 中间代理页，与 a.html 同域，内容为空即可。

3.）b.html：(http://www.demo2.com/b.html)

```js
<script>window.name = 'This is demo2 data!'; </script>
```

总结：通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的 window.name 从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

### local.hash + iframe

实现原理： a 欲与 b 跨域相互通信，通过中间页 c 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。

具体实现：A 域：a.html -> B 域：b.html -> A 域：c.html，a 与 b 不同域只能通过 hash 值单向通信，b 与 c 也不同域也只能单向通信，但 c 与 a 同域，所以 c 可通过 parent.parent 访问 a 页面所有对象。

实现原理： a 欲与 b 跨域相互通信，通过中间页 c 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。

具体实现：A 域：a.html -> B 域：b.html -> A 域：c.html，a 与 b 不同域只能通过 hash 值单向通信，b 与 c 也不同域也只能单向通信，但 c 与 a 同域，所以 c 可通过 parent.parent 访问 a 页面所有对象。

1.）a.html：(http://www.demo1.com/a.html)

```js
< iframe id = "iframe"
src = "http://www.demo2.com/b.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');

// 向b.html传hash值
setTimeout(function() {
    iframe.src = iframe.src + '#user=admin';
}, 1000);

// 开放给同域c.html的回调方法
function onCallback(res) {
    alert('data from c.html ---> ' + res);
} <
/script>
```

2.）b.html：(http://www.demo2.com/b.html)

```js
< iframe id = "iframe"
src = "http://www.demo1.com/c.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');

// 监听a.html传来的hash值，再传给c.html
window.onhashchange = function() {
    iframe.src = iframe.src + location.hash;
}; <
/script>
```

3.）c.html：(http://www.demo1.com/c.html)

```js
< script >
    // 监听b.html传来的hash值
    window.onhashchange = function() {
        // 再通过操作同域a.html的js回调，将结果传回
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    }; <
/script>
```

### document.domain iframe

> 此方案主要解决主域相同子域不同的跨域场景。实现的原理是两个页面都通过 js 强制设置 `document.domain` 为基础主域，就实现了同域。

父窗口(http://www.demo.com/a.html)

```js
< iframe id = "iframe"
src = "http://child.demo.com/b.html" > < /iframe> <
script >
    document.domain = 'demo.com';
var user = 'admin'; <
/script>
```

子窗口：(http://child.demo.com/b.html)

```js
<script>
  document.domain = 'demo.com'; // 获取父窗口中变量 alert('get js data from
  parent ---> ' + window.parent.user);{" "}
</script>
```

### node 中间件设置跨域

node 中间件实现跨域代理，原理大致与 nginx 相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置 cookieDomainRewrite 参数修改响应头中 cookie 中域名，实现当前域的 cookie 写入，方便接口登录认证。

1. 非 vue 框架的跨域（2 次跨域）

利用 node + express + http-proxy-middleware 搭建一个 proxy 服务器。

1.）前端代码示例：

```js
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open("get", "http://www.demo1.com:3000/login?user=admin", true);
xhr.send();
```

2.）中间件服务器：

```js
var express = require("express");
var proxy = require("http-proxy-middleware");
var app = express();

app.use(
  "/",
  proxy({
    // 代理跨域目标接口
    target: "http://www.demo2.com:8080",
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
      res.header("Access-Control-Allow-Origin", "http://www.domain1.com");
      res.header("Access-Control-Allow-Credentials", "true");
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: "www.demo1.com" // 可以为false，表示不修改
  })
);

app.listen(3000);
console.log("Proxy server is listen at port 3000...");
```

3.）Nodejs 后台

```js
ar http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.demo2.com;HttpOnly' // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

2. vue 框架的跨域（1 次跨域）

利用 node + webpack + webpack-dev-server 代理接口跨域。在开发环境下，由于 vue 渲染服务和接口代理服务都是 webpack-dev-server 同一个，所以页面与代理接口之间不再跨域，无须设置 headers 跨域信息了。

`webpack.config.js` 部分配置：

```js
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.demo2.com:8080', // 代理跨域目标接口
            changeOrigin: true,
            secure: false, // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.demo1.com' // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
```

### nginx

1. nginx 配置解决 iconfont 跨域

浏览器跨域访问 js、css、img 等常规静态资源被同源策略许可，但 iconfont 字体文件(eot|otf|ttf|woff|svg)例外，此时可在 nginx 的静态资源服务器中加入以下配置。

```nginx
location / {
  add_header Access-Control-Allow-Origin *;
}
```

2. nginx 反向代理接口跨域

跨域原理： 同源策略是浏览器的安全策略，不是 HTTP 协议的一部分。服务器端调用 HTTP 接口只是使用 HTTP 协议，不会执行 JS 脚本，不需要同源策略，也就不存在跨越问题。

实现思路：通过 nginx 配置一个代理服务器（域名与 demo1 相同，端口不同）做跳板机，反向代理访问 demo2 接口，并且可以顺便修改 cookie 中 demo 信息，方便当前域 cookie 写入，实现跨域登录

nginx 具体配置：

```js
#
proxy服务器
server {
    listen 81;
    server_name www.demo1.com;

    location / {
        proxy_pass http: //www.demo2.com:8080;  #反向代理
            proxy_cookie_demo www.demo2.com www.demo1.com;#修改cookie里域名
        index index.html index.htm;

        #当用webpack - dev - server等中间件代理接口访问nignx时， 此时无浏览器参与， 故没有同源限制， 下面的跨域配置可不启用
        add_header Access - Control - Allow - Origin http: //www.demo1.com;  #当前端只跨域不带cookie时，可为*
            add_header Access - Control - Allow - Credentials true;
    }
}
```

1.) 前端代码示例：

```js
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问nginx中的代理服务器
xhr.open("get", "http://www.demo1.com:81/?user=admin", true);
xhr.send();
```

2.) Nodejs 后台示例：

```js
var http = require("http");
var server = http.createServer();
var qs = require("querystring");

server.on("request", function(req, res) {
  var params = qs.parse(req.url.substring(2));

  // 向前台写cookie
  res.writeHead(200, {
    "Set-Cookie": "l=a123456;Path=/;Domain=www.demo2.com;HttpOnly" // HttpOnly:脚本无法读取
  });

  res.write(JSON.stringify(params));
  res.end();
});

server.listen("8080");
console.log("Server is running at port 8080...");
```

### websocket

> WebSocket protocol 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是 server push 技术的一种很好的实现。原生 WebSocket API 使用起来不太方便，我们可以使用 Socket.io，

1.）前端代码：

```js
< div > user input： < input type = "text" > < /div> <
script src = "./socket.io.js" > < /script> <
script >
    var socket = io('http://www.demo2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', function() {
        console.log('Server socket has closed.');
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
}; <
/script>
```

2.）Nodejs socket 后台：

```js
// 启http服务
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    "Content-type": "text/html"
  });
  res.end();
});

server.listen("8080");
console.log("Server is running at port 8080...");

// 监听socket连接
socket.listen(server).on("connection", function(client) {
  // 接收信息
  client.on("message", function(msg) {
    client.send("hello：" + msg);
    console.log("data from client: ---> " + msg);
  });

  // 断开处理
  client.on("disconnect", function() {
    console.log("Client socket has closed.");
  });
});
```

> [原文: 前端解决跨域的九种方法](https://www.cnblogs.com/sdcs/p/8484905.html);

## 前端模块化

`CommonJs` , `AMD` , `ES6` 模块规范。

### 模块化

前端最近几年发展迅速， `javascript` 由早期的 `简单平面` ，发展到现在的 `多维度` ，原来的代码组织规范越来越难以驾驭大规模的项目，模块化开发被提上了台面。

模块化我理解的是任何一个功能，一个函数，一个 `.js` 文件，一个对象... 都可以成为一个模块，模块化的思想是让所有的代码都有自己合适的位置，模块化的作用是拆分复杂为简单，让后期维护工作更为得心应手。

日常团队合作中，我们难以处理的是**命名冲突**和**项目依赖关系**，而模块化开发就是封装所有，根据规范抛出接口与外界联系，彼此之间相互不影响，只暴露我们希望暴露的方法和数据。

### CommonJS 规范

`CommonJS` 对模块进行了规范，它主要分为模块定义，模块引用和模块标识。根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

`NodeJS` 的模块系统就遵循了 `CommonJS` 规范，但 Node 在实现中并非完全按照 CommonJS 规范实现，而是对模块规范进行了一定的取舍。下面，我们结合 Node 来深入了解 CommonJS 规范。

#### 模块定义

```javascript
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

module.exports = Module;
var module = new Module(filename, parent);
```

`module` 代表当前模块，它以上的属性分别代表

- `module.id` : 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` : 模块的文件名，带有绝对路径。
- `module.loaded` : 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` : 返回一个对象，表示调用该模块的模块。
- `module.children` : 返回一个数组，表示该模块要用到的其他模块。
- `module.exports` : 初始值为一个空对象{}，表示模块对外输出的接口。

#### 模块引用

`require` 方法用于加载模块，它有一个参数，即**带有参数路径的模块的文件名或者为模块名**。

```javascript
const user = require("./user"); //相对路径的模块名
const nav = require("/home/nav"); // 绝对路径的模块名
const http = require("http"); //模块名
```

#### 模块标识

模块标识就是 `require` 函数的参数名称，一般要符合驼峰命名法，默认是寻找以 `.js` 结尾的文件

`CommonJS` 是同步的，意味着你想调用模块里的方法，必须先用 `require` 加载模块。这对服务器端的 `Nodejs` 来说不是问题，因为模块的 JS 文件都在本地硬盘上，CPU 的读取时间非常快，同步不是问题。但如果是浏览器环境，要从服务器加载模块。模块的加载将取决于网速，如果采用同步，网络情绪不稳定时，页面可能卡住, 这就必须采用异步模式。所以，就有了 `AMD` 解决方案。

### AMD 规范

`AMD` 规范是由 `CommonJS` 规范演变而来，大多数情况下和 `CommonJs` 规范一致，最大的区别是 `AMD` 加载模块是异步加载，所以，一般服务端用 `CommonJS` ，而浏览器端则遵循 `AMD` 。

#### 定义模块

```javascript
define(id ? , dependencies ? , factory);

// amd属性可以判断当前文件加载是否遵循AMD规范，例如jquery的写法：
if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
        return jQuery;
    });
}
```

- 第一个参数，id（名字），是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
- 第二个参数，dependencies（依赖），是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。
- 第三个参数，factory（工厂方法），为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

#### 引入模块

- 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数 callback，则是加载成功之后的回调函数。如果将前面的代码改写成 AMD 形式，就是下面这样：

```javascript
require([module], callback);

// 加载模块实例
require(["a"], function(a) {
  a.FuncA();
});
```

### ES6 模块规范

`ES6` 引入了新的模块规范，新的规范定义用 `export` 提供对外的接口，用 `import` 引入模块。 `ES6` 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。 `CommonJS` 和 `AMD` 模块，都只能在运行时确定这些东西。

```javascript
// ES6导出模块实例 1
export var firstName = 'Michael';
// ES6导出模块实例 2
var firstName = 'Michael';
export {
    firstName,
    lastName,
    year
};
// ES6导出模块实例 3
function v1() {
    ...
}
export {
    v1 as streamV1,
};

// ES6导入模块实例 1
import {
    firstName,
    lastName,
    year
} from './profile.js';
// ES6导入模块实例 2
import {
    a
} from './xxx.js'
// ES6导入模块实例 3
import {
    lastName as surname
} from './profile.js';
```

## This 指向问题

- 匿名函数，定时器中的`this`是`window`对象。
- `new`实例中的`this`指向当前类。
- 给元素绑定的点击事件中`this`通常是当前元素。
- 普通函数执行，如果前面有`.`,那么`.`前面是谁`this`就指向谁。
- 构造函数中，`this`一般是当前类的实例。
- 箭头函数中的`this`是上下文中的 this。
- `call`,`bind`,`apply`可以改变`this`的指向，不同的是`call`和`apply`是改变指向并且执行，`bind`仅仅改变指向，并不会立刻执行，call 的参数是逐项传递，apply 是以一个数组的形式传递参数。

### 手写 call

```js
Function.prototype.call = function(context, ...args) {
  context = context || window;
  context.func = this;

  if (typeof context.func !== "function") {
    throw new TypeError("call must be called on a function");
  }

  let res = context.func(...args);
  delete context.func;
  return res;
};
```

### 手写 bind

```js
Function.prototype.bind = function(context, ...bindArgs) {
  // func 为调用 bind 的原函数
  const func = this;
  context = context || window;

  if (typeof func !== "function") {
    throw new TypeError("Bind must be called on a function");
  }
  // bind 返回一个绑定 this 的函数
  return function(...callArgs) {
    let args = bindArgs.concat(callArgs);
    if (this instanceof func) {
      // 意味着是通过 new 调用的 而 new 的优先级高于 bind
      return new func(...args);
    }
    return func.call(context, ...args);
  };
};
```

### 手写 apply

```js
Function.prototype.apply = function(context, args) {
  context = context || window;
  context.func = this;

  if (typeof context.func !== "function") {
    throw new TypeError("apply must be called on a function");
  }

  let res = context.func(...args);
  delete context.func;
  return res;
};
```

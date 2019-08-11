# 原生JS（中）

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

## 事件

HTML页面与JavaScript之间的交互是通过**事件**实现的。事件时JavaScript中最重要的主题之一，它的功能十分强大，但是我们也不可以滥用事件，在使用事件的时候，我们要考虑性能和内存方面的一些问题。

- 有效的限制一个页面中的事件数量，因为事件太多会占用大量内存，用户会感觉页面卡顿。
- 事件委托可以有效的减少事件处理程序的数量。
- 要及时移除无效的事件处理程序。

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

当点击`div`元素，整个流程如下(IE8以下不支持):

- 捕获阶段
  1. Document
  2. Element html
  3. Element body
  
- 事件目标阶段
  1. Element div
- 冒泡阶段
  1. Element body
  2. Element html
  3. Document

### 跨浏览器的事件处理程序

#### DOM2级事件和IE事件处理程序

1. DOM2级事件可以添加到事件的冒泡和捕获阶段，IE事件只能添加到冒泡阶段。
2. this指向不同，DOM2级事件this指向当前元素，IE事件指向`Wwindow`。
3. 顺序问题。IE和DOM2级都可以为元素添加多个事件处理程序，但是DOM2级事件处理程序是依次触发，IE则是以相反的顺序触发。
4. 参数问题。DOM2级有三个参数，IE事件处理程序则只有两个参数。

我们可以使用如下代码实现对事件处理程序的兼容处理：

``` js
const eventUtil = {
  addHandler: function(element, type, handler) {
    if(element.addEventListener) {
      element.addEventListener(type, handler, false);
    }else if(element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }else {
      // 采用DOM0级事件处理
      element['on' + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if(element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    }else if(element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }else {
      element['on' + type] = null;
    }
  },
};
```

### 事件对象

在触发某个事件的时候，会产生一个`event`的事件对象，里面存储了关于事件的一些信息，我们可以使用它来完成很多操作。

无论在标准浏览器还是IE浏览器中，事件对象`event`都包含如下四个属性/方法:
- 标准浏览器
  1. `stopPropagation()`: 取消事件捕获或者冒泡的行为
  2. `preventDefault()`: 取消事件默认行为。
  3. `target`: 事件的目标。
  4. `type`: 被触发事件的类型，在一个函数处理多个事件时可以根据type属性。
- IE浏览器
  1. `cancelBubble`: 默认值为false，设置为true可以取消事件冒泡。
  2. `returnValue`: 默认值为true，设置为false可以取消事件默认行为，比如a标签的跳转。
  3. `srcElement`: 事件目标
  4. `type`: 被触发的事件类型，在一个函数处理多个事件时可以根据type属性。

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
    if(event.preventDefault) {
      event.preventDefault();
    }else {
      event.returnValue = false;
    }
  },
  stopPropagation: function(event) {
    if(event.stopPropagation) {
      event.stopPropagation
    }else {
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

- UI事件： 用户与页面上的元素交互时触发。
- 焦点事件： 当元素得到或失去焦点时触发。
- 鼠标事件： 用户使用鼠标在页面上执行操作时候触发。
- 滚轮事件： 用户使用鼠标滚轮时触发。
- 文本事件： 当在文档中输入文本的时触发。
- 键盘事件： 用户通过键盘在页面上执行操作时触发。
- 合成事件:  输入字符时触发（输入法编辑器 没有遇到过）
- 变动事件： DOM底层结构发生变化时触发。

### 模拟事件

- 标准浏览器
  
```js
let btn = document.getElementById('myBtn');
// 1. 创建事件对象并且传入事件类型
const event = document.createEvent('EventType');
// 2. 初始化
event.initEventType('type',....);
// 3. 触发事件
btn.dispatchEvent(event);
```

- IE浏览器

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
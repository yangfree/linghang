# Css
> 记录`css`中的一些东西，它可以是用法或者是一些坑。

## `css`中的多余隐藏以...结尾。

### 单行隐藏

``` css
.box-demo {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

### 多行隐藏

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

### 跨浏览器实现

- 利用`css`伪元素定位来实现，缺点是每个浏览器解析不太一样，看起来不太自然。

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

- `JavaScript`+`css`实现

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

## position

关于定位属性`position`一共有五个值，分别是`inherit`,`static`,`relative`,`absolute`和`fixed`,定位会改变元素的形态，所有的元素均转化为块级元素。

- `inherit`: 规定应该从父元素继承`position`属性的值。
- `static`: 元素正常显示，默认值。
- `relative`: 相对定位，元素相对于自身位置进行定位，元素任然保持其未定位前的状态，它原本所占的空间仍然保留。
- `absolute`: 绝对定位，元素脱离文档流，相对于其第一个设置了除`static`定位以外的父元素进行定位，并且会转化为块级元素。
- `fixed`: 固定定位，元素脱离文档流，相对于浏览器窗口进行定位，并且会转化为块级元素。

定位经常会与`z-index`一起使用，`z-index`的值为数字，值越大，元素层级越高。

## 盒子水平垂直居中问题

在工作中我们经常可以遇到，并且在前端面试有非常大的几率会问到，今天总结了一下，有多少种方式可以实现，以及实现的原理。

我们约定默认样式已经清除并且页面结构统一如下:

``` html
<body>
<div class="out">
    <div class="inner"></div>
</div>
</body>
```

### (一)绝对定位+`auto`

``` scss
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 margin: auto;
```

### (二)绝对定位+`负边距`

``` scss
position: absolute;
top: 50%;
left: 50%;
margin-left: -50px; /*宽的一半*/
margin-top: -40px;  /**高的一半/
```

### (三)弹性盒模型

``` scss
display: flex;
justify-content: center;
align-items: center;
```

### (四)知道父子盒子的高度，利用高度差和`padding`

``` scss
box-sizing: border-box;
padding-top: 110px; /*父子盒子高度差/2*/
```

``` scss
margin: 0 auto；
```

### (五)定位+css3 translate

``` scss
position: absolute;
top: 50%;
left: 50%;
transform:translate(-50%,-50%);
```

### (六)`margin` + `table-cell`

``` scss
/*父元素*/
display: table-cell;
vertical-align: middle;
```

``` scss
/*子元素*/
margin: 0 auto;
```


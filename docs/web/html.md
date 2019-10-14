---
title: Html随手记
sidebar: auto
---

## HTML中的条件注释

IE条件注释主要用来处理IE浏览器一些兼容问题，比如针对不同的版本使用不同的 `css hack` ，针对一些不兼容的属性给与独特的前缀支持等。

### 条件注释中的条件

``` html
<!-- gt:  greater than 选择条件以上版本，不包含条件版本 -->
<!-- lt： less than 选择条件以下版本，不包含条件版本 -->
<!-- gte: greater than or equal 选择条件以上版本 包含条件版本 -->
<!-- lte: less than or equal 选择条件以下版本 包含条件版本 -->
<!-- !: 非 取反 -->
```

### 条件注释使用方法

``` html
<!-- [if ie 5]> 这一部分在ie5.5中显示 <![endif]-->
<!-- [if gt ie 5.5]> 这一部分在ie5.5以上显示但不包含ie5.5 <![endif] -->
<!-- [if gte ie 5.5]> 这一部分在ie5.5以上显示包含ie5.5 <![endif] -->
<!-- [if !ie 5.5]> 这一部分在除ie5.5之外的版本显示 <![endif] -->

<!--[if !ie]><!--> 这一部分在非ie浏览器中显示
<!--<![endif]-->
<!-- [if ie 7]><!--> 这一部分在ie7或者非ie浏览器中显示
<!-- <![endif]-->
```


---
title: ES6
sidebar: auto
prev: ./javascript
next: ./vue
---

为了保持兼容性，在 `ES6` 中用 `var` 声明的对象仍是 `window` 的属性，但是通过 `let` , `const` , `class` 声明的变量，不是顶层对象 `window` 的属性。

## 声明方式（let/const）

### 相同的

* 都没有变量提升。
* 只在块级作用域中生效。
* 不声明不能提前使用。
* 不容许重复声明。

### 特有的

* `let` 声明变量， `const` 声明常量。
* `let` 可以先声明然后再赋值， `const` 声明后就需要赋值。

### `ES6` 有六种声明变量的方式

:white_check_mark: `var` , `function` , `let` , `const` , `import` , `class` 。

## 解构赋值

> - 结构赋值本质上属于模式匹配，只要等号两边的模式相同，左边的变量就会被赋予右边对应的值。
> - 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象。
> - 如果解构失败，变量的值会是 `undefined` 。
> - 解构默认值生效条件：属性值严格等于 `undefined` 。
> - 解构赋值容许设置默认值。
> - `undefined` 和 `null` 无法转为对象，因此无法进行解构。

### 数组的解构赋值

* 规则: 数据结构具有Iterator接口可采用数组形式的解构赋值。
  + 示例1： `let [a, b, c] = [1, 2, 3];` 
  + 示例2： `let [a, [b], d] = [1, [2, 3], 4];` 
  + 示例3： `let [x = 1] = [undefined];` 

### 对象的解构复制

* 规则： 解构变量的名称必需与对象的属性名相同才可以取到正确的值。对象的解构真正被赋值的是 `value` 而不是 `key` 。对象的解构赋值可以取到继承的属性。
  + 示例1： `let { bar, foo } = { foo: 'aaa', bar: 'bbb' };` 
  + 示例2： `let {x = 3} = {x: undefined};// x=3` 
  + 示例3: `let { x, y: z } = { x: 1, y: 2 }` 

### 字符串的解构赋值

* 规则： 字符串被转换成了一个类似数组的对象。
  + 示例1： `let [a, b, c, d, e] = 'hello';` 

### 数组和布尔值的解构赋值

* 规则： 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
  + 示例1： `let {toString: s} = 123;` 
  + 示例2： `let {toString: s} = true;` 

### 函数参数的解构赋值

* 规则： `undefined` 就会触发函数参数的默认值
  + 数组解构： `function Func([x = 0, y = 1]) {}` 
  + 对象解构： `function Func({ x = 0, y = 1 } = {}) {}` 

### 作用

* 交换变量的值: `[x, y] = [y, x];` 
* 返回函数多个值： `const [x, y, z] = Func()` 
* 定义函数参数： `Func([1, 2])` 
* 提取JSON数据： `const { name, version } = packageJson` 
* 定义函数参数默认值： `function Func({ x = 1, y = 2 } = {}) {}` 
* 遍历Map结构： `for (let [k, v] of Map) {}` 
* 输入模块指定属性和方法： `const { readFile, writeFile } = require("fs")` 

## 内置对象的扩展

### 字符串

* Unicode表示法：大括号包含表示Unicode字符(\u{0xXX}或\u{0XXX})
* 字符串遍历：可通过for-of遍历字符串
* 字符串模板：可单行可多行可插入变量的增强版字符串
* 标签模板：函数参数的特殊调用
* String.raw()：返回把字符串所有变量替换且对斜杠进行转义的结果
* String.fromCodePoint()：返回码点对应字符
* codePointAt()：返回字符对应码点(String.fromCodePoint()的逆操作)
* normalize()：把字符的不同表示方法统一为同样形式，返回新字符串(Unicode正规化)
* repeat()：把字符串重复n次，返回新字符串
* matchAll()：返回正则表达式在字符串的所有匹配
* includes()：是否存在指定字符串
* startsWith()：是否存在字符串头部指定字符串
* endsWith()：是否存在字符串尾部指定字符串

### 数值

* 二进制表示法：0b或0B开头表示二进制(0bXX或0BXX)
* 八进制表示法：0o或0O开头表示二进制(0oXX或0OXX)
* Number. EPSILON：数值最小精度
* Number. MIN_SAFE_INTEGER：最小安全数值(-2^53)
* Number. MAX_SAFE_INTEGER：最大安全数值(2^53)
* Number.parseInt()：返回转换值的整数部分
* Number.parseFloat()：返回转换值的浮点数部分
* Number.isFinite()：是否为有限数值
* Number.isNaN()：是否为NaN
* Number.isInteger()：是否为整数
* Number.isSafeInteger()：是否在数值安全范围内
* Math.trunc()：返回数值整数部分
* Math.sign()：返回数值类型(正数1、负数-1、零0)
* Math.cbrt()：返回数值立方根
* Math.clz32()：返回数值的32位无符号整数形式
* Math.imul()：返回两个数值相乘
* Math.fround()：返回数值的32位单精度浮点数形式
* Math.hypot()：返回所有数值平方和的平方根
* Math.expm1()：返回e^n - 1
* Math.log1p()：返回1 + n的自然对数(Math.log(1 + n))
* Math.log10()：返回以10为底的n的对数
* Math.log2()：返回以2为底的n的对数
* Math.sinh()：返回n的双曲正弦
* Math.cosh()：返回n的双曲余弦
* Math.tanh()：返回n的双曲正切
* Math.asinh()：返回n的反双曲正弦
* Math.acosh()：返回n的反双曲余弦
* Math.atanh()：返回n的反双曲正切

### 正则

- `RegExp`构造函数第一个参数是一个正则时，第二个参数可以指定修饰符,并且会覆盖第一个参数中的修饰符。

``` js
new RegExp(/abc/ig, 'i').flags //i
```

- 正则方法调用变更：字符串对象的`match()`、`replace()`、`search()`、`split()`内部调用转为调用RegExp实例对应的`RegExp.prototype[Symbol.方法]`
- u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。
- `RegExp.prototype.unicode`，表示是否设置了`u`修饰符。
- y修饰符，叫做“粘连”（sticky）修饰符,配合g修饰符使用。
- `RegExp.prototype.sticky` ，表示是否设置了`y`修饰符。
- `RegExp.prototype.flags` , 返回正则表达式的修饰符
- `s` 修饰符：`dotAll` 模式,用来匹配`.`。 





### 函数

### 数组

### 对象

### Symbol

### Set、Map

### Proxy

### Reflect

## Class（类） 

## Module（模块）

## Iterator（接口）

## 异步编程


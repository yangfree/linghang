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

## 数据类型的扩展

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

* `RegExp` 构造函数第一个参数是一个正则时，第二个参数可以指定修饰符, 并且会覆盖第一个参数中的修饰符。

``` js
new RegExp(/abc/ig, 'i').flags //i
```

* 正则方法调用变更：字符串对象的 `match()` 、 `replace()` 、 `search()` 、 `split()` 内部调用转为调用RegExp实例对应的 `RegExp.prototype[Symbol.方法]` 
* u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。
* `RegExp.prototype.unicode` ，表示是否设置了 `u` 修饰符。
* y修饰符，叫做“粘连”（sticky）修饰符, 配合g修饰符使用。
* `RegExp.prototype.sticky` ，表示是否设置了 `y` 修饰符。
* `RegExp.prototype.flags` , 返回正则表达式的修饰符
* `s` 修饰符： `dotAll` 模式, 用来匹配 `.` 。 

### 函数

* 参数默认值

`ES6` 规定函数参数可以设置默认值， 与解构赋值结合使用会事半功倍。默认值可以指定为必传，也可以设置为 `undefined` ， 表示可以省略:

``` js
// 1. 设置为必传参数,否则报错
function throwIfMissing() {
    throw new Error('Missing parameter');
}

function Func(x = throwMissing()) {
    return x;
}

// 2. 设置为可省略参数

function foo(y = undefined) {}
```

* `rest` 参数

`rest` 参数用来获取函数的多余参数，必须放在参数的最后面。有时可以替代 `arguments` 对象，但它是一个数组，并不是类数组。函数的 `length` 属性不包含 `rest` 参数。

* 严格模式: 只要函数参数使用默认值、解构赋值、扩展运算符，那么函数内部就不能显式设定为严格模式。
* name属性: 函数的name属性，返回该函数的函数名。 `new Function().name` 返回 `anonymous` 。

* 箭头函数
  + 形式: `()=>{}` 
  + 不改变 `this` 指向。
  + 不可当作构造函数
  + 不可以试用 `arguments` 对象，可以使用 `rest` 代替。
  + 不可以使用 `yield` 命令，因此箭头函数不能作为 `Generator` 函数。

### 数组

* 扩展运算符: 它好比 `rest` 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
  + 复制数组: `const a1=[1,2];const a2=[...a1];const [...a2]=a1;` 
  + 合并数组: `[...arr1, ...arr2, ...arr3]` 
  + ...
* `Array.from()` : 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）, 返回新数组。
  + 类数组对象：包含 `length` 的对象、 `Arguments` 对象、 `NodeList` 对象
  + 可遍历对象： `String` 、 `Set` 结构、 `Map` 结构、 `Generator` 函数
* `Array.of()` ：转换一组值为真正数组，返回新数组。
* `copyWithin()` ：把指定位置的成员复制到其他位置，返回原数组。
* `find()` ：返回第一个符合条件的成员
* `findIndex()` ：返回第一个符合条件的成员索引值
* `fill()` ：根据指定值填充整个数组，返回原数组
* `keys()` ：返回以索引值为遍历器的对象
* `values()` ：返回以属性值为遍历器的对象
* `entries()` ：返回以索引值和属性值为遍历器的对象
* 数组空位 ：ES6明确将数组空位转为 `undefined` (空位处理规不一，建议避免出现)

### 对象

* 简洁的表达: 当属性名和属性值名字相同的时候，可以直接写一个就可以。 `{foo:foo}={foo}` 
* 属性名表达式：字面量定义对象时使用[]定义键([prop]。
* 方法的name属性：返回方法函数名
* 属性的遍历:
  + `for...in` 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
  + `Object.keys(obj)` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。 
  + `Object.getOwnPropertyNames(obj)` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
  + `Object.getOwnPropertySymbols(obj)` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
  + `Reflect.ownKeys(obj)` 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
* super关键字: 指向当前对象的原型.
* `Object.is()` ：对比两值是否相等, 基本与 `===` 行为一致。
* `Object.assign` : 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）, 返回原对象，原对象被更改。(浅拷贝)
* Object.getPrototypeOf()`：返回对象的原型对象
* `Object.setPrototypeOf()` : 设置对象的原型对象
* `__proto__` : 返回或设置对象的原型对象
* `Object.keys` : 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
* `Object.values` : 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
* `Object.entries()` : 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
* `Object.fromEntries()` 方法是 `Object.entries()` 的逆操作，用于将一个键值对数组转为对象。

``` js
Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

### Symbol数据类型

> ES6新增Symbol原始数据类型，用来表示独一无二的值，至此，JS中有了七种数据类型，Symbol, undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

* 方法
  + `Symbol()` ：创建以参数作为描述的Symbol值(不登记在全局环境)
  + `Symbol.for()` ：创建以参数作为描述的Symbol值，如存在此参数则返回原有的Symbol值(先搜索后创建，登记在全局环境)
  + `Symbol.keyFor()` ：返回已登记的Symbol值的描述(只能返回Symbol.for()的key)
  + `Object.getOwnPropertySymbols()` ：返回对象中所有用作属性名的Symbol值的数组

* 内置
  + `Symbol.hasInstance` ：指向一个内部方法，当其他对象使用instanceof运算符判断是否为此对象的实例时会调用此方法
  + `Symbol.isConcatSpreadable` ：指向一个布尔值，定义对象用于Array.prototype.concat()时是否可展开
  + `Symbol.species` ：指向一个构造函数，当实例对象使用自身构造函数时会调用指定的构造函数
  + `Symbol.match` ：指向一个函数，当实例对象被String.prototype.match()调用时会重新定义match()的行为
  + `Symbol.replace` ：指向一个函数，当实例对象被String.prototype.replace()调用时会重新定义replace()的行为
  + `Symbol.search` ：指向一个函数，当实例对象被String.prototype.search()调用时会重新定义search()的行为
  + `Symbol.split` ：指向一个函数，当实例对象被String.prototype.split()调用时会重新定义split()的行为
  + `Symbol.iterator` ：指向一个默认遍历器方法，当实例对象执行for-of时会调用指定的默认遍历器
  + `Symbol.toPrimitive` ：指向一个函数，当实例对象被转为原始类型的值时会返回此对象对应的原始类型值
  + `Symbol.toStringTag` ：指向一个函数，当实例对象被Object.prototype.toString()调用时其返回值会出现在toString()返回的字符串之中表示对象的类型
  + `Symbol.unscopables` ：指向一个对象，指定使用with时哪些属性会被with环境排除

* 重点
  + `Symbol()` 生成一个原始类型的值不是对象，因此 `Symbol()` 前不能使用new命令
  + `Symbol()` 参数表示对当前 `Symbol` 值的描述，相同参数的 `Symbol()` 返回值不相等
  + `Symbol` 值不能与其他类型的值进行运算
  + `Symbol` 值可通过 `String()或toString()` 显式转为字符串
  + `Symbol` 值作为对象属性名时，此属性是公开属性，但不是私有属性
  + `Symbol` 值作为对象属性名时，只能用方括号运算符([])读取，不能用点运算符(.)读取
  + `Symbol` 值作为对象属性名时，不会被常规方法遍历得到，可利用此特性为对象定义非私有但又只用于内部的方法

## 数据结构的扩展

### Set结构

* 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
* 声明： `const set = new Set(arr)` 
* 入参：具有 `Iterator` 接口的数据结构
* 属性
  + `constructor` ：构造函数，返回Set
  + `size` ：返回实例成员总数
* 方法
  + `add()` ：添加值，返回实例
  + `delete()` ：删除值，返回布尔值
  + `has()` ：检查值，返回布尔值
  + `clear()` ：清除所有成员
  + `keys()` ：返回以属性值为遍历器的对象
  + `values()` ：返回以属性值为遍历器的对象
  + `entries()` ：返回以属性值和属性值为遍历器的对象
  + `forEach()` ：使用回调函数遍历每个成员
* 应用场景
  + 去重字符串： `[...new Set(str)].join("")` 
  + 去重数组： `[...new Set(arr)]或Array.from(new Set(arr))` 
  + 集合数组
    - 声明： `const a = new Set(arr1)、const b = new Set(arr2` )
    - 并集： `new Set([...a, ...b])` 
    - 交集： `new Set([...a].filter(v => b.has(v)))` 
    - 差集： `new Set([...a].filter(v => !b.has(v)))` 
  + 映射集合
    - 声明： `let set = new Set(arr)` 
    - 映射： `set = new Set([...set].map(v => v * 2))或set = new Set(Array.from(set, v => v * 2))` 
* 重点难点
  + 遍历顺序：插入顺序
  + 没有键只有值，可认为键和值两值相等
  + 添加多个NaN时，只会存在一个NaN
  + 添加相同的对象时，会认为是不同的对象
  + 添加值时不会发生类型转换(5 !== "5")
  + `keys()` 和 `values()` 的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等  

### WeakSet结构

* 定义：和Set结构类似，成员值只能是对象
* 声明： `const set = new WeakSet(arr)` 
* 入参：具有 `Iterator` 接口的数据结构
* 属性
  + `constructor` ：构造函数，返回WeakSet
* 方法
  + `add()` ：添加值，返回实例
  + `delete()` ：删除值，返回布尔值
  + `has()` ：检查值，返回布尔值

* 应用场景

  + 储存DOM节点：DOM节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏
  + 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在 `WeakSet` 结构中的引用就会自动消

* 重点难点

  + 成员都是弱引用，垃圾回收机制不考虑 `WeakSet` 结构对此成员的引用
  + 成员不适合引用，它会随时消失，因此ES6规定 `WeakSet` 结构不可遍历
  + 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于 `WeakSet` 结构中

### Map结构

* 定义：类似于对象的数据结构，成员键可以是任何类型的值
* 声明： `const set = new Map(arr)` 
* 入参：具有 `Iterator` 接口且每个成员都是一个双元素数组的数据结构
* 属性
  + `constructor` ：构造函数，返回Map
  + `size` ：返回实例成员总数
* 方法
  + `get()` ：返回键值对
  + `set()` ：添加键值对，返回实例
  + `delete()` ：删除键值对，返回布尔值
  + `has()` ：检查键值对，返回布尔值
  + `clear()` ：清除所有成员
  + `keys()` ：返回以键为遍历器的对象
  + `values()` ：返回以值为遍历器的对象
  + `entries()` ：返回以键和值为遍历器的对象
  + `forEach()` ：使用回调函数遍历每个成员
* 重点难点
  + 遍历顺序：插入顺序
  + 对同一个键多次赋值，后面的值将覆盖前面的值
  + 对同一个对象的引用，被视为一个键
  + 对同样值的两个实例，被视为两个键
  + 键跟内存地址绑定，只要内存地址不一样就视为两个键
  + 添加多个以NaN作为键时，只会存在一个以NaN作为键的值
  + `Object` 结构提供字符串—值的对应，Map结构提供值—值的对应

### WeakMap结构

* 定义：和Map结构类似，成员键只能是对象
* 声明： `const set = new WeakMap(arr)` 
* 入参：具有 `Iterator` 接口且每个成员都是一个双元素数组的数据结构
* 属性
  + `constructor` ：构造函数，返回 `WeakMap` 
* 方法
  + `get()` ：返回键值对
  + `set()` ：添加键值对，返回实例
  + `delete()` ：删除键值对，返回布尔值
  + `has()` ：检查键值对，返回布尔值
* 应用场景
  + 储存DOM节点：DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏
  + 部署私有属性：内部属性是实例的弱引用，删除实例时它们也随之消失，不会造成内存泄漏

* 重点难点
  + 成员键都是弱引用，垃圾回收机制不考虑 `WeakMap` 结构对此成员键的引用
  + 成员键不适合引用，它会随时消失，因此ES6规定 `WeakMap` 结构不可遍历
  + 其他对象不再引用成员键时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于 `WeakMap` 结构中
  + 一旦不再需要，成员会自动消失，不用手动删除引用
  + 弱引用的只是键而不是值，值依然是正常引用
  + 即使在外部消除了成员键的引用，内部的成员值依然存在

## Proxy元编程

## Reflect对象

## Class（类） 

## Module（模块）

## Iterator（接口）

## 异步编程


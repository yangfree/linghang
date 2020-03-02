---
title: ES6
sidebar: auto
prev: ./javascript
next: ./typescript
---

`ES6` 在 2015 年发布，所以又有人称它为 `ES2015` ，它是一个泛指，代表了 `JavaScript` 的下一代版本，基于目前为止，所有的标准浏览器都已支持大部分 `ES6` 语法，部分仍然需要使用 `babel` 转义。

一种新的语法从提案到正式标准，需要经历 5 个阶段, 一般到了草案阶段基本就定了，所以我们日常在配置 `babel` 的时候，写的是 `Stage2` :

> 1. Stage0 展示阶段
> 2. Stage1 征求意见阶段
> 3. Stage2 草案阶段
> 4. Stage3 候选阶段
> 5. Stage4 定案阶段->成为标准

## let/const

在 `ES6` 中，有六种声明变量的方式: `var` , `function` , `let` , `const` , `import` , `class` 。

原来只有全局作用域和函数作用域，而在 `ES6` 中，加入了块级作用域来约束变量的生效范围，使其变的更加合理和容易理解。大括号 `{ }` 代表一个块，块中的变量是私有的，只有内部可以使用，块级元素可以无限嵌套，内部块级可以访问外部块级的变量。

新增 `let` 和 `const` 替代 `var` 用来声明变量，它们解决了之前存在的一些弊端，比如 `var` 可以重复声明，在全局声明的变量会挂在 `window` 上，没有声明可以提前使用等等。 `let` 和 `const` 具有以下特点:

- 都没有变量提升。
- 只在块级作用域中生效。
- 不声明不能提前使用。
- 不容许重复声明。

### 区别:

- `let` 声明变量， `const` 声明常量。
- `let` 可以先声明然后再赋值， `const` 声明后就需要赋值。

## 解构赋值

解构赋值为编程带来了极大的便利，理论上来讲，任何模式相同的数据( `null` 和 `undefined` 不能被结构)都可以被解构，左边的变量会被赋予右边对应的值。解构失败会返回 `undefined` 。

### 适用范围

- 交换变量的值: `[x, y] = [y, x];`
- 返回函数多个值： `const [x, y, z] = Func()`
- 定义函数参数： `Func([1, 2])`
- 提取 JSON 数据： `const { name, version } = packageJson`
- 定义函数参数默认值： `function Func({ x = 1, y = 2 } = {}) {}`
- 遍历 Map 结构： `for (let [k, v] of Map) {}`
- 输入模块指定属性和方法： `const { readFile, writeFile } = require("fs")`

## 数据类型的扩展

### 字符串

`ES6` 新增字符串模板，自此我们可以优雅的解决字符串拼接问题，新增的常用方法如下:

- 字符串遍历：可通过 for-of 遍历字符串

```js
let str = "hello";
for (let val of str) {
  // ...
}
```

- `normalize()` ：把字符的不同表示方法统一为同样形式，返回新字符串(Unicode 正规化)
- `repeat()` ：把字符串重复 n 次，返回新字符串
- `includes()` ：是否存在指定字符串, 存在返回 `true`
- `startsWith()` ：是否存在字符串头部指定字符串 `true`
- `endsWith()` ：是否存在字符串尾部指定字符串 `true`

### 数值

- `Number.parseInt()` ：返回转换值的整数部分
- `Number.parseFloat()` ：返回转换值的浮点数部分
- `Number.isFinite()` ：是否为有限数值
- `Number.isNaN()` ：是否为 NaN
- `Number.isInteger()` ：是否为整数
- `Number.isSafeInteger()` ：是否在数值安全范围内
- `Math.trunc()` ：返回数值整数部分
- `Math.sign()` ：返回数值类型(正数 1、负数-1、零 0)
- `Math.hypot()` ：返回所有数值平方和的平方根
- `Math.cbrt()` ：返回数值立方根
- `Math.imul()` ：返回两个数值相乘
- `Math.log10()` ：返回以 10 为底的 n 的对数
- `Math.log2()` ：返回以 2 为底的 n 的对数

### 正则

- `RegExp` 构造函数第一个参数是一个正则时，第二个参数可以指定修饰符, 并且会覆盖第一个参数中的修饰符。

```js
new RegExp(/abc/gi, "i").flags; //i
```

- 正则方法调用变更：字符串对象的 `match()` 、 `replace()` 、 `search()` 、 `split()` 内部调用转为调用 RegExp 实例对应的 `RegExp.prototype[Symbol.方法]`
- u 修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF 的 Unicode 字符。
- `RegExp.prototype.unicode` ，表示是否设置了 `u` 修饰符。
- y 修饰符，叫做“粘连”（sticky）修饰符, 配合 g 修饰符使用。
- `RegExp.prototype.sticky` ，表示是否设置了 `y` 修饰符。
- `RegExp.prototype.flags` , 返回正则表达式的修饰符
- `s` 修饰符： `dotAll` 模式, 用来匹配 `.` 。

### 函数

- 参数默认值

`ES6` 规定函数参数可以设置默认值， 与解构赋值结合使用会事半功倍。默认值可以指定为必传，也可以设置为 `undefined` ， 表示可以省略:

```js
// 1. 设置为必传参数,否则报错
function throwIfMissing() {
  throw new Error("Missing parameter");
}

function Func(x = throwMissing()) {
  return x;
}

// 2. 设置为可省略参数

function foo(y = undefined) {}
```

- `rest` 参数

`rest` 参数用来获取函数的多余参数，必须放在参数的最后面。有时可以替代 `arguments` 对象，但它是一个数组，并不是类数组。函数的 `length` 属性不包含 `rest` 参数。

- 严格模式: 只要函数参数使用默认值、解构赋值、扩展运算符，那么函数内部就不能显式设定为严格模式。
- name 属性: 函数的 name 属性，返回该函数的函数名。 `new Function().name` 返回 `anonymous` 。

- 箭头函数
  - 形式: `()=>{}`
  - 不改变 `this` 指向。
  - 不可当作构造函数
  - 不可以试用 `arguments` 对象，可以使用 `rest` 代替。
  - 不可以使用 `yield` 命令，因此箭头函数不能作为 `Generator` 函数。

### 数组

- 扩展运算符: 它好比 `rest` 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
  - 复制数组: `const a1=[1,2];const a2=[...a1];const [...a2]=a1;`
  - 合并数组: `[...arr1, ...arr2, ...arr3]`
  - ...
- `Array.from()` : 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）, 返回新数组。
  - 类数组对象：包含 `length` 的对象、 `Arguments` 对象、 `NodeList` 对象
  - 可遍历对象： `String` 、 `Set` 结构、 `Map` 结构、 `Generator` 函数
- `Array.of()` ：转换一组值为真正数组，返回新数组。
- `copyWithin()` ：把指定位置的成员复制到其他位置，返回原数组。
- `find()` ：返回第一个符合条件的成员
- `findIndex()` ：返回第一个符合条件的成员索引值
- `fill()` ：根据指定值填充整个数组，返回原数组
- `keys()` ：返回以索引值为遍历器的对象
- `values()` ：返回以属性值为遍历器的对象
- `entries()` ：返回以索引值和属性值为遍历器的对象
- 数组空位 ：ES6 明确将数组空位转为 `undefined` (空位处理规不一，建议避免出现)

### 对象

- 简洁的表达: 当属性名和属性值名字相同的时候，可以直接写一个就可以。 `{foo:foo}={foo}`
- 方法的 name 属性：返回方法函数名
- 属性的遍历:
  - `for...in` 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
  - `Object.keys(obj)` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
  - `Object.getOwnPropertyNames(obj)` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
  - `Object.getOwnPropertySymbols(obj)` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
  - `Reflect.ownKeys(obj)` 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
- `super` 关键字: 指向当前对象的原型.
- `Object.is()` ：对比两值是否相等, 基本与 `===` 行为一致。
- `Object.assign` : 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）, 返回原对象，原对象被更改。(浅拷贝)
- Object.getPrototypeOf()`：返回对象的原型对象
- `Object.setPrototypeOf()` : 设置对象的原型对象
- `__proto__` : 返回或设置对象的原型对象
- `Object.keys` : 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
- `Object.values` : 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
- `Object.entries()` : 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
- `Object.fromEntries()` 方法是 `Object.entries()` 的逆操作，用于将一个键值对数组转为对象。

```js
Object.fromEntries([
  ["foo", "bar"],
  ["baz", 42]
]);
// { foo: "bar", baz: 42 }
```

### Symbol 数据类型

> ES6 新增 Symbol 原始数据类型，用来表示独一无二的值，至此，JS 中有了七种数据类型，Symbol, undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

- 方法

  - `Symbol()` ：创建以参数作为描述的 Symbol 值(不登记在全局环境)
  - `Symbol.for()` ：创建以参数作为描述的 Symbol 值，如存在此参数则返回原有的 Symbol 值(先搜索后创建，登记在全局环境)
  - `Symbol.keyFor()` ：返回已登记的 Symbol 值的描述(只能返回 Symbol.for()的 key)
  - `Object.getOwnPropertySymbols()` ：返回对象中所有用作属性名的 Symbol 值的数组

- 内置

  - `Symbol.hasInstance` ：指向一个内部方法，当其他对象使用 instanceof 运算符判断是否为此对象的实例时会调用此方法
  - `Symbol.isConcatSpreadable` ：指向一个布尔值，定义对象用于 Array.prototype.concat()时是否可展开
  - `Symbol.species` ：指向一个构造函数，当实例对象使用自身构造函数时会调用指定的构造函数
  - `Symbol.match` ：指向一个函数，当实例对象被 String.prototype.match()调用时会重新定义 match()的行为
  - `Symbol.replace` ：指向一个函数，当实例对象被 String.prototype.replace()调用时会重新定义 replace()的行为
  - `Symbol.search` ：指向一个函数，当实例对象被 String.prototype.search()调用时会重新定义 search()的行为
  - `Symbol.split` ：指向一个函数，当实例对象被 String.prototype.split()调用时会重新定义 split()的行为
  - `Symbol.iterator` ：指向一个默认遍历器方法，当实例对象执行 for-of 时会调用指定的默认遍历器
  - `Symbol.toPrimitive` ：指向一个函数，当实例对象被转为原始类型的值时会返回此对象对应的原始类型值
  - `Symbol.toStringTag` ：指向一个函数，当实例对象被 Object.prototype.toString()调用时其返回值会出现在 toString()返回的字符串之中表示对象的类型
  - `Symbol.unscopables` ：指向一个对象，指定使用 with 时哪些属性会被 with 环境排除

- 重点
  - `Symbol()` 生成一个原始类型的值不是对象，因此 `Symbol()` 前不能使用 new 命令
  - `Symbol()` 参数表示对当前 `Symbol` 值的描述，相同参数的 `Symbol()` 返回值不相等
  - `Symbol` 值不能与其他类型的值进行运算
  - `Symbol` 值可通过 `String()或toString()` 显式转为字符串
  - `Symbol` 值作为对象属性名时，此属性是公开属性，但不是私有属性
  - `Symbol` 值作为对象属性名时，只能用方括号运算符([])读取，不能用点运算符(.)读取
  - `Symbol` 值作为对象属性名时，不会被常规方法遍历得到，可利用此特性为对象定义非私有但又只用于内部的方法

## 数据结构的扩展

### Set 结构

- 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
- 声明： `const set = new Set(arr)`
- 入参：具有 `Iterator` 接口的数据结构
- 属性
  - `constructor` ：构造函数，返回 Set
  - `size` ：返回实例成员总数
- 方法
  - `add()` ：添加值，返回实例
  - `delete()` ：删除值，返回布尔值
  - `has()` ：检查值，返回布尔值
  - `clear()` ：清除所有成员
  - `keys()` ：返回以属性值为遍历器的对象
  - `values()` ：返回以属性值为遍历器的对象
  - `entries()` ：返回以属性值和属性值为遍历器的对象
  - `forEach()` ：使用回调函数遍历每个成员
- 应用场景
  - 去重字符串： `[...new Set(str)].join("")`
  - 去重数组： `[...new Set(arr)]或Array.from(new Set(arr))`
  - 集合数组
    - 声明： `const a = new Set(arr1)、const b = new Set(arr2` )
    - 并集： `new Set([...a, ...b])`
    - 交集： `new Set([...a].filter(v => b.has(v)))`
    - 差集： `new Set([...a].filter(v => !b.has(v)))`
  - 映射集合
    - 声明： `let set = new Set(arr)`
    - 映射： `set = new Set([...set].map(v => v * 2))或set = new Set(Array.from(set, v => v * 2))`
- 重点难点
  - 遍历顺序：插入顺序
  - 没有键只有值，可认为键和值两值相等
  - 添加多个 NaN 时，只会存在一个 NaN
  - 添加相同的对象时，会认为是不同的对象
  - 添加值时不会发生类型转换(5 !== "5")
  - `keys()` 和 `values()` 的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等

### WeakSet 结构

- 定义：和 Set 结构类似，成员值只能是对象
- 声明： `const set = new WeakSet(arr)`
- 入参：具有 `Iterator` 接口的数据结构
- 属性
  - `constructor` ：构造函数，返回 WeakSet
- 方法

  - `add()` ：添加值，返回实例
  - `delete()` ：删除值，返回布尔值
  - `has()` ：检查值，返回布尔值

- 应用场景

  - 储存 DOM 节点：DOM 节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏
  - 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在 `WeakSet` 结构中的引用就会自动消

- 重点难点

  - 成员都是弱引用，垃圾回收机制不考虑 `WeakSet` 结构对此成员的引用
  - 成员不适合引用，它会随时消失，因此 ES6 规定 `WeakSet` 结构不可遍历
  - 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于 `WeakSet` 结构中

### Map 结构

- 定义：类似于对象的数据结构，成员键可以是任何类型的值
- 声明： `const set = new Map(arr)`
- 入参：具有 `Iterator` 接口且每个成员都是一个双元素数组的数据结构
- 属性
  - `constructor` ：构造函数，返回 Map
  - `size` ：返回实例成员总数
- 方法
  - `get()` ：返回键值对
  - `set()` ：添加键值对，返回实例
  - `delete()` ：删除键值对，返回布尔值
  - `has()` ：检查键值对，返回布尔值
  - `clear()` ：清除所有成员
  - `keys()` ：返回以键为遍历器的对象
  - `values()` ：返回以值为遍历器的对象
  - `entries()` ：返回以键和值为遍历器的对象
  - `forEach()` ：使用回调函数遍历每个成员
- 重点难点
  - 遍历顺序：插入顺序
  - 对同一个键多次赋值，后面的值将覆盖前面的值
  - 对同一个对象的引用，被视为一个键
  - 对同样值的两个实例，被视为两个键
  - 键跟内存地址绑定，只要内存地址不一样就视为两个键
  - 添加多个以 NaN 作为键时，只会存在一个以 NaN 作为键的值
  - `Object` 结构提供字符串—值的对应，Map 结构提供值—值的对应

### WeakMap 结构

- 定义：和 Map 结构类似，成员键只能是对象
- 声明： `const set = new WeakMap(arr)`
- 入参：具有 `Iterator` 接口且每个成员都是一个双元素数组的数据结构
- 属性
  - `constructor` ：构造函数，返回 `WeakMap`
- 方法
  - `get()` ：返回键值对
  - `set()` ：添加键值对，返回实例
  - `delete()` ：删除键值对，返回布尔值
  - `has()` ：检查键值对，返回布尔值
- 应用场景

  - 储存 DOM 节点：DOM 节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏
  - 部署私有属性：内部属性是实例的弱引用，删除实例时它们也随之消失，不会造成内存泄漏

- 重点难点
  - 成员键都是弱引用，垃圾回收机制不考虑 `WeakMap` 结构对此成员键的引用
  - 成员键不适合引用，它会随时消失，因此 ES6 规定 `WeakMap` 结构不可遍历
  - 其他对象不再引用成员键时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于 `WeakMap` 结构中
  - 一旦不再需要，成员会自动消失，不用手动删除引用
  - 弱引用的只是键而不是值，值依然是正常引用
  - 即使在外部消除了成员键的引用，内部的成员值依然存在

## Proxy 元编程

- 定义：修改某些操作的默认行为
- 声明： `const proxy = new Proxy(target, handler)`
- 入参
  - `target` ：拦截的目标对象
  - `handler` ：定制拦截行为
- 方法
  - `Proxy.revocable()` ：返回可取消的 Proxy 实例(返回{ proxy, revoke }，通过 revoke()取消代理)
- 拦截方式
  - `get()` ：拦截对象属性读取
  - `set()` ：拦截对象属性设置，返回布尔值
  - `has()` ：拦截对象属性检查 k in obj，返回布尔值
  - `deleteProperty()` ：拦截对象属性删除 delete obj[k]，返回布尔值
  - `defineProperty()` ：拦截对象属性定义 `Object.defineProperty()` 、 `Object.defineProperties()` ，返回布尔值
  - `ownKeys()` ：拦截对象属性遍历 `for-in` 、 `Object.keys()` 、 `Object.getOwnPropertyNames()` 、 `Object.getOwnPropertySymbols()` ，返回数组
  - `getOwnPropertyDescriptor()` ：拦截对象属性描述读取 `Object.getOwnPropertyDescriptor()` ，返回对象
  - `getPrototypeOf()` ：拦截对象原型读取 `instanceof` 、 `Object.getPrototypeOf()` 、 `Object.prototype.__proto__` 、 `Object.prototype.isPrototypeOf()` 、 `Reflect.getPrototypeOf()` ，返回对象
  - `setPrototypeOf()` ：拦截对象原型设置 `Object.setPrototypeOf()` ，返回布尔值
  - `isExtensible()` ：拦截对象是否可扩展读取 `Object.isExtensible()` ，返回布尔值
  - `preventExtensions()` ：拦截对象不可扩展设置 `Object.preventExtensions()` ，返回布尔值
  - `apply()` ：拦截 Proxy 实例作为函数调用 `proxy()、proxy.apply()、proxy.call()`
  - `construct()` ：拦截 Proxy 实例作为构造函数调用 `new proxy()`
- 应用场景
  - `Proxy.revocable()` ：不允许直接访问对象，必须通过代理访问，一旦访问结束就收回代理权不允许再次访问
  - `get()` ：读取未知属性报错、读取数组负数索引的值、封装链式操作、生成 DOM 嵌套节点
  - `set()` ：数据绑定(Vue 数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
  - `has()` ：隐藏内部属性不被发现、排除不符合属性条件的对象
  - `deleteProperty()` ：保护内部属性不被删除
  - `defineProperty()` ：阻止属性被外部定义
  - `ownKeys()` ：保护内部属性不被遍历
- 重点难点
  - 要使 `Proxy` 起作用，必须针对实例进行操作，而不是针对目标对象进行操作
  - 没有设置任何拦截时，等同于直接通向原对象
  - 属性被定义为不可读写/扩展/配置/枚举时，使用拦截方法会报错
  - 代理下的目标对象，内部 this 指向 `Proxy` 代理

## Reflect 对象

- 定义：保持 Object 方法的默认行为
- 方法

  - `get()` ：返回对象属性
  - `set()` ：设置对象属性，返回布尔值
  - `has()` ：检查对象属性，返回布尔值
  - `deleteProperty()` ：删除对象属性，返回布尔值
  - `defineProperty()` ：定义对象属性，返回布尔值
  - `ownKeys()` ：遍历对象属性，返回数组( `Object.getOwnPropertyNames()+Object.getOwnPropertySymbols()` )
  - `getOwnPropertyDescriptor()` ：返回对象属性描述，返回对象
  - `getPrototypeOf()` ：返回对象原型，返回对象
  - `setPrototypeOf()` ：设置对象原型，返回布尔值
  - `isExtensible()` ：返回对象是否可扩展，返回布尔值
  - `preventExtensions()` ：设置对象不可扩展，返回布尔值
  - `apply()` ：绑定 this 后执行指定函数
  - `construct()` ：调用构造函数创建实例

- 设计目的
  - 将 Object 属于语言内部的方法放到 `Reflect` 上
  - 将某些 Object 方法报错情况改成返回 false
  - 让 Object 操作变成函数行为
  - `Proxy` 与 `Reflect` 相辅相成
- 废弃方法
  - `Object.defineProperty() => Reflect.defineProperty()`
  - `Object.getOwnPropertyDescriptor() => Reflect.getOwnPropertyDescriptor()`
- 重点难点
  - `Proxy` 方法和 `Reflect` 方法一一对应
  - `Proxy` 和 `Reflect` 联合使用，前者负责拦截赋值操作，后者负责完成赋值操作

**数据绑定：观察者模式**

```js
const observerQueue = new Set();
const observe = fn => observerQueue.add(fn);
const observable = obj =>
  new Proxy(obj, {
    set(tgt, key, val, receiver) {
      const result = Reflect.set(tgt, key, val, receiver);
      observerQueue.forEach(v => v());
      return result;
    }
  });

const person = observable({
  age: 25,
  name: "Yajun"
});
const print = () => console.log(`${person.name} is ${person.age} years old`);
observe(print);
person.name = "Joway";
```

## Iterator（接口）

- 定义：为各种不同的数据结构提供统一的访问机制
- 原理：创建一个指针指向首个成员，按照次序使用 `next()` 指向下一个成员，直接到结束位置(数据结构只要部署 `Iterator` 接口就可完成遍历操作)
- 作用
  - 为各种数据结构提供一个统一的简便的访问接口
  - 使得数据结构成员能够按某种次序排列
  - ES6 创造了新的遍历命令 `for-of` ， `Iterator` 接口主要供 `for-of` 消费
- 形式： `for-of` (自动去寻找 Iterator 接口)
- 数据结构
  - 集合： `Array` 、 `Object` 、 `Set` 、 `Map`
  - 原生具备接口的数据结构： `String` 、 `Array` 、 `Set` 、 `Map` 、 `TypedArray` 、 `Arguments` 、 `NodeList`
- 部署：默认部署在 `Symbol.iterator` (具备此属性被认为可遍历的 iterable)
- 遍历器对象
  - `next()` ：下一步操作，返回{ done, value }(必须部署)
  - `return()` ： `for-of` 提前退出调用，返回{ done: true }
  - `throw()` ：不使用，配合 `Generator` 函数使用

### ForOf 循环

- 定义：调用 `Iterator` 接口产生遍历器对象( `for-of` 内部调用数据结构的 `Symbol.iterator()` )
- 遍历字符串： `for-in` 获取索引， `for-of` 获取值(可识别 32 位 UTF-16 字符)
- 遍历数组： `for-in` 获取索引， `for-of` 获取值
- 遍历对象： `for-in` 获取键， `for-of` 需自行部署
- 遍历 Set： `for-of` 获取值 => `for (const v of set)`
- 遍历 Map： `for-of` 获取键值对 => `for (const [k, v] of map)`
- 遍历类数组：包含 `length` 的对象、 `Arguments` 对象、 `NodeList` 对象(无 `Iterator` 接口的类数组可用 `Array.from()` 转换)
- 计算生成数据结构： `Array` 、 `Set` 、 `Map`
  - `keys()` ：返回遍历器对象，遍历所有的键
  - `values()` ：返回遍历器对象，遍历所有的值
  - `entries()` ：返回遍历器对象，遍历所有的键值对
- 与 `for-in` 区别
  - 有着同 `for-in` 一样的简洁语法，但没有 `for-in` 那些缺点、
  - 不同于 `forEach()` ，它可与 `break` 、 `continue` 和 `return` 配合使用
  - 提供遍历所有数据结构的统一操作接口
- 应用场景
  - 改写具有 `Iterator` 接口的数据结构的 `Symbol.iterator`
  - 解构赋值：对 Set 进行结构
  - 扩展运算符：将部署 `Iterator` 接口的数据结构转为数组
  - `yield*` ： `yield*` 后跟一个可遍历的数据结构，会调用其遍历器接口
  - 接受数组作为参数的函数： `for-of、Array.from()` 、 `new Set()` 、 `new WeakSet()` 、 `new Map()` 、 `new WeakMap()` 、 `Promise.all()` 、 `Promise.race()`

## Class（类）

- 定义：对一类具有共同特征的事物的抽象(构造函数语法糖)
- 原理：类本身指向构造函数，所有方法定义在 `prototype` 上，可看作构造函数的另一种写法( `Class === Class.prototype.constructor` )
- 方法和关键字
  - `constructor()` ：构造函数， `new` 命令生成实例时自动调用
  - `extends` ：继承父类
  - `super` ：新建父类的 this
  - `static` ：定义静态属性方法
  - `get` ：取值函数，拦截属性的取值行为
  - `set` ：存值函数，拦截属性的存值行为
- 属性
  - `__proto__` ：构造函数的继承(总是指向父类)
  - `__proto__.__proto__` ：子类的原型的原型，即父类的原型(总是指向父类的 `__proto__` )
  - `prototype.__proto__` ：属性方法的继承(总是指向父类的 `prototype` )
- 静态属性：定义类完成后赋值属性，该属性不会被实例继承，只能通过类来调用
- 静态方法：使用 `static` 定义方法，该方法不会被实例继承，只能通过类来调用(方法中的 this 指向类，而不是实例)
- 继承
  - 实质
    - ES5 实质：先创造子类实例的 this，再将父类的属性方法添加到 this 上( `Parent.apply(this)` )
    - ES6 实质：先将父类实例的属性方法加到 this 上(调用 `super()` )，再用子类构造函数修改 this
  - super
    - 作为函数调用：只能在构造函数中调用 super()，内部 this 指向继承的当前子类(super()调用后才可在构造函数中使用 this)
    - 作为对象调用：在普通方法中指向父类的原型对象，在静态方法中指向父类
  - 显示定义：使用 `constructor() { super(); }` 定义继承父类，没有书写则显示定义
  - 子类继承父类：子类使用父类的属性方法时，必须在构造函数中调用 super()，否则得不到父类的 this
    - 父类静态属性方法可被子类继承
    - 子类继承父类后，可从 `super` 上调用父类静态属性方法
- 实例：类相当于实例的原型，所有在类中定义的属性方法都会被实例继承
  - 显式指定属性方法：使用 this 指定到自身上(使用 `Class.hasOwnProperty()` 可检测到)
  - 隐式指定属性方法：直接声明定义在对象原型上(使用 `Class.__proto__.hasOwnProperty()` 可检测到)
- 表达式
  - 类表达式： `const Class = class {}`
  - name 属性：返回紧跟 class 后的类名
  - 属性表达式： `[prop]`
  - `Generator` 方法： `* mothod() {}`
  - Async 方法： `async mothod() {}`
- this 指向：解构实例属性或方法时会报错
  - 绑定 `this：this.mothod = this.mothod.bind(this)`
  - 箭头函数： `this.mothod = () => this.mothod()`
- 属性定义位置
  - 定义在构造函数中并使用 this 指向
  - 定义在类最顶层
- `new.target` ：确定构造函数是如何调用

### 原生构造函数

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `Date()`
- `RegExp()`
- `Error()`

### 重点难点

- 在实例上调用方法，实质是调用原型上的方法
- `Object.assign()` 可方便地一次向类添加多个方法( `Object.assign(Class.prototype, { ... })` )
- 类内部所有定义的方法是不可枚举的( `non-enumerable` )
- 构造函数默认返回实例对象(this)，可指定返回另一个对象
- 取值函数和存值函数设置在属性的 `Descriptor` 对象上
- 类不存在变量提升
- 利用 `new.target === Class` 写出不能独立使用必须继承后才能使用的类
- 子类继承父类后，this 指向子类实例，通过 super 对某个属性赋值，赋值的属性会变成子类实例的属性
- 使用 `super` 时，必须显式指定是作为函数还是作为对象使用
- `extends` 不仅可继承类还可继承原生的构造函数

### 私有属性方法

```js
const name = Symbol("name");
const print = Symbol("print");
class Person {
  constructor(age) {
    this[name] = "Bruce";
    this.age = age;
  }
  [print]() {
    console.log(`${this[name]} is ${this.age} years old`);
  }
}
```

### 继承混合类

```js
function CopyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

function MixClass(...mixins) {
  class Mix {
    constructor() {
      for (const mixin of mixins) {
        CopyProperties(this, new mixin());
      }
    }
  }
  for (const mixin of mixins) {
    CopyProperties(Mix, mixin);
    CopyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
class Student extends MixClass(Person, Kid) {}
```

## Module（模块）

- 命令
  - `export` ：规定模块对外接口
    - 默认导出： `export default Person` (导入时可指定模块任意名称，无需知晓内部真实名称)
    - 单独导出： `export const name = "Bruce"`
    - 按需导出： `export { age, name, sex }` (推荐)
    - 改名导出： `export { name as newName }`
  - `import` ：导入模块内部功能
    - 默认导入： `import Person from "person"`
    - 整体导入： `import * as Person from "person"`
    - 按需导入： `import { age, name, sex } from "person"`
    - 改名导入： `import { name as newName } from "person"`
    - 自执导入： `import "person"`
    - 复合导入： `import Person, { name } from "person"`
  - 复合模式： `export` 命令和 `import` 命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量
    - 默认导入导出： `export { default } from "person"`
    - 整体导入导出： `export * from "person"`
    - 按需导入导出： `export { age, name, sex } from "person"`
    - 改名导入导出： `export { name as newName } from "person"`
    - 具名改默认导入导出： `export { name as default } from "person"`
    - 默认改具名导入导出： `export { default as name } from "person"`
- 继承：默认导出和改名导出结合使用可使模块具备继承性
- 设计思想：尽量地静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
- 严格模式：ES6 模块自动采用严格模式(不管模块头部是否添加 use strict)

### 模块方案

- CommonJS：用于服务器(动态化依赖)
- AMD：用于浏览器(动态化依赖)
- CMD：用于浏览器(动态化依赖)
- UMD：用于浏览器和服务器(动态化依赖)
- ESM：用于浏览器和服务器(静态化依赖)

### 加载方式

- 运行时加载
  - 定义：整体加载模块生成一个对象，再从对象上获取需要的属性和方法进行加载(全部加载)
  - 影响：只有运行时才能得到这个对象，导致无法在编译时做静态优化
- 编译时加载
  - 定义：直接从模块中获取需要的属性和方法进行加载(按需加载)
  - 影响：在编译时就完成模块加载，效率比其他方案高，但无法引用模块本身(本身不是对象)，可拓展 JS 高级语法(宏和类型校验)

### 加载实现

- 传统加载：通过 `<script>` 进行同步或异步加载脚本
  - 同步加载： `<script src=""></script>`
  - Defer 异步加载： `<script src="" defer></script>` (顺序加载，渲染完再执行)
  - Async 异步加载： `<script src="" async></script>` (乱序加载，下载完就执行)
- 模块加载： `<script type="module" src=""></script>` (默认是 Defer 异步加载)

### CommonJS 和 ESM 的区别

- CommonJS 输出值的拷贝，ESM 输出值的引用
  - CommonJS 一旦输出一个值，模块内部的变化就影响不到这个值
  - ESM 是动态引用且不会缓存值，模块里的变量绑定其所在的模块，等到脚本真正执行时，再根据这个只读引用到被加载的那个模块里去取值
- CommonJS 是运行时加载，ESM 是编译时加载
  - CommonJS 加载模块是对象(即 module.exports)，该对象只有在脚本运行完才会生成
  - ESM 加载模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

### Node 加载

- 背景：CommonJS 和 ESM 互不兼容，目前解决方案是将两者分开，采用各自的加载方案
- 区分：要求 ESM 采用 `.mjs` 后缀文件名
  - `require()` 不能加载 `.mjs` 文件，只有 `import` 命令才可加载.mjs 文件
  - `.mjs` 文件里不能使用 `require()` ，必须使用 `import` 命令加载文件
- 驱动： `node --experimental-modules file.mjs`
- 限制：Node 的 import 命令目前只支持加载本地模块(file: 协议)，不支持加载远程模块
- 加载优先级
  - 脚本文件省略后缀名：依次尝试加载四个后缀名文件( `.mjs` 、 `.js` 、 `.json` 、 `node` )
  - 以上不存在：尝试加载 `package.json` 的 main 字段指定的脚本
  - 以上不存在：依次尝试加载名称为 index 四个后缀名文件( `.mjs` 、 `.js` 、 `.json` 、 `node` )
  - 以上不存在：报错
- 不存在的内部变量： `arguments` 、 `exports` 、 `module` 、 `require` 、 `this` 、 `__dirname` 、 `__filename`
- CommonJS 加载 ESM
  - 不能使用 `require()` ，只能使用 `import()`
- ESM 加载 CommonJS
  - 自动将 module.exports 转化成 export default
  - CommonJS 输出缓存机制在 ESM 加载方式下依然有效
  - 采用 import 命令加载 CommonJS 模块时，不允许采用按需导入，应使用默认导入或整体导入

#### 循环加载

- 定义：脚本 A 的执行依赖脚本 B，而脚本 A 的执行又依赖脚本 B
- 加载原理
  - `CommonJS：require()` 首次加载脚本就会执行整个脚本，在内存里生成一个对象缓存下来，二次加载脚本时直接从缓存中获取
  - `ESM：import` 命令加载变量不会被缓存，而是成为一个指向被加载模块的引用
- 循环加载
  - `CommonJS` ：只输出已经执行的部分，还未执行的部分不会输出
  - `ESM` ：需开发者自己保证真正取值时能够取到值(可把变量写成函数形式，函数具有提升作用)
- 重点难点
  - ES6 模块中，顶层 this 指向 `undefined` ，不应该在顶层代码使用 this
  - 一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取
  - `export` 命令输出的接口与其对应的值是动态绑定关系，即通过该接口可获取模块内部实时的值
  - `import` 命令大括号里的变量名必须与被导入模块对外接口的名称相同
  - `import` 命令输入的变量只读(本质是输入接口)，不允许在加载模块的脚本里改写接口
  - `import` 命令命令具有提升效果，会提升到整个模块的头部，首先执行
  - 重复执行同一句 `import` 语句，只会执行一次
  - `export default` 命令只能使用一次
  - `export default` 命令导出的整体模块，在执行 `import` 命令时其后不能跟大括号
  - `export default` 命令本质是输出一个名为 `default` 的变量，后面不能跟变量声明语句
  - `export default` 命令本质是将后面的值赋给名为 `default` 的变量，可直接将值写在其后
  - `export default` 命令和 `export {}` 命令可同时存在，对应复合导入
  - `export` 命令和 `import` 命令可出现在模块任何位置，只要处于模块顶层即可，不能处于块级作用域
  - `import()` 加载模块成功后，此模块会作为一个对象，当作 `then()` 的参数，可使用对象解构赋值来获取输出接口
  - 同时动态加载多个模块时，可使用 `Promise.all()` 和 `import()` 相结合来实现
  - `import()` 和结合 `async/await` 来书写同步操作的代码

#### 单例模式：跨模块常量

```js
// 常量跨文件共享
// person.js
const NAME = "Bruce";
const AGE = 25;
const SEX = "male";
export { AGE, NAME, SEX };
```

```js
// file1.js
import { AGE } from "person";
console.log(AGE);
```

```js
// file2.js
import { AGE, NAME, SEX } from "person";
console.log(AGE, NAME, SEX);
```

#### 默认导入互换整体导入

```js
import Person from "person";
console.log(Person.AGE);
```

```js
import * as Person from "person";
console.log(Person.default.AGE);
```

## 异步编程

### Generator

- 定义：封装多个内部状态的异步编程解决方案
- 形式：调用 Generator 函数(该函数不执行)返回指向内部状态的指针对象(不是运行结果)
- 声明：function\* Func() {}
- 方法
  - `next()` ：使指针移向下一个状态，返回{ done, value }(入参会被当作上一个 yield 命令表达式的返回值)
  - `return()` ：返回指定值且终结遍历 `Generator` 函数，返回{ done: true, value: 入参 }
  - `throw()` ：在 `Generator` 函数体外抛出错误，在 `Generator` 函数体内捕获错误，返回自定义的 `new Errow()`
- `yield` 命令：声明内部状态的值( `return` 声明结束返回的值)
  - 遇到 `yield` 命令就暂停执行后面的操作，并将其后表达式的值作为返回对象的 value
  - 下次调用 `next()` 时，再继续往下执行直到遇到下一个 `yield` 命令
  - 没有再遇到 `yield` 命令就一直运行到 `Generator` 函数结束，直到遇到 `return` 语句为止并将其后表达式的值作为返回对象的 value
  - `Generator` 函数没有 `return` 语句则返回对象的 value 为 undefined
- `yield*` 命令：在一个 `Generator` 函数里执行另一个 `Generator` 函数(后随具有 `Iterator` 接口的数据结构)
- 遍历：通过 `for-of` 自动调用 `next()`
- 作为对象属性
  - 全写： `const obj = { method: function*() {} }`
  - 简写： `const obj = { * method() {} }`
- 上下文：执行产生的上下文环境一旦遇到 `yield` 命令就会暂时退出堆栈(但并不消失)，所有变量和对象会冻结在当前状态，等到对它执行 `next()` 时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行

#### 方法异同

- 相同点： `next()` 、 `throw()` 、 `return()` 本质上是同一件事，作用都是让函数恢复执行且使用不同的语句替换 `yield` 命令
- 不同点
  - `next()` ：将 yield 命令替换成一个值
  - `return()` ：将 yield 命令替换成一个 return 语句
  - `throw()` ：将 yield 命令替换成一个 throw 语句

#### 应用场景

- 异步操作同步化表达
- 控制流管理
- 为对象部署 `Iterator` 接口：把 `Generator` 函数赋值给对象的 `Symbol.iterator` ，从而使该对象具有 `Iterator` 接口
- 作为具有 `Iterator` 接口的数据结构

#### 重点难点

- 每次调用 `next()` ，指针就从函数头部或上次停下的位置开始执行，直到遇到下一个 `yield` 命令或 `return` 语句为止
- 函数内部可不用 `yield` 命令，但会变成单纯的暂缓执行函数(还是需要 next()触发)
- `yield` 命令是暂停执行的标记， `next()` 是恢复执行的操作
- `yield` 命令用在另一个表达式中必须放在圆括号里
- `yield` 命令用作函数参数或放在赋值表达式的右边，可不加圆括号
- `yield` 命令本身没有返回值，可认为是返回 `undefined`
- `yield` 命令表达式为惰性求值，等 `next()` 执行到此才求值
- 函数调用后生成遍历器对象，此对象的 `Symbol.iterator` 是此对象本身
- 在函数运行的不同阶段，通过 `next()` 从外部向内部注入不同的值，从而调整函数行为
- 首个 `next()` 用来启动遍历器对象，后续才可传递参数
- 想首次调用 `next()` 时就能输入值，可在函数外面再包一层
- 一旦 `next()` 返回对象的 done 为 true， `for-of` 遍历会中止且不包含该返回对象
- 函数内部部署 `try-finally` 且正在执行 try，那么 `return()` 会导致立刻进入 `finally` ，执行完 `finally` 以后整个函数才会结束
- 函数内部没有部署 `try-catch` ， `throw()` 抛错将被外部 `try-catch` 捕获
- `throw()` 抛错要被内部捕获，前提是必须至少执行过一次 `next()`
- `throw()` 被捕获以后，会附带执行下一条 `yield` 命令
- 函数还未开始执行，这时 `throw()` 抛错只可能抛出在函数外部

#### 首次 next()可传值

```js
function Wrapper(func) {
  return function(...args) {
    const generator = func(...args);
    generator.next();
    return generator;
  };
}
const print = Wrapper(function*() {
  console.log(`First Input: ${yield}`);
  return "done";
});
print().next("hello");
```

### async await

- 定义：使异步函数以同步函数的形式书写( `Generator` 函数语法糖)
- 原理：将 `Generator` 函数和自动执行器 `spawn` 包装在一个函数里
- 形式：将 `Generator` 函数的\*替换成 async，将 `yield` 替换成 await
- 声明
  - 具名函数： `async function Func() {}`
  - 函数表达式： `const func = async function() {}`
  - 箭头函数： `const func = async() => {}`
  - 对象方法： `const obj = { async func() {} }`
  - 类方法： `class Cla { async Func() {} }`
- await 命令：等待当前 Promise 对象状态变更完毕
  - 正常情况：后面是 Promise 对象则返回其结果，否则返回对应的值
  - 后随 `Thenable` 对象：将其等同于 Promise 对象返回其结果
- 错误处理：将 await 命令 Promise 对象放到 `try-catch` 中(可放多个)
- Async 对 `Generator` 改进
  - 内置执行器
  - 更好的语义
  - 更广的适用性
  - 返回值是 Promise 对象
- 应用场景
  - 按顺序完成异步操作
- 重点难点

  - `Async` 函数返回 Promise 对象，可使用 then()添加回调函数
  - 内部 `return` 返回值会成为后续 then()的出参
  - 内部抛出错误会导致返回的 Promise 对象变为 `rejected` 状态，被 catch()接收到
  - 返回的 Promise 对象必须等到内部所有 `await` 命令 Promise 对象执行完才会发生状态改变，除非遇到 `return` 语句或抛出错误
  - 任何一个 `await` 命令 Promise 对象变为 `rejected` 状态，整个 `Async` 函数都会中断执行
  - 希望即使前一个异步操作失败也不要中断后面的异步操作

    - 将 `await` 命令 Promise 对象放到 `try-catch` 中
    - `await` 命令 Promise 对象跟一个 catch()

  - `await` 命令 Promise 对象可能变为 `rejected` 状态，最好把其放到 `try-catch` 中
  - 多个 `await` 命令 Promise 对象若不存在继发关系，最好让它们同时触发
  - `await` 命令只能用在 `Async` 函数之中，否则会报错
  - 数组使用 `forEach()` 执行 `async/await` 会失效，可使用 `for-of` 和 `Promise.all()` 代替
  - 可保留运行堆栈，函数上下文随着 `Async` 函数的执行而存在，执行完成就消失

### Promise

- 定义：包含异步操作结果的对象
- 状态
  - 进行中： `pending`
  - 已成功： `resolved`
  - 已失败： `rejected`
- 特点
  - 对象的状态不受外界影响
  - 一旦状态改变就不会再变，任何时候都可得到这个结果
- 声明： `new Promise((resolve, reject) => {})`
- 出参
  - `resolve` ：将状态从未完成变为成功，在异步操作成功时调用，并将异步操作的结果作为参数传递出去
  - `reject` ：将状态从未完成变为失败，在异步操作失败时调用，并将异步操作的错误作为参数传递出去
- 方法

  - `then()` ：分别指定 `resolved` 状态和 `rejected` 状态的回调函数

    - 第一参数：状态变为 `resolved` 时调用
    - 第二参数：状态变为 `rejected` 时调用(可选)

  - `catch()` ：指定发生错误时的回调函数
  - `Promise.all()` ：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)

    - 入参：具有 `Iterator` 接口的数据结构
    - 成功：只有全部实例状态变成 `resolved` ，最终状态才会变成 `resolved`
    - 失败：其中一个实例状态变成 `rejected` ，最终状态就会变成 `rejected`

  - `Promise.race()` ：将多个实例包装成一个新实例，返回全部实例状态优先变更后的结果(先变更先返回)
  - `Promise.resolve()` ：将对象转为 `Promise` 对象(等价于 `new Promise(resolve => resolve())` )

    - `Promise` 实例：原封不动地返回入参
    - `Thenable` 对象：将此对象转为 `Promise` 对象并返回(Thenable 为包含 then()的对象，执行 then()相当于执行此对象的 then())
    - 不具有 t `hen()` 的对象：将此对象转为 `Promise` 对象并返回，状态为 `resolved`
    - 不带参数：返回 `Promise` 对象，状态为 `resolved`

  - `Promise.reject()` ：将对象转为状态为 rejected 的 Promise 对象(等价于 `new Promise((resolve, reject) => reject())` )

- 应用场景
  - 加载图片
  - AJAX 转 Promise 对象
- 重点难点
  - 只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态
  - 状态改变只有两种可能：从 `pending` 变为 `resolved` 、从 `pending` 变为 `rejected`
  - 一旦新建 `Promise` 对象就会立即执行，无法中途取消
  - 不设置回调函数，内部抛错不会反应到外部
  - 当处于 `pending` 时，无法得知目前进展到哪一个阶段
  - 实例状态变为 `resolved` 或 `rejected` 时，会触发 then()绑定的回调函数
  - `resolve()` 和 `reject()` 的执行总是晚于本轮循环的同步任务
  - then()返回新实例，其后可再调用另一个 then()
  - then()运行中抛出错误会被 catch()捕获
  - `reject()` 的作用等同于抛出错误
  - 实例状态已变成 `resolved` 时，再抛出错误是无效的，不会被捕获，等于没有抛出
  - 实例状态的错误具有冒泡性质，会一直向后传递直到被捕获为止，错误总是会被下一个 catch()捕获
  - 不要在 then()里定义 `rejected` 状态的回调函数(不使用其第二参数)
  - 建议使用 catch()捕获错误，不要使用 then()第二个参数捕获
  - 没有使用 catch()捕获错误，实例抛错不会传递到外层代码，即不会有任何反应
  - 作为参数的实例定义了 catch()，一旦被 `rejected` 并不会触发 `Promise.all()` 的 catch()
  - `Promise.reject()` 的参数会原封不动地作为 `rejected` 的理由，变成后续方法的参数

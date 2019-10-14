---
title: 原生JS（下）
sidebar: auto
---

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

#### 数组操作(转化，拼接，截取，删除，添加...)

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

``` javascript
let ary = [1, 4, 5, 2, '6', [7]];
let arr = ary.filter(item => {
    return item > 3
});
console.log(ary, arr);

// [ 1, 4, 5, 2, '6', [ 7 ] ] [ 4, 5, '6', [ 7 ] ]
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

#### 数组操作(转化，拼接，截取，删除，添加...)

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

``` javascript
let ary = [1, 4, 5, 2, '6', [7]];
let arr = ary.filter(item => {
    return item > 3
});
console.log(ary, arr);

// [ 1, 4, 5, 2, '6', [ 7 ] ] [ 4, 5, '6', [ 7 ] ]
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

这篇文章是下面两篇教程的精简和理解，由于本人水平有限，可能会有偏差。

* [菜鸟联盟-正则表达式教程](https://www.runoob.com/regexp/regexp-tutorial.html)
* [正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex.htm)

::: tip 我的理解
我理解的正则是一段规则，我们可以通过这段规则在海量数据中提取这段规则定义的内容，从而对其执行我们想要的操作。
:::

### 元字符

> 只要在 `“/.../”` 之间包含起来的，都是正则的元字符

|元字符|含义|
|:---|:----|
|\\|转义字符(把有意义和没意义的字符来回转)|

* 特殊元字符 以xxx结束
  + `\d` 匹配0-9之间的任意数字  \D：除了0-9之间数字的任意字符
  + `\b` 匹配一个边界
  + `\w` 匹配数字、字母、下划线中的任意字符
  + `\s` 匹配一个空白字符
  + `[xyz]` x或者y或者z中的一个，例如：[abcd]四个字母中的任意一个
  + `[^xyz]` 除了三个以外的任意字符
  + `[a-z]` 匹配a-z中的任意字符
  + `[^a-z]` 匹配除了a-z中的任意字符
  + `x|y` 匹配x或者y中的任意一个
  + `()` 分组
  + `?:` 只匹配不捕获
  + `?=` 正向预查
  + `?!` 负向预查  两个预查也起到了只匹配不捕获的作用
  + ...
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


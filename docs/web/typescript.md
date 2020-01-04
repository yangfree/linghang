---
title: TypeScript
sidebar: auto
prev: ./es6
next: ./vue
---

## 1. 为什么要使用TypeScript

* 免费开源, 使用Apache授权协议.
* 基于 `ECMAScript` 标准进行扩展, 是 `JavaScript` 的超集.
* 静态类型检查, 且拥有类型推断.
* 全面支持 `es6` , 并且持续输出ECMAScript 3/5/6标准的纯 `JavaScript` 代码.
* 全面拥抱ECMAScript提案中的特性.
* 成为一款跨平台的工具，支持所有的浏览器、主机和操作系统。
* 文件扩展名是 `ts` .
* 编译时检查，不污染运行时。

## 2. 基础安装

``` bash
# tsc编译ts文件为js
npm install typescript -g
# 提供直接运行ts代码的能力
npm install ts-node -g
```

## 3. 类型

既然名为 `TypeScript` , 那么**Type**必然是核心.

###  3.1 基本类型

`Boolean` 类型: 

``` ts
let isOk: boolean = true;
```

`Number` 类型:

``` ts
let num: number = 12;
```

`String` 类型:

``` ts
let name: string = 'Petter';
let str: string = `hello, ${name}.` ;
```

`undefined` 类型: 

``` ts
let undefined: undefined = undefined;
```

`null` 类型: 

``` ts
let null: null = null;
```

`Array` 类型:

``` ts
let list: number[] = [1,2,3];
let list: Array<number> = [1,2,3];
```

`Symbol` 类型:

``` ts
const symbol = new Symbol();
const obj = {
    [symbol]: value
}

console.log(obj[symbol]);// value
```

### 3.2 泛型

泛型提升了代码的重用性, 使得程序不仅仅支持当前所设计的数据类型, 也能支持将来可能出现的数据类型.

``` ts
// 函数的泛型
function hello<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

// 参数的数组泛型
hello(['hello'])
```

### 3.3 枚举

我们可以先定义一个对象用来存储初始化的一些状态, 然后在需要的地方取值.

* 数字枚举可以自动递增赋值也可以指定特定的值, 具有反向映射

``` ts
enum initStatus {
    start,
    pendding=-2,
    complete
}
```

* 字符串枚举语义化更加强些, 不具有反向映射

``` ts
enum initStatus {
    start='start',
    pendding='pendding',
    complete='complete'
}
```

### 3.4 Interface



## 4 类型断言

`TypeScript` 存在类型断言, 体现在在不确定变量类型的情况下, `TypeScript` 会根据变量的类型尝试进行断言.

### 4.1 尖括号

``` ts
let oneString: any = "This is a String";
let oneStringLength: number = (<string>oneString).length;
```

### 4.2 关键字as

``` ts
let oneString: any = "This is a String";
let oneStringLength: number = (oneString as string).length;
```


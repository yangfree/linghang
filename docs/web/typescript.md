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

### 1.1 在vscode中配置自动编译环境

1. 在项目目录文件夹运行 `tsc --init` 生成tscconfig.json配置文件
2. 终端-->任务-->运行任务-->监视 `tscconfig.json文件` 

## 2. 基础安装

``` bash
# tsc编译ts文件为js
npm install typescript -g
# 提供直接运行ts代码的能力
npm install ts-node -g
```

## 3. 基础知识

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

`元组` 类型:

``` ts
let list:[string, number] = ['this is tuple', 123];
````

`any` 类型:

``` ts
let anything:any = 123;
anything = 'hello';
```

`void` 类型:

``` ts
function fn():void {

}
```

`never` 类型: 表示其他类型(包括 `null` 和 `undefiend` )的子类型，代表从不会出现的值。

``` ts
let example: null;
example = null;

let err: never;
err = (()=> { throw new Error('fail.') })();
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

- 函数的泛型

``` ts
// 函数的泛型
function hello<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

// 参数的数组泛型
hello<string[]>(['hello'])
```
- 类型的泛型

定义一个泛型类，支持数字和字符串求最小值。

```ts
class MinNum<T> {
  list: T[] = [];

  add(value: T): void {
    this.list.push(value);
  }

  min(): T {
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

let m1 = new MinNum<number>();
let m2 = new MinNum<string>();
```

- 泛型接口 泛型类接口


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

在面向对象的编程中，接口是一种规范的定义， 它定义了行为和动作的规范； 在程序设计里面，接口起到了一种限制和规范的作用。接口定义了某一批类所需要遵循的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这些类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 `typescript` 中的接口类与 `java` ，同时还增加了更加灵活的接口类型， 包括属性、 函数、 可索引和类等。

* 属性的接口 对 `json` 的约束

``` ts
// 注意以分号结束
interface ajaxParams {
  type: string;
  url: string;
  dataType: string;
  data?: string;
}

function myAjax(data: ajaxParams) {
  let xhr = new XMLHttpRequest();
  xhr.open(data.type, data.url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (data.dataType == 'json') {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  }
}

// 第一种调用
myAjax({
  type: 'get',
  url: 'www.baidu.com',
  dataType: 'json',
  data: 'name=job'
})

// 第二种调用
myAjax({
  type: 'post',
  url: 'www.baidu.com',
  dataType: ''
})
```

* 函数类型的接口 对参数和返回值进行约束

``` ts
interface encrypt {
  (key: string, val: string): string;
}

let md5: encrypt = function (key: string, value: string): string {
  return key + value;
}

md5('zhanghao', 'jiami');
```

* 可索引接口 对数组和对象进行约束

``` ts
interface userList {
  [index: number]: string;
}

let userList: userList = ['liwenhua', 'zhangsan'];
```

* 类类型接口 对类进行约束 和抽象类有些类似

``` ts
interface Student {
  name: string;
  study(course: string): void;
}

class Ming implements Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // 不传参数不会报错  只要实现方法即可
  study() {
    console.log(`${this.name}在学习语文`);
  }
}

let xiaoMing = new Ming('xiaoming');
xiaoMing.study();

class Hong implements Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // 传参
  study(course: string) {
    console.log(`${this.name}在学习${course}`);
  }
}

let xiaoHong = new Hong('xiaohong');
xiaoHong.study('Math');
```
**类的继承和接口的继承实现Coding:**

```ts
interface Person {
  eat(): void;
}
interface Programmer extends Person {
  work(): void;
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  coding(code: string) {
    console.log(`${this.name}正在写${code}!`);
  }
}

class Web extends Person implements Programmer {
  constructor(name: string) {
    super(name);
  }
  
  eat() {
    console.log('吃饭');
  }

  work() {
    console.log('工作');
  }
}

let web = new Web('zhagsan');
web.conding('Python');
```

### 3.5 abstract

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

##  5. 模块化

### 5.1 外部模块 export/export default import

### 5.2 命名空间 namespace

### 5.3 命名空间和模块的区别:

- 命名空间：内部模块， 主要用于组织代码，避免命名冲突。
- 模块： ts的外部模块的简称， 侧重于代码的复用， 一个模块里面可能会有多个命名空间。

## 6. 装饰器

装饰器是一种特殊类型的声明， 它能够被附加到类声明，方法，属性或者参数上，可以修改类的行为。通俗的讲修饰器就是一个方法，可以注入到类，方法，属性参数上来扩展类，属性，方法，参数的功能。常见的装饰器有类装饰器，属性装饰器，方法装饰器，参数装饰器。

装饰器的写法： 

- 普通装饰器（无法传参）
- 装饰器工厂（可传参）

### 6.1 类装饰器

```ts
// 1. 普通装饰器
function classModify(params: any): void {
  console.log(params); // 修饰的类
}

@classModify
class HttpClient {
  constructor() {

  }
  getData() {}
}

// 2. 装饰器工厂 可传递参数
function classModify(data: string) {
  return function (params: any) {
    console.log(params, data); // 修饰的类
  }
}

@classModify('hello')
class HttpClient {
  constructor() {

  }
  getData() { }
}
```

### 6.2 属性装饰器

### 6.3 方法装饰器

### 6.4 参数装饰器

### 6.5 执行顺序

**属性装饰器 > 方法装饰器 > 方法参数装饰器 > 类装饰器**

如果拥有多个同样的装饰器，它会先执行后面的，在执行前面的。

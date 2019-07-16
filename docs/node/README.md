---
sidebar: auto
---
# node

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

## npm

> npm是一个包管理工具，由官网，注册列表和命令行组成。网站是开发者查找包（package）、设置参数以及管理`npm`使用体验的主要途径。注册表 是一个巨大的数据库，保存了每个包（package）的信息。CLI 通过命令行或终端运行。开发者通过 CLI 与 `npm`打交道。

**npm官网：** [https://www.npmjs.com/](https://www.npmjs.com/) 

### npm作用：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

**注:**现在`npm`已经集成到`node`中，下载`node`就会同时下载`npm`，查看`npm`版本可以使用`npm -v`。

### npm用法：

``` bash
# 本地安装
$ npm install <Model Name>;
# 查看模块历史版本信息
$ npm view xxx > xxx.version.txt
# 安装指定版本
$ npm install xxx@version
# 全局安装
$ npm install <Model Name> -g;
# 卸载模块
$ npm uninstall <Model Name>;
# 搜索模块
$ npm search <Model Name>;
# 更新模块
$ npm update <Model Name>;
# 创建依赖清单
$ npm init;
# 没有就是注册，有的话就是登陆
$ npm adduser;
# 发布
$ npm publish;
# 取消发布
$ npm unpublish

# 使用淘宝镜像
$npm install -g cnpm --registry=https://registry.npm.taobao.org;
```

## 交互式解释器

> node自带了交互式解释器。使用`node`命令可以进入编辑模式，支持简单的逻辑计算，变量声明和循环。

``` bash
# 进入交互式解释器
node> node
```

### REPL中的基础命令

- `.break`: 想要放弃书写或者重新书写时候。
- `.clear`: `.break`的别名
- `.editor`: 开启编辑模式
- `.exit`: 退出REPL
- `.help`: 帮助
- `.load`: 加载一个本地文件到REPL中  加文件名
- `.save`: 把REPL中的内容存储到本地  加文件名


## node中回调函数

>异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。Node 所有 API 都支持回调函数。回调函数一般作为参数的最后一个参数出现.

``` javascript
const fs = require('fs');

// 阻塞式代码实现
let data = fs.readFileSync('./text.txt');

console.log(data.toString());
console.log('程序执行完毕');

/**
 * 输出结果:
 * 个人博客:http://www.yangjie90.com;
 * 程序执行完毕 
 */
------------------------------------------------
// 非阻塞式代码实现

fs.readFile('./text.txt', (err, data) => {
    if (err) return console.log(err);
    console.log(data.toString());
});

console.log('chengxu zhixing wanbi.')

/**
 * 输出结果:
 * chengxu zhixing wanbi.
 * 个人博客:http://www.yangjie90.com;
 */
```

## node中的事件

> Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件.

``` javascript
// 引入事件处理程序
const events = require('events');

// 创建`eventEmitter`对象
const eventEmitter = new events.EventEmitter();

//绑定事件处理程序
eventEmitter.on('eventName',evenrHandler);

//触发事件处理程序
eventEmitter.emit('eventName');
```

- 一个栗子

``` javascript
const events = require('events');
const eventEmitter = new events.EventEmitter();

// 创建事件处理程序
let connectHander = function connected() {
    console.log('connction is successful!!!');
    // 触发data_received事件
    eventEmitter.emit('data_received');
}

// 绑定connection事件处理程序
eventEmitter.on('connection', connectHander);

// 使用匿名函数绑定data_received事件
eventEmitter.on('data_received', () => {
    console.log('data received successfully!!!');
})

// 触发connection事件
eventEmitter.emit('connection');

console.log('end');
/**
 * 输出结果:
 *  connction is successful!!!
 *  data received successfully!!!
 *  end
 * 
*/

```

## node中的函数

> 在javascript中，函数分为匿名函数和具名函数，而这两种函数都可以以参数的形式传递给另一个函数，这里需要注意的是传递的是函数本身而不是它的返回值。

``` javascript
function say(word) {
    console.log(word);
}

function sayHello(someFunction, value) {
    someFunction(value);
}

sayHello(say, "Hello");

// 改成匿名函数

function sayHello(someFunction, value) {
    someFunction(value);
}
sayHello(function (word) {
    console.log(word)
}, "Hello");
```

#### 一个简单的`http`服务

``` javascript
// 第一种写法
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

// 第二种写法
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);
```

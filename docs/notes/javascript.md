---
title: JavaScript系列文章
sidebar: auto
---

## 1.js中的严格模式(use strict)

`user strict` 严格模式，摘自[JavaScript权威指南（第六版）]。

`use strict` 是ECMAScript5引入的一条指令。它不包含任何语言的关键字，可以使用双引号和单引号，对于没有实现ECMAScript的浏览器来说它什么也不做。它只能出现在脚本代码的开始或者函数体的开始、任何实体语句之前。但它不必一定出现在脚本的首行或函数体内的首行， 因为 `"use strict"` 指令之后或之前都可能有其他字符串直接量表达式语句， 并且JavaScript的具体实现可能将它们解析为解释器自有的指令。

使用 `use strict` 指令之后，将被解析为**严格模式**，所有的代码都在严格模式下执行。ECMAScript5中的严格模式是该语言的一个子集，它修正了语言的重要缺陷，并提供健壮的查错功能和增强的安全机制。严格模式和非严格模式之间的区别如下（前三条尤为重要）：

* 在严格模式中禁止使用with语句。
* 在严格模式中， 所有的变量都要先声明， 如果给一个未声明的变量、函数、函数参数、catc h从句参数或全局对象的属性赋值， 将会抛出一个引用错误异常（在非严格模式中， 这种隐式声明的全局变量的方站是给全局对象新添加一个新属性）。
* 在严格模式中， 调用的函数（不是方怯）中的一个this｛直是undefined。（在非严格模式中， 调用的函数中的this值总是全局对象）。可以利用这种特性来判断JavaScript实现是否支持严格模式：

``` javascript
var hasStrictMode = (function()｛” use strict”；
return this === undefined
}(
});
```

* 在严格模式中， 当通过 `call（）` 或 `apply（）` 来调用函数时， 其中的 `this` 值就是通过 `call（）` 或 `apply（）` 传入的第一个参数（在非严格模式中， null和undefined值被全局对象和转换为对象的非对象值所代替）。
* 在严格模式中， 给只读属性赋值和给不可扩展的对象创建新成员都将抛出一个类型错误异常（在非严格模式中， 这些操作只是简单地操作失败， 不会报错）。
* 在严格模式中， 传人 `eval（）` 的代码不能在调用程序所在的上下文中声明变量或定义函数， 而在非严格模式中是可以这样做的。相反， 变量和函数的定义是在 `eval（）` 创建的新作用域中， 这个作用域在 `eval（）` 返回时就弃用了。
* 在严格模式中， 函数里的 `arguments对象` 拥有传人函数值的静态副本。在非严格模式中，arguments对象具有“魔术般” 的行为，arguments里的数组元素和函数参数都是指向同一个值的引用。
* 在严格模式中， 当 `delete` 运算符后跟随非怯的标识符（比如变量、函数、函数参数）时，将会抛出一个语捷错误异常（在非严格模式中， 这种delete表达式什么也没做，井返回false）。
* 在严格模式中， 试图删除一个不可配置的属性将抛出一个类型错误异常（在非严格模式中， delete表达式操作失败， 并返回false）。
* 在严格模式中， 在一个对象直接量中定义两个或多个同名属性将产生一个语站错误（在非严格模式中不会报错）。
* 在严格模式中，函数声明中存在两个或多个同名的参数将产生一个语法错误（在非严格模式中不会报错）。
* 在严格模式中是不允许使用八进制整数直接量（以0为前缀，而不是Ox为前缀）的（在非严格模式中某些实现是允许八进制整数直接量的）。
* 在严格模式中，标识符 `eval` 和 `arguments` 当做关键字，它们的值是不能更改的。不能给这些标识符赋值，也不能把它们声明为变量、用做函数名、用做函数参数或用做 `catch` 块的标识符。
* 在严格模式中限制了对调用桔的检测能力，在严格模式的函数中， `arguments.caller` 和 `arguments.callee` 都会抛出一个类型错误异常。严格模式的函数同样具有 `caller` 和 `arguments` 属性， 当访问这两个属性时将抛出类型错误异常（有一些JavaScript的实现在非严格模式里定义了这些非标准的属性）。

## 2. JavaScript数组去重

数组去重主要有三个解决思路，第一个是双循环比对，把结果相等的两项删除，第二个则是借助语言本身的一些方法来实现，最后一个则是借助一些特性，比如ES6新出的 `set` 数据结构。

### 2.1双循环

``` js
// 最容易想到
function unique(ary) {
    for (let i = 0; i < ary.length; i++) {
        for (let k = i + 1; k < ary.length; k++) {
            if (ary[i] === ary[k]) {
                ary.splice(k, 1);
                k--;
            }
        }
    }
    return ary;
}
// 递归
function unique(ary) {
    function loop(index) {
        if (index >= 1) {
            if (ary[index] === ary[index - 1]) {
                ary.splice(index, 1);
            }
            loop(index - 1);
        }
    }
    loop(ary.length - 1);
    return ary;
}
```

### 2.2借助语言本身的方法

``` js
// indexOf
function unique(ary) {
    let array = [];
    for (let index = 0; index < ary.length; index++) {
        if (array.indexOf(ary[index]) === -1) {
            array.push(ary[index]);
        }
    }

    return array;
}
// 利用reduce+includes
function unique(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
}
```

### 2.3数据结构

``` js
[...new Set(arr)]
```

## 3. JavaScript中算法一览

### 3.1排序算法说明:

1. 对于评述算法优劣术语的说明

* 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；
* 不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；

* 内排序：所有排序操作都在内存中完成；
* 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

* 时间复杂度: 一个算法执行所耗费的时间。
* 空间复杂度: 运行完一个程序所需内存的大小。

2. 排序算法图片总结:

![排序算法图片总结](/images/sort.png)

### 3.2冒泡排序:

解析：1. 比较相邻的两个元素，如果前一个比后一个大，则交换位置。

　　　2. 第一轮的时候最后一个元素应该是最大的一个。

　　　3. 按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。

``` js
function sort(ary) {
    for (let i = 0; i < ary.length - 1; i++) {
        for (let k = 0; k < ary.length - i - 1; k++) {
            if (ary[k] > ary[k + 1]) {
                [ary[k], ary[k + 1]] = [ary[k + 1], ary[k]];
            }
        }
    }
    return ary;
}
```

### 3.3快速排序:

解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。

``` js
function quickSort(ary) {
    if (ary.length <= 1) return ary;
    let middleIndex = Math.floor(ary.length / 2),
        middleItem = ary.splice(middleIndex, 1)[0],
        leftAry = [],
        rightAry = [];

    for (let i = 0; i < ary.length; i++) {
        if (ary[i] < middleItem) {
            leftAry.push(ary[i]);
        } else {
            rightAry.push(ary[i]);
        }
    };
    return quickSort(leftAry).concat([middleItem], quickSort(rightAry));
}
```

### 3.4插入排序:

解析：

 （1） 从第一个元素开始，该元素可以认为已经被排序

 （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描

 （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置

 （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置

 （5）将新元素插入到下一位置中

 （6） 重复步骤2

``` js
function insertSort(ary) {
    for (let i = 1; i < ary.length; i++) {
        if (ary[i] < ary[i - 1]) {
            let guard = ary[i];
            let j = i - 1;
            ary[i] = ary[j];
            while (j >= 0 && guard < ary[j]) {
                ary[j + 1] = ary[j];
                j--
            }
            ary[j + 1] = guard;
        }
    };
    return ary;
}
```

### 3.5二分查找:

解析：二分查找，也为折半查找。首先要找到一个中间值，通过与中间值比较，大的放右，小的放在左边。再在两边中寻找中间值，持续以上操作，直到找到所在位置为止。

``` js
function binarySearch(data, dest, startIndex, endIndex) {
    let end = endIndex || data.length - 1,
        start = startIndex || 0,
        m = Math.floor((start + end) / 2);

    if (data[m] === dest) {
        return m;
    }
    if (dest < data[m]) {
        return binarySearch(data, dest, 0, m - 1);
    } else {
        return binarySearch(data, dest, m + 1, end);
    }
    return false;
}
```

　　

### 3.6选择排序:

　　解析: 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

　　　　以此类推，直到所有元素均排序完毕。

``` js
function selectionSort(ary) {
    let len = ary.length,
        minIndex;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let k = i + 1; k < len; k++) {
            if (ary[k] < ary[minIndex]) {
                minIndex = k;
            }
        }
        [ary[i], ary[minIndex]] = [ary[minIndex], ary[i]];
    }
    return ary;
}
```

## 4. 跨域的几种方式

### 4.1什么是跨域

广义上的跨域是指一个域下的页面或者脚本去请求另一个域下的资源，但在我们实际的工作中涉及到的跨域都是受到了浏览器同源策略限制的一些请求。那么什么是浏览器的同源策略呢？

#### 4.1.1同源策略

《协议+域名+端口号》三者都相同的是为同源，只要其中有不同的，就会受到同源策略的限制，以下是一些例子。

``` js
// 1. 端口不同
http: //baidu.com:8080
    http: //baidu.com:8081

    // 2. 协议不同
    http: //baidu.com:8080
    https: //baidu.com:8080

    // 3. 域名不同
    http: //doc.baidu.com:8080
    http: //www.baidu.com:8080
```

#### 4.1.2常涉及到的跨域

* cookie, localstorage...
* DOM元素也有同源策略
* ajax也不支持跨域

## 5. 实现跨域

* jsonp实现
* cors后端配置实现
* postMessage + iframe实现
* document.domain + iframe实现
* window.name + iframe实现
* local.hash + iframe实现
* node中间件设置跨域
* nginx
* websocket

### 5.1jsonp

利用 `<script>` 标签不受同源策略的影响实现跨域。

``` js
function jsonp({
    url,
    params,
    callback
}) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        window[callback] = function(data) {
            resove(data);
            document.body.removeElement('script');
        }

        params = {
            ...params,
            callback
        };
        let arrs = [];
        for (let key in params) {
            arrs.push( `${key}=${params[key]}` );
        }

        script.src = `${url}?${arrs.join('&')}` ;
        document.body.appendChild(script);
    });
}
```

* 只能发送 `get` 请求
* 有安全方面的问题 (xss攻击)

### 5.2cors（跨域资源共享）

目前常用的跨域手段，在后台中配置 `Access-Control-Allow-Origin` , 前端无需做任何配置。支持 `get` , `post` , `put` ... 设置 `*` 号表示容许所有。缺点是不能携带 `cookie` ，个人认为配置比较繁琐，但是安全性高。

### 5.3postMessage + iframe

`postMessage` 是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的iframe消息传递

用法： `postMessage(data,origin)` 方法接受两个参数

1. `data` ： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。
2. `origin` ： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

1.）a.html：(http://www.demo1.com/a.html)

``` js
< iframe id = "iframe"
src = "http://www.demo2.com/b.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');
iframe.onload = function() {
    var data = {
        name: 'aym'
    };
    // 向domain2传送跨域数据
    iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.demo2.com');
};

// 接受domain2返回数据
window.addEventListener('message', function(e) {
    alert('data from demo2 ---> ' + e.data);
}, false); <
/script>
```

2.）b.html：(http://www.demo2.com/b.html)

``` js
< script >
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from demo1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.demo1.com');
        }
    }, false); <
/script>
```

### 5.4window.name + iframe

window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

1.）a.html：(http://www.demo1.com/a.html)

``` js
var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement('iframe');

    // 加载跨域页面
    iframe.src = url;

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = function() {
        if (state === 1) {
            // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();

        } else if (state === 0) {
            // 第1次onload(跨域页)成功后，切换到同域代理页面
            iframe.contentWindow.location = 'http://www.demo1.com/proxy.html';
            state = 1;
        }
    };

    document.body.appendChild(iframe);

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};

// 请求跨域b页面数据
proxy('http://www.demo2.com/b.html', function(data) {
    alert(data);
});
```

2.）proxy.html：(http://www.demo1.com/proxy....), 中间代理页，与a.html同域，内容为空即可。

3.）b.html：(http://www.demo2.com/b.html)

``` js
< script >
    window.name = 'This is demo2 data!'; <
/script>
```

总结：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

### 5.5local.hash + iframe

实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

具体实现：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。

实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

具体实现：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。

1.）a.html：(http://www.demo1.com/a.html)

``` js
< iframe id = "iframe"
src = "http://www.demo2.com/b.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');

// 向b.html传hash值
setTimeout(function() {
    iframe.src = iframe.src + '#user=admin';
}, 1000);

// 开放给同域c.html的回调方法
function onCallback(res) {
    alert('data from c.html ---> ' + res);
} <
/script>
```

2.）b.html：(http://www.demo2.com/b.html)

``` js
< iframe id = "iframe"
src = "http://www.demo1.com/c.html"
style = "display:none;" > < /iframe> <
script >
    var iframe = document.getElementById('iframe');

// 监听a.html传来的hash值，再传给c.html
window.onhashchange = function() {
    iframe.src = iframe.src + location.hash;
}; <
/script>
```

3.）c.html：(http://www.demo1.com/c.html)

``` js
< script >
    // 监听b.html传来的hash值
    window.onhashchange = function() {
        // 再通过操作同域a.html的js回调，将结果传回
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    }; <
/script>
```

### 5.6document.domain iframe

> 此方案主要解决主域相同子域不同的跨域场景。实现的原理是两个页面都通过js强制设置 `document.domain` 为基础主域，就实现了同域。

父窗口(http://www.demo.com/a.html)

``` js
< iframe id = "iframe"
src = "http://child.demo.com/b.html" > < /iframe> <
script >
    document.domain = 'demo.com';
var user = 'admin'; <
/script>
```

子窗口：(http://child.demo.com/b.html)

``` js
< script >
    document.domain = 'demo.com';
// 获取父窗口中变量
alert('get js data from parent ---> ' + window.parent.user); <
/script>
```

### 5.7node中间件设置跨域

node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

1. 非vue框架的跨域（2次跨域）

利用node + express + http-proxy-middleware搭建一个proxy服务器。

1.）前端代码示例：

``` js
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.demo1.com:3000/login?user=admin', true);
xhr.send();
```

2.）中间件服务器：

``` js
var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.demo2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.demo1.com' // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
```

3.）Nodejs后台

``` js
ar http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.demo2.com;HttpOnly' // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

2. vue框架的跨域（1次跨域）

利用node + webpack + webpack-dev-server代理接口跨域。在开发环境下，由于vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域，无须设置headers跨域信息了。

`webpack.config.js` 部分配置：

``` js
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.demo2.com:8080', // 代理跨域目标接口
            changeOrigin: true,
            secure: false, // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.demo1.com' // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
```

### 5.8nginx

1. nginx配置解决iconfont跨域

浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。

``` nginx
location / {
  add_header Access-Control-Allow-Origin *;
}
```

2. nginx反向代理接口跨域

跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。

实现思路：通过nginx配置一个代理服务器（域名与demo1相同，端口不同）做跳板机，反向代理访问demo2接口，并且可以顺便修改cookie中demo信息，方便当前域cookie写入，实现跨域登录

nginx具体配置：

``` js
#
proxy服务器
server {
    listen 81;
    server_name www.demo1.com;

    location / {
        proxy_pass http: //www.demo2.com:8080;  #反向代理
            proxy_cookie_demo www.demo2.com www.demo1.com;#修改cookie里域名
        index index.html index.htm;

        #当用webpack - dev - server等中间件代理接口访问nignx时， 此时无浏览器参与， 故没有同源限制， 下面的跨域配置可不启用
        add_header Access - Control - Allow - Origin http: //www.demo1.com;  #当前端只跨域不带cookie时，可为*
            add_header Access - Control - Allow - Credentials true;
    }
}
```

1.) 前端代码示例：

``` js
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问nginx中的代理服务器
xhr.open('get', 'http://www.demo1.com:81/?user=admin', true);
xhr.send();
```

2.) Nodejs后台示例：

``` js
var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.demo2.com;HttpOnly' // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

### 5.9websocket

> WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。原生WebSocket API使用起来不太方便，我们可以使用Socket.io，

1.）前端代码：

``` js
< div > user input： < input type = "text" > < /div> <
script src = "./socket.io.js" > < /script> <
script >
    var socket = io('http://www.demo2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', function() {
        console.log('Server socket has closed.');
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
}; <
/script>
```

2.）Nodejs socket后台：

``` js
// 启http服务
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');

// 监听socket连接
socket.listen(server).on('connection', function(client) {
    // 接收信息
    client.on('message', function(msg) {
        client.send('hello：' + msg);
        console.log('data from client: ---> ' + msg);
    });

    // 断开处理
    client.on('disconnect', function() {
        console.log('Client socket has closed.');
    });
});
```

> [原文: 前端解决跨域的九种方法](https://www.cnblogs.com/sdcs/p/8484905.html); 

## 6. 前端模块化-CommonJS，AMD和ES6模块规范

`CommonJs` , `AMD` , `ES6` 模块规范。

### 6.1模块化

前端最近几年发展迅速， `javascript` 由早期的 `简单平面` ，发展到现在的 `多维度` ，原来的代码组织规范越来越难以驾驭大规模的项目，模块化开发被提上了台面。

模块化我理解的是任何一个功能，一个函数，一个 `.js` 文件，一个对象... 都可以成为一个模块，模块化的思想是让所有的代码都有自己合适的位置，模块化的作用是拆分复杂为简单，让后期维护工作更为得心应手。

日常团队合作中，我们难以处理的是**命名冲突**和**项目依赖关系**，而模块化开发就是封装所有，根据规范抛出接口与外界联系，彼此之间相互不影响，只暴露我们希望暴露的方法和数据。

### 6.2CommonJS规范

`CommonJS` 对模块进行了规范，它主要分为模块定义，模块引用和模块标识。根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

`NodeJS` 的模块系统就遵循了 `CommonJS` 规范，但Node在实现中并非完全按照CommonJS规范实现，而是对模块规范进行了一定的取舍。下面，我们结合Node来深入了解CommonJS规范。

#### 6.2.2模块定义

``` javascript
function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    this.filename = null;
    this.loaded = false;
    this.children = [];
};

module.exports = Module;
var module = new Module(filename, parent);
```

`module` 代表当前模块，它以上的属性分别代表

* `module.id` : 模块的识别符，通常是带有绝对路径的模块文件名。
* `module.filename` : 模块的文件名，带有绝对路径。
* `module.loaded` : 返回一个布尔值，表示模块是否已经完成加载。
* `module.parent` : 返回一个对象，表示调用该模块的模块。
* `module.children` : 返回一个数组，表示该模块要用到的其他模块。
* `module.exports` : 初始值为一个空对象{}，表示模块对外输出的接口。

#### 6.2.3模块引用

`require` 方法用于加载模块，它有一个参数，即**带有参数路径的模块的文件名或者为模块名**。

``` javascript
const user = require('./user'); //相对路径的模块名
const nav = require('/home/nav'); // 绝对路径的模块名
const http = require('http'); //模块名
```

#### 6.2.4模块标识

模块标识就是 `require` 函数的参数名称，一般要符合驼峰命名法，默认是寻找以 `.js` 结尾的文件

`CommonJS` 是同步的，意味着你想调用模块里的方法，必须先用 `require` 加载模块。这对服务器端的 `Nodejs` 来说不是问题，因为模块的JS文件都在本地硬盘上，CPU的读取时间非常快，同步不是问题。但如果是浏览器环境，要从服务器加载模块。模块的加载将取决于网速，如果采用同步，网络情绪不稳定时，页面可能卡住, 这就必须采用异步模式。所以，就有了 `AMD` 解决方案。

### 6.3AMD规范

`AMD` 规范是由 `CommonJS` 规范演变而来，大多数情况下和 `CommonJs` 规范一致，最大的区别是 `AMD` 加载模块是异步加载，所以，一般服务端用 `CommonJS` ，而浏览器端则遵循 `AMD` 。

#### 6.3.1定义模块

``` javascript
define(id ? , dependencies ? , factory);

// amd属性可以判断当前文件加载是否遵循AMD规范，例如jquery的写法：
if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
        return jQuery;
    });
}
```

* 第一个参数，id（名字），是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
* 第二个参数，dependencies（依赖），是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。
* 第三个参数，factory（工厂方法），为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

#### 6.3.2引入模块

* 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：

``` javascript
require([module], callback);

// 加载模块实例
require(['a'], function(a) {
    a.FuncA();
});
```

### 6.4ES6模块规范

`ES6` 引入了新的模块规范，新的规范定义用 `export` 提供对外的接口，用 `import` 引入模块。 `ES6` 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。 `CommonJS` 和 `AMD` 模块，都只能在运行时确定这些东西。

``` javascript
// ES6导出模块实例 1
export var firstName = 'Michael';
// ES6导出模块实例 2
var firstName = 'Michael';
export {
    firstName,
    lastName,
    year
};
// ES6导出模块实例 3
function v1() {
    ...
}
export {
    v1 as streamV1,
};

// ES6导入模块实例 1
import {
    firstName,
    lastName,
    year
} from './profile.js';
// ES6导入模块实例 2
import {
    a
} from './xxx.js'
// ES6导入模块实例 3
import {
    lastName as surname
} from './profile.js';
```

## 7.axios中文文档

> 基于 `Promise` 的 `HTTP` 客户端，用于浏览器和node.js。

### 7.1特征

* 从浏览器生成 `XMLHttpRequests` 。
* 基于 `node.js` 发出 `http` 请求。
* 支持 `Promise` API。
* 拦截请求和响应。
* 转换请求和响应数据。
* 取消请求。
* 自动转换为 `JSON` 数据。
* 客户端支持对 `XSRF` \[跨站请求伪造\]的保护。

### 7.2浏览器支持

> 支持大部分主流浏览器。

![axios浏览器支持情况](/images/axios_brower.png  "axios浏览器支持")

### 7.3安装

* `npm` 

``` bash
$npm install axios
```

* `bower` 

``` bash
$bower install axios
```

* [ `CDN` ](https://yangjie90.com/homeless/2018/10/15/index.html)

``` javascript
< script src = "https://unpkg.com/axios/dist/axios.min.js" > < /script>
```

### 7.4例子

* `GET` 请求

``` javascript
const axios = require('axios);

        // Make a request for a user with a given ID
        axios.get('/user?ID=12345')
        .then(function(response) {
            // handle success
            console.log(response);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });

        // Optionally the request above could also be done as
        axios.get('/user', {
            params: {
                ID: 12345
            }
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });

        // Want to use async/await? Add the `async` keyword to your outer function/method.
        async function getUser() {
            try {
                const response = await axios.get('/user?ID=12345');
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
```

> 注意:async/await是ECMAScript 2017的一部分，在Internet Explorer和旧的浏览器中不受支持，所以要谨慎使用。

* `POST` 请求

``` javascript
axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
```

* 执行多个请求

``` javascript
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function(acct, perms) {
        // Both requests are now complete
    }));
```

### 7.5 `axios` API

> 可以通过相关配置传递给 `axios` 发起请求。

* `axios` (config)

``` javascript
// Send a Post request
axios({
    method: 'get',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flinststone'
    }
});
```

---

``` javascript
// GET request for remote image
axios({
        method: 'get',
        url: 'http://bit.ly/2mTM3nY',
        responseType: 'stream'
    })
    .then(function(response) {
        response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });
```

* axios(url[, config])

``` javascript
// Send a GET request (default method)
axios('/user/12345');
```

### 7.6请求方法的别名

> 为了使用方便，为所有支持的请求方法提供了别名。

* `axios.request(config)` 
* `axios.get(url[, config])` 
* `axios.delete(url[, config])` 
* `axios.head(url[, config])` 
* `axios.options(url[, config])` 
* `axios.post(url[, data[, config]])` 
* `axios.put(url[, data[, config]])` 
* `axios.patch(url[, data[, config]])` 

#### node

> 在使用别名方法时，不需要在config中指定url、方法和数据属性。

#### 处理多个请求

> 处理并发请求的帮助函数

* `axios.all(iterable)` 
* `axios.spread(callback)` 

### 7.7创建一个实例

> 您可以使用自定义配置创建axios的新实例。

* axios.create([config])

``` javascript
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});
```

### 7.8实例方法

> 下面列出了可用的实例方法。指定的配置将与实例配置合并。

* axios#request(config)
* axios#get(url[, config])
* axios#delete(url[, config])
* axios#head(url[, config])
* axios#options(url[, config])
* axios#post(url[, data[, config]])
* axios#put(url[, data[, config]])
* axios#patch(url[, data[, config]])
* axios#getUri([config])

### 7.9请求配置

> 下面是用于发出请求的可用配置选项。只需要url。如果没有指定方法，请求将默认为GET。

``` javascript
{
    // 接口: 用于请求服务器的url
    url: '/user',

    // 请求时使用的方法，默认是get
    method: 'get', // default

    // `baseURL` ： 如果url为绝对路劲，则添加在url之前，与url共同拼接为请求地址。
    // 为axios设置baseURL来传递相对url是很方便的
    // 指向该实例的方法
    baseURL: 'https://some-domain.com/api/',

    // `transformRequest` : 容许在请求服务器之前改变请求数据
    // 只适用于'PUT', 'POST', and 'PATCH'方法
    // 数组中最后一个函数必须返回一个字符串或者 Buffer(ArrayBuffer),
    // 格式化数据或流
    // 可以修改headers对象
    transformRequest: [function(data, headers) {
        //  做任何你想要转换数据的事情

        return data;
    }],

    // `transformResponse` ： 容许对响应数据进行更改
    // 通过then/catch
    transformResponse: [function(data) {
        // 做任何你想要转换数据的事情

        return data;
    }],

    // `headers` ： 发送自定义headers
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },

    // `params` ： 跟随url发往服务器的请求参数
    // 必须是对象或者URLSearchParams对象
    params: {
        ID: 12345
    },

    // `paramsSerializer` is an optional function in charge of serializing `params` 
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
        return Qs.stringify(params, {
            arrayFormat: 'brackets'
        })
    },

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data: {
        firstName: 'Fred'
    },

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout` , the request will be aborted.
    timeout: 1000, // default is `0` (no timeout)

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default

    // `adapter` allows custom handling of requests which makes testing easier.
    // Return a promise and supply a valid response (see lib/adapters/README.md).
    adapter: function(config) {
        /* ... */
    },

    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers` .
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `responseEncoding` indicates encoding to use for decoding responses
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // `onUploadProgress` allows handling of progress events for uploads
    onUploadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `onDownloadProgress` allows handling of progress events for downloads
    onDownloadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `maxContentLength` defines the max size of the http response content in bytes allowed
    maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null` 
    // or `undefined` ), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function(status) {
        return status >= 200 && status < 300; // default
    },

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default

    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null, // default

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
    // and https requests, respectively, in node.js. This allows options to be added like
    // `keepAlive` that are not enabled by default.
    httpAgent: new http.Agent({
        keepAlive: true
    }),
    httpsAgent: new https.Agent({
        keepAlive: true
    }),

    // 'proxy' defines the hostname and port of the proxy server.
    // You can also define your proxy using the conventional `http_proxy` and
    // `https_proxy` environment variables. If you are using environment variables
    // for your proxy configuration, you can also define a `no_proxy` environment
    // variable as a comma-separated list of domains that should not be proxied.
    // Use `false` to disable proxies, ignoring environment variables.
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
    // supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing
    // `Proxy-Authorization` custom headers you have set using `headers` .
    proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    cancelToken: new CancelToken(function(cancel) {})
}
```

### 7.10响应详解

> 请求的响应包含以下信息

``` javascript
{
    // `data` is the response that was provided by the server
    data: {},

    // `status` is the HTTP status code from the server response
    status: 200,

    // `statusText` is the HTTP status message from the server response
    statusText: 'OK',

    // `headers` the headers that the server responded with
    // All header names are lower cased
    headers: {},

    // `config` is the config that was provided to `axios` for the request
    config: {},

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
}
```

当使用 `then` 时，将收到以下响应:

``` javascript
axios.get('/user/12345')
    .then(function(response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });
```

当使用 `catch` 或者成功的回调函数作为 `then` 的第二个参数的时候，响应将通过 `error` 对象可用，如处理错误一节中所述。

### 7.11默认配置

> 你可以为每个请求配置默认值

### 7.12全局默认值

``` javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 7.13实例默认值

``` javascript
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 7.14配置优先级

> 配置将按照优先级顺序进行合并。默认查找顺序是lib/defaults.js文件夹。然后是实例的默认属性，最后是请求的配置参数。后者将优先于前者。下面是一个例子。

``` javascript
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
    timeout: 5000
});
```

### 7.15拦截器

> 你可以在 `.then` 或 `.catch` 之前拦截请求或者响应.

``` javascript
// 添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});
```

如果之后想移除拦截器你可以这么做:

``` javascript
const myInterceptor = axios.interceptors.request.use(function() {
    /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

你也可以在 `axios` 实例中添加一个拦截器:

``` javascript
const instance = axios.create();
instance.interceptors.request.use(function() {
    /*...*/
});
```

### 7.16错误处理

``` javascript
axios.get('/user/12345')
    .catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
```

> 您可以使用validateStatus配置选项定义自定义HTTP状态代码错误范围。

``` javascript
axios.get('/user/12345', {
    validateStatus: function(status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
    }
})
```

### 7.17取消请求

> 可以你通过 `cancel token` 来取消一个请求, `axios` 取消令牌API基于撤销的可取消承诺提议。您可以使用 `CancelToken.source` 工厂创建取消令牌，如下所示：

``` javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
    cancelToken: source.token
}).catch(function(thrown) {
    if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
    } else {
        // handle error
    }
});

axios.post('/user/12345', {
    name: 'new name'
}, {
    cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

您还可以通过将一个 `executor` 函数传递给 `CancelToken` 构造函数来创建一个取消令牌:

``` javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
    })
});

// cancel the request
cancel();
```

**注意:**您可以使用相同的取消令牌取消多个请求。

### 7.18使用application / x-www-form-urlencoded格式

默认情况下，axios将JavaScript对象序列化为JSON。要以应用程序/x-www-form-urlencode格式发送数据，可以使用以下选项之一。

#### Brower

在浏览器中，您可以使用URLSearchParams API，如下所示:

``` javascript
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 请注意，并非所有浏览器都支持URLSearchParams(请参阅caniuse.com)，但是有一个polyfill可用(请确保对全局环境进行polyfill)。

或者，您可以使用qs库对数据进行编码:

``` javascript
const qs = require('qs');
axios.post('/foo', qs.stringify({
    'bar': 123
}));
```

或者用另一种方式(ES6):

``` javascript
import qs from 'qs';
const data = {
    'bar': 123
};
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    url,
};
axios(options);
```

#### node.js

在node.js中，您可以querystring按如下方式使用该模块：

``` javascript
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({
    foo: 'bar'
}));
```

您也可以使用该qs库。

**注:**如果您需要对嵌套的对象进行stringify，那么最好使用qs库，因为querystring方法已经知道该用例的问题[https://github.com/nodejs/node-v0.x-archive/issues/1665](https://github.com/nodejs/node-v0.x-archive/issues/1665)。

### 7.19版本说明

在axios到达1.0发布版之前，将使用新的次要版本发布重大更改。例如0.5.1，并且0.5.4将具有相同的API，但0.6.0将具有重大更改。

### 7.20Promise

`Axios` 依赖于ES6的 `Promise` 环境支持实现，所以，如果您的环境不支持ES6的 `Promise` ，您可以使用 `polyfill` 。

### 7.21TypeScript

`Axios` 在 `TypeScript` 定义使用。

``` javascript
import axios from 'axios';
axios.get('/user?ID=12345');
```

> **注:**axios深受Angular中提供的$http服务的启发。从根本上说，axios是在努力为Angular之外的用户提供一个独立的类似于$http的服务。

### 7.22License

MIT

## 8. Cookie, LocalStorage 与 SessionStorage

### 8.1Cookie

cookie是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据，或者某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据（通常经过加密）

#### 特点

* 不同的浏览器存放的cookie位置不一样，也是不能通用的。
* cookie的存储是以域名形式进行区分的，不同的域下存储的cookie是独立的。
* 我们可以设置cookie生效的域（当前设置cookie所在域的子域），也就是说，我们能够操作的cookie是当前域以及当前域下的所有子域
* 一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样, 一般为20个。
* 每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为4KB。
* cookie也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁

### 8.2LocalStorage

`LocalStorage` 是H5新推出的一种本地存储方案，在IE8及以上浏览器中都可以很好的使用。

#### 特点

* 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
* 存储的信息在同一域中是共享的。
* 当本页操作（新增、修改、删除）了localStorage的时候，本页面不会触发storage事件, 但是别的页面会触发storage事件。
* 大小：据说是5M（跟浏览器厂商有关系）
* 在非IE下的浏览中可以本地打开。IE浏览器要在服务器中打开。
* `LocalStorage` 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。
* `LocalStorage` 受同源策略的影响。

#### 设置/获取/删除

``` js
// 设置
localStorage.setItem('username', 'cfangxu');

// 获取
localStorage.getItem('username');
localStorage.key(0);

// 删除
localStorage.removeItem('username');
// 删除所有
localStorage.clear();
```

#### storage事件

当storage发生改变的时候触发。 当前页面对storage的操作会触发其他页面的storage事件 事件的回调函数中有一个参数event, 是一个StorageEvent对象，提供了一些实用的属性, 如下表：

|Property|Type|Desciption|
|:---|:---|
|key|String|The named key that was added, removed, or moddified|
|oldValue	|any|The previous value(now overwritten), or null if a new item was added|
|newValue|any|The new value, or null if an item was added|
|url/uri|string|The page that called the method that triggered this change|

### 8.3sessionStorage

参考 `localStorage` .

#### 特点

用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁，或者在新窗口打开同源的另一个页面，sessionStorage也是没有的。

### 8.4cookie、localStorage、sessionStorage区别

* 相同：在本地（浏览器端）存储数据
* 不同：
1. localStorage、sessionStorage

2. localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。

3. sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

4. localStorage是永久存储，除非手动删除。

5. sessionStorage当会话结束（当前页面关闭的时候，自动销毁）

6. cookie的数据会在每一次发送http请求的时候，同时发送给服务器而localStorage、sessionStorage不会。

> [原文地址：https://www.cnblogs.com/qianduantuanzhang/p/8193892.html](https://www.cnblogs.com/qianduantuanzhang/p/8193892.html)

## 9. Fetch随手记

`Fetch` 基于 `Promise` ，与 `XMLHttpRequest` 完全不同，它是ES2018新增的API，用于实现客户端和服务端信息通信，可以借用 `fetch-polyfill` 解析成ajax实现兼容大部分浏览器。

### 9.1Fetch和Ajax的不同

* `fetch` 仅在网络故障时或请求被阻止时，才会标记为 `reject` ，其余都是 `resolve` , 即使状态码为404或者500.
* 默认情况下， `fetch` 不会从服务端发送或接收任何 `cookies` , 如果站点依赖于用户 `session` ，则会导致未经认证的请求（要发送 `cookies` ，必须设置 `credentials` 选项）。

### 9.2fetch语法

``` javascript
Promise < Response > fetch(url[, init]);
```

> `init` 可选参数配置项：

* method: 请求方式
* headers: 请求头信息
* body: 请求的body信息，可能是一个 `Blob` 、 `BufferSource` 、 `FormData` 、 `URLSearchParams` 或者 `USVString` 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
* mode: 请求的模式，如 `cors` 、 `no-cors` 或者 `same-origin` 。
* credentials: 请求的 credentials，如 `omit` 、 `same-origin` 或者 **`include`**。
* cache: 请求的cache模式: `default` 、 `no-store` 、 `reload` 、 `no-cach` e 、 `force-cache` 或者 `only-if-cached` 。
* redirect: 可用的 redirect 模式: `follow` (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 `manual` (手动处理重定向).
* referrer: 默认是 `client` 。
* referrerPolicy: 指定引用 `HTTP` 头的信息。
* integrity: 包括请求的 `subresource integrity` 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。

### 9.3基本的fetch请求

* get系列请求

``` javascript
fetch('http://example.com/get/movies.json')
    .then(res => {
        // 根据状态码做响应的处理
        switch (res.status) {
            case '404':
                throw Error('404错误');
                break;
            case '500':
                throw Error('500错误');
            default:
                // 根据需要返回响应的数据格式
                return res.json();
        }
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
```

* post系列请求

``` javascript
fetch('http://example.com/post/movies.json', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(postData)
    })
    .then(res => {
        // ...
    })
    .catch(err => {
        // ...
    })
```

### 9.4返回值

> 返回值是一个 `Promise` ，resolve 时回传 Response 对象。

![fetch请求的返回值](/images/fetch.png "fetch返回值示例图")

### 9.5参考文档

* [https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
* [MDN使用fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)

## 10. JSON数据格式

> JSON是一个轻量级的数据格式，可以简化表示复杂数据结构的工作量。JSON使用 `JavaScript` 语法的子集表示对象，数组，字符串，数值，布尔值和null。  

### 10.1语法

* 基本值： 与 `JavaScript` 中语法相同，但是不支持特殊值 `undefiend` 。
* 对象： 复杂数据类型，表示一组无序的键值对儿。
* 数组： 复杂数据类型，表示一组有序的值的列表，可以通过索引来访问其中的值，可以是基本值，对象或者数组。

下面都是 `JSON` 数据格式:

``` JSON
// 1.数字
5
// 2.字符串
'hello world'
// 3.对象
{
    "name": "json",
    "age": 9,
    "fn": [
        {
            // ....
        }
    ]
}
// 4.数组
[
    {
        "name": "json",
        "year": 2001
    },
    {
        "name": [
            {
                "hello": "world"
            },
            [
                // ...
            ]
        ],
        "age": 2000
    }
]
```

### 10.2解析和序列化

早起的JSON解析器使用的是 `JavaScript` 的**`evel()`**函数，ECMAScript5对JSON的行为进行了规范化，定义了全局对象 `JSON` ，它包含两个方法 `stringify()` 和 `parse()` , 分别用于把JavaScript对象序列化为JSON字符串和把JSON字符串解析为原生JavaScript对象。

#### stringify()

`JSON.stringify()` 接受三个参数，第一个是要序列化的javascript对象（必选），第二个是一个数组或者对象，可以用来过滤筛选（可选），第三个参数是一个数字或者字符，用来表示字符串的缩进。

`toJSON` 的方法用来返回该json数据格式的任何值，可以作为函数过滤器的补充，因此理解序列化内部顺序十分重要。

1. 如果存在 `toJSON` 方法并且能通过它取到有效的值，则调用该方法，否则返回对象本身。
2. 如果提供了第二个参数，则应用这个函数过滤器。
3. 对第二步返回的值进行相应的序列化。
4. 如果有第三个参数，则执行相应的格式化。

``` js
const json = [{
        "name": "json",
        "age": 9,
        "year": [{
            "year": 2018,
            "id": 1
        }]
    },
    {
        "name": "hehe",
        "age": 1,
        "year": [{
            "year": 2019,
            "id": 2
        }],

        toJSON: function() {
            return this.name;
        }
    },

];

let result1 = JSON.stringify(json, ['name', 'age'], 4);
let result2 = JSON.stringify(json, (key, val) => {
    if (key === 'name') {
        return 100;
    } else {
        return val;
    }
});

console.log(result1);
/*
[
    {
        "name": "json",
        "age": 9
    },
    "hehe"
]
*/
console.log(result2);
//[{"name":100,"age":9,"year":[{"year":2018,"id":1}]},"hehe"]
```

#### 10.3parse()

实现序列化相反的功能，讲一个json字符串还原成一个对象，用法和 `JSON.stringfy()` 类似。


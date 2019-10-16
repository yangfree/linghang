---
title: webpack原理解析
sidebar: auto
prev: webpack-2
next: false
---

## 1.webpack介绍

* `Webpack` 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

![webpack_intro](http://img.zhufengpeixun.cn/webpack_intro.gif)

## 2. 预备知识

### 2.1 toStringTag

* `Symbol.toStringTag` 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 `Object.prototype.toString()` 方法会去读取这个标签并把它包含在自己的返回值里。

``` js
console.log(Object.prototype.toString.call('foo')); // "[object String]"
console.log(Object.prototype.toString.call([1, 2])); // "[object Array]"
console.log(Object.prototype.toString.call(3)); // "[object Number]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
let myExports = {};
Object.defineProperty(myExports, Symbol.toStringTag, {
    value: 'Module'
});
console.log(Object.prototype.toString.call(myExports));
```

### 2.2 Object.create(null)

* 使用 `create` 创建的对象，没有任何属性, 把它当作一个非常纯净的map来使用，我们可以自己定义 `hasOwnProperty` 、 `toString` 方法, 完全不必担心会将原型链上的同名方法覆盖掉
* 在我们使用 `for..in` 循环的时候会遍历对象原型链上的属性，使用 `create(null)` 就不必再对属性进行检查了

``` js
var ns = Object.create(null);
if (typeof Object.create !== "function") {
    Object.create = function(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}
console.log(ns)
console.log(Object.getPrototypeOf(ns));
```

### 2.3 getter

* [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
  + obj 要在其上定义属性的对象。
  + prop 要定义或修改的属性的名称。
  + descriptor 将被定义或修改的属性描述符。

### 2.3.1 描述符可同时具有的键值

| |configurable|enumerable|value|writable|get|set|
|:----|:----|:----|:----|:----|:----|:----|
|数据描述符|Yes|Yes|Yes|Yes|No|No|
|存取描述符|Yes|Yes	No|No|Yes|Yes|

### 2.3.2 示例

``` js
var ageValue;
Object.defineProperty(obj, "age", {
    value: 10, //数据描述符和存取描述符不能混合使用
    get() {
        return ageValue;
    },
    set(newValue) {
        ageValue = newValue;
    }
    writable: true, //是否可修改
    enumerable: true, //是否可枚举
    configurable: true //是否可配置可删除
});
```

## 2. 同步加载

### 2.1 webpack.config.js

``` js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: "none",
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include: path.join(__dirname, "src"),
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
};
```

### 2.2 index.js

src\index.js

``` js
let title = require('./title.js');
console.log(title);
```

### 2.3 title.js

src\title.js

``` js
module.exports = "title";
```

### 2.4 打包文件分析 

``` js
(function(modules) {
    // webpack的启动函数
    //模块的缓存
    var installedModules = {};

    //定义在浏览器中使用的require方法
    function __webpack_require__(moduleId) {
        //检查模块是否在缓存中
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        //创建一个新的模块并且放到模块的缓存中
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        });

        //执行模块函数
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );

        //把模块设置为已经加载
        module.l = true;

        //返回模块的导出对象
        return module.exports;
    }

    //暴露出模块对象
    __webpack_require__.m = modules;

    //暴露出模块缓存
    __webpack_require__.c = installedModules;

    //为harmony导出定义getter函数
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };

    //在导出对象上定义__esModule属性
    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };

    /**
     * 创建一个模拟的命名空间对象
     * mode & 1 value是模块ID直接用__webpack_require__加载
     * mode & 2 把所有的属性合并到命名空间ns上
     * mode & 4 当已经是命名空间的时候(__esModule=true)可以直接返回值
     * mode & 8|1 行为类似于require
     */
    __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
            return value;
        var ns = Object.create(null); //定义一个空对象
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != "string")
            for (var key in value)
                __webpack_require__.d(
                    ns,
                    key,
                    function(key) {
                        return value[key];
                    }.bind(null, key)
                );
        return ns;
    };

    // getDefaultExport函数为了兼容那些非non-harmony模块
    __webpack_require__.n = function(module) {
        var getter =
            module && module.__esModule ?
            function getDefault() {
                return module["default"];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };

    //判断对象身上是否拥有此属性
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    //公共路径
    __webpack_require__.p = "";

    //加载入口模块并且返回导出对象
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
    "./src/index.js": function(module, exports, __webpack_require__) {
        var title = __webpack_require__("./src/title.js");
        console.log(title);
    },
    "./src/title.js": function(module, exports) {
        module.exports = "title";
    }
});
```

### 2.5 实现

``` js
(function(modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId];
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }
        modules[moduleId].call(modules.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
    "./src/index.js": function(module, exports, __webpack_require__) {
        var title = __webpack_require__('./src/title.js');
        console.log(title);
    },
    "./src/title.js": function(module, exports) {
        module.exports = "title";
    }
})
```

## 3.harmony

### 3.1 common.js加载 common.js

#### 3.1.1 index.js

``` js
let title = require('./title');
console.log(title.name);
console.log(title.age);
```

#### 3.1.2 title.js

``` js
exports.name = 'title_name';
exports.age = 'title_age';
```

#### 3.1.3 bundle.js

``` js
{
    "./src/index.js": (function(module, exports, __webpack_require__) {
        var title = __webpack_require__("./src/title.js");
        console.log(title.name);
        console.log(title.age);
    }),
    "./src/title.js": (function(module, exports) {
        exports.name = 'title_name';
        exports.age = 'title_age';
    })
}
```

### 3.2 common.js加载 ES6 modules

#### 3.2.1 index.js

``` js
let title = require('./title');
console.log(title.name);
console.log(title.age);
```

#### 3.2.2 title.js

``` js
exports.name = 'title_name';
exports.age = 'title_age';
```

#### 3.2.3 bundle.js

``` js
{
    "./src/index.js": (function(module, exports, __webpack_require__) {
        var title = __webpack_require__("./src/title.js");
        console.log(title["default"]);
        console.log(title.age);
    }),
    "./src/title.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__); //__esModule=true
        __webpack_require__.d(__webpack_exports__, "age", function() {
            return age;
        });
        __webpack_exports__["default"] = 'title_name';
        var age = 'title_age';
    })
}
```

### 3.3 ES6 modules 加载 ES6 modules

#### 3.3.1 index.js

``` js
import name, {
    age
} from './title';
console.log(name);
console.log(age);
```

#### 3.3.2 title.js

``` js
export default name = 'title_name';
export const age = 'title_age';
```

#### 3.3.3 bundle.js

``` js
{
    "./src/index.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__); //__esModule=true
        var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["default"]);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["age"]);
    }),
    "./src/title.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__); //__esModule=true
        __webpack_require__.d(__webpack_exports__, "age", function() {
            return age;
        });
        __webpack_exports__["default"] = 'title_name';
        var age = 'title_age';
    })
}
```

### 3.4 ES6 modules 加载 common.js

#### 3.4.1 index.js

``` js
import name, {
    age
} from './title';
console.log(name);
console.log(age);
```

#### 3.4.2 title.js

``` js
export default name = 'title_name';
export const age = 'title_age';
```

#### 3.4.3 bundle.js

``` js
{
    "./src/index.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__); //__esModule=true
        /* 兼容common.js导出 */
        var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");
        /* 兼容common.js导出 */
        var _title__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_title__WEBPACK_IMPORTED_MODULE_0__);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0___default.a.name);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0___default.a.age);
    }),
    "./src/title.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_exports__.name = 'title_name';
        __webpack_exports__.age = 'title_age';
    }),
    "./src/title_esm.js": (function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__); //__esModule=true
        __webpack_exports__.name = 'title_name';
        __webpack_exports__.age = 'title_age';
        __webpack_exports__.default = {
            name: 'default_name',
            age: 'default_age'
        };
    })
}
```

## 4. 异步加载

### 4.1 index.html

``` js
< body >
    <
    script src = "entry1.js" > < /script> <
    script >
    setTimeout(function() {
        let script = document.createElement('script');
        script.src = 'entry2.js';
        document.body.appendChild(script);
    }, 3000); <
/script>    <
/body>
```

### 4.2 entry1.js

src\index.js

``` js
let button = document.createElement("button");
button.innerHTML = "点我1";
button.onclick = function() {
    import( /*webpackChunkName: 'title'*/ './title.js').then(function(result) {
        console.log(result.default);
    });
};
document.body.appendChild(button);
```

### 4.3 entry2.js

src\index.js

``` js
let button = document.createElement("button");
button.innerHTML = "点我2";
button.onclick = function() {
    import( /*webpackChunkName: 'title'*/ './title.js').then(function(result) {
        console.log(result.default);
    });
};
document.body.appendChild(button);
```

### 4.4 title.js

src\title.js

``` js
module.exports = 'title';
```

### 4.5 bundle.js

``` js
(function(modules) {
    //通过JSONP加载额外的模块
    function webpackJsonpCallback(data) {
        var chunkIds = data[0]; //代码块的IDS
        var moreModules = data[1]; //额外的模块
        //把moreModules添加到modules对象中，然后把所有的chunkIds设置为已加载并触发callback函数
        var moduleId, chunkId, i = 0,
            resolves = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0]);
            }
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }
        if (parentJsonpFunction) parentJsonpFunction(data);
        while (resolves.length) {
            resolves.shift()();
        }
    };

    //模块缓存
    var installedModules = {};
    // 存储加载中和加载过的chunks对象
    // 存储加载中和加载过的chunks对象
    // chunk undefined(未加载)  null (预加载/预获取) Promise (加载中)  0 加载完成
    var installedChunks = {
        "main": 0 //刚开始只加载main
    };

    //返回要加载的代码块的路径
    function jsonpScriptSrc(chunkId) {
        return __webpack_require__.p + "" + chunkId + ".bundle.js"
    }

    // webpack自已实现的 require方法
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        module.l = true;

        return module.exports;
    }

    //异步模块加载函数，如果没有再缓存模块中 则用jsonscriptsrc 加载
    //此主文件中只包含入口代码块，此函数用来加载额外的代码块
    __webpack_require__.e = function requireEnsure(chunkId) {
        var promises = [];
        //JSONP代码块加载
        var installedChunkData = installedChunks[chunkId];
        if (installedChunkData !== 0) { //0表示已经安装
            //如果是一个Promise表示正在安装或加载,添加到promises数组中
            if (installedChunkData) {
                promises.push(installedChunkData[2]);
            } else { //否则就是未加载
                //在chunk缓存中设置Promise
                var promise = new Promise(function(resolve, reject) {
                    installedChunkData = installedChunks[chunkId] = [resolve, reject];
                });
                promises.push(installedChunkData[2] = promise);

                //开始加载代码块
                var script = document.createElement('script');
                var onScriptComplete;

                script.charset = 'utf-8';
                script.timeout = 120;
                //表明脚本需要安全加载 CSP 策略
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc);
                }
                script.src = jsonpScriptSrc(chunkId);

                // create error before stack unwound to get useful stacktrace later
                var error = new Error();
                onScriptComplete = function(event) {
                    // avoid mem leaks in IE.
                    script.onerror = script.onload = null;
                    clearTimeout(timeout);
                    var chunk = installedChunks[chunkId];
                    if (chunk !== 0) {
                        if (chunk) {
                            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                            var realSrc = event && event.target && event.target.src;
                            error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                            error.name = 'ChunkLoadError';
                            error.type = errorType;
                            error.request = realSrc;
                            chunk[1](error);
                        }
                        installedChunks[chunkId] = undefined;
                    }
                };
                var timeout = setTimeout(function() {
                    onScriptComplete({
                        type: 'timeout',
                        target: script
                    });
                }, 120000);
                script.onerror = script.onload = onScriptComplete;
                document.head.appendChild(script);
            }
        }
        return Promise.all(promises);
    };

    // 所有构建生成的模块
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // 设定getter 辅助函数
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };

    // 给exports设定__esModule属性
    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            });
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };

    // 用于取值，伪造namespace
    // mode & 1: 值是一个模块ID，加载它
    // mode & 2: 把value所有的属性合并到ns上
    // mode & 4: 如果ns对象已经是一个对象了，则返回值
    // mode & 8|1: 类似于require
    __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != 'string')
            for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
        return ns;
    };

    //用于兼容性取值（es module 取default， 非es module 直接返回module)
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default'];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // 辅助函数 Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    //公共路径，为所有资源指定一个基础路径
    __webpack_require__.p = "";

    // 异步加载失败处理函数 辅助函数
    __webpack_require__.oe = function(err) {
        console.error(err);
        throw err;
    };
    //获取全局的webpackJsonp函数,第一次执行此函数就是一个空的数组
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    //在替换其push函数之前会将原有的push方法保存为oldJsonpFunction,同时
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    //把jsonpArray的push等于当前的webpackJsonpCallback
    jsonpArray.push = webpackJsonpCallback;
    //把数组克隆一份
    jsonpArray = jsonpArray.slice();
    //循环这个数组，把数组中的所有的元素传给webpackJsonpCallback
    //如果把以前懒加载过的模块在自己身上安装一下，就不用再异步加载了
    for (var i = 0; i < jsonpArray.length; i++)
        webpackJsonpCallback(jsonpArray[i]);
    //把上一个oldJsonpFunction赋给parentJsonpFunction,第一次的时候就是push方法
    var parentJsonpFunction = oldJsonpFunction;
    //加载入口模块并返回exports导出对象
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
    "./src/index.js": (function(module, exports, __webpack_require__) {

        var button = document.createElement("button");
        button.innerHTML = "点我";

        button.onclick = function() {
            __webpack_require__.e( /*! import() | title */ "title").then(__webpack_require__.t.bind(null, /*! ./title.js */ "./src/title.js", 7)).then(function(result) {
                console.log(result["default"]);
            });
        };
        document.body.appendChild(button);
    })
});
```

### 4.6 title.bundle.js

``` js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["title"], {
        "./src/title.js": (function(module, exports) {
            module.exports = 'title';
        })
    }
]);
```

### 4.7 实现bundle.js

``` js
(function(modules) {
    function webpackJsonpCallback(data) {
        var chunkIds = data[0];
        var moreModules = data[1];
        var moduleId, chunkId, i = 0,
            resolves = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0]);
            }
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) {
            modules[moduleId] = moreModules[moduleId];
        }
        if (parentJsonpFunction) parentJsonpFunction(data);
        while (resolves.length) {
            resolves.shift()();
        }
    }
    var installedModules = {};
    var installedChunks = {
        main: 0
    };
    __webpack_require__.p = "";

    function jsonpScriptSrc(chunkId) {
        return __webpack_require__.p + "" + chunkId + ".bundle.js";
    }

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        });
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.t = function(value, mode) {
        value = __webpack_require__(value);
        var ns = Object.create(null);
        Object.defineProperty(ns, "__esModule", {
            value: true
        });
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        return ns;
    };

    __webpack_require__.e = function requireEnsure(chunkId) {
        var promises = [];
        var installedChunkData = installedChunks[chunkId];
        var promise = new Promise(function(resolve, reject) {
            installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push((installedChunkData[2] = promise));
        var script = document.createElement("script");
        script.src = jsonpScriptSrc(chunkId);
        document.head.appendChild(script);
        return Promise.all(promises);
    }
    var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    jsonpArray.push = webpackJsonpCallback;
    var parentJsonpFunction = oldJsonpFunction;
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
    "./src/index.js": function(module, exports, __webpack_require__) {
        let button = document.createElement("button");
        button.innerHTML = "点我1";
        button.onclick = function() {
            __webpack_require__.e("title").then(
                __webpack_require__.t.bind(null, "./src/title.js", 7)
            ).then(function(result) {
                console.log(result.default);
            });
        };
        document.body.appendChild(button);
    }
});
```

## 1.loader运行的总体流程

* `Compiler.js` 中会为将用户配置与默认配置合并，其中就包括了 `loader` 部分
* webpack就会根据配置创建 `NormalModuleFactory` , 它可以用来创建 `NormalModule` 
* 在工厂创建NormalModule实例之前还要通过loader的resolver来解析loader路径
* 在NormalModule实例创建之后，则会通过其 `build` 方法来进行模块的构建。构建模块的第一步就是使用 `loader` 来加载并处理模块内容。而 `loader-runner` 这个库就是 `webpack` 中 `loade` r的运行器
* 最后，将loader处理完的模块内容输出，进入后续的编译流程

![loader](http://img.zhufengpeixun.cn/loader.jpg)

## 2.babel-loader

* [babel-loader](https://github.com/babel/babel-loader/blob/master/src/index.js)
* [@babel/core](https://babeljs.io/docs/en/next/babel-core.html)
* [babel-plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/)

|属性|值|
|:----|:----|
|this.request|/loaders/babel-loader.js!/src/index.js'|
|this.userRequest|/src/index.js|
|this.rawRequest|./src/index.js|
|this.resourcePath|/src/index.js|

``` js
$ cnpm i @babel / preset - env @babel / core - D
```

``` js
const babel = require("@babel/core");

function loader(source, inputSourceMap) {
    //C:\webpack-analysis2\loaders\babel-loader.js!C:\webpack-analysis2\src\index.js
    const options = {
        presets: ['@babel/preset-env'],
        inputSourceMap: inputSourceMap,
        sourceMaps: true, //ourceMaps: true 是告诉 babel 要生成 sourcemap
        filename: this.request.split('!')[1].split('/').pop()
    }
    //在webpack.config.js中 增加devtool: 'eval-source-map'
    let {
        code,
        map,
        ast
    } = babel.transform(source, options);
    return this.callback(null, code, map, ast);
}
module.exports = loader;
```

``` js
resolveLoader: {
    alias: { //可以配置别名
        "babel-loader": resolve('./build/babel-loader.js')
    }, //也可以配置loaders加载目录
    modules: [path.resolve('./loaders'), 'node_modules']
}, {
    test: /\.js$/,
    use: ['babel-loader']
}
```

## 3.pitch

* 比如a!b!c!module, 正常调用顺序应该是c、b、a，但是真正调用顺序是 a(pitch)、b(pitch)、c(pitch)、c、b、a, 如果其中任何一个pitching loader返回了值就相当于在它以及它右边的loader已经执行完毕
* 比如如果b返回了字符串"result b", 接下来只有a会被系统执行，且a的loader收到的参数是result b
* loader根据返回值可以分为两种，一种是返回js代码（一个module的代码，含有类似module.export语句）的loader，还有不能作为最左边loader的其他loader
* 有时候我们想把两个第一种loader chain起来，比如style-loader!css-loader!

问题是css-loader的返回值是一串js代码，如果按正常方式写style-loader的参数就是一串代码字符串

* 为了解决这种问题，我们需要在style-loader里执行require(css-loader!resources)

pitch与loader本身方法的执行顺序图

``` js
| -a - loader `pitch` |
    -b - loader `pitch` |
    -c - loader `pitch` |
    -requested module is picked up as a dependency |
    -c - loader normal execution |
    -b - loader normal execution |
    -a - loader normal execution
```

### 3.1 loaders\loader1.js

loaders\loader1.js

``` js
function loader(source) {
    console.log('loader1', this.data);
    return source + "//loader1";
}
loader.pitch = function(remainingRequest, previousRequest, data) {
    data.name = 'pitch1';
    console.log('pitch1');
}
module.exports = loader;
```

### 3.2 loaders\loader2.js

loaders\loader2.js

``` js
function loader(source) {
    console.log('loader2');
    return source + "//loader2";
}
loader.pitch = function(remainingRequest, previousRequest, data) {
    console.log('remainingRequest=', remainingRequest);
    console.log('previousRequest=', previousRequest);
    console.log('pitch2');
    //return 'console.log("pitch2")';
}
module.exports = loader;
```

### 3.3 loaders\loader3.js

loaders\loader3.js

``` js
function loader(source) {
    console.log('loader3');
    return source + "//loader3";
}
loader.pitch = function() {
    console.log('pitch3');
}
module.exports = loader;
```

### 3.4 webpack.config.js

``` js
 {
     test: /\.js$/,
     use: ['loader1', 'loader2', 'loader3']
 }
```

## 4.loader-runner

### 4.1 loader类型

* [loader的叠加顺序](https://github.com/webpack/webpack/blob/v4.39.3/lib/NormalModuleFactory.js#L159-L339) = post(后置)+inline(内联)+normal(正常)+pre(前置)

### 4.2 特殊配置

* [loaders/#configuration](https://webpack.js.org/concepts/loaders/#configuration)

|符号|变量|含义|
|:----|:----|:----|
| `-!` |noPreAutoLoaders|不要前置和普通loader|Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders|
| `!` |noAutoLoaders|不要普通loader|Prefixing with ! will disable all configured normal loaders|
| `!!` |noPrePostAutoLoaders|不要前后置和普通loader, 只要内联loader|Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders)|

### 4.2 查找规则执行

``` js
let path = require("path");
let nodeModules = path.resolve(__dirname, "node_modules");
let request = "-!inline-loader1!inline-loader2!./styles.css";
//首先解析出所需要的 loader，这种 loader 为内联的 loader
let inlineLoaders = request
    .replace(/^-?!+/, "")
    .replace(/!!+/g, "!")
    .split("!");
let resource = inlineLoaders.pop(); //// 获取资源的路径
let resolveLoader = loader => path.resolve(nodeModules, loader);
//从相对路径变成绝对路径
inlineLoaders = inlineLoaders.map(resolveLoader);
let rules = [{
        enforce: "pre",
        test: /\.css?$/,
        use: ["pre-loader1", "pre-loader2"]
    },
    {
        test: /\.css?$/,
        use: ["normal-loader1", "normal-loader2"]
    },
    {
        enforce: "post",
        test: /\.css?$/,
        use: ["post-loader1", "post-loader2"]
    }
];
let preLoaders = [];
let postLoaders = [];
let normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule.test.test(resource)) {
        if (rule.enforce == 'pre') {
            preLoaders.push(...rule.use);
        } else if (rule.enforce == 'post') {
            postLoaders.push(...rule.use);
        } else {
            normalLoaders.push(...rule.use);
        }
    }
}
preLoaders = preLoaders.map(resolveLoader);
postLoaders = postLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);

let loaders = [];
//noPrePostAutoLoaders  忽略所有的 preLoader / normalLoader / postLoader
if (request.startsWith('!!')) {
    loaders = inlineLoaders; //只保留inline
    //noPreAutoLoaders 是否忽略 preLoader 以及 normalLoader
} else if (request.startsWith('-!')) {
    loaders = [...postLoaders, ...inlineLoaders]; //只保留post和inline
    //是否忽略 normalLoader  
} else if (request.startsWith('!')) {
    loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]; //保留post inline pre
} else {
    loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
console.log(loaders);
```

### 4.4 run-loader

* [LoaderRunner](https://github.com/webpack/loader-runner/blob/v2.4.0/lib/LoaderRunner.js)
* [NormalModuleFactory-noPreAutoLoaders](https://github.com/webpack/webpack/blob/v4.39.3/lib/NormalModuleFactory.js#L180)
* [NormalModule-runLoaders](https://github.com/webpack/webpack/blob/v4.39.3/lib/NormalModule.js#L292)

``` js
let readFile = require("fs");
let path = require("path");

function createLoaderObject(loader) {
    let obj = {
        data: {}
    };
    obj.request = loader;
    obj.normal = require(loader);
    obj.pitch = obj.normal.pitch;
    return obj;
}

function runLoaders(options, callback) {
    let loaderContext = {};
    let resource = options.resource;
    let loaders = options.loaders;
    loaders = loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;
    loaderContext.readResource = readFile;
    loaderContext.resource = resource;
    loaderContext.loaders = loaders;
    let isSync = true;
    var innerCallback = (loaderContext.callback = function(err, args) {
        loaderContext.loaderIndex--;
        iterateNormalLoaders(loaderContext, args, callback);
    });
    loaderContext.async = function async () {
        isSync = false;
        return innerCallback;
    };
    Object.defineProperty(loaderContext, "request", {
        get: function() {
            return loaderContext.loaders
                .map(function(o) {
                    return o.request;
                })
                .concat(loaderContext.resource)
                .join("!");
        }
    });
    Object.defineProperty(loaderContext, "remainingRequest", {
        get: function() {
            return loaderContext.loaders
                .slice(loaderContext.loaderIndex + 1)
                .map(function(o) {
                    return o.request;
                })
                .concat(loaderContext.resource || "")
                .join("!");
        }
    });
    Object.defineProperty(loaderContext, "currentRequest", {
        enumerable: true,
        get: function() {
            return loaderContext.loaders
                .slice(loaderContext.loaderIndex)
                .map(function(o) {
                    return o.request;
                })
                .concat(loaderContext.resource || "")
                .join("!");
        }
    });
    Object.defineProperty(loaderContext, "previousRequest", {
        get: function() {
            return loaderContext.loaders
                .slice(0, loaderContext.loaderIndex)
                .map(function(o) {
                    return o.request;
                })
                .join("!");
        }
    });
    Object.defineProperty(loaderContext, "data", {
        get: function() {
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    iteratePitchingLoaders(loaderContext, callback);

    function iteratePitchingLoaders(loaderContext, callback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            loaderContext.loaderIndex--;
            return processResource(loaderContext, callback);
        }

        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let fn = currentLoaderObject.pitch;
        if (!fn) return iteratePitchingLoaders(options, loaderContext, callback);

        let args = fn.apply(loaderContext, [
            loaderContext.remainingRequest,
            loaderContext.previousRequest,
            currentLoaderObject.data
        ]);
        if (args) {
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext, args, callback);
        } else {
            loaderContext.loaderIndex++;
            iteratePitchingLoaders(loaderContext, callback);
        }

        function processResource(loaderContext, callback) {
            let buffer = loaderContext.readResource.readFileSync(
                loaderContext.resource,
                "utf8"
            );
            iterateNormalLoaders(loaderContext, buffer, callback);
        }
    }

    function iterateNormalLoaders(loaderContext, args, callback) {
        if (loaderContext.loaderIndex < 0) return callback(null, args);

        var currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        var fn = currentLoaderObject.normal;
        if (!fn) {
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext, args, callback);
        }
        args = fn.apply(loaderContext, [args]);
        if (isSync) {
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, callback);
        }
    }
}

let entry = "./src/world.js";

let options = {
    resource: path.join(__dirname, entry),
    loaders: [
        path.join(__dirname, "loaders/loader1.js"),
        path.join(__dirname, "loaders/loader2.js"),
        path.join(__dirname, "loaders/loader3.js")
    ]
};

runLoaders(options, (err, result) => {
    console.log(result);
});
```

## 5.file

* `file-loader` 并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。

### 5.1 file-loader

* [loader-utils](https://github.com/webpack/loader-utils)
* [file-loader](https://github.com/webpack-contrib/file-loader/blob/master/src/index.js)
* [public-path](https://webpack.js.org/guides/public-path/#on-the-fly)

``` js
const {
    getOptions,
    interpolateName
} = require('loader-utils');

function loader(content) {
    let options = getOptions(this) || {};
    let url = interpolateName(this, options.filename || "[hash].[ext]", {
        content
    });
    this.emitFile(url, content);
    return `module.exports = ${JSON.stringify(url)}` ;
}
loader.raw = true;
module.exports = loader;
```

*  通过 `loaderUtils.interpolateName` 方法可以根据 options.name 以及文件内容生成一个唯一的文件名 url（一般配置都会带上hash，否则很可能由于文件重名而冲突）
*  通过 `this.emitFile(url, content)` 告诉 webpack 我需要创建一个文件，webpack会根据参数创建对应的文件，放在 `public path` 目录下
*  返回 `module.exports = ${JSON.stringify(url)}` , 这样就会把原来的文件路径替换为编译后的路径

### 5.2 url-loader

``` js
let {
    getOptions
} = require('loader-utils');
var mime = require('mime');

function loader(source) {
    let options = getOptions(this) || {};
    let {
        limit,
        fallback = 'file-loader'
    } = options;
    if (limit) {
        limit = parseInt(limit, 10);
    }
    const mimetype = mime.getType(this.resourcePath);
    if (!limit || source.length < limit) {
        let base64 = `data:${mimetype};base64,${source.toString('base64')}` ;
        return `module.exports = ${JSON.stringify(base64)}` ;
    } else {
        let fileLoader = require(fallback || 'file-loader');
        return fileLoader.call(this, source);
    }
}
loader.raw = true;
module.exports = loader;
```

## 6 css

* [css-loader](https://github.com/webpack-contrib/css-loader/blob/master/lib/loader.js) 的作用是处理css中的 @import 和 url 这样的外部资源
* [style-loader](https://github.com/webpack-contrib/style-loader/blob/master/index.js) 的作用是把样式插入到 DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的 innerHTML里
* [less-loader](https://github.com/webpack-contrib/less-loader) 把less编译成css
* [pitching-loader](https://webpack.js.org/api/loaders/#pitching-loader)
* [loader-utils](https://github.com/webpack/loader-utils)

### 6.1 less-loader.js

``` js
let less = require('less');

function loader(source) {
    let callback = this.async();
    less.render(source, {
        filename: this.resource
    }, (err, output) => {
        callback(err, output.css);
    });
}
module.exports = loader;
```

### 6.2 style-loader

``` js
let loaderUtils = require("loader-utils");

function loader(source) {
    let script = (`
	  let style = document.createElement("style");
	  style.innerHTML = ${JSON.stringify(source)};
	  document.head.appendChild(style);
	`);
    return script;
}
module.exports = loader;
```

## 1.webpack编译流程

* 初始化参数：从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数；
* 开始编译：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译； 确定入口：根据配置中的 `entry` 找出所有的入口文件
* 编译模块：从入口文件出发，调用所有配置的 `Loader` 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
* 完成模块编译：在经过第4步使用 `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk` ，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上过程中， `Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果

![webpackflowes](http://img.zhufengpeixun.cn/webpackflowes.png)

## 2. 调试webpack

* [cli](https://webpack.js.org/api/cli/)

### 2.1 如何生成调试文件

* 打开工程目录，点击调试按钮，再点击小齿轮的配置按钮系统就会生成launch.json配置文件
* 修改好了以后直接点击F5就可以启动调试

.vscode\launch.json

``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "debug webpack",
            "cwd":"${workspaceFolder}",
            "program":"${workspaceFolder}/node_modules/webpack-cli/bin/cli.js"
        }
    ]
}
```

### 2.2 webpack.cmd

* `webpack-source\node_modules\.bin\webpack.cmd` 

* `%~dp0` 是批处理文件所在的盘符:+路径(%~dp0 C:\vipdata\vipproject\webpack-source\node_modules\.bin\)
* `SETLOCAL` 主要针对临时环境变量，不会影响到系统的变量环境设置，应与endlocal联用
* `PATHEXT` 当在一个相同的目录结构下，有相同的多个主文件名，不同的文件后缀名时，系统会根据PATHEXT中的后缀名，选择其中顺序最靠前的那一个

``` js
@IF EXIST "%~dp0\node.exe"( //如果当前盘符的根目录下存在node.exe,用当前的node执行
    "%~dp0\node.exe"
    "%~dp0\..\_webpack@4.39.3@webpack\bin\webpack.js" % *
) ELSE( //如果当前的盘符没有node.exe
    @SETLOCAL @SET PATHEXT = % PATHEXT: ;.JS; = ; %
    node "%~dp0\..\_webpack@4.39.3@webpack\bin\webpack.js" % *
)
```

### 2.3 webpack.js

* node_modules\webpack\bin\webpack.js

``` js
const path = require("path");
const pkgPath = require.resolve( `${installedClis[0].package}/package.json` );
const pkg = require(pkgPath);
require(path.resolve(
    path.dirname(pkgPath),
    pkg.bin[installedClis[0].binName]
));
```

``` js
const path = require("path");
const pkgPath = require.resolve( `webpack-cli/package.json` );
const pkg = require(pkgPath);
require(path.resolve(path.dirname(pkgPath), pkg.bin['webpack-cli']));
```

``` js
npx webpack = node. / node_modules / webpack - cli / bin / cli.js
```

### 2.4 cli.js

``` js
const webpack = require("webpack");
const webpackOptions = require("./webpack.config");
const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
    console.log(err);
    console.log(stats.toJson({
        entries: true,
        chunks: true,
        modules: true,
        _modules: true,
        assets: true
    }));
});
```

## 3. Stats 对象

* 在 Webpack 的回调函数中会得到stats对象
* 这个对象实际来自于 `Compilation.getStats()` ，返回的是主要含有 `modules` 、 `chunks` 和 `assets` 三个属性值的对象。
* Stats对象本质上来自于[lib/Stats.js](https://github.com/webpack/webpack/blob/v4.39.3/lib/Stats.js)的类实例

|字段|含义|
|:----|:----|
|modules|记录了所有解析后的模块|
|chunks|记录了所有chunk|
|assets|记录了所有要生成的文件|

``` js
npx webpack--profile--json > stats.json
```

``` json
{
  "errors": [],// 错误字符串 (error string) 的数组
  "warnings": [],//警告字符串 (warning string) 的数组
  "version": "4.39.3",// 用来编译的 webpack 的版本
  "hash": "3e945ec6b2c56d0b010e",//编译使用的 hash
  "time": 66, // 编译耗时 (ms)
  "builtAt": 1567225465347,//编译的时间
  "publicPath": "",//资源访问路径
  "outputPath": "C:\\vipdata\\vipproject\\webpack-source\\dist",//webpack输出目录
  "assetsByChunkName": {//用作映射的 chunk 的名称
    "lazy": "lazy.bundle.js",//chunk的名字叫lazy,lazy.bundle.js
    "main": "bundle.js"//chunk的名字叫main,打包出来了bundle.js
  },
  "assets": [//asset 对象 (asset objects) 的数组
    {
      "name": "bundle.js",//文件名
      "size": 9043,//大小
      "chunks": [//包含的代码块
        "main"
      ],
      "chunkNames": [//包含的代码块名称
        "main"
      ],
      "emitted": true//是否要生成
    },
    {
      "name": "lazy.bundle.js", // 输出的文件名
      "size": 336,// 文件的大小
      "chunks": [ // 这个 asset 包含的 chunk 的 id
        "lazy"
      ],
      "chunkNames": [// 这个 asset 包含的 chunk
        "lazy"
      ],
      "emitted": true  // 表示这个 asset 是否会让它输出到 output 目录
    }
  ],
  "filteredAssets": 0,
  "entrypoints": {
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "bundle.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "namedChunkGroups": {
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "bundle.js"
      ],
      "children": {},
      "childAssets": {}
    },
    "lazy": {
      "chunks": [
        "lazy"
      ],
      "assets": [
        "lazy.bundle.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "chunks": [ //chunk 对象 (chunk objects) 的数组
    {
      "id": "lazy", // 这个 chunk 的id
      "rendered": true,// 表示这个 chunk 是否会参与进编译
      "initial": false,
      "entry": false,// 表示这个 chunk 是否包含 webpack 的运行时
      "size": 24,//预估的模块大小
      "names": [// 包含在这个 chunk 内的 chunk 的名字的数组
        "lazy"
      ],
      "files": [
        "lazy.bundle.js"
      ],
      "hash": "d08a8b502d30324f81e1",
      "siblings": [],
      "parents": [// 父 chunk 的 ids
        "main"
      ],
      "children": [],
      "childrenByOrder": {},
      "modules": [
        {
          "id": "./src/lazy.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\lazy.js",
          "name": "./src/lazy.js",
          "index": 2,
          "index2": 2,
          "size": 24,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "lazy"
          ],
          "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "issuerId": "./src/index.js",
          "issuerName": "./src/index.js",
          "issuerPath": [
            {
              "id": "./src/index.js",
              "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "name": "./src/index.js",
              "profile": {
                "factory": 18,
                "building": 14
              }
            }
          ],
          "profile": {
            "factory": 4,
            "building": 2
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [// 生成 assets 的原因
            {
              "moduleId": "./src/index.js",//模块的ID
              "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",//唯一标识
              "module": "./src/index.js",//模块
              "moduleName": "./src/index.js",//模块名称
              "type": "import()",//类型
              "userRequest": "./lazy",//用户请求方式
              "loc": "2:0-46"//在父模块中的位置
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 1,
          "source": "module.exports = 'lazy';"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "moduleId": "./src/index.js",// 模块的ID
          "module": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的位置
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的地址
          "moduleName": "./src/index.js",//模块的相对地址
          "loc": "2:0-46",
          "request": "./lazy",
          "reasons": [] // 具体是哪行生成了这个chunk
        }
      ]
    },
    {
      "id": "main",
      "rendered": true,
      "initial": true,
      "entry": true,
      "size": 162,
      "names": [
        "main"
      ],
      "files": [
        "bundle.js"
      ],
      "hash": "263cadc0459e8470151b",
      "siblings": [],
      "parents": [],
      "children": [// 自己引用哪些chunk
        "lazy"
      ],
      "childrenByOrder": {}, // 引用的顺序
      "modules": [
        {
          "id": "./src/hello.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\hello.js",
          "name": "./src/hello.js",
          "index": 1,
          "index2": 0,
          "size": 25,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "issuerId": "./src/index.js",
          "issuerName": "./src/index.js",
          "issuerPath": [
            {
              "id": "./src/index.js",
              "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "name": "./src/index.js",
              "profile": {
                "factory": 18,
                "building": 14
              }
            }
          ],
          "profile": {
            "factory": 4,
            "building": 2
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": "./src/index.js",
              "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "module": "./src/index.js",
              "moduleName": "./src/index.js",
              "type": "cjs require",
              "userRequest": "./hello",
              "loc": "1:12-30"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 1,
          "source": "module.exports = 'hello';"
        },
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "index": 0,
          "index2": 1,
          "size": 137,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": null,
          "issuerId": null,
          "issuerName": null,
          "issuerPath": null,
          "profile": {
            "factory": 18,
            "building": 14
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": null,
              "moduleIdentifier": null,
              "module": null,
              "moduleName": null,
              "type": "single entry",
              "userRequest": "./src/index.js",
              "loc": "main"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 0,
          "source": "let hello = require('./hello');\r\nimport(/* webpackChunkName: \"lazy\" */'./lazy').then(result=>{\r\n    console.log(hello,resut.default)\r\n});"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "module": "",
          "moduleIdentifier": "",
          "moduleName": "",
          "loc": "main",
          "request": "./src/index.js",
          "reasons": []
        }
      ]
    }
  ],
  "modules": [// 模块对象 (module objects) 的数组
    {
      "id": "./src/hello.js",//模块ID
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\hello.js",//webpack内部使用的唯一的标识
      "name": "./src/hello.js",// 实际文件的地址
      "index": 1,//索引
      "index2": 0,//索引
      "size": 25,// 预估模块的大小 (byte)
      "cacheable": true,// 表示这个模块是否会被缓存
      "built": true,// 表示这个模块会参与 Loaders , 解析, 并被编译
      "optional": false,// 每一个对这个模块的请求都会包裹在 `try... catch` 内
      "prefetched": false,// 表示这个模块是否会被 prefetched
      "chunks": [//此模块在哪个代码块内
        "main"
      ],
      "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",//使用者唯一标识
      "issuerId": "./src/index.js",//使用者ID
      "issuerName": "./src/index.js",//使用者名称
      "issuerPath": [//使用者路径
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "profile": { //这个模块特有的编译时间数据(ms)
            "factory": 18,// 解决依赖的时间
            "building": 14 // 载入和解析的时间
          }
        }
      ],
      "profile": {
        "factory": 4,// 解决依赖的时间
        "building": 2// 载入和解析的时间
      },
      "failed": false,//是否失败
      "errors": 0,// 处理模块时错误的数量
      "warnings": 0,// 处理模块时警告的数量
      "assets": [],//在哪个资源内
      "reasons": [
        {
          "moduleId": "./src/index.js",// 模块的 ID
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的地址
          "module": "./src/index.js",// 所基于模块的相对地址 context
          "moduleName": "./src/index.js",
          "type": "cjs require",// 使用的请求的种类 (require或import)
          "userRequest": "./hello",// 用来 `import` 或者 `require` 的源字符串
          "loc": "1:12-30" // 导致这个被加入依赖图标的代码行数
        }
      ],
      "providedExports": null,//提供的导出对象
      "optimizationBailout": [],//失败时的优化
      "depth": 1,//模块深度
      "source": "module.exports = 'hello';"// 字符串化的输入
    },
    {
      "id": "./src/index.js",
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
      "name": "./src/index.js",
      "index": 0,
      "index2": 1,
      "size": 137,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "main"
      ],
      "issuer": null,
      "issuerId": null,
      "issuerName": null,
      "issuerPath": null,
      "profile": {
        "factory": 18,
        "building": 14
      },
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": null,
          "moduleIdentifier": null,
          "module": null,
          "moduleName": null,
          "type": "single entry",
          "userRequest": "./src/index.js",
          "loc": "main"
        }
      ],
      "providedExports": null,
      "optimizationBailout": [],
      "depth": 0,
      "source": "let hello = require('./hello');\r\nimport(/* webpackChunkName: \"lazy\" */'./lazy').then(result=>{\r\n    console.log(hello,resut.default)\r\n});"
    },
    {
      "id": "./src/lazy.js",
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\lazy.js",
      "name": "./src/lazy.js",
      "index": 2,
      "index2": 2,
      "size": 24,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "lazy"
      ],
      "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
      "issuerId": "./src/index.js",
      "issuerName": "./src/index.js",
      "issuerPath": [
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "profile": {
            "factory": 18,
            "building": 14
          }
        }
      ],
      "profile": {
        "factory": 4,
        "building": 2
      },
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": "./src/index.js",
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "module": "./src/index.js",
          "moduleName": "./src/index.js",
          "type": "import()",
          "userRequest": "./lazy",
          "loc": "2:0-46"
        }
      ],
      "providedExports": null,
      "optimizationBailout": [],
      "depth": 1,
      "source": "module.exports = 'lazy';"
    }
  ],
  "filteredModules": 0,
  "logging": {
    "webpack.buildChunkGraph.visitModules": {
      "entries": [],
      "filteredEntries": 5,
      "debug": false
    }
  },
  "children": []
}
```

## 4. 详细工作流程

![webpackcode](http://img.zhufengpeixun.cn/webpackcode.jpg)

## 1.webpack的插件机制

* 在具体介绍webpack内置插件与钩子可视化工具之前，我们先来了解一下webpack中的插件机制。 webpack实现插件机制的大体方式是：
  + 创建 - webpack在其内部对象上创建各种钩子；
  + 注册 - 插件将自己的方法注册到对应钩子上，交给webpack；
  + 调用 - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法。
* Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例
* 通过事件和注册和监听，触发webpack生命周期中的函数方法

``` js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');
```

## 2.tapable分类

* Hook 类型可以分为 `同步Sync` 和 `异步Async` ，异步又分为 `并行` 和 `串行` 

[tapable](http://img.zhufengpeixun.cn/tapable.png)

|类型|使用要点|
|:----|:----|
|Basic|不关心监听函数的返回值|
|Bail|保险式: 只要监听函数中有返回值(不为undefined)，则跳过之后的监听函数|
|Waterfall|瀑布式: 上一步的返回值交给下一步使用|
|Loop|循环类型: 如果该监听函数返回true, 则这个监听函数会反复执行，如果返回undefined则退出循环|

## 3. SyncHook

1. 所有的构造函数都接收一个可选参数，参数是一个参数名的字符串数组
2. 参数的名字可以任意填写，但是参数数组的长数必须要根实际接受的参数个数一致
3. 如果回调函数不接受参数，可以传入空数组
4. 在实例化的时候传入的数组长度长度有用，值没有用途
5. 执行call时，参数个数和实例化时的数组长度有关
6. 回调的时候是按先入先出的顺序执行的，先放的先执行

### 3.1 使用

``` js
const {
    SyncHook
} = require("./tapable");
//const {SyncHook} = require('tapable');
let syncHook = new SyncHook(["name"]);
syncHook.tap("1", name => {
    console.log(name, 1);
});
syncHook.tap("2", name => {
    console.log(name, 2);
});
syncHook.call("zhufeng");
/* 
(function anonymous(name) {
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  _fn0(name);
  var _fn1 = _x[1];
  _fn1(name);
}) 
*/
```

### 3.2 实现

#### 3.2.1 index.js
tapable\index.js

``` js
let SyncHook = require('./SyncHook');
module.exports = {
    SyncHook
}
```

#### 3.2.2 Hook.js

tapable\Hook.js

``` js
class Hook {
    constructor(args) {
        if (!Array.isArray(args)) args = []; //参数
        this._args = args; // 这里存入初始化的参数
        this.taps = []; //这里就是回调栈用到的数组
        this._x = undefined; //这个比较重要，后面拼代码会用
    }
    tap(options, fn) {
        if (typeof options === "string") options = {
            name: options
        };
        options.fn = fn;
        this._insert(options); //参数处理完之后，调用_insert，这是关键代码
    }
    _insert(item) {
        this.taps[this.taps.length] = item;
    }
    call(...args) {
        let callMethod = this._createCall();
        return callMethod.apply(this, args);
    }
    _createCall(type) {
        return this.compile({
            taps: this.taps,
            _args: this._args
        });
    }
}

module.exports = Hook;
```

#### 3.2.3 SyncHook

tapable\SyncHook.js

``` js
const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");
const factory = new HookCodeFactory();
class SyncHook extends Hook {
    constructor() {
        super();
    }
    compile(options) {
        factory.setup(this, options);
        return factory.create(options);
    }
}
module.exports = SyncHook;
```

#### 3.2.4 HookCodeFactory.js

tapable\HookCodeFactory.js

``` js
class HookCodeFactory {
    args() {
        return this.options.args.join(",");
    }
    setup(instance, options) {
        this.options = options;
        instance._x = options.taps.map(t => t.fn);
    }
    header() {
        return "var _x = this._x;\n";
    }
    content() {
        let code = "";
        for (let idx = 0; idx < this.options.taps.length; idx++) {
            code += `var _fn${idx} = _x[${idx}];\n
               _fn${idx}(${this.args()});\n`;
        }
        return code;
    }
    create(options) {
        return new Function(this.args(), this.header() + this.content());
    }
}
module.exports = HookCodeFactory;
```

## 4.3. AsyncParallelHook_callback

### 4.3.1 AsyncParallelHook_callback.js

5. AsyncParallelHook_callback.js

``` js
let {
    AsyncParallelHook
} = require('tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
debugger;
queue.tapAsync('1', function(name, callback) {
    setTimeout(function() {
        console.log(1);
        callback();
    }, 1000)
});
queue.tapAsync('2', function(name, callback) {
    setTimeout(function() {
        console.log(2);
        callback();
    }, 2000)
});
queue.tapAsync('3', function(name, callback) {
    setTimeout(function() {
        console.log(3);
        callback();
    }, 3000)
});
queue.callAsync('zfpx', err => {
    console.timeEnd('cost');
});

/**
var _context;
var _x = [(name,callback)=>{console.log(1);callback()},(name,callback)=>{console.log(2);callback()},(name,callback)=>{console.log(3);callback()}];
var _counter = 3;
var _callback = ()=>{console.log('执行最终的回调!')}
var name = 'zhufeng';
var _done = () =>{
    _callback();
};
var _fn0 = _x[0];
_fn0(name, _err0 =>{
    if (--_counter === 0) _done();
});
var _fn1 = _x[1];
_fn1(name, _err1 =>{
    if (--_counter === 0) _done();
});
var _fn2 = _x[2];
_fn2(name, _err2 =>{
    if (--_counter === 0) _done();
});

(function anonymous(name, _callback) {
    var _context;
    var _x = this._x;
    var _counter = 3;
    var _done = () = >{
        _callback();
    };
    var _fn0 = _x[0];
     _fn0(name, _err0 = >{
         if (--_counter === 0) _done();
    });
    var _fn1 = _x[1];
    _fn1(name, _err1 = >{
        if (--_counter === 0) _done();
    });
    var _fn2 = _x[2];
    _fn2(name, _err2 = >{
         if (--_counter === 0) _done();
    });
})
 */
```

### 4.3.2 AsyncParallelHookAsync.js

tapable\AsyncParallelHookAsync.js

``` js
const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");
class AsyncParallelHookCodeFactory extends HookCodeFactory {
    args({
        before,
        after
    } = {}) {
        let allArgs = this.options._args;
        if (before) allArgs = [before].concat(allArgs);
        if (after) allArgs = allArgs.concat(after);
        if (allArgs.length === 0) {
            return "";
        } else {
            return allArgs.join(", ");
        }
    }
    create(options) {
        return new Function(
            this.args({
                after: "_callback"
            }),
            this.header() + this.content()
        );
    }
    content() {
        let code = ``;
        code += `
      var _counter = ${this.options.taps.length};
      var _done = () =>{
        _callback();
      };
    `;
        for (let idx = 0; idx < this.options.taps.length; idx++) {
            code += `
          var _fn${idx} = _x[${idx}];
          _fn${idx}(name, _err${idx} =>{
              if (--_counter === 0) _done();
          });
      `;
        }
        return code;
    }
}
const factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook {
    constructor(args) {
        super(args);
    }
    tapAsync(options, fn) {
        if (typeof options === "string") options = {
            name: options
        };
        options.fn = fn;
        this._insert(options); //参数处理完之后，调用_insert，这是关键代码
    }
    callAsync(...args) {
        let callMethod = this._createCall();
        return callMethod.apply(this, args);
    }
    compile(options) {
        factory.setup(this, options);
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;
```

## 4.4 AsyncParallelHook_promise.js

### 4.4.1 AsyncParallelHook_promise.js

``` js
let {
    AsyncParallelHook
} = require('./tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1', function(name) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(1);
            resolve();
        }, 1000)
    });
});
queue.tapPromise('2', function(name) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(2);
            resolve();
        }, 2000)
    });
});
queue.tapPromise('3', function(name) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(3);
            resolve();
        }, 3000)
    });
});
queue.promise('zfpx').then(result => {
    console.timeEnd('cost');
}, error => {
    console.log(error);
    console.timeEnd('cost');
});

/**
(function anonymous(name) {
    return new Promise((_resolve) = >{
        var _x = this._x;
        var _counter = 3;
        var _done = () = >{
            _resolve();
        };
        
        var _fn0 = _x[0];
        var _promise0 = _fn0(name);
        _promise0.then(_result0 = >{
            if (--_counter === 0) _done();
        });
        
        var _fn1 = _x[1];
        var _promise1 = _fn1(name);
        _promise1.then(_result1 = >{
            if (--_counter === 0) _done();
        });
        
        var _fn2 = _x[2];
        var _promise2 = _fn2(name);
        _promise2.then(_result2 = >{
            if (--_counter === 0) _done();
        });
    });
})

 */
```

### 4.4.2 AsyncParallelHookPromise.js

tapable\AsyncParallelHookPromise.js

``` js
const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");
class AsyncParallelHookCodeFactory extends HookCodeFactory {
    args({
        before,
        after
    } = {}) {
        let allArgs = this.options._args;
        if (before) allArgs = [before].concat(allArgs);
        if (after) allArgs = allArgs.concat(after);
        if (allArgs.length === 0) {
            return "";
        } else {
            return allArgs.join(", ");
        }
    }
    create(options) {
        return new Function(this.args(), this.header() + this.content());
    }
    content() {
        let code = ``;
        code += `
      return new Promise((_resolve)=>{
        var _counter = ${this.options.taps.length};
        var _done = ()=>{
            _resolve();
        };
    `;

        for (let idx = 0; idx < this.options.taps.length; idx++) {
            code += `
        var _fn${idx} = _x[${idx}];
        var _promise${idx} = _fn${idx}(name);
        _promise${idx}.then(_result${idx} =>{
            if (--_counter === 0) _done();
        });
      `;
        }
        code += `
    });
    `;
        return code;
    }
}
const factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook {
    constructor(args) {
        super(args);
    }
    tapPromise(options, fn) {
        if (typeof options === "string") options = {
            name: options
        };
        options.fn = fn;
        this._insert(options); //参数处理完之后，调用_insert，这是关键代码
    }
    promise(...args) {
        let callMethod = this._createCall();
        return callMethod.apply(this, args);
    }
    compile(options) {
        factory.setup(this, options);
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;
```


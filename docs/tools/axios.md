---
title: Axios中文文档
sidebar: auto
---

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

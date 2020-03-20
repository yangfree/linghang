---
title: "全栈开发"
sidebar: auto
---

## 前端必备的 nginx 知识

`nginx`作为一个反向代理服务器，对于前端来说也是必备的一个高效神器，它可以解决如下问题:

- 跨域请求
- 静态资源服务器
- 配置 gzip
- 请求过滤
- 负载均衡

### 正向代理和反向代理

正向代理对客户端是透明对，但是对服务端却不友好，服务端不清楚自己收到的访问是来自代理还是真实的客户端；

![正向代理](/images/nginx_1.png)

反向代理对客户端是非透明对，即我们不清楚我们访问到的资源到底是来自代理服务器，隐藏了真实服务器，但服务器知道代理是为自己服务的。

![反向代理](/images/nginx_2.png)

### nginx 中常用的全局变量

| 变量名            | 功能                                                      |
| ----------------- | --------------------------------------------------------- |
| \$host            | 请求信息中的 Host，如果请求中没有 Host 则等于设置服务器名 |
| \$request_method  | 客户端请求类型，如:post,get...                            |
| \$remote_addr     | 客户端的 ip 地址                                          |
| \$args            | 客户端中请求的参数                                        |
| \$content_length  | 请求头中 content_length 字段                              |
| \$http_user_agent | 客户端 agent 信息                                         |
| \$http_cookie     | 客户端 cookie 信息                                        |
| \$remote_port     | 客户端端口                                                |
| \$server_protocol | 请求中使用的协议，如 Http/1.0, Http/1.1...                |
| \$server_addr     | 服务器地址                                                |
| \$server_name     | 服务器名称                                                |
| \$server_port     | 服务器端口号                                              |

### 基本配置

```bash
user nginx;

# 引入外部的配置文件
include /usr/share/nginx/modules/*.conf;

# 配置影响nginx服务器与用户的网络链接。
events {
    worker_connections 1024;
}

# 可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块
http{
    # 配置gzip http压缩格式
    gzip                    on;
    gzip_http_version       1.1;
    gzip_comp_level         5;
    gzip_min_length         1000;
    gzip_types text/xml text/css text/plain text/javascript application/json;

    # 配置负载均衡
    upstream balanceServer {
        server: 39.107.225.122;
        server: 39.107.225.133;
        server: 39.107.225.144;
    }

    # 配置反向代理服务器
    server {
        listen       80;
        listen       [::]:80;
        server_name  xxx.com www.xxx.com;

        # 跨域配置 当访问/api的时候访问3000端口的数据
        location /api {
            proxy_pass http://127.0.0.1:3000;
        }

        # 访问/list时，让其访问配置好的负载均衡服务器列表
        location /list {
            proxy_pass http://balanceServer;
        }

        # 配置静态服务器
        location ~* \.(png|gif|jpg|jpeg)$ {
            root    /root/static/;
            autoindex   on;
            access_log  off;
            expires     10h;
        }
    }

# 配置https访问.

        server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  xxx.com www.xxx.com;

        # https证书的位置和相关配置
        ssl_certificate "/etc/nginx/cert/xxxxxxxx.com.pem";
        ssl_certificate_key "/etc/nginx/cert/xxxxxxxx.com.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;


        location / {
                root        /web/resume/dist;
                index       index.html      index.htm;
        }

        # 配置404页面
        error_page 404 /404.html;
            location = /40x.html {
        }

        # 根据状态吗配置请求过滤
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
}
```

## WebSocket

> webWebSocket 协议是基于 TCP 的一种新的网络协议，它实现了浏览器和服务器全双工通讯。WebSocket 是一种持久协议，它让浏览器和服务器之间互传数据变得简单。

![websocket和http](/images/ws.png)

### WebSocket 介绍

创建 websocket 对象。

```js
let socket = new WebSocket(url, [protocol]);
```

#### WebSocket 对象的属性

|       属性        | 描述                                                                                                                                                                   |
| :---------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Socket.readyState | 表示链接状态，可以是以下的值：<br />- 0 表示链接尚未建立<br />- 1 表示链接已建立，可以进行通信<br />- 2 表示链接正在进行关闭<br />- 3 表示链接已经关闭或者链接不能打开 |

#### WebSocket 事件

| 事件    | 事件处理程序     | 描述                       |
| ------- | ---------------- | -------------------------- |
| open    | Socket.onopen    | 链接建立时触发             |
| message | socket.onmessage | 客户端接受服务端数据时触发 |
| error   | socket.onerror   | 通信发生错误时触发         |
| close   | socket.onclose   | 链接关闭时触发             |

#### WebSocket 方法

- socket.send(): 发送数据
- socket.close(): 关闭链接

### WebSocket 基本使用

```js
let socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("open", () => {
  socket.send("Hello websocket!");
});
socket.addEventListener("message", msg => {
  console.log(`received ${msg.data}`);
});
socket.addEventListener("close", () => {
  console.log("socket connect close.");
});
```

### Socket.io

Socket.io 有两部分组成

- 与 Node.js Http Server 集成（或安装在其他）的服务器：`socket.io`
- 在浏览器端加载的客户端库`socket.io.client`

在开发过程中，`socket.io`为我们自动为客户端服务，因此我们需要安装它的模块

```bash
npm install socket.io
```

在前端页面我们需要引入客户端文件

```html
<script src="socket.io/socket.io.js"></script>
<script>
  let socket = io();
</script>
```

在后端页面，我们需要把创建好的服务器传递给`socket.io`返回的函数。

```js
// 将服务传递给io模块
let io = require("socket.io")(http);

// 监听connection事件，参数socket是每个链接的对象
io.on("connection", socket => {
  console.log("A user connected");

  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect.");
  });
});
```

通信主要有两个方法，`emit`和`on`，谁要发消息就`emit`一个事件（名称自定义），然后在需要接受消息的页面用`on`监听自定义的事件名称，参数就是发过来的消息。

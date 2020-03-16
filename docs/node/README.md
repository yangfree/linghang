---
title: '全栈开发'
sidebar: auto
---
## 前端必备的nginx知识

`nginx`作为一个反向代理服务器，对于前端来说也是必备的一个高效神器，它可以解决如下问题:

- 跨域请求
- 静态资源服务器
- 配置gzip
- 请求过滤
- 负载均衡

### 正向代理和反向代理

正向代理对客户端是透明对，但是对服务端却不友好，服务端不清楚自己收到的访问是来自代理还是真实的客户端；

![正向代理](/images/nginx_1.png)

反向代理对客户端是非透明对，即我们不清楚我们访问到的资源到底是来自代理服务器，隐藏了真实服务器，但服务器知道代理是为自己服务的。

![反向代理](/images/nginx_2.png)

### nginx中常用的全局变量

|变量名|功能|
|---|---|
|$host|请求信息中的Host，如果请求中没有Host则等于设置服务器名|
|$request_method|客户端请求类型，如:post,get...|
|$remote_addr|客户端的ip地址|
|$args|客户端中请求的参数|
|$content_length|请求头中content_length字段|
|$http_user_agent|客户端agent信息|
|$http_cookie|客户端cookie信息|
|$remote_port|客户端端口|
|$server_protocol|请求中使用的协议，如Http/1.0, Http/1.1...|
|$server_addr|服务器地址|
|$server_name|服务器名称|
|$server_port|服务器端口号|

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

# web常见概念

## SPA单页面应用

> SPA: single page web application

只有一个页面，所有展示的内容通过路由切换展示区域（移动端居多），`webpack`中配置一个入口文件。

## MPA多页面应用

> MPA: multi page web application

许多大型项目由于结构复杂，内容居多，很难在一个页面中展示完成，所以就会按功能或者需求分成多个页面，各个页面之间通过路由携带参数的方式跳转(PC端居多),在基于框架开发的时候，需要在`webpack`中配置多个入口，每一个入口对应一个页面。

## MVVM

View ViewModel Model

## MVC
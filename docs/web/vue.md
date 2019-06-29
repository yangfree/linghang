---
title: Vue
---

## vue-cli脚手架的使用

- 全局安装脚手架

``` bash
# 全局安装
npm install vue-cli -g
# 查看版本
vue -V
vue --version
```
- 初始化一个项目

``` bash
vue init webpack <project>
```

- 进入目录下载依赖项

``` bash
cd <project>
npm install
```

- 项目运行

``` bash
npm run dev
```

### 脚手架目录介绍

- `build`: webpack构建相关代码
- `config`: 项目开发环境配置（更改端口）
- `node_modules`: 依赖模块
- `src`: 项目文件（主要目录）
- `static`: 存放静态资源
- `.babelrc`: 语法编译配置
- `.editorconfig`: 定义代码格式
- `.eslintrc.js`: eslint配置
- `.gitignore`: git提交忽略文件
- `index.html`: 项目入口页面
- `package.json`: 项目配置清单 
- `README.md`: 项目介绍

## vue基础

- Vue.js是基于`ECMAScript5`的渐进式框架。
- Vue支持所有兼容`ECMAScript5`的浏览器。
- `Vue Devtools`插件可以更好的辅助我们进行Vue的调试和开发。
  - 安装
  ``` bash
  # 克隆到本地
  git clone https://github.com/vuejs/vue-devtools#vue-devtools;
  # 下载依赖
  cd vue-devtools/
  npm install
  # 编译
  npm run build
  # 进入/shells/chrome目录
  cd/shells/chrome
  ```
  - 找到`manifest.json`文件.
  - 将`"persistent"`对应的值改为true.
  - 将Chrome文件夹拖入google浏览器拓展程序.
  - 附件(编译目录)
- 浏览源代码: [Vue源代码](https://cdn.jsdelivr.net/npm/vue/)。
- `Vue`与其他框架的对比: [Vue与其他框架的对比](https://cn.vuejs.org/v2/guide/comparison.html)。
- 更新日志: [GitHub](https://github.com/vuejs/vue/releases)。

#### MVVM模式

[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html).

### vue安装与使用

- 通过`script`标签引入（开发版本）

``` html
<!-- Vue会被注册成为一个全局变量 -->
<script src='... path ...'></script>  
```

- CDN

``` html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

- npm

``` bash
# 最新稳定版
npm install vue
```

- 脚手架工具`vue-cli`


### hello world

``` html
<div id='app'>
    {{msg}}
</div>
```

``` javascript
const vm = new Vue({
    el:'#app',
    data:{
        msg: 'hello world'
    }
});
```

### 指令

- `v-html`: 输出内容(包括HTML)
- `v-text`: 输出内容(纯文本)
- `v-pre`: 不需要表达式，用来跳过这个元素和其子元素的编译过程。
- `v-once`: 绑定渲染一次，之后改值可以成功，但不会重新渲染。
- `v-cloak`: 解决页面大括号闪烁问题。

``` css
<style>
[v-cloak] {
  display: none;
}
</style>
```

- `v-model`: 数据双向绑定，主要应用在`input`,`textarea`,`components`,`select`上。
- `v-show`: :控制样式转换  
- `v-if`: 控制元素是否存在, 常和`v-else`, `v-else-if`连用，有顺序关系。
- `v-for`: 列表循环 key属性

### 修饰符

#### 事件修饰符

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

``` html
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>

<!-- 阻止事件默认行为 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

##### 按键修饰符

- `.enter`
- `.tab`
- `.delete` // 捕获‘删除’和‘回退’
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

##### 系统修饰键

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`
- `.exact` // 修饰符允许你控制由精确的系统修饰符组合触发的事件。

``` html
  
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
  
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
  
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
  
<button @click.exact="onClick">A</button>
```

##### 鼠标修饰符

- `.left`
- `.right`
- `.middel`

### 一些细节

- 可以通过全局 config.keyCodes 对象自定义按键修饰符别名:
    ``` javascript
    // 可以使用 `v-on:keyup.f1`
    Vue.config.keyCodes.f1 = 112
    ```
- 你也可直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符：
    ``` javascript
    <input @keyup.page-down="onPageDown">
    // 在上面的例子中，处理函数仅在 $event.key === 'PageDown' 时被调用。
    ```
- 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self`会阻止所有的点击，而 `v-on:click.self.prevent`只会阻止对元素自身的点击。

- 单页面防止闪烁

``` css
[v-cloak] {
    display: none
}
```

- 阻值修改已有属性

- Object.freeze()

``` javascript
let obj = {
name: 'Kizz',
age: 8
}

// 使用方式 锁定data的数据为obj且不可修改.
Object.freeze(obj);

const vm = new Vue({
el: '#app'
data: obj
});

```

## Vue生命周期图和钩子函数

> 组件从被创建到被摧毁所经历的各种状态变化就是一个组件的生命周期，在状态转换时，都有对应的钩子函数,钩子函数会自动调用执行，我们只需提供对应的代码即可。

### 生命周期示意图

![Vue2生命周期示意图](../images/lifecycle.png);

### 钩子函数

- `beforeCreate()`: 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
- `created()`：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见，常用发送`AJAX`请求。
- `beforeMount()`: 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
- `mounted`: Vue实例挂载到页面中，此时可以进行相关的`DOM`操作。该钩子在服务器端渲染期间不被调用。
  - 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：

  ``` javascript
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  }
  ```

- `beforeUpdated()`: 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的.
- `updated()`: 组件`DOM`已经更新，所以可以执行依赖于`DOM`的操作，但是官方建议尽量避免在此间更改状态，如果要改变，最好使用`计算属性`和`watcher`代替。updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：

``` javascript
updated: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
```

- `activated()`: `keep-alive` 组件激活时调用。
- `deactivated()`: `keep-alive` 组件停用时调用。
- `beforeDestroy()`: 实例销毁之前调用。在这一步，实例仍然完全可用。
- `destroyed()`: Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
- `errorCaptured`: **2.50+新增**当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

``` javascript
(err: Error, vm: Component, info: string) => ?boolean
```

## 计算属性VS方法vs侦听属性

- 对于任何复杂逻辑，都应该使用计算属性。
- 计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。
- 当需要在数据变化时执行异步或开销较大的操作时，最好选用`watch`。

## 样式动态渲染

> 动态样式和静态样式可以同时存在，并且同时生效

### 对象

``` html
<!-- 1 -->
<div :class="{active: true}"></div> ==>解析为: <div class="active"></div>

<!-- 2 -->
<!-- 多用于v-for中取值动态渲染，比如投票百分比... -->
<div :style="{width: item.percentage, 'font-size': fontSize + 'px'}"></div>

<!-- 3 -->
<!-- 2.30之后可以为style绑定中的属性提供多个值，用数组包含 -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

### 数组

``` html
<!-- 1 -->
<div :class="[{active: true}, 'text']"></div> ==>解析为: <div class="active text"></div>

<!-- 2 -->
<!-- baseStyle, changeStyle都是data中定义的对象 -->
<div :style="[baseStyle, changeStyle]"></div>

<!-- 支持三元表达式 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

## 组件基础

组件是Vue中最为重要的概念，也是我们在开发中最为核心的部分，所有的组件组成了页面，他们可以按功能划分，也可以按需求划分，还可以按你所需要的任何一种方式划分。

组件的使用会大大的减少我们维护项目的成本，其**复用性**和**扩展性**往往能给我们带来极大的便利。

### 组件使用

1. 注册组件

``` javascript
// 1. 项目中，我们一般创建.vue文件，一个文件就是一个组件
// 2. 可以基于Vue的component创建组件
Vue.component('my-component',{
// ...options...
});
```

2. 引入组件

``` javascript
import MyComponent from '...';
```

3. 挂载组件

``` javascript
export default {
name: "MyComponent",
components: {
MyComponent1,
MyComponent2,
// ...
  }
}
```

4. 页面展示

``` html
<MyComponent></MyComponent>
```

### 组件传值

- 子传父: 父亲通过属性传递，子组件通过`props`接收。
- 父穿子: 子组件通过`this.$emit('事件名称',值)`发射事件，子组件通过`@事件名称="事件名称"`接收。

``` javascript
// 子组件通过$emit发射
this.$emit('listenChildSend',this.message);
// 父组件接收
<Child @listenChildSend='listenChildSend'/>
methods: {
  listenChildSend(data) {
    console.log(data);
  }
}
```

## axios

axios基于`Promise`编写，其本质还是`HttpRequest`对象。

> Promise based HTTP client for the browser and node.js

[axios中文文档](https://www.webblog.vip/vue/2019/02/26/index.html)
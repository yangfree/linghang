---
title: Vue笔记
sidebar: auto
prev: ./es6
next: ./react
---

## vue-cli脚手架的使用

* 全局安装脚手架

``` bash
# 全局安装
npm install vue-cli -g
# 查看版本
vue -V
vue --version
```

* 初始化一个项目

``` bash
vue init webpack <project>
```

* 进入目录下载依赖项

``` bash
cd <project>
npm install
```

* 项目运行

``` bash
npm run dev
```

### 脚手架目录介绍

* `build` : webpack构建相关代码
* `config` : 项目开发环境配置（更改端口）
* `node_modules` : 依赖模块
* `src` : 项目文件（主要目录）
* `static` : 存放静态资源
* `.babelrc` : 语法编译配置
* `.editorconfig` : 定义代码格式
* `.eslintrc.js` : eslint配置
* `.gitignore` : git提交忽略文件
* `index.html` : 项目入口页面
* `package.json` : 项目配置清单 
* `README.md` : 项目介绍

### vue-cli3.xx

``` bash
# 卸载原来版本
npm uninstall vue-cli -g
# 需要node8.9以上版本
npm install @vue/cli -g
# 构建命令
vue create <projectname>
```

## vue基础

* Vue.js是基于 `ECMAScript5` 的渐进式框架。
* Vue支持所有兼容 `ECMAScript5` 的浏览器。
* `Vue Devtools` 插件可以更好的辅助我们进行Vue的调试和开发。
  + 安装

  

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

  + 找到 `manifest.json` 文件.
  + 将 `"persistent"` 对应的值改为true.
  + 将Chrome文件夹拖入google浏览器拓展程序.
  + 附件(编译目录)
* 浏览源代码: [Vue源代码](https://cdn.jsdelivr.net/npm/vue/)。
* `Vue` 与其他框架的对比: [Vue与其他框架的对比](https://cn.vuejs.org/v2/guide/comparison.html)。
* 更新日志: [GitHub](https://github.com/vuejs/vue/releases)。

#### MVVM模式

[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html).

### vue安装与使用

* 通过 `script` 标签引入（开发版本）

``` html
<!-- Vue会被注册成为一个全局变量 -->
<script src='... path ...'></script>
```

* CDN

``` html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

* npm

``` bash
# 最新稳定版
npm install vue
```

* 脚手架工具 `vue-cli` 

### hello world

``` html
<div id='app'>
    {{msg}}
</div>
```

``` javascript
const vm = new Vue({
    el: '#app',
    data: {
        msg: 'hello world'
    }
});
```

### 指令

* `v-html` : 输出内容(包括HTML)
* `v-text` : 输出内容(纯文本)
* `v-pre` : 不需要表达式，用来跳过这个元素和其子元素的编译过程。
* `v-once` : 绑定渲染一次，之后改值可以成功，但不会重新渲染。
* `v-cloak` : 解决页面大括号闪烁问题。

``` css
<style>[v-cloak] {
    display: none;
}

</style>
```

* `v-model` : 数据双向绑定，主要应用在 `input` , `textarea` , `components` , `select` 上。
* `v-show` : : 控制样式转换  
* `v-if` : 控制元素是否存在, 常和 `v-else` , `v-else-if` 连用，有顺序关系。
* `v-for` : 列表循环 key属性

### 修饰符

#### 事件修饰符

* `.stop` 
* `.prevent` 
* `.capture` 
* `.self` 
* `.once` 
* `.passive` 

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

* `.enter` 
* `.tab` 
* `.delete` // 捕获‘删除’和‘回退’
* `.esc` 
* `.space` 
* `.up` 
* `.down` 
* `.left` 
* `.right` 

##### 系统修饰键

* `.ctrl` 
* `.alt` 
* `.shift` 
* `.meta` 
* `.exact` // 修饰符允许你控制由精确的系统修饰符组合触发的事件。

``` html
  <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->

  <button @click.ctrl="onClick">A</button>

  <!-- 有且只有 Ctrl 被按下的时候才触发 -->

  <button @click.ctrl.exact="onCtrlClick">A</button>

  <!-- 没有任何系统修饰符被按下的时候才触发 -->

  <button @click.exact="onClick">A</button>
```

##### 鼠标修饰符

* `.left` 
* `.right` 
* `.middel` 

## Vue生命周期图和钩子函数

> 组件从被创建到被摧毁所经历的各种状态变化就是一个组件的生命周期，在状态转换时，都有对应的钩子函数, 钩子函数会自动调用执行，我们只需提供对应的代码即可。

### 生命周期示意图

![Vue2生命周期示意图](/images/lifecycle.png)

### 钩子函数

* `beforeCreate()` : 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
* `created()` ：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算watch/event 事件回调。然而，挂载阶段还没开始， `$el` 属性目前不可见，常用发送 `AJAX` 请求。
* `beforeMount()` : 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
* `mounted` : Vue实例挂载到页面中，此时可以进行相关的 `DOM` 操作。该钩子在服务器端渲染期间不被调用。
  + 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：

  

``` javascript
  mounted: function() {
      this.$nextTick(function() {
          // Code that will run only after the
          // entire view has been rendered
      })
  }
```

* `beforeUpdated()` : 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的.
* `updated()` : 组件 `DOM` 已经更新，所以可以执行依赖于 `DOM` 的操作，但是官方建议尽量避免在此间更改状态，如果要改变，最好使用 `计算属性` 和 `watcher` 代替。updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：

``` javascript
updated: function() {
    this.$nextTick(function() {
        // Code that will run only after the
        // entire view has been re-rendered
    })
}
```

* `activated()` : `keep-alive` 组件激活时调用。
* `deactivated()` : `keep-alive` 组件停用时调用。
* `beforeDestroy()` : 实例销毁之前调用。在这一步，实例仍然完全可用。
* `destroyed()` : Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
* `errorCaptured` : **2.50+新增**当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

``` javascript
(err: Error, vm: Component, info: string) => ? boolean
```

## 计算属性VS方法vs侦听属性

* 对于任何复杂逻辑，都应该使用计算属性。
* 计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。
* 当需要在数据变化时执行异步或开销较大的操作时，最好选用 `watch` 。

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
Vue.component('my-component', {
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

* 父传子: 父亲通过属性传递，子组件通过 `props` 接收。
* 子传父: 子组件通过 `this.$emit('事件名称',值)` 发射事件，子组件通过 `@事件名称="事件名称"` 接收。

``` javascript
// 子组件通过$emit发射
this.$emit('listenChildSend', this.message);
// 父组件接收
<
Child @listenChildSend = 'listenChildSend' / >
    methods: {
        listenChildSend(data) {
            console.log(data);
        }
    }
```

## Vue Router

官方文档: [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

### 下载

``` bash
npm install vue-router --save
```

### 使用

``` js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const roters = [{
    path: '/',
    component: 'Home',
}, {
    path: 'list',
    component: 'List',
    name: 'list'
}]

const router = new VueRouter({
    routers,
});

const app = {
    el: '#app',
    router,
}
```

## Vuex

`Vuex` 是vue.js专门用来管理状态的，以下是它的一个“单向数据流”理念示意图。

![Vuex单向数据流示意图](/images/vuex.png)

脚手架生成目录结构, vuex的简单使用流程如下：

### 创建store对象

在 `src` 目录下创建 `store` 文件夹，在该目录下新建 `index.js` ，引入vue和vuex，接下来创建一个Vuex的实例并且导出。

``` js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

});

export default store;
```

### 挂在store到全局

在 `main.js` 文件中引入store，并且注入到Vue的实例。

``` js
// ...
import store from './store';

new Vue({
    el: '#app',
    router,
    store,
    ...App
})
```

### State

我们需要的初始状态集合，在组件中可以通过 `this.$store.state` 来获取。现在我们在刚才的 `store` 中定义一个初始状态count。

``` js
// ...

const store = new Vuex.Store({
    state: {
        count: 1,
    }
});

export default store;
```

### getters

Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果，这里我们修改Hello World.vue文件如下：

``` vue
页面上的值: {{this.$store.state.count}}
getters中的值: {{this.$store.getters.gettersStateCount}}
```

在store中的index.js中添加getters对象，并且定义gettersStateCount方法，它有一个参数，即状态 `state` 

``` js
// ...

const store = new Vuex.Store({
    state: {
        count: 1,
    },

    getters: {
        gettersStateCount(state) {
            return state.count + 1;
        }
    }
});

export default store;
```

然后在页面上会分别输出1和2.

### Mutations

`Mutations` 用来修改状态里的值，现在我们在页面中添加一个增加和减少按钮, 分别绑定 `addFun` 和 `reductionFun` 两个事件用来控制状态的增加和减少。

``` vue
页面上的值: {{this.$store.state.count}}
getters中的值: {{this.$store.getters.gettersStateCount}}
<br>
<button type="button" @click="addFun">+1</button>
<button type="button" @click="reductionFun">-1</button>

<script>
// ...
methods: {
    addFun() {
      this.$store.commit("add");
    },
    reductionFun() {
      this.$store.commit("reduction");
    }
},
</script>
```

修改index.js文件，添加mutations，在mutations中定义两个函数，用来对count加1和减1，这里定义的两个方法就是上面commit提交的两个方法如下：

``` js
  mutations: {
      add(state) {
          state.count = state.count + 1;
      },
      reduction(state) {
          state.count = state.count - 1;
      },
  },
```

点击增加和减少按钮就会发现实现了状态的更改，但是官方并不建议我们直接修改 `state` ，而是需要提交 `Actions` 给 `Mutations` , 然后在通过 `mutations` 去修改状态。

### Actions

`Actions` 是异步操作，函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 `mutation` ，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters` 。

我们修改store中index.js文件如下：

``` js
// ...
const store = new Vuex.Store({
    state: {
        count: 1
    },
    getters: {
        getterStateCount(state) {
            return state.count + 1;
        }
    },
    mutations: {
        add(state) {
            state.count = state.count + 1;
        },
        reduction(state) {
            state.count = state.count - 1;
        },
    },
    actions: {
        addFun(context) {
            context.commit('add');
        },
        reductionFun(context) {
            context.commit('reduction');
        }
    }
});

export default store;
```

并且修改vue组件中的方法:

``` vue
<script>
// ...
methods: {
    addFun() {
      this.$store.dispatch("add");
    },
    reductionFun() {
      this.$store.dispatch("reduction");
    }
},
</script>
```

结果和刚才一样，只不过是加了一个提交过程，所以整个Vuex的过程为：

1. 通过组件 `dispatch` 一个方法给 `Actions` 
2. 在 `Actions` 中通过context `commit` 这个两个方法给 `Mutations` 
3. 在 `Mutations` 中写这两个方法完成对状态的修改
4. 然后通过 `render` 完成页面数据的改变。

## axios

axios基于 `Promise` 编写，其本质还是 `HttpRequest` 对象。

> Promise based HTTP client for the browser and node.js

[axios中文文档](https://www.webblog.vip/interaction/2019/02/26/index.html)


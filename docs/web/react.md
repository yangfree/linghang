# react

`React`是FaceBook公司开发的一款`MVC`[Model(数据层),view(视图层),controller(控制层)]JS框架，其核心思想是**通过数据的改变来影响视图的渲染(数据驱动)**。

## react脚手架

> `create-react-app`是官方推荐使用的脚手架。

### create-react-app的使用

1. 把脚手架安装到全局

``` bash
npm install create-react-app -g
```

2. 创建项目目录(不能出现大写字母，中文，特殊符号，可以是`-`或者`_`)

``` bash
create-react-app project
```

3. 默认`yarn`安装，不建议和`npm`混用。


### 脚手架生成目录简介

- `node_modules`: 项目依赖
    - `.bin` 本地项目可执行的命令，在`package.json`的`scripts`中配置对应的脚本即可。
- `public`: 存放当前项目的页面(单页或者多页面)
- `src`: 项目中最主要的目录，所有的JS和静态资源都是放到这个目录。
- `.gitignore`: git提交忽略文件
- `pakege.json` 当前项目的配置清单
- `react-scripts依赖`：
    - Babel一套
    - css处理一套
    - webpack一套
    - eslint一套
    - 其他的
    - 没有less，sass，stalus...
    
### 小知识点

`create-react-app`脚手架安装的`webpack`及配置文件都集成在了`react-scripts`模块中，放在了`node_modules`中。但是通常我们都会在默认的基础上进行扩展安装，例如react-router
-dom/axios...在例如less/less-loader....

1. 情况一

我们安装的其他组件，不需要修改`webpack`配置项，我们直接安装调用即可。

2. 情况二

我们安装的模块需要修改`webpack`配置项，首先需要把隐藏的到`node_modules`的配置项暴露在项目中，然后在对其进行修改。

暴露配置项，不可逆转，如果项目基于git管理，需要先git提交到历史区。运行命令

``` bash
$ yarn eject
```

项目中多了两个文件夹，一个是`config`，一个是`scripts`，`package.json`配置项也修改了。

- `HTTPS`协议模式

``` bash
$set HTTPS=true&&npm satrt
```

- 修改端口号

```bash
$set PORT=1024&&npm strt
```

## JSX

> JavaScript+XML(HTML)

### 渲染

```javascript
/*
 * JSX: react虚拟元素
 * CONTAINER: 容器  我们想把元素放在页面的哪个容器中
 * CALLBACK: 当吧内容放到页面中呈现触发的回调函数
 */
 
ReactDOM.render([JSX],[CONTAINER],[CALLBACK]);
```

### 特点

- 不建议把JSX直接渲染到`body`中，而是应该放到一个自己创建的容器中。（一般放到id为root的div中）
- 在JSX中出现的`{}`是存放js的，但是要求js代码执行完成有返回结果。（js表达式）
    - 不能存放对象(除了给`style`赋值)，函数，数组(数组中如果没有对象都是基本值或者是`   JSX`元素都是可以的)
    - 可以是基本类型的值（null,undefined,布尔都是什么都不显示）
    - 循环判断语句都不支持，但是支持三元运算符
- 循环数组创建JSX元素（一般都基于数组`MAP`的方法完成迭代），需要给创建的元素唯一的`key`值
- 只能出现一个根元素
- 给元素设置class类名用的是`className`
- `style`中不能写字符串，需要基于一个样式对象来遍历赋值。

``` jsx harmony
style={{color: 'red'fontSize='12px'}}
```

### JSX渲染流程（虚拟DOM渲染为真实DOM）

1. 基于`Babel`中的语法解析模块`Babel-preset-react`,把JSX语法编译为React.createElement(...)结构
2. 执行`React.createElement(type,props,...children)`,创建一个对象（虚拟DOM）;

``` javascript
/*
 * type: 标签名
 * props: 对象 (包含传过来的属性和children)
 * ref: null
 * key: null
 *
*/

React.createElement = (type, props, ...children)=> {
    let ref = null, key=null;
    props = props || {};
    'ref' in props ? (ref = props['ref'], props['ref'] = undefiend) :null;
    'key' in props ? (key = props['key'], props['key'] = undefiend) :null;
    return {
        type,
        props: {
            ...props,
            children: children.length<=1 ? (children[0] || "") : children,
        },
        ref,
        key,
    }
};
```

3. `ReactDOM.render(JSX语法最后生成的对象，容器)`，基于render方法把生成的对象动态创建为DOM元素，插入到容器当中。

``` javascript
/* @params:
 *  JSX
 *  container
 *  callback
*/
let render = (JSX, container, callbak)=> {
    let {type, props} = JSX,
        {children} = props,
        newElement = document.createElement(type);
     
    // 一些简单的处理模拟
    for(let attr in props) {
        let valueJSX = props[attr];
        if(!props.harOwnProperty(attr)) break;
        typeof valueJSX === 'undefined'?valueJSX='':null;
        // 事件处理
        let eventReg = /^on/;
        if(eventReg.test(attr)) {
            newElment.addEventListener(attr.toLowerCase().substr(2), valueJSX.bind(undefinend), false);
            continue;
        }
        
        // 属性处理
        switch(attr.toUpperCase()){
            case 'className':
                 newElment.setAttribute('class', valueJSX);
                 break;
            case 'style':
                for(let styAttr in valueJSX) {
                    if(valueJSX.hasOwnProperty(styAttr)) {
                        newElement.style[styAttr] = valueJSX[styAttr];
                    }
                }
                break;
            case 'children':
                !(valueJSX instanceof Array) ? valueJSX=[valueJSX] : null;
                valueJSX.forEach((item,index)=> {
                    if(typeof item==='string') {
                        newElement .appendChild(document.createTextNode(item));
                        return;
                    }
                    render(item, newElemnt);
                });
                break;
            default:
                 newElment.setAttribute(attr, valueJSX);
        }
        newElment.setAttribute(attr, valueJSX);
        
    }
        
    container.appendChild(newElement);
    callbak && callbak();
}

```

## React组件

[优势]

1. 有助于多人协作开发
2. 可以被复用
3. ...

### 组件的属性和状态

1. 组件的属性:[只读]调取组件的时候传递进来的
2. 组件的状态:[读写]自己在组件中设定和规划的。（只有类声明式组件才存在状态管理）
3. 组件中的状态类似于`VUE`中的数据驱动，React数据绑定式基于状态的，当修改组件状态时，对应的JSX元素也会跟着重新渲染（差异渲染: 只把数据改变的地方重新渲染，基于`DOM-DIFF`算法完成）。


### React中组件创建方式

- 函数声明式组件

1. 函数返回结果是一个新的JSX
2. 每一个组件都需要引入React，因为需要借助它的`createElement`把JSX进行解析渲染
3. props变量存储的值是一个变量，包含了调取组件时候传递的属性值  (不传递是一个空对象)
4. 基于`createElement`把JSX转化为一个对象，当 `render`方法渲染这个对象的时候，遇到`TYPE`是一个函数或者类，不是直接创建元素，而是先把方法执行。
    - 如果是函数式声明，就把它当作函数执行，里面的`this`指向`window`，把函数返回的JSX元素进行渲染。
    - 如果是类式声明组件，会把当前类`new`执行，创建一个类的实例，里面的`this`指向当前实例，执行render方法把类中JSX进行渲染。所以类式声明的组件必须要有一个`render`方法，方法中返回JSX元素。

``` js
import React from 'react';

export default function Dialog(props) {
	let {con, lx = 0} = props,
		title = lx === 0 ? '系统提示' : '系统警告';
	
	return <section>
		<h3>{title}</h3>
		<div>{con}</div>
	</section>;
}
```

- 基于继承`component`类来创建组件

``` js
class Dialog extends React.Component {
	constructor(props) {
	// 在继承父类私有的时候，就把属性挂载到当前实例上
		super(props);
		/*
		* this.props: 属性集合
		* this.refs:  REF集合 （非受控组件集合）
		* this.context: 上下文
		* this.updater: 
		* */
		console.log(props);
		console.log(this.props);
	}

    // render必须存在 切必须返回jsx对象
	render() {
		return <section>
			<h3>系统提示</h3>
			<div>2</div>
		</section>;
	}
}
```

### 两种创建方式对比总结

1. 函数式
    - 操作简单。
    - 实现的功能也简单，只是简单的调取和返回JSX而已。

2. 类式创建
    - 操作相对复杂，但是也可以实现更为复杂的功能
    - 能够使用生命周期函数操作业务
    - 函数式可以理解为静态组件（组件中的内容调取的时候就已经固定了，很难修改），而类这种方式，可以基于组件内部的状态来动态更新渲染元素。

3. 属性管理
    - 组件中的属性式调取组件的时候（创建类实例的时候）传递给组件的信息。而这部分信息是"只读"的=》组件的属性是只读的。
4. 在React组件当中
    - 基于数据驱动（修改状态数据，React帮助我们重新渲染）完成的组件叫做“受控组件”。（建议）       
    - 基于`ref`操作DOM实现视图更新的叫做“非受控组件”
    
### 复合组件之间传递值

- 父组件传递值给子组件
    1. 基于属性传递即可(单方向)，子组件通过`props`获取
    2. 上下文传递: 在父组件中首先设置子组件上下文属性值类型（暂存），然后获取子组件的上下文（设置子组件上下文信息）,最后在子组件中使用传递进来的上下文类型。
    
```javascript
// 需要用facebook的类型验证插件
import PropTypes from "prop-types";

class Vote extends React.Component {
  static childContextTypes = {
      n: PropTypes.number,
      m: PropTypes.number	
  };
  
  // return值是给子组件设置的上下文
  getChildContext() {
  	let {count: {n=0,m=0}} = this.props;
  	return {
  		n,
  		m,
  	}
  }
  
}

// 在子组件中取用 设置哪个类型才有哪个属性，必须和父组件中类型一致。
class VoteChild extends React.Component {
	static contextTypes = {
		n: PropTypes.number,
		m: PropTypes.number,
	};
	
	constructor(props, context) {
		super(props, context)
	}
  
}
```

后期子组件的信息需要修改: 可以让父组件传递给子组件的信息发生变化，也就是子组件接受的属性发生变化，子组件会重新渲染。触发=》`componentWillReceiveProps`钩子函数。

- 子组件修改父组件
    - 把父组件中的一个方法作为属性或者上下文传递给子组件
    - 在子组件中，把基于属性或者上下文传递进来的方法，在适当的时候执行，相当于在执行父组件的方法，而这个方法完全可以操作父组件中的信息。

- 平行组件
    1. 让两个平行组件拥有一个共同的父组件
    2. redux

## React中的生命周期函数（钩子函数）

描述一个程序或者组件从创建到销毁的过程，我们可以在过程中间基于钩子函数完成一些自己的操作。

### 基本流程

- 第一次创建渲染

1. `constructor` 创建一个组件
    - componentWillMount 第一次渲染之前
2. `render` 第一次渲染
    - componentDidMount 第一次渲染之后

- 修改组件[当组件的状态数据发生改变（set-state）或者传递给组件的属性发生改变（重新调用组件传递不同的属性）]都会发生`render`重新渲染（差异渲染）

    - shouldComponentUpdate 是否容许组件重新渲染（容许则执行后面函数，不容许则直接结束）
    - componentWillUpdate 重新渲染之前 
3. `render` 第二次及以后重新渲染
    - componentDidUpdate 重新渲染之后
    - componentWillReceiveProps: 父组件把传递给子组件的属性发生改变后触发的钩子函数

- 卸载组件: 原有渲染内容不会消失的，只不过以后不能基于数据改变视图了。
    - componentWillUnmount: 卸载组件之前

### 图示

![react生命周期](../images/react_life.png)


## Redux

> 进行状态统一管理的类库（适用于任何技术体系的项目）

1. 只要有两个或者多个组件之间想要实现信息的共享，都可以基于`redux`解决，把共享的信息存储到redux容器中进行管理。
2. `redux`还可以做临时存储，页面加载的时候把从服务器获取到的数据信息存储到`redux`中，组件渲染需要的数据直接从`redux`中获取。（localStorage）

### Redux核心方法

``` js
/* 
 * 创建redux容器
 *    reducer: 容器管理员
 * 
 * 返回的结果:
 *    dispatch: 任务派发
 *    getState: 获取容器中的状态
 *    subscribe: 向事件池中增加方法
*/
```

### redux项目使用目录结构

1. `src`下创建`store`文件夹作为整个项目的状态管理文件夹。
2. `store`文件夹包含:
    - `index.js`文件: 创建一个状态管理的容器，接收一个管理员（@params: reducer）作为参数。
    - `actionType.js`文件: 所有行为派发的标识管理
    - `action`文件夹: 每个模块修改redux容器中的状态，派发的任务都在这(actionCreator) index也是合并所有的action。
    - `reducer`文件夹: 把所有的reducer合并成为一个reducer 一个store只有一个reducer。合并reducer的时候，为了保证每一个模块管理的状态信息不冲突，在redux中依照模块的名称合并，并且在以合并的时候作为属性名为主，作为最后划分管理的名字。
    ``` jsx
      /*
       * 1. 从redux中解构出合并reducer的方法
       * 2. 引入文件夹下各个模块的reducer
       */
      import { combineReducers } from 'redux';

      import vote from './vote';
      import personal from './personal';
      
      let reducer = combineReducers({
        vote,
        personal,
      });

      export default reducer;
    ```

### react-redux

``` js
/* 
 * @params:
 *  1. Provider: 根组件，当前项目都在`Provider`组件下，作用就是把创建的`store`可以在整个项目的组件中使用(基于上下文完成)
 *  2. connect: 高阶组件 
*/
import ReactDOM, {render} from "react-dom";
import {Provider, connect} from "react-redux";
render(<Provider>
  // 只容许出现一个子元素
</Provider>, root);
```

#### 使用步骤

1. 把我们创建的store挂载到react-redux提供的`Provider`组件（项目根组件）上。

```js
import store from './store';
import {Provider, connect} from 'react-redux';

ReactDOM.render(<Provider store={store}>
  <div>
    <Button />
    <Header />
  </div>
</Provider>,root);
```

2. 在组件中使用的时候，我们不直接返回创建的组件，而是返回一个由`connect`高阶组件创建后的组件

```js
import React from "react";
import {connect} from 'react-redux';

class SomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }
 
}
export default connect(state=>(...state), action.vote)(SomeComponent);
```
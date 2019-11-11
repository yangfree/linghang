---
title: Js设计模式
sidebar: auto
---

![javascript中类的原型图](/images/class_prototype.png "javascript中类的原型图")

## 1. Js设计模式-面向对象的javascript

### 1.1一切皆对象

在 `JavaScript` 中，**对象**是由属性和其对应的方法组成，而具有相同或相似性质的对象的抽象就是**类**。每个类都有一个 `prototype` 属性，它是一个对象，其 `constructor` 属性指向自己本身。而通过 `new` 关键字创造的**实例**都是一个对象，它有一个 `__proto__` 的虚拟属性，并且指向类的原型。因 `Object` 是所有类的基类，所以，所有类都指向其原型。以下代码可以辅助理解：

``` javascript
// 定义一个类
function Animal() {}

Animal.prototype.sayName = function(name) {
    console.log( `hello: ${name}` );
};

// 创建类的实例
let a = new Animal("a");
let b = new Animal("b");

console.log(Animal.prototype.constructor === Animal); // true
console.log(a.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); //true
```

### 1.2多态

对于多态的理解来自于《JavaScript 设计模式与开发实践》一书中的解释：

> 同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与 “可能改变的事物”分离开来。

示例：

下课铃声响了，当我们听到后，会做出不同的反应，有人要睡觉，有的人要去打水...

``` javascript
let bellRang = function(student) {
    student.doSomething();
};
let SleepStudents = function() {};
SleepStudents.prototype.doSomething = function() {
    console.log("我要睡觉.");
};
let WaterStudents = function() {};
WaterStudents.prototype.doSomething = function() {
    console.log("我要喝水.");
};
bellRang(new SleepStudents()); // 我要睡觉
bellRang(new WaterStudents()); // 我要喝水
```

所以我们常说的多态是说对象的多态性，当听到铃声后，不同的人听到后会有不同的反应。假如此时我们需要在添加一个我要上厕所的反应，只需要追加它自己本身就可以。

``` javascript
let WcStudents = function() {};
WcStudents.prototype.doSomething = function() {
    console.log("我要上厕所.");
};
bellRang(new WcStudents()); // 我要上厕所
```

### 1.3继承

创建一个或多个类的专门版本类方式称为继承（ `Javascript` 只支持单继承）。 创建的专门版本的类通常叫做子类，另外的类通常叫做父类。 在 `Javascript` 中，继承通过赋予子类一个父类的实例并专门化子类来实现。在现代浏览器中你可以使用 `Object.create` 实现继承.

在下面的例子中, 我们定义了 Student 类作为 Person 类的子类. 之后我们重定义 sayHello()方法并添加了 sayGoodBye()方法.

``` javascript
// 定义Person构造器
function Person(firstName) {
    this.firstName = firstName;
}

// 在Person.prototype中加入方法
Person.prototype.walk = function() {
    alert("I am walking!");
};
Person.prototype.sayHello = function() {
    alert("Hello, I'm " + this.firstName);
};

// 定义Student构造器
function Student(firstName, subject) {
    // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
    Person.call(this, firstName);

    // 初始化Student类特有属性
    this.subject = subject;
}

// 建立一个由Person.prototype继承而来的Student.prototype对象.
// 注意: 常见的错误是使用 "new Person()"来建立Student.prototype.
// 这样做的错误之处有很多, 最重要的一点是我们在实例化时
// 不能赋予Person类任何的FirstName参数
// 调用Person的正确位置如下，我们从Student中来调用它
Student.prototype = Object.create(Person.prototype) || createObject(obj);

function createObject(obj) {
    function F() {}
    ctor.prototype = obj;
    return new F();
}

// 设置"constructor" 属性指向Student
Student.prototype.constructor = Student;

// 更换"sayHello" 方法
Student.prototype.sayHello = function() {
    console.log(
        "Hello, I'm " + this.firstName + ". I'm studying " + this.subject + "."
    );
};

// 加入"sayGoodBye" 方法
Student.prototype.sayGoodBye = function() {
    console.log("Goodbye!");
};

// 测试实例:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello(); // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk(); // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
console.log(student1 instanceof Person); // true
console.log(student1 instanceof Student); // true

// Usage:
Student.prototype = createObject(Person.prototype);
```

继承部分引用地址:[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

### 1.4封装

我对于封装的理解就是**隐藏**，除了暴露出必须要暴露的东西，其他一切最好都隐藏。

### 1.5this指向

在 `JavaScript` 中， `this` 的指向一般分为：

* 作为对象的方法调用（this 指向该对象）
* 作为普通函数调用(this 指向 window)
* 构造器调用 (1. 通常指向实例。2. 有返回值并且是引用数据类型指向返回值)
* 定时器 (window)
* `Function.prototype.call` , `Function.prototype.apply` 或 `Function.prototype.bind` 调用。(根据需求动态的 this 指向)

### 1.6call, apply, bind

`call` , `apply` 和 `bind` 都可以用来改变 this 指向，区别是 `call` 和 `apply` 会让函数立即执行， `bind` 仅仅改变了 `this` 的指向，函数并不会执行。

`call` 和 `apply` 的区别是传入的第二个参数不同，第一个参数都是指定 `this` 的指向，第二个参数 `apply` 接受一个数组（类数组）， `call` 是依次传入。

对于 `JavaScript` 开发者来说，闭包(closure)是一个很抽象但是又必须要理解的概念，而函数作为 `JavaScript` 中的一等公民也是我们必须要研究的对象，这篇文章写的并不流畅，期间多次查阅资料加上自己的理解才得以完成，所以，文章中简述的不一定正确，一千人眼里有一千个哈姆雷特，同样，一千人里也有一千种理解，对于闭包，对于高阶函数，我们始终在修行。

## 2. Js设计模式-闭包和高阶函数

### 2.1闭包

我理解的闭包主要有两个作用，一是保护里面的变量不受外界的干扰；二是可以用来存值变相延长变量的生命周期。所以，要理解闭包，首先要理解 `JS` 中的变量作用域和生命周期。

* 变量作用域

变量的作用域是指变量的有效范围，在 `JS` 中，全局作用域下通过 `var` (ES6: `let` / `const` )关键字声明的变量是全局变量，而在函数或者块级作用域下声明的变量只属于当前作用域（局部作用域），如下代码:

``` javascript
var a = "window"; //全局作用域下
function alertNum() {
    var a = "function"; // 局部作用域
    alert(a);
}
alertNum(); // function
alert(a); // window
```

函数 `alertNum` 执行，会弹出在自己作用域下定义的 a，输出 `function` , 而在全局作用域下的 alert 会弹出在全局作用域下定义的 a, 所以输出 `window` .

* 变量的生命周期

变量的生命周期指的是变量从声明到销毁的过程。上面我们讲到了变量的创建，而变量的销毁则需要浏览器通过**标记清除**和**引用计数**两种方法实现。这两种方法有一个本质上相同的地方，即当函数执行完毕且变量没有被占用的时候会逐步进行清除。

``` javascript
// 1.退出函数后局部变量a 将被销毁
var func = function() {
    var a = 1;
    alert(a);
};
func();
// 2.退出函数后，变量a并没有被消除而是被保存起来
var func = function() {
    var a = 1;
    return function() {
        a++;
        alert(a);
    };
};
var f = func();
f(); //2
f(); //3
```

以上的第二种情况下，变量 a 的生命周期因为某些原因似乎被延续了，当我们反复执行 `f` 的时候，数字会一直累加。而我们返回的匿名函数访问到了在 `func` 中定义的 a 的指，并且执行的结果被外面的 `f` 接收，这就有了不被销毁的理由，而匿名函数此时就会形成一个闭包结构。

### 2.2闭包的定义

**闭包:**闭包的形成和变量的作用域和生命周期有很大的关系，它可以看成是函数之间由内到外单向通信的桥梁(桥梁比喻引自阮一峰老师的比喻)。闭包有两个作用：

* 保护变量的纯粹性
* 存值

### 闭包的应用场景

* for 循环保存当前值
* 封装变量的私有性，减少变量的命名冲突
* 延长变量的生命周期
* ...

### 2.3高阶函数

函数作为 `JavaScript` 的一等公民，我们很难用一篇文章来描述清楚，下面只是一些简单的介绍，其实满足以下条件之一的函数都可以称之为**高阶函数:**

* 函数作为参数传递 (callback)
* 函数作为返回值输出 (return Function)

### 2.4AOP

> 面向切面编程的一种体现（其实不太懂）

``` javascript
Function.prototype.before = function(beforefn) {
    let _self = this;
    return function() {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    };
};
Function.prototype.after = function(afterfn) {
    let _self = this;
    return function() {
        let set = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return set;
    };
};
let func = () => console.log("func");
func = func
    .before(() => {
        console.log("=====before=====");
    })
    .after(() => {
        console.log("=====after=====");
    });
func();

// =====before=====
// func
// =====after=====
```

### 2.5currying 函数柯里化

柯里化又称部分求值。一个柯里化的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的**闭包**中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
假设我们要计算一个月的流水账：

``` javascript
let allDayCost = 0;
let totalCost = function(everyDayCost) {
    defaultDayCost += everyDayCost;
};
totalCost(100); // 第一天
totalCost(150); // 第二天
totalCost(120); // 第三天
...
console.log(allDayCost); // 全部开销: 370
```

但其实实际上，我们并不关心每天的开销，我们只想统计这一个月总共的开销是多少，所以以上的函数会进行很多的重复计算，而我们仅仅需要的是把每天的开销记录起来，然后在月底进行一次计算即可，下面是更改过的代码。

``` javascript
// 定义totalCost函数，它接受一个函数作为参数，用来进行判断到底是要存值还是需要计算
let totalCost = function(fn) {
    let everyDayCost = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, everyDayCost);
        } else {
            [].push.apply(everyDayCost, arguments);
            return arguments.callee;
        }
    };
};
// 作为参数的函数，用来执行计算，并且利用闭包存值
let costMoney = (function() {
    let money = 0;
    return function() {
        for (let i = 0; i < arguments.length; i++) {
            money += arguments[i];
        }
        return money;
    };
})();
let costResult = totalCost(costMoney);
// 在这里并不会求值
console.log(costResult(200));
console.log(costResult(100));
console.log(costResult(20));
// 只有在最后一次的时候才会计算求值
console.log(costResult()); // 320
```

当我们调用 `costResult` 的时候，如果有参数（即每天的开销），表示此时我们应该对其进行存储处理而不是计算，只有当我们不带任何参数执行 `costResult` 的时候，才真正进行计算求值。

当我们在进行重复操作，比如以上例子，处理某些浏览器兼容，数据的类型判断等只需要执行一遍的时候就应该考虑函数柯里化，它会给代码的性能带来极大的提升。

### 2.6函数节流

在许多场景中，我们可能不太需要过于频繁的调用函数，常见的情况一般是在监控事件，拖拽事件还有监听事件。

`window.onresize` 事件，只要我们改变浏览器的窗口就会时时刻刻都在触发，而我们有时候可能仅仅让它 5s 触发一次就可以，这个时候我们就需要忽略掉一些事件请求，大多数情况下，我们可以借助定时器来完成。

``` javascript
let browerWindow = function(fn) {
    let _self = fn,
        timer,
        firstTime = true;

    return function() {
        let args = arguments,
            _this = this;
        // 第一次执行 不延迟
        if (firstTime) {
            _self.apply(_this, args);
            return (firstTime = false);
        }

        if (timer) {
            return false;
        }
        // 定时器实现延迟执行
        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.apply(_this, args);
        }, 5000);
    };
};
// 调用
window.onresize = browerWindow(function() {
    console.log(1);
}, 5000);
```


# 1.HTML

## 语义化是什么，很重要，必问

HEAD 仓库找各种 HTML 写法。去搜 meta vp 的写法（国外写法）

你用过哪些 HTML 5 标签
内容相关

-   header
-   main
-   footer
-   article
    功能相关的
-   canvas
-   video
-   audio

后续问题
去看 mdn

-   canvas 是如何进行绘制的？

```js
获取canvas
获取上下文
设置笔刷
设置笔刷位置
```

-   video 加那些属性
    auto play

-   audio 去查 mdn

## 请问什么是 H5

就是移动端页面
千万别说 HTML 5

# CSS

## 两种盒模型分别说一下 必问

为什么会有新的盒模型？
两种哪个好呢？
为什么 border-box 比 content-box 好呢(key word:更方便)

## 如何垂直居中 必问

七种方式实现垂直居中
为什么水平居中容易实现，垂直居中不容易实现（css 回溯机制）

## flex 怎么用 常用属性有哪些 必问

## BFC 是什么 必问

这个很难，一百个人一百个答不对

不要尝试回答 BFC 是什么
用具体的方式来回答他
**块级格式化上下文**

overflow:hidden 让他内部的浮动元素包裹起来

## css 选择器优先级 这个很特么重要，不知道就挂了。

1. 越具体，优先级越高
2. 写在后面的覆盖写在前面的
3. important!最高，能不用就不用

## 清除浮动

背代码

```css
.clearfix {
	content: "";
	display: block/table;
	clear: both;
}
```

把这个`.clearfix`加到容器上，里面的子元素浮动就被清除了

# JS

## ES6 语法知道哪些，分别怎么用

举例 let const class 展开运算符
promise class 必问

es6.ruanyifeng.com
fangyinghang.com/es-6-tutorials/

## promise 你熟不熟 必必必问

### promise

### promise.all

### promise.race

## 手写函数防抖和函数节流

### 节流

举例子：CD 冷却时间，就是用 JS 完成这个冷却时间

```js
function fn() {}
var cd = false
button.onclick = function() {
	if (cd) {
	} else {
		fn()
		cd = true
		var timer = setTimeout(() => {
			cd = false
		}, 3000)
	}
}
```

### 防抖

送外卖存着一会送

```js
var timerId = null
let fn
button.onclick = function() {
	if (timerId) {
		window.clearTimeout(timerId)
	}
	timerId = setTimeout(() => {
		fn()
		timerId = null
	}, 5000)
}
```

## 手写 AJAX 必必必考

背代码

```js
var request = new XMLHttpRequest()
request.open("GET", "/xxx")
request.onreadystatechange = function() {
	if (request.readyState === 4) {
		console.log("请求完成")
		if (request.response.status >= 200 && request.response.status < 300) {
			console.log("请求成功")
		}
	}
}
request.send()
```

简化版：

```js
var request = new XMLHttpRequest()
request.open("GET", "/xxx")
request.onload = () => {
	console.log("请求成功")
}
request.send()
```

## 给一段代码问你 this 是什么

```js
fn()
// this => window/global
obj.fn()
// this => obj
fn.call(xxx)
// this => xxx
fn.apply(xxx)
// this => xxx
fn.bind(xxx)
// this => xxx
new Fn()
// this => 新的对象
fn = () => {}
// this => 外面的 this
```

## 闭包/立即执行函数

搜一搜
方应杭 立即执行函数

## 什么是 JSONP,什么是 CORS，什么是跨域 必必必考

## async/await 怎么用 常考

try catch 捕获异常

## 深拷贝

很多博客都有点 BUG

-   **递归**
-   **判断类型**
-   **检查循环引用(环)**
-   不可能拷贝`__proto__`

## 如何用正则实现 trim()?

乖乖，这个费劲了

```js
function trim(string) {
	return string.replace(/^\s+|\s+$/g, "")
}
```

## 不用 class 如何继承，用 class 如何继承

```js
// 不用class
function Animal() {
	this.a = 1
}
Animal.prototype.move = function() {}

function Dog() {
	Animal.apply(this, arguments)
	this.d = 2
}
let f = function() {}
f.prototype = Animal.prototype
Dog.prototype = new f()

Dog.prototype.constructor = Dog

Dog.say = function() {}
```

```js
// 用class
class Dog extends Animal {
	constructor() {
		super()
	}
}
```

## 如何数组去重

1. hash
2. `[...new Set(array)]`
3. WeakMap(支持所有类型的去重)

## == 的相关题目

我日你哥，这个我用都不用。查真值表？？？
这个...看到就别不写了吧...

## 送命题，手写一个 Promise

他问了就认了你很厉害

```js

```

## eventloop

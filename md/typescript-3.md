# 0.TS 的函数与重载

-   函数/方法：函数是一种特殊的对象
    -   它可以被调用（可以被 call）
    -   如果一个函数是另一个对象的属性，它又被称作方法（面向对象）

# 1.TS 的函数

## I.举个例子感受一下

### i.声明

```ts
function hi() {
	// 具名
	// hi == 'ADDR 303'
	console.log("hi")
}

let hi2 = function() {
	// 匿名
	// hi2 == 'ADDR 330'
	console.log("hi")
}

let hi3 = () => {
	console.log("hi")
}
```

目前和 JS 没什么区别

-   由于 TS 支持 JS 的最新语法
-   所以 TS 支持箭头函数
-   目前开起来和 JS 没什么区别

### ii.传参

```ts
function hi(name: string) {
	console.log(`hi, ${name}`)
}
let hi2 = function(name: string) {
	console.log(`hi, ${name}`)
}
let hi3 = (name: string) => {
	console.log(`hi, ${name}`)
}
```

-   这时候就有区别了
-   加入了参数且规定了其类型

### iii.可选参数

```ts
function hi(name: string, age?: number) {
	console.log(`hi, ${name},age:${age}`)
}
let hi2 = function(name: string, age?: number) {
	console.log(`hi, ${name},age:${age}`)
}
let hi3 = (name: string, age?: number) => {
	console.log(`hi, ${name},age:${age}`)
}
```

-   加入了可选参数`age?`
-   调用函数时可以传`age`参数也可以不传`age`参数
-   但是 name 参数必须要传

```ts
function hi(name: string, age = 18) {
	console.log(`hi, ${name},age:${age}`)
}
let hi2 = function(name: string, age = 18) {
	console.log(`hi, ${name},age:${age}`)
}
let hi3 = (name: string, age = 18) => {
	console.log(`hi, ${name},age:${age}`)
}
```

-   给可选参数一个默认值 18
-   如果调用时传入参数，那么就用传入的参数
-   如果没有传入参数，那么`age`的默认值就是 18
    -   为什么把类型判断删了？
    -   因为 TS 会自动推断 1 类型，从给的 18 这个默认值判断`age`的类型是`number`
    -   所以在这里可以加上类型，但是不需要

### iv.返回值

```ts
function hi(name: string, age = 18): void {
	console.log(`hi, ${name},age:${age}`)
}
let hi2 = function(name: string, age = 18): string {
	console.log(`hi, ${name},age:${age}`)
	if (age > 18) {
		return "hi"
	} else {
		return undefined
	}
}
let hi3 = (name: string, age = 18): string || number => {
  console.log(`hi, ${name},age:${age}`)
  if(age> 18){
    return 'hi'
  }else{
    return 404
  }
}
```

-   声明返回值类型
-   如果没有返回值则加上`void`
-   如果返回一个`string`,那么函数内就一定需要`return`一个`string`(`undefined`属于任何类型所以可以返回)
-   如果因判断条件造成返回值不一定是`string`,那么需要在声明时加上相应类型

### v.内置的 this 和 arguments

-   需要注明的是后面的文章仅仅局限于以下所说的几种情况
-   不包含 apply bind
-   不包含 new
-   不包含 eval
-   不包含 with
-   以上四种情况需要另开一篇文章来说

```ts
function add(a: number, b: number): number {
	// a 和 b 是形式参数
	return a + b
}
add(100, 200) // 实际参数
```

-   当 `add(100,200)` 要进入这个函数的时候会做下面几件事
    -   构造一个 `arguments = { 0: 100, 1: 200, length: 2 }`
    -   `a = arguments[0]` `b = arguments[1]`给形参赋值
    -   形参实际上实在声明一个变量使其能在块内使用
-   `arguments`就是传入函数的所有参数
-   如果只有`arguments`那么还是可以接受的
-   但是好巧不巧 JS 有一个叫做`this`的东西

**关于 this,需要用 call 来解释（JS 的函数里提到过）**

```ts
function add(a: number, b: number): number {
	return a + b
}
let c = add(100, 200) // 并不知道 this 是什么
let d = add.call(undefined, 100, 200) // call 的第一个参数就是 this
```

-   当使用`call`的时候会发生这么几件事
-   `call`的第一个参数就是`this`
-   `this = undefined`(在上面代码中)
-   从`call`的第二个参数开始，是`arguments`

```ts
function printThis() {
	console.log(this)
	console.log(arguements)
}
printThis.call("goddamn", 100, 200)
```

-   真的打出一个`goddamn`
-   只不过是一个在对象里的`goddamn`
-   JS 会自动把`this`包装成一个对象
-   这个特性可以被禁用

```ts
function printThis() {
	"use strict"
	console.log(this)
	console.log(arguements)
}
printThis.call("goddamn", 100, 200)
```

-   居然需要一个严格模式才能让他顺利打出我在`call`的时候传入的`'goddamn'`
-   如果使用`printThis(100,200)`的方式调用
    -   在浏览器环境下`this`就是 `window`（浏览器把全局对象作为 window 的一部分实现了）
    -   开启了`use strict`它会变成 `undefined`
    -   `nodejs`环境时会打出兜底的`global`

**那么`printThis(100,200)`的调用方式就真的不知道`this`指向哪里了吗？**

-   **1.还是有一些规则的**
    -   浏览器环境下 ==> window
    -   node.js 环境下 ==> global
    -   "use stract" 的情况下 ==> undefined
-   总感觉这样是一种不好预测的特性
-   不过 JS 就这样将错就错了，就这样用吧
-   吸收 JS 特性的 TS，有类型的将错就错的语言
-   那么整个前端都在凑合着跑了这么多年，还跑的蛮不错的
    ~~以上为一般情况~~

**2.依据调用时的不同还有别的情况**

```ts
let obj = {
	fn() {
		"use strict"
		console.log(this)
	}
}
obj.fn() // obj
let fn3 = obj.fn
fn3() // undefined
```

-   在上面代码块内的`obj.fn()`的调用方式，`this`就是`.fn()`前面的东西
-   `fn3()`由于加上了`'use strict'`,的结果是`undefined`,为什么呢？因为`this`是一个参数。
-   `fn3()`的调用前面确实什么都没有呀，那么在严格模式下确实是`undefined`呀。参照第一种情况的规则。
-   TS 终于提出了 `this` 是个参数，不是个上下文

### vi.箭头函数

```ts
let fn = (a: number, b: number): number => {
	return a + b // 在内部没有 this arguments new.target
	// 如果写了 this 那么这个 this 就是箭头函数外面的 this
	// 如果写了 arguments ，TS会直接告诉你不许在箭头函数内用它
}
console.log(fn(1, 2))
```

-   在箭头函数内部
    -   没有 this、arguments、new.target
    -   es6 认为 this、arguments 是一个错误
    -   如果在箭头函数内部写了 this
    -   那么这个 this 就是它外部的 this
-   甚至不能在箭头函数内部调用 arguments 这个特性
    -   TS 会报错

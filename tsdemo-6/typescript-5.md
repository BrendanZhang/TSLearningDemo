# 0.上下文

-   我们通常可以听到一个说法
-   this 是上下文(这是不贴切的)
-   那么上下文是什么？

**this 的值是需要联系上下文来确定的。**

```javascript
var app = new Vue({
	el: "xxx",
	created() {
		console.log(this)
	}
})
// 这里的 this 就是 new 出来的这个实例 app
```

-   上下文可以理解为：你需要什么？
-   this 可以理解为你所有需要的东西中最重要的那个

```js
var obj = {
	fnInside() {
		console.log(this)
	}
}
let fn = obj.fnInside
fn()
// 这里 fn 隐藏了上下文，所以 this 是 window，人类会往上找，浏览器不会往上找
```

# 1.规定 this 参数的类型

```ts
interface Human {
	name: string
	age: number
}
function fn(this: Human) {
	console.log(this)
}
fn() // 这时候直接调用就会报错，由于规定 this 的类型是 Human
fn.call({ name: "Brendan", age: 18 })
// 需要使用 call 来调用，传入一个符合 Human 接口的 this 才不会报错
```

举个例子更深刻的理解函数套函数时的 this

```ts
function fn1(this: any, n1: number) {
	console.log(this) // { name: "Brendan" }
	console.log(n1) // 1
	function fn2(this: any, n1: number) {
		console.log(this) // window
		console.log(n1) // 2
	}
	fn2(2)
}
fn1.call({ name: "Brendan" }, 1)
```

-   js 中 this 在每次调函数的时候都会改变
-   在 ts 中，当真正把 this 当作一个参数的时候，就很好理解
-   将 n1 和 this 等同看待的时候，一切就解释的通了

**那么，现在我们还需要上下文这个说法吗？**

# 3.重载

**重载：一个函数有不同的调用方式**

```ts
function add(n1: number, n2: number) // 声明第一种调用形式
function add(n1: string, n2: string) // 声明第二种调用形式
function add(n1, n2) {
	// 声明这个函数的具体实现
	return n1 + n2
}

add(1, 2) // 3
add("Brendan", "Zhang") // BrendanZhang
add(1, "2") // 报错
```

-   声明不同的调用形式
-   在最后声明函数的具体实现

## I.可是我们已经拥有泛型了

泛型太泛了，恐怕不能代替重载

```ts
function add2<T>(n1: T, n2: T): T {
	return n1 + n2 // 泛型无法保证 T 类型一定可以相加所以会报错
}
```

-   重载可以确定具体的类型
-   所以在实现上可以做更具体的事

# 4.类型推论

```ts
function add(n1: string, n2: string) {
	return n1 + n2
}
var s = add("Brendan", "Zealot")
console.log(s.split(""))
// TS 怎么知道 s 是一个字符串？
```

-   这就是类型推断
-   TS 会自己推断会返回什么类型

## I.类型兼容

```ts
interface Human {
	name: string
	age: number
}
/* let y: Human = {
	name: "Brendan",
	age: 19,
	gender: "male"
} */
// 如果直接写 let y: Human
// 会因为 interface 里不存在 gender 属性而报错
let y = {
	name: "Brendan",
	age: 19,
	gender: "male"
}
let x: Human = y
// 但是将这个对象赋给一个变量
// 再通过将这个变量赋给另一个变量，给定接口Human
// 就不会报错
```

-   这是个神奇的现象
-   文档上的解释：
    -   检查 y 是否能赋值给 x
    -   检查 x 的每个属性
    -   是否再 y 中也能找到对赢属性
    -   y 有`string`类型的`name` 和`number`类型的`age`
    -   所以赋值正确
-   好处在于可以少声明一些类型
-   或者少写一些继承

# 5.Unsound?/Sound?/Soundness?

**可靠性？数学问题？**

-   理论上 TS 不会允许做一些危险的事情（不明类型，互相转换）
-   但是有些时候 TS 却支持这么做(明明推断以后有问题却还是给你过)
-   这种特性被称为 Unsound

## I.Unsound

```ts
enum EventType {
	Mouse,
	Keyboard
}

interface Event {
	timestamp: number
}
interface MouseEvent extends Event {
	x: number
	y: number
}
interface KeyEvent extends Event {
	keyCode: number
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
	/* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y))
// 如何保证 e 是 MouseEvent ?

listenEvent(EventType.Mouse, (e: Event) =>
	console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y)
)
// 如何保证 e 一定有 x 和 y
```

-   这段代码中 `listenEvent` 的第二个参数需要传一个接口为 `Event` 的对象
-   但是调用时却规定 `e: MouseEvent`
-   我们无法保证`e`一定是`Event`
    -   后面一段更明显了
    -   传入`e:Event`,但是打印`e.x`及`e.y`
    -   我如何保证`e`一定有`x`和`y`
-   在逻辑上推论这也许有些瑕疵
-   但是 TS 允许这么做

## II.Sound

**这个标准就很严格了，完全不允许 Unsound 的事情**

```ts
interface Human {
	name: string
	age: number
}
let y = {
	name: "Brendan",
	age: 19,
	gender: "male"
}
let x: Human = y
```

这种写法是不允许的

-   形式化的证明逻辑正确的类型系统不是 TS 的目标
-   TS 的类型系统允许逻辑上的不完备
-   TS 需要在正确性和效率上找到平衡(80%正确和更高的效率)
    -   所以没必要针对一门语言是否 sound 展开讨论
    -   Java 比 TS 严格一点，但依旧不 sound (听说的)
    -   C# 也不 sound (听说的)
    -   JS 超级 Unsound (用过都知道)
-   sound 是类型系统的特征

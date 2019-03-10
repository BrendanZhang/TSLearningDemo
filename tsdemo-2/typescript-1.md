七种数据类型
`string number null boolean symbol object undefined`

加上
`枚举 any void never`

贴心的`typescript`给 JS 使用者一个贴心的`any`让它可以转变类型
`void` 空类型

在 TS 里，`undefined`和`null`是所有类型的子类型，你可以把他们赋给所有类型。

# 断言

## I.也叫类型转换

当我们习惯了 JS 里的

```javascript
let a = "123"
a = a + 0
//这种办法把 a 变成一个数字
a = a + ""
//或者这样把 a 变成一个字符串
```

在 TS 里，他会告诉你 Naive！
我最讨厌你们偷偷摸摸瞎改类型了

### i.尖括号

可以通过尖括号语法将更抽象的类型变成更具体的类型

```typescript
let n: any = "123"
console.log(<string>n.split(""))
```

在 n 之前加上`<类型名>`，告诉 TS 我很清楚这是相应类型，不用给我报错。

### ii.as

```typescript
let n: any = "123"
console.log(n as string.split(""))
```

和尖括号一样，能够告诉 TS 这是什么类型，虽然不会被检查错误，但如果出错
依旧会在运行的时候报错。

## II.然而这才是真正的类型转换

```ts
let a: number = 123
let b: string = a.toString()

let c: string = "12.3"
let d: number = parseFloat(c) //整数parseInt

let s1: number = 1
let b1: boolean = !!s1
console.log(b1) // 虽然没什么意义，但是这样确实能变成布尔
// 不过还是推荐这么写
let s2: number = 1
let b2: boolean = Boolean(s2)
console.log(b2)

// 对象和字符串
let obj = { name: "Brendan", age: "18" }
let string = JSON.stringify(obj)
console.log(string)

let string2 = `{"name": "frank", "age": 18}`
let obj2 = JSON.parse(string2)
console.log(typeof obj2)
```

# 变量

```ts
var a // 跟他说再见吧，现在是ts时间
let a
const a
```

## 1.let

-   不能重复声明

## 2.const

-   只能赋值一次
-   声明的值不能再改变

也就是一个常量

### I.const 一定不能改吗

```ts
const b = {
	name: "Brendan"
}

b.name = "Zhang"
console.log(b)
```

-   以上代码是成立的，那么是不是说 const 可以改呢？
-   并不是，这里要运用内存方面的知识了
-   `const b` 存储了 b 的地址 `ADDR 1092`(举个例子)
-   那么如果我更改地址指向的对象里的值，并不违背`const`常量不改变值的原则。
-   `const`存的地址的值依旧没变

# 解构：这是一种很好用的声明方式

## II.对象的解构

```ts
{
	let obj = {
		name: "Brendan",
		age: 18,
		nation: "China"
	}

	let name = obj.name
	let age = obj.age
	let nation = obj.nation
	// 上面这三行可以用以下一行替代
	let { name, age, nation } = obj

	console.log(name, age, nation)=-

	// 这叫做，函数的解构
}
```

## I.数组的解构

```ts
let arr = ["apple", "orange", "watermelon"]
let fruit1 = arr[0]
let fruit2 = arr[1]
let fruit3 = arr[2]
// 等效于
let [fruit1, fruit2, fruit3] = arr
console.log(fruit1, fruit2, fruit3)
```

## III.函数的解构

```ts
function sayHi(person: any) {
	console.log(`Hi,${person.name},${person.age}`)
}
sayHi({ name: "Brendan", age: 18 })
//这么写感觉 person 写了很多次很麻烦

function sayHi({ name, age }: any) {
	console.log(`Hi,${name},${age}`)
}
sayHi({ name: "Brendan", age: 18 })
```

-   函数传入的参数也可以解构
-   这样就不需要给函数参数名了,直接传东西就行了

# 展开

```ts
// 如何将两个数组加起来？
// 三个点解决这个问题，有没有很像 es6

let a1 = [1, 2, 3]
let a2 = [4, 5, 6]
let a3 = [...a1, ...a2]
console.log(a3)
```

-   三个点表达了你有什么参数我都复制过来
-   在对象拷贝（对象属性没有复杂对象时）时，也可使用

# 接口

## I.接口之前

### i.函数和方法有什么区别

-   当一个函数是一个对象的属性的时候
-   我们把这个函数称为该对象的方法

```ts
// 函数 function
function fn() {
	console.log(1)
}

// 方法 methods
let obj = {
	fn: function() {
		console.log(1)
	}
}
```

**函数依附于对象的时候被叫做对象**

## II.接口来了

```ts
interface Shape {
	head: string
	body: string
}
interface Human {
	name: string
	age: number
	shape: Shape
	talk(word: string): void
}
let Brendan: Human = {
	name: "Brendan",
	age: 24,
	shape: {
		head: "exist",
		body: "exist"
	},
	talk(word: string) {
		console.log(word)
	}
}
Brendan.name = "Brendan"
Brendan.age = 18

Brendan.talk("Here I comes")
```

-   interface 就是描述一个对象必须有什么属性（包括方法）
-   但是有没有其他属性就不管了
-   可以多，不能少

### i.常量和只读属性

-   我们知道 TS 的常量用 `const` 定义
-   而 TS 又是一门和 C# 非常类似的语言
-   那么在我们不希望某个属性被轻易改动的时候
-   使用 `readonly` 定义一个只读属性就可以使改属性无法被改动

### ii.可选属性

```ts
interface Shape {
	head: string
	body: string
}
interface Human {
	name: string
	age: number
	shape: Shape
	talk(word: string): void
	hobby?: Array<string>
	// 在这里 hobby 就是一个可选属性(万一这个人清心寡欲呢？)
}
let Brendan: Human = {
	name: "Brendan",
	age: 24,
	shape: {
		head: "exist",
		body: "exist"
	},
	talk(word: string) {
		console.log(word)
	}
	// 这里 hobby 属性是可选的，因此在不填写的情况下也不会报错
}
```

-   interface 有个问题
-   当你给定一个函数，传入一个接口的时候。
-   如果该接口都是可选属性
-   但是又想用户传入数据都是可控的
-   这时候就需要一些特殊处理

### iii.如果我想传入 interface 之外的属性怎么办？

```ts
interface SquareConfig {
	color?: string
	width?: number
}

function createSquare(config: SquareConfig): void {
	// ...
}

let mySquare = createSquare({ colour: "red", width: 100 })
```

**使用类型断言**

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

**使用索引签名**

```ts
interface SquareConfig {
	color?: string
	width?: number
	[propName: string]: any
}
```

### iv.如果 interface 的属性是个函数怎么办？

**interface 当然可以描述一个函数**

```ts
interface calculator {
	(a: number, b: number): number
}

let add: calculator = function(a: number, b: number): number {
	return a + b
}
```

### v.如果一个函数他有个属性是函数呢？

```ts
interface calculator {
	(a: number, b: number): number
	antiCal(a: number, b: number): number
}

let add: calculator = ((): calculator => {
	let x: any = function(a: number, b: number): number {
		return a + b
	}
	x.antiCal = function(a: number, b: number): number {
		return a - b
	}
	return x
})()
console.log(add(1, 2))
```

## III.接口的继承

`extends`

```ts
interface Animal {
	move(): void
}
interface Human extends Animal {
	name: string
	age: number
}
let Brendan: Human = {
	age: 18,
	name: "Brendan",
	move() {
		console.log("我在动")
	}
}
```

-   人类继承自动物
-   定义 Brendan 为人类
-   那么 Brendan 一定有动物的 move，人类的 age 和 name

### i.甚至可以继承多个接口

```ts
interface Animal {
	move(): void
}
interface element {
	C: boolean
	H: boolean
	O: boolean
}
interface Human extends Animal, element {
	name: string
	age: number
}
let Brendan: Human = {
	age: 18,
	name: "Brendan",
	C: true,
	H: true,
	O: true,
	move() {
		console.log("我在动")
	}
}
```

### ii.也可以继承一个继承了其他接口的接口

这句话听起来比较奇怪

```ts
interface element {
	C: boolean
	H: boolean
	O: boolean
}
interface Animal extends element {
	move(): void
}
interface Human extends Animal {
	name: string
	age: number
}
let Brendan: Human = {
	age: 18,
	name: "Brendan",
	C: true,
	H: true,
	O: true,
	move() {
		console.log("我在动")
	}
}
```

# 枚举

-   这个特性是从 C# 里搞来的
-   C# 是 Hejisberg 开发的
-   TypeScript 也是微软的首席架构师 Hejisberg 开发的

这位大佬强到无法形容，这就是 typescript 总能找到 C# 的影子

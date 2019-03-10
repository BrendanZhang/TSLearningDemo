# 0.TS 里的类

## I.类是什么

文档告诉我们

-   类就是用来创造对象的东西
-   有一些语言（如 JAVA）创建对象必须先声明一个类，而有的语言（JS）则不需要
-   对于没有用过 TS 的 JS 程序员，类看起来还蛮无聊的
    -   `我需要什么属性直接加不就行了吗`
-   对于使用过 TS 的 JS 程序员，类可以让你的程序更加的“可预测”
    -   `这个对象不会出现一些我不知道的属性，一切都在掌控中`
-   所以需要学习 TS 的类

**接口是低配版的类，类是高配版的接口**

## II.class 和 interface(类和接口)

-   interface 只是告诉你，对象有些什么属性
-   class 还可以通过参数的形式传入属性
-   通过 `constructor` 构造函数传入属性

### i.添加属性

```ts
class Human {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
}

let Brendan = new Human("Brendan", 18)

console.log(JSON.stringify(Brendan))
```

-   class 可以将对象实例化，同时通过`constructor`构造函数传入属性
-   interface 在对象声明的时候就必须把属性填进去

```ts
interface Human2 {
	name: string
	age: number
}

let Zhang: Human2 = {
	name: "Zhang",
	age: 18
}
```

-   interface 只是对对象做一个约束，不会帮你实现任何功能
-   class 可以实现很多功能
-   这就是为什么说 class 是高配版的 interface

### ii.比如添加一个具体的方法

```ts
class Human {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	move(): void {
		console.log("我在动")
	}
}

// class可以添加一个具体的方法

interface Human2 {
	name: string
	age: number
	move(): void
}
// 而interface只是添加一个签名，表达这个对象包含这个函数
```

```ts
class Human {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	move(): void {}
}

let Brendan = new Human("Brendan", 18)

Brendan.move = () => {
	console.log("我在动")
}
```

-   interface 需要在对象声明中写明这个方法的实现
-   而 class 可以将该方法的实现写在声明里，在实例化过程中赋给对象
-   也可以在后面重新写一个实现
-   可以写一遍的，为何要写两遍

# 1.class 的一些特性

## I.constructor

-   `constructor` 会被放在 class 里面，可以被打印出来
-   这是 JS 的特殊性...

## II.static（类的属性）

-   类的实例化创造对象
-   那么类的属性是否可以访问呢?

```ts
class Human {
	static arg: number = 1
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
}
```

-   `static`就是 Human 类本身的属性
-   可以通过`Human.arg`访问到
-   这是 class 的静态属性

~~虽然目前看起来有点脱裤子放屁的感觉，不过 class 确实是这么规定的~~

## III.this 的使用

-   在 class 中，this 指向当前对象(实例)。（this 不是永远都指向当前对象的，JS 中 this 有很多功能，默认指向 window）

## IV.类的继承

```ts
class Animal {
	kind: string
	birth: string
	move(): void {}
	constructor(kind: string) {
		this.kind = kind
		if (this.kind === "哺乳动物") {
			this.birth = "胎生"
		} else {
			this.birth = "卵生"
		}
	}
}
class Human extends Animal {
	static arg: number = 1
	name: string
	age: number
	constructor(name: string, age: number) {
		super("哺乳动物")
		this.name = name
		this.age = age
	}
}
```

-   和 `interface` 一样，用`extends`继承
-   但是 TS 要求，必须在继承另一个类的时候在`constructor`里调用`super()`
-   该次调用可传参也可不传参，是否传参取决于被继承类的`constructor`
-   这次调用等同于调用了被继承的类的`constructor`
-   如果被继承的类的`constructor`需要一个参数，那么在`super()`调用的时候请传参。

## V.public private 和 protected

-   这三个修饰符是用来修饰对象的属性的作用域的
-   `public`自不必多说，公开属性，可以从外部访问
-   `private`私有属性
-   `protected`保护类型属性
-   这两个就比较特殊了

### i.private

-   `private` 让某个属性无法被调用，成为私有属性
-   只能在当前类的代码块里访问
-   是不是很像局部变量？

```ts
class Human extends Animal {
	static arg: number = 1
	name: string
	age: number
	private secret: string
	// 这里secret就是一个局部变量，仅能在class内部调用
	constructor(name: string, age: number) {
		super("哺乳动物")
		this.name = name
		this.age = age
		this.secret = "这是一个秘密"
	}
}
let Brendan = new Human("Brendan", 18)
console.log(Brendan.secret) // 无法访问，这里是 secret 是个私有属性
```

### ii.protected

-   即不是完全公开的
-   也不是完全不公开的
-   他有一个有限的公开范围
-   被`protected`修饰的属性可以在当前类代码块内访问
-   **也可以在继承当前类的后代（子类）里访问**(这里是和`private`的不同)

```ts
class Animal {
	kind: string
	protected birth: string
	move(): void {}
	constructor(kind: string) {
		this.kind = kind
		if (this.kind === "哺乳动物") {
			this.birth = "胎生"
		} else {
			this.birth = "卵生"
		}
	}
}
class Human extends Animal {
	static arg: number = 1
	name: string
	age: number
	private secret: string
	say(): string {
		this.move()
		return `birth: ${this.birth}`
		// this.birth继承自 Animal，其本身是一个受保护的属性所以可以在自类上访问
	}
	constructor(name: string, age: number) {
		super("哺乳动物")
		this.name = name
		this.age = age
		this.secret = "这是一个秘密"
	}
}
let Brendan = new Human("Brendan", 18)
console.log(Brendan.birth) // 无法访问，这里的 birth 是一个受保护的属性
```

## VI.访问器

-   `get`和`set`
-   一看这两个名字是不是闻到了`vuex`的味道
-   它真的很像`vuex`在修改`store`里的状态时的特性

```ts
class Human extends Animal {
	static arg: number = 1
	public name: string
	private _age: number // 如果将 age 设置为私有属性
	private secret: string
	// 但是又希望外部访问它
	get age() {
		return this._age
	}
	// 那么就需要一个 get 修饰符修饰的函数，在外部调用访问 age
	set age(value: number) {
		if (value <= 0) {
			this._age = 0
		} else if (value > 0) {
			this._age = value
		}
	}
	// 同时如果需要修改 age，那么在外部调用有 set 修饰符的函数来改变 age
	say(): string {
		this.move()
		return `birth: $(this.birth)`
	}
	constructor(name: string, age = 18) {
		super("哺乳动物")
		this.name = name
		this.age = age
		this.secret = "这是一个秘密"
	}
}

let Brendan = new Human("Brendan", 18)
Brendan.age = -1 // 0
// 经由 set age 函数的修正后，_age 属性被改为 0
console.log(Brendan.age)
```

-   命名私有属性 `_age`
-   设置`set age()` 和 `get age(value)` 是为了调用时的可读性
-   这个模式叫做 `get set 模式`
-   把真正用到的值藏起来，在用户想要访问的时候 `get` 该值
-   在用户需要修改的时候，自动走入`set`,调用`set`方法赋给那个藏起来的值

## VII.抽象类

-   看到这名字，还能再抽象？
-   也可以叫做`"爸爸类"`：专门当别人的爸爸的类
-   也可以叫做`"未完成的类"`：只描述有什么方法，并没有完全实现这些方法

**由于这个类未完成(太抽象了)，所以不能创建出对象~~(会报错)~~**

```ts
abstract class Animal {
	abstract makeSound(): void
	move(): void {
		console.log("wandering the earch...")
	}
}
```

-   抽象类必须有抽象方法，抽象方法必须存在于抽象类中
-   抽象方法前面需要加上修饰符 `abstract`
-   抽象方法不写具体实现
    -   是不是感觉很打脸？
    -   `interface`也不写具体实现，只写个方法的签名
    -   现在有了类，搞出来了个抽象类，不写实现。

i**总结一下**

-   如果希望声明一个类
-   又不想实现它的某个方法
-   那么就把这个类和这个方法同时加上`abstract`修饰符

### i.它专门当爸爸的功能

**它的一些特性让他适合当爸爸**

```ts abstract class Animal {
	// 抽象方法必须存在于抽象类中
	kind: string
	birth: string
	move(): void {}
	constructor(kind: string) {
		this.kind = kind
		if (this.kind === "哺乳动物") {
			this.birth = "胎生"
		} else {
			this.birth = "卵生"
		}
	}
	abstract makeNoice(): void
	// 抽象类需要一个抽象方法
}
class Human extends Animal {
	// 抽象类的子类需要实现抽象类的抽象方法
	static arg: number = 1
	public name: string
	private _age: number
	private secret: string
	get age() {
		return this._age
	}
	set age(value: number) {
		if (value <= 0) {
			this._age = 0
		} else if (value > 0) {
			this._age = value
		}
	}
	say(): string {
		this.move()
		return `birth: $(this.birth)`
	}
	// 所以我还需要实现这个抽象方法
	makeNoice() {
		console.log("blablabla~")
	}
	constructor(name: string, age = 18) {
		super("哺乳动物")
		this.name = name
		this.age = age
		this.secret = "这是一个秘密"
	}
}
```

**总结一下**

-   如果有一个类，它有一个方法无法写出它的实现
-   那么就在该方法前面加上一个抽象修饰词
-   如果该方法时抽象方法（方法之前有`abstract`修饰词）
-   那么拥有该方法的类也需要在之前加上`abstract`修饰词，成为抽象类
    -   该抽象类**无法实例化**一个对象
    -   但是它的子类可以去实现这个抽象方法呀
    -   而且它的子类可以去实例化对象
    -   这就是为什么被称作**爸爸类**

文档原文：

```md
-   抽象类作为其他派生类的基类使用（抽象类非要当爸爸）
-   他们一般不会直接被实例化（不能实例化一个对象）
-   不同于接口，抽象类可以包含成员的实现细节（我可以写几个有具体实现的方法）
-   `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。(在发现`abstract`这个修饰词的时候就知道他是个爸爸类)
```

**学习面向对象的过程中，很多概念都是用其他概念来自圆其说**

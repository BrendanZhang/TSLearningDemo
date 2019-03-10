abstract class Animal {
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

let Brendan = new Human("Brendan", 18)
Brendan.age = -1
console.log(Brendan.age)

console.log(JSON.stringify(Brendan))

interface Human2 {
	name: string
	age: number
}

let Zhang: Human2 = {
	name: "Zhang",
	age: 18
}

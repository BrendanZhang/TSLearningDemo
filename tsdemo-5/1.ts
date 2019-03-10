function returnSelf<T>(sth: T): T {
	return sth
}

let s = returnSelf("hi")

function returnarray<t>(array: t[]): t[] {
	return array
}

interface human {
	name: string
	age: number
}
let a = returnarray<human>([
	{ name: "oracle", age: 12 },
	{ name: "brendan", age: 13 }
])

class anyAdd<T> {
	a: T
	b: T
	add(a, b): T {
		return a + b
	}
}
let numberAdd = new anyAdd<number>()
numberAdd.add(1, 2)
let stringAdd = new anyAdd<string>()
stringAdd.add("1", "2")

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


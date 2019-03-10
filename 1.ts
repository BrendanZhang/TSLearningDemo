/* let a: null = null
let b: undefined = undefined
let c: boolean = true
let d: string = "hi"
let e: number = 1.233333
let obj: Object = {}
let n: any = 1
n = "string"

enum Gender {
	Male = 3,
	Famale = 6
}

let gender: Gender = Gender.Male
console.log(gender)
gender = Gender.Famale
console.log(gender) */

/* let n: any = "123"
console.log(<string>n.split(""))
 */

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

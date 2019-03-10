/* enum Gender {
	Male,
	Female
}
interface person {
	gender: Gender
	age: number
}
function merry(a: person, b: person): [person, person] {
	if (a.gender !== b.gender) {
		return [a, b]
	} else {
		throw new Error("性别相同在我国不能结婚")
	}
}

let a = { gender: Gender.Male, age: 22 }
let b = { gender: Gender.Female, age: 20 }
console.log(merry(a, b)) */

//**********************************************//

/* function selectSort(a: number[]): number[] {
	for (let i = 0; i < a.length - 1; i++) {
		let minIndex = i
		for (let j = i + 1; j < a.length; j++) {
			if (a[j] < a[minIndex]) {
				minIndex = j
			}
		}
		let temp = a[minIndex]
		a[minIndex] = a[i]
		a[i] = temp
	}
	return a
}

let b = selectSort([5, 4, 3, 1, 3])
console.log(b) */

/* function add(a: string, b: string): string
function add(a: string, b: number): number
function add(a: any, b: any): any {
	return a + b
}

let c = add("2", 0)

console.log(c) */

/* function min(a: number, b: number): number {
	if (a < b) {
		return a
	} else {
		return b
	}
}

var c = min(1, 2)
console.log(c)
 */

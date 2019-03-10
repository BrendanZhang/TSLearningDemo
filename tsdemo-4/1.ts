let fn = (a: number, b: number): number => {
	return a + b // 没有 this arguements new.target
}
console.log(fn(1, 2))

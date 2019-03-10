#!/usr/bin/env ts-node
let a: number = parseInt(process.argv[2])
let b: number = parseInt(process.argv[3])
if (Number.isNaN(a) || Number.isNaN(b)) {
	console.log("只能接受整数")
	process.exit(1)
}
console.log(a + b)
process.exit(0)

/* 
进程正常退出则 process.exit(0)
进程非正常退出则填写 0 以外的数字
*/

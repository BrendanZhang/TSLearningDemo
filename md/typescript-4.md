# 0.泛型

- 用来表示广泛的类型
- 用尖括号声明占位
- 表示相同类型

```ts
function returnSelf<T>(anything: T): T {
  // 用<T>来声明类型占位符 anything:T 和 returnSelf():T 表示传入参数和返回值是同一个类型
  return anything;
}
let s = returnSelf("hi"); // s的类型是string
```

- 那么问题来了，为什么需要泛型而不用`any`?
- 答案是，我希望确保传入的类型和返回的类型是同一类型
- 如果使用`any`会导致这个函数可以接受任何类型的参数
- 返回任何类型的值

**因此我们需要泛型来表示类型（仅类型，而不表示值）**

## I.泛型的使用

### i.显式声明泛型的类型

```ts
function returnSelf<T>(anything: T): T {
  return anything;
}
let s = returnSelf<string>("hi");
```

- 调用的时候提前规定参数的类型
- 尖括号内的内容如果和参数类型不相符就会报错
- 和 `interface` 配合使用，效果更佳

### ii.类型推断

```ts
function returnSelf<T>(anything: T): T {
  return anything;
}
// 也可以像下面这样写，意思几乎一样
let returnSelf2: <T>(anything: T) => T = returnSelf;
let s = returnSelf("hi");
```

- 更常用的方法
- typescript 会通过传的参数来判断参数的类型

### iii.泛型数组

```ts
function returnArray<T>(array: T[]): T[] {
  return array;
}

interface Human {
  name: string;
  age: number;
}
let a: Array<Human> = returnArray<Human>([
  { name: "Oracle", age: 12 },
  { name: "Brendan", age: 13 }
]);
```

- 有时候我们需要传入一个数组
- 单纯使用`<T>`去占位会使得任何类型的参数被传入
- 当我们要获取`array.length`的时候由于任何类型都会被传入所以`array`未必会有`.length`属性
- 所以需要我们定义一下`T[]`是一个数组
- 且这个函数返回一个`T[]`数组

**这个尖括号看起来是不是有点眼熟**

```ts
let stringArray: Array<string> = ["a", "b", "c"];
```

规定一个数组的成员为`string`，我们在不经意间似乎用到了这个功能
那么这个泛型数组我们可以把它写成:

```ts
function returnArray<T>(array: Array<T>): Array<T> {
  return array;
}
```

### iv.泛型 × 接口

```ts
interface anyAdd<T> {
  (a: T, b: T): T;
}
let numberAdd: anyAdd<number> = (a1: number, b1: number) => {
  return a1 + b1;
};
let stringAdd: anyAdd<string> = (a2: string, b2: string) => {
  return a2 + b2;
};
```

- 定义接口时，将泛型参数作为整个接口的一个参数
- 这样我我们就能明白这个接口具体具体时哪个类型
- 也能知道接口内的其他成员是什么类型了

### v.泛型 × 类

```ts
class anyAdd<T> {
  a: T;
  b: T;
  add(a, b): T {
    return a + b;
  }
}
let numberAdd = new anyAdd<number>();
numberAdd.add(1, 2);
let stringAdd = new anyAdd<string>();
stringAdd.add("1", "2");
```

- 写起来和泛型接口差不多
- 通过`<>`定义泛型类型，写在类名后面

# 1.泛型约束

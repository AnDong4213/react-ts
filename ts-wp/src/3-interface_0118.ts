interface Point {
  readonly x: number,
  readonly y: number
}
let p1: Point = { x: 2, y: 3 }

let a: number[] = [1, 2, 3]
let ro: ReadonlyArray<number> = a
// ro.push(9)
console.log(ro)

interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number,
  [propName: string]: any
}
function createSquare1(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
// let obj = { color: 'red', width: 8, bb: 9 } // 就是squareOptions
// let mySquare = createSquare1(obj) // 不报错
// let mySquare = createSquare1({ color: 'red', width: 67, bb: 9 } as SquareConfig)  // 不报错
/* let mySquare = createSquare1({ color: 'red', width: 5, bb: 9 })
console.log(mySquare) */

interface SearchFunc {
  (source: string, substring: string): boolean
}
let mySearch: SearchFunc = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}
console.log(mySearch('andong', 'an6'))

// 可索引的类型
interface StringArray {
  [custom: number]: number
}
let arr: StringArray = [99, 77, 666]
console.log(arr[2])

interface StringArray2 {
  [idx: string]: number
}
let arr2: StringArray2 = { a: 1, b: 9999 }
console.log(arr2['b'])

// TypeScript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
class Animal {
  name: string
}
class Dog extends Animal {
  bread: string
}
interface NotOk {
  [x: number]: Dog,
  [y: string]: Animal
}

interface NumberDictionary {
  [idx: string]: number | string;
  length: number;
  name: string
}


/* interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray2: ReadonlyStringArray = ['Alice', 'Bob', 'tom']
// myArray2[2] = '999' // 类型“ReadonlyStringArray”中的索引签名仅允许读取。
console.log(myArray2) */
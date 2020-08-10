/* interface LabelledValue {
  label: string
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
let myObj = {size: 10, label: 'kk'}
printLabel(myObj) */

// 可选属性
/* interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number
}
function createSquare(config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let a = createSquare({color: 'red', width: 67})
console.log(a) */

// 只读属性
/* interface Point {
  readonly x: number,
  readonly y: number
}
let p1: Point = {x: 10, y: 20}
p1.x = 90  // 编译时会报错   Cannot assign to 'x' because it is a read-only property.
console.log(p1) */

/* let a: number[] = [1, 2, 45, 88]
let ro: ReadonlyArray<number> = a
// ro[2] = 999  // 编译时会报错
// a = ro // 编译时会报错
a = ro as number[] // 断言 不报错
let b = ro // 不报错
console.log(b) */

//  额外的属性检查
/* interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number,
  // [propName: string]: any
}
function createSquare(config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
// let obj = {color: 'red', width: 677, bb: 9} 就是squareOptions
// let a = createSquare(obj) // 不报错
let a = createSquare({color: 'red', width: 67, bb: 9})  // 报错
console.log(a) */
// 绕开这些检查非常简单。
// 最简便的方法是使用类型断言： {color: 'red', width: 67, bb: 9}  as SquareConfig
// 然而，最佳的方式是能够添加一个字符串索引签名，  [propName: string]: any
// 还有最后一种跳过这些检查的方式,它就是将这个对象赋值给一个另一个变量： 因为 squareOptions 不会经过额外属性检查，


// 函数类型
/* interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}
console.log(mySearch('hello', 'u')) */

/* interface SearchFunc {
  (source: string, subString: RegExp): number
}
let mySearch: SearchFunc = function (src, sub) {
  let result = src.search(sub)
  return result
}
console.log(mySearch('hello', /E/i)) */  //  1

// 可索引的类型
/* interface StringArray {
  [idx: number]: string
}  // 当用 number 去索引 StringArray 时会得到 string 类型的返回值。
let myArray: StringArray = ['hh', 'pp', 'mm']
let myStr: string = myArray[1]
console.log(myStr) */
// TypeScript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
/* class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}
interface NotOkay {
  [x: number]: Dog
  [x: string]: Animal
} */

interface NumberDictionary {
  // [index: string]: number  // 报错
  [index: number]: number
  length: number
  /*  name: string */   // 报错  `name`的类型与索引类型返回值的类型不匹配
}
// 你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
  readonly [idx: number]: string
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
// myArray[1] = 'Mallory'; // error!  报错

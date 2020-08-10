/* import * as _ from 'lodash';
class Greeter {
  age = 13
  greeting: string
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return _.join(['Hello', ' ', this.greeting], '');
  }
};
let greeter = new Greeter('world');
console.log(greeter)
console.log(greeter.greet())
class Child extends Greeter {
  names = 88
  name() {
    return 'Dog'
  }
}
console.log(new Child('TS'))
console.log(new Child('TS').name()) */

let isDone: boolean = true;

let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
console.log(octalLiteral) // 20

let list: number[] = [1, 2, 3, 8];
let list2: Array<number> = [1, 2, 9];
console.log(list2)

// 元组 Tuple  表示一个已知元素数量和类型的数组
let x: [number, string] = [10, 'abcdef']
// x = [10, 'abcdef']
console.log(x[1].substr(1, 2))

// 枚举  如果Green = 'yy'，则下边的都得初始化，否则报错;如果没有初始化，{0: "Red", Red: 0}
enum Color {
  Red,
  Green = 'yy',
  Blue = 'kk'
}
let c: Color = Color.Green
let d: string = Color[0]
let e: string = Color['kk']
console.log(Color)
// {0: "Red", Red: 0, Green: "yy", Blue: "kk"}
console.log(c) //  yy
console.log(d)  //  Red
console.log(Color['Red'])  //  0
console.log(e + '--------------------------------------') // undefined

// any 在编程阶段还不清楚类型的变量指定一个类型
let notSure: any = 4
notSure = 'string'
notSure = false
console.log(notSure)

let anyList: any[] = [1, 'hh', true]
console.log(anyList)

// void 某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。
function warnUser(): void {
  // return '99'  // 不可以
  // console.log(9989)
  return null
}
warnUser()
console.log(warnUser())
// 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null：
let unusable: void = undefined

// null 和 undefined    TypeScript里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。 和 void 相似，它们的本身的类型用处不是很大： 当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自
// 默认情况下 null 和 undefined 是所有类型的子类型。
// let u: undefined = null   // 严格模式下不可以
let u: undefined = undefined  // 严格模式下可以
let m: null | number = 37777
console.log(m)

// never类型   never 类型表示的是那些永不存在的值的类型。
function error(message: string): never {
  throw new Error(message)
}
function fail() {
  return error('something failed')
}
// console.log(fail())
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) { }
}

// object   object表示非原始类型，也就是除 number，string，boolean，symbol，null或undefined 之外的类型
// declare function create(o: object | null): void
// create({prop: 0})
// create(null)

// 类型断言  有两种形式。 其一是“尖括号”语法： 另一个为 as 语法：
let someValue: any = 'hello'
// let strL = someValue.length
// let strL: number = (<string>someValue).length
let strL: number = (someValue as string).length
console.log(strL)

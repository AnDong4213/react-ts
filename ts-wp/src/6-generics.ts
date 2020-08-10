// 泛型基础示例
/* function identity(arg: number): number {
  return arg
} */
/* function identity(arg: any): any {
  return arg
} */

// 需要一种方法使返回值的类型与传入参数的类型是相同的。使用了--类型变量，它是一种特殊的变量，只用于表示类型而不是值。
function identity<T>(arg: T): T {
  return arg
}
// let output = identity<string>('myString2')   // 传入所有的参数，包含类型参数：
let output = identity(33)  // 利用类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定 T 的类型：
console.log(output)

// 使用泛型变量
function loggingIdentity<Y>(arg: Y[]): Y[] {
  console.log(arg.length)
  return arg
}
console.log(loggingIdentity([1, '2', 3, { a: 2 }]))

// 泛型类型
let myIdentity: <U>(arg: U) => U = identity
let myIdentity2: { <T>(arg: T): T } = identity
/* interface GenericIdentityFn {
  <T>(arg: T): T
}
let myIdentity3: GenericIdentityFn = identity */
// 甚至可以把泛型参数当作整个接口的一个参数。 就能清楚的知道使用的具体是哪个泛型类型
interface GenericIdentityFn<T=any> {
  (arg: T): T
}
let myIdentity3: GenericIdentityFn<number> = identity
console.log(myIdentity3(444444444555))


// 泛型类
// 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 9
myGenericNumber.add = function(x, y) {
  return x + y
}
console.log(myGenericNumber.add(9, 6))

interface AxiosResponse<T = number> {
  data: T
  status: object
}
function createSquare2(config: string): AxiosResponse {
  return {
    data: Number(config),
    status: {}
  }
}
console.log(createSquare2('7'))

// 泛型约束
interface Lengthwise {
  length: number
}
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
console.log(loggingIdentity2('ww'))

// 在泛型约束中使用类型参数
// 你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj 上，因此我们需要在这两个类型之间使用约束。
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
let qq = { a: 1, b: 2, c: 3, d: 4 }
console.log(getProperty(qq, 'a'))
console.log(getProperty(qq, 'd'))


// 在泛型中使用类类型
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
  constructor() {
    this.nametag = '看看'
  }
}

class Animal2 {
  numLegs: number;
}

class Bee extends Animal2 {
  keeper: BeeKeeper;
}

class Lion extends Animal2 {
  keeper: ZooKeeper;
}
function createInstance<A extends Animal2>(c: new () => A): A {
  return new c()
}
// createInstance(Lion).keeper.nametag
// createInstance(Bee).keeper.hasMask;

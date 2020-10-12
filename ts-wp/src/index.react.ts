let isDone1:boolean = false;

let num: number = 0b10010;
let num2: number = 0O10010;

const x: [number, string] = [9, 'oo'];

interface Person {
  readonly id: number;
  name: string;
  age?: number;
}
const per: Person = {
  id: 9,
  name: 'yo'
}

class Animal {
  readonly name: string;
  static categoies: string[] = ['mammal', 'bird']
  constructor(name: string) {
    this.name = name
  }

  run() {
    return `${this.name} is running`
  }
  static isAnimal(a) {
    return a instanceof Animal
  }
}

console.log(Animal.categoies)

const anake = new Animal('b')
console.log(Animal.isAnimal(anake))


interface Radio {
  switchRadio(): void;
}
interface Battery {
  checkBatteryStatus();
}
interface RadioWithBattery extends Radio {
  checkBatteryStatus();
}

class Car implements Radio {
  switchRadio() {

  }
}
class Cellphone implements Radio, Battery {
  switchRadio() {

  }
  checkBatteryStatus() {
    return 9
  }
}
class Cellphone2 implements RadioWithBattery {
  switchRadio() {

  }
  checkBatteryStatus() {}
}

/* // 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log('Direction', Direction) */

// 常量枚举
const enum Direction {
  Up,
  Down,
  Left,
  Right
}
// console.log('Direction', Direction)  // Direction is not defined  必须console的是Direction.Up
console.log('Direction', Direction.Up);

const enum Direction2 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
console.log('Direction', Direction2.Up);

function echo<T>(arg: T): T {
  return arg
}
const result = echo(123)

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result2 = swap(['book', 99])

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr([1, '2', 3]);

interface IWithLength {
  length: number
}
function echoWithArr2<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = echoWithArr2('abc')
const obj = echoWithArr2({length: 0})

console.log('---------------------------------------------------------')
/* const arrg = [9, 6]
console.log(arrg)
console.log(arrg.unshift(87))
console.log(arrg)
console.log(arrg.shift())
console.log(arrg) */

// 泛型类
class Queue<T> {
  private data = [];

  push(item: T) {
    return this.data.push(item)
  }

  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(44)
queue.push(22)
console.log(typeof queue.pop())
console.log(queue.pop().toFixed())

const queue2 = new Queue<string>();
queue2.push('str');
console.log(queue2.pop());


interface KeyPair<T, U> {
  key: T;
  value: U
}
const kp1: KeyPair<string, number> = {
  key: 'str',
  value: 9
}

const list: Array<number> = [9, 8, 6]


/* interface IPlus {
  (a: number, b: number): number
}
function plus(a: number, b:number): number {
  return a + b
}
const a: IPlus = plus */

interface IPlus<T> {
  (a: T, b: T): T
}
function plus(a: number, b:number): number {
  return a + b
}
const a: IPlus<number> = plus


// 类型别名  type React.FC<P = {}> = React.FunctionComponent<P>
type PlusType = (x: number, y: number) => number;
function sum(a: number, b: number): number {
  return a + b
}
// const sum2: (x: number, y: number) => number = sum
const sum2: PlusType = sum

// 联合类型，类型别名
type NameResolver = () => string;
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// 类型断言  不是类型转换
function getLength(input: number | string): number {
  /* const str = input as String
  if (str.length) {
    return str.length
  } else {
    const number = input as Number;
    return number.toString().length
  } */

  if ((<string>input).length) {
    return (<string>input).length
  } else {
    return input.toString().length
  }
}

console.log('-------------------------------------------------------------------')

class Employee {
  constructor() {

  }

  // 只带有 get 不带有 set 的存取器自动被推断为 readonly
  get fullName() {
    return 222
  }
}

const FN = new Employee();
console.log(FN.fullName)
// FN.fullName = 99;   // 无法分配到 "fullName" ，因为它是只读属性。

// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。
abstract class Kk {
  constructor() {
    
  }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract 关键字并且可以包含访问修饰符。
abstract class Department  {
  name: string

  constructor(name: string) {
    this.name  = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    super('aa')
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department1: Department;
// department1 = new Department();   // 无法创建抽象类的实例。
department1 = new AccountingDepartment();
department1.printName();
department1.printMeeting()
// department1.generateReports();   //  类型“Department”上不存在属性“generateReports”。

// 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类
class Point2 {
  x: number;
  y: number
}
interface Point3d extends Point2 {
  z: string
}
let point3d: Point3d = {x: 1, y: 2, z: '3'}






















// 交叉类型  Intersection Types
function extend<T, U>(first: T, second: U): T & U {
  let result = {} as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as U)[id] = second[id]
    }
  }

  return result
}
class Person2 {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void
}
class ConsoleLogger implements Loggable {
  log() {
    console.log(777)
  }
}
let jim = extend(new Person2('救赎之路--许巍'), new ConsoleLogger())
console.log(jim.name)
jim.log()

/* function extend<First, Second>(first: First, second: Second): First & Second {
  const result: Partial<First & Second> = {}
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop]
    }
  }
  for (const prop in second) {
    if (!result.hasOwnProperty(prop) && second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop]
    }
  }

  return result as First & Second
}
class Person2 {
  constructor(public name: string) { }
}
interface Loggable {
  name: string
  log(name: string): void
}
class ConsoleLogger implements Loggable {
  name: string
  constructor(name: string) {
    this.name = name
  }
  log(name) {
    console.log(`Hello, I'm ${name}.`);
  }
}
console.log(ConsoleLogger.prototype)
const jim = extend(new Person2('DDD'), ConsoleLogger.prototype);
jim.log(jim.name); */


// 联合类型  Union Types
// 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number 或 string 类型的参数。
/* function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
console.log(padLeft('H', 10))
// console.log(padLeft('H', true))  // any 的话编译阶段通过，运行时报错
console.log(padLeft('H', 'MMMM')) */

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
/* interface Bird {
  fly()
  layEggs()
}
interface Fish {
  swim()
  layEggs()
}
function getSmallPet(): Fish | Bird {
  // ...
}
let pet = getSmallPet()
pet.layEggs()
pet.swim() */  // 报错 swim只在Fish中存在


// 类型防护和区分类型  Type Guards and Differentiating Types
/* interface Bird {
  fly()
  layEggs()
}
interface Fish {
  swim()
  layEggs()
}
function getSmallPet(): Fish | Bird {
  // ...
}
let pet = getSmallPet()
// 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个类型谓词：  pet is Fish 就是类型谓词。谓词为 parameterName is Type 这种形式， parameterName 必须是来自于当前函数签名里的一个参数名。
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
} */


// typeof 类型保护
function isNumber(x: any): x is number {
  return typeof x === 'number'
}
function isString(x: any): x is string {
  return typeof x === 'string'
}
function padLeft(value: string, padding: number | string) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value;
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
console.log(padLeft('Hello', 90))
console.log(padLeft('Hello', 'true'))


// instanceof 类型保护
class Bird {
  fly() {
    console.log('bird fly')
  }
  layEggs() {
    console.log('bird lay eggs')
  }
}
class Fish {
  swim() {
    console.log('fish swim')
  }
  layEggs() {
    console.log('fish lay eggs')
  }
}
function getRandomPet() {
  return Math.random() > 0.5 ? new Bird() : new Fish()
}
let pet = getRandomPet()
if (pet instanceof Bird) {
  pet.fly()
}
if (pet instanceof Fish) {
  pet.swim()
}

function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // error, 'name' 可能为 null
  }
  name = name || 'Bob'
  return postfix('great')
}
console.log(broken(null))
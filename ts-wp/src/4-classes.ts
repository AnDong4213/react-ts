class AnimalA {
  name: string
  constructor(name: string) {
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
class Snake extends AnimalA {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}
class Horse extends AnimalA {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}
let sam = new Snake('Sammy2')
let tom: AnimalA = new Horse('Tommy3')
sam.move()
tom.move(34)

// 理解 private
class AnimalB {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  showName() {
    console.log(this.name)
  }
}
// console.log(new AnimalB('andong').name)
new AnimalB('andong').showName()
class AnimalB_B extends AnimalB {
  haha: string
  constructor(name: string) {
    super(name)
    this.haha = name
  }
  funcA() {
    // console.log(this.name)  // private在派生类中不可以访问
  }
}
console.log(new AnimalB_B('YY').haha)
// --------------------------------------------------------------
class AnimalC {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}
class Rhino extends AnimalC {
  constructor() {
    super('Rhino')
  }
}
class Employee {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}
let animal = new AnimalC('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')
animal = rhino // rhino可以赋值给animal
// animal = employee  // employee不可以赋值给animal  //  不能将类型'Employee'分配给类型'AnimalC'  类型具有私有属性“名称”的单独声明
// console.log(animal === rhino) // false

// 理解 protected 及 readonly修饰符
class Person {
  protected name: string
  protected constructor(name: string) { // private既不能被继承也不能直接实例化，，protected不能被实例化
    this.name = name
  }
}
// console.log(new Person('kk').name) // 报错   Property 'name' is protected and only accessible within class 'Person' and its subclasses.
class EmployeeA extends Person {
  private department: string
  protected hihi: string
  readonly dog: string
  pig = 'MMMM'
  pia: string = 'PIA'
  constructor(name: string, department: string) {
    super(name)
    this.department = department
    this.hihi = department
    this.dog = 'yes0'
  }
  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}
let howard = new EmployeeA('andong', 'policy')
console.log(howard.getElevatorPitch())
// howard.dog = 'QQQQ'   // 报错 只读
console.log(howard.dog)
console.log(howard.pig)
console.log(howard.pia)
// console.log(new Person('TT')) // 报错 protected不能被实例化
console.log('----------------------------------------------')

// 存取器
// 存取器要求你将编译器设置为输出 ECMAScript 5 或更高。 不支持降级到 ECMAScript 3。其次，只带有 get 不带有 set 的存取器自动被推断为 readonly
let passcode = 'secret passcode'
class EmployeeB {
  private _fullName: string

  get fullName(): string {
    console.log('get')
    return this._fullName
  }
  set fullName(newName: string) {
    console.log('set')
    if (passcode && passcode === 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}
let employee1 = new EmployeeB()
employee1.fullName = 'MMM-0'
if (employee1.fullName) {
  console.log(employee1.fullName)
}

//  静态属性
class Grid {
  static origin = { x: 0, y: 0 }
  scale: number

  constructor(scale: number) {
    this.scale = scale
  }
  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}
let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 6, y: 8 }))

// 抽象类
abstract class Department {
  public name: string
  protected name2: string
  constructor(name: string, name2: string) {
    this.name = name
    this.name2 = name2
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }
  abstract printMeeting(): void
}
class AccountingDepartment extends Department {
  constructor() {
    super('HHH', 'MMM')
  }
  printMeeting() {
    console.log('The Accounting Department meets each Monday at 10am.')
  }
  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}
let department: Department
// department = new Department() // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment()  // 允许对一个抽象子类进行实例化和赋值
console.log(department.name)
department.printName()
department.printMeeting()
// department.generateReports()  // // 错误: 方法在声明的抽象类中不存在  因为 let department: Department

// 高级技巧
class Greeter {
  static standardGreeting = 'Hello, there'
  greeting: string
  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}
let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'
let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

// 把类当做接口使用 （不建议这样用）

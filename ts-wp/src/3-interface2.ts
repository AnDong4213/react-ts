// console.log(Math.trunc(0.492))
// console.log(Array.from([1, 2, 3], function (item) { return item * 6 }))
// console.log(Array.from([1, 2, 3, 5], item => item * 6))  //  [6, 12, 18, 30]

/* function test(...args) {
  console.log(args) // ["a", "b", "c"]
  for (let value of args) {
    console.log(value)
  }
}
test('a', 'b', 'c')
for (let i of [{ a: 2, c: 4 }, { a: 2, c: 4 }]) {
  console.log(i)
} */
/* for (let a in { a: 2, c: 3, d: 5 }) {
  console.log(a) // key值
} */

// 类类型
/* interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}
interface ClockConstructor {
  new(h: number, m: number)
}
// 定义一个类来实现这个接口   类的实例接口与构造器接口
class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) { }
  setTime(d: Date) {
    console.log(d)
    this.currentTime = d
  }
}
new Clock(1, 2).setTime(new Date()) */

/* interface ClockInterface {
  haha: number;
  tick(): void;
}
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
  // new(hour: number, minute: number)
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}
class DigitalClock implements ClockInterface {
  haha: number = 123
  constructor(h: number, m: number) {
    console.log(this.haha)
  }
  tick() {
    console.log('beep beep67766')
    console.log(this.haha)
  }
}
class AnalogClock implements ClockInterface {
  haha: 8;
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}
let digital = createClock(DigitalClock, 12, 17)
digital.tick()
console.log(digital.haha) */

// 继承接口
/* interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
interface Square extends Shape, PenStroke {
  sideLength: number
}
let square = {} as Square
square.color = 'red'
square.sideLength = 6
square.penWidth = 5.0
console.log(square) */

// 混合类型
/* interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter;
  counter.interval = 123;
  counter.reset = function () {
    console.log(99)
  };
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0; */

// 接口继承类   用到的不是很多
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// Error：“ImageC”类型缺少“state”属性。
/* class ImageC implements SelectableControl {
  select() { }
} */




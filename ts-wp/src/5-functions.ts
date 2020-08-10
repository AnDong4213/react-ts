const z = 10
const objCon = { a: 8 }

// 函数类型
let myAdd = function (x: number, y: number): number {
  return x + y + z  // 函数的类型只是由参数类型和返回值类型组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成 API 的一部分。  z是外边的变量
}
console.log(myAdd(1, 3))

// 推断类型 如果在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：

// 可选参数和默认参数  TypeScript 里的每个函数参数都是必须的。
// function buildName(firstName: string, lastName?: string): string {} // 可以在参数名旁使用 ? 实现可选参数的功能
function buildName(firstName = 'UU', lastName: string): string {
  return firstName + '_' + lastName
}
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined 值来获得默认值。 不传报错
console.log(buildName(undefined, 'AA'))  // UU_AA
console.log(buildName(null, 'AA'))  // null_AA

// 剩余参数
function buildName2(firstName: string, ...restOfName: string[]): string {
  // console.log(Array(4).fill().map(() => objCon))
  // console.log(Array.of(4))  // [4]
  console.log(restOfName)
  return firstName + '_' + restOfName.join('_')
}
console.log(buildName2('A', 'B', 'V', 'O', '90'))

// this
interface Card {
  suit: string,
  card: number
}
interface Deck {
  suits: string[],
  cards: number[]

  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  /* haha: function () {
    console.log(this.suits) // 不是闭包，this指向deck
  }, */
  createCardPicker: function (this: Deck) {
    return () => { // 箭头函数能保存函数创建时的this值，而不是调用时值
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      // console.log(this) // deck
      return { suit: this.suits[pickedSuit], card: (pickedCard % 13) + 1 }
    }
  }
}
let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)

// this 参数在回调函数里
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void
}
class Handler {
  type: string
  /* onClickBad(this: void, e: Event) {
    // this.type = e.type // 类型“void”上不存在属性“type”  没有this，想要访问this,用箭头函数
    console.log('999')
  } */
  onClickBad = (e: Event) => {
    this.type = e.type
  }
}
let h = new Handler()
let uiElement: UIElement = {
  addClickListener() { }
}
uiElement.addClickListener(h.onClickBad)
console.log('----------------------------------')

// 重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: { suit: string; card: number }[]): number
function pickCard(x: number): { suit: string; card: number }

function pickCard(x): any {
  if (Array.isArray(x)) {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)
let pickedCard2 = pickCard(16)
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
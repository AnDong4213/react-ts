class Animal3 {
  numLegs: number
}
class Bee3 extends Animal3 { }
class Lion3 extends Animal3 { }
let Zoo: Animal3[] = [new Bee3(), new Lion3()]
console.log(Zoo)

window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.clickTime)
}






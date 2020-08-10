/* function sumMatrix(matrix: number[][]) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]   // 都改为j的话是 21
    }
  }
  return sum
}
var matrix = [
  [1, 2, 3],
  [4, 5, 6]
]
console.log(sumMatrix(matrix)) */   // 6

/* for (var i = 0; i < 10; i++) {
  // console.log(i)  // 直接输入是 0 - 9

  // setTimeout(() => {
  //   console.log(i)
  // }, 100 * i)  // 10个10

  (function(j) {
    setTimeout(() => {
      console.log(j)
    }, 100 * j)
  })(i)

} */

/* function foo() {
  return a
}
foo()
let a */

function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
  console.log(a)
  console.log(b)
}
keepWholeObject({ b: 1, a: 'andong' })

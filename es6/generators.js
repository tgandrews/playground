// 1.  This generator will lazily execute the loop calling next, causes an iteration
// to occur.
console.log('Generators: 1');
function* someGenerator() {
  var x = 0;
  for (var i = 0; i < 10; i++) {
    yield x++;
  }
}

var gen = someGenerator();
// gen.next();
// gen.next();
//
// console.log(gen.next().value);

let res = gen.next();
while (!res.done) {
  console.log(res.value, res.done);
  res = gen.next();
}

console.log('')

// 2. Fibonnacci
console.log('Generators: 2');
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}

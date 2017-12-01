const bigInt = require('big-integer');

const MAX_INT = Number.MAX_SAFE_INTEGER;

const squares = 64;
let sum = bigInt.zero;

for (let i = 0; i < squares; ++i) {
	const square = bigInt(2).pow(i);
	sum = sum.add(square)
	console.log(`${i+1}: ${square} Sum: ${sum}`);
	console.log(`Sum big: ${sum.greater(MAX_INT)} Square too big: ${square.greater(MAX_INT)}`)
}

console.log(`Total is: £${sum.divide(100)}.${sum.remainder(100)}`);

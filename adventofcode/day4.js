import md5 from 'md5';

const string = process.argv[2];
console.log(`Searching for number to append after ${string}`);
let i = 0;
while (true) {
  const output = md5(`${string}${i}`);
  if (output.startsWith('000000')) {
    break;
  }
  i++;
}

console.log(`The result is ${i}`);

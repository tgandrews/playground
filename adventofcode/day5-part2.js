import { readFileSync } from 'fs';

const file = process.argv[2];

const stringsToSearch = readFileSync(file, { encoding: 'utf8' }).split('\n');

function isNiceString(str) {
  let matchingPair = false;
  let middleLetter = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = str[i - 1] || '';
    if (!matchingPair && prevChar.length > 0) {
      const nextIndexOfPair = str.indexOf(`${prevChar}${char}`, i + 1);
      if (nextIndexOfPair > -1) {
        matchingPair = true;
      }
    }

    if (!middleLetter) {
      const re = new RegExp(`${char}.${char}`);
      middleLetter = re.test(str);
    }

    if (matchingPair && middleLetter) {
      return true;
    }
  }

  return false;
}

let niceCount = 0;
for (let i = 0; i < stringsToSearch.length; i++) {
  // console.log(stringsToSearch[i]);
  const string = stringsToSearch[i].trim();
  if (string.length > 0 && isNiceString(string)) {
    console.log(`${string} is nice`);
    niceCount++;
  }
}

console.log(`Nice count: ${niceCount}`);

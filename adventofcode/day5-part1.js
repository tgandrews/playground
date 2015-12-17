import { readFileSync } from 'fs';

const file = process.argv[2];

const stringsToSearch = readFileSync(file, { encoding: 'utf8' }).split('\n');

const vowels = ['a','e','i','o','u']
const badGroups = ['ab','cd','pq','xy'];

function isNiceString(str) {
  let vowelCount = 0;
  let badGroupCount = 0;
  let doubleLetterCount = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = str[i - 1] || '';

    if (vowels.indexOf(char) > -1) {
      vowelCount++;
    }
    if (badGroups.indexOf(`${prevChar}${char}`) > -1) {
      badGroupCount++;
    }
    if (char === prevChar) {
      doubleLetterCount++;
    }
  }

  const hasAtLeastThreeVowels = vowelCount >= 3;
  const doesNotContainBadGroup = badGroupCount === 0;
  const hasDoubleLetters = doubleLetterCount > 0;

  return hasAtLeastThreeVowels && doesNotContainBadGroup && hasDoubleLetters;
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

const readline = require('readline');

process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', readLine);

let numbersCount;
let lineCount = 0;

function readLine (line) {
  switch(lineCount) {
    case 0:
      if (isValidNumber(line) && numbersCountWithinRange(line)) {
        numbersCount = Number(line);
        lineCount++;
        break;
      } else {
        process.exit();
      }
    case 1:
      runMaxPairwise(line);
      process.exit();
    default:
      process.exit();
  }
}

// Helper functions

function arrayLengthMatchNumbersCount(array) {
  return array.length == numbersCount;
}

function isValidNumber(string) {
  return isNotEmptyString(string) && typeIsNumber(string) && 
          isNotNaN(string) && isInteger(string);
}

function isNotEmptyString(string) {
  return string != '';
}

function typeIsNumber(string) {
  return typeof Number(string) === 'number';
}

function isNotNaN(string) {
  return !Number.isNaN(string);
}

function isInteger(string) {
  return Number(string) % 1 == 0;
}

function numbersCountWithinRange(num) {
  return 2 <= num && num <= 2 * Math.pow(10,5);
}

function arrayElementsWithinRange(array) {
  return 0 <= array[0] && array[array.length - 1] <= Math.pow(10,5);
}

function constructArrayFromLine(line) {
  let numbers = line.split(' ').filter(x => {
    return isValidNumber(x);
  });
  return numbers.map(x => { return Number(x); });
}

function sortNumber(a,b) {
  return a - b;
}

function findTwoHighest(array) {
  let max       = array[array.length - 1];
  let secondMax = array[array.length - 2];
  return [max, secondMax];
}

function runMaxPairwise(line) {
  let array = constructArrayFromLine(line).sort(sortNumber);
  if (arrayLengthMatchNumbersCount(array) && arrayElementsWithinRange(array)) {
    [max, secondMax] = findTwoHighest(array);
    console.log(max * secondMax);
  }
}

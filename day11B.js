const pre = document.getElementsByTagName('pre')[0].innerText;
let numbers = (pre.split('\n').filter(l => !!l))[0].split(' ');
const startTime = performance.now();

const seenNumbers = {};
const arrayCache = {};

const arrayAfter25Iteration = (n) => {
    if (arrayCache[n]) {
        return arrayCache[n];
    }
    let innerArray = [n];
    for (let index = 0; index < 25; index++) {
        innerArray = innerArray.flatMap( (innerNumber) => {
            if (seenNumbers[innerNumber]) {
                return seenNumbers[innerNumber];
            }
            let toReturn = []
            if (innerNumber === '0') {
                toReturn.push('1');
            } else if (innerNumber.length % 2 === 0) {
                toReturn.push(innerNumber.slice(0, innerNumber.length / 2));
                toReturn.push(Number(innerNumber.slice(innerNumber.length / 2)).toString());
            } else {
                toReturn.push((Number(innerNumber) * 2024).toString());
            }
            seenNumbers[innerNumber] = toReturn;
            return toReturn;
        }
        );
    }
    arrayCache[n] = innerArray;
    return innerArray;
}

const arrayLengthAfterXbatchOf25 = (numberList, iterationCount) => {
    if (iterationCount === 1) {
        return numberList.reduce( (acc, c) => acc + arrayAfter25Iteration(c).length, 0)
    } else {
        return numberList.reduce( (acc, c) => acc + arrayLengthAfterXbatchOf25(arrayAfter25Iteration(c), iterationCount - 1), 0)
    }
}
;
const result = arrayLengthAfterXbatchOf25(numbers, 3);
console.log('elapsed time (s)', (performance.now() - startTime) / 1000)
console.log('Result', result);

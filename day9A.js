const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

let decompressed = [];
lines[0].split("").map( (e, index) => {
    if (index % 2 === 0) {
        decompressed.push(Array(Number(e)).fill(index / 2))
    } else {
        decompressed.push(Array(Number(e)).fill('.'))
    }
}
);

const emptyPointer = () => decompressed.findIndex( (e) => e.includes("."));
const filledPointer = () => decompressed.findLastIndex( (e) => !!e.length && !e.includes("."));

let firstEmptySpace = emptyPointer();
let lastFilledSpace = filledPointer();
while (firstEmptySpace < lastFilledSpace) {
    let fileId = decompressed[lastFilledSpace].pop();

    let firstEmpty = decompressed[firstEmptySpace].indexOf('.');
    decompressed[firstEmptySpace][firstEmpty] = fileId;

    firstEmptySpace = emptyPointer();
    lastFilledSpace = filledPointer();
}

const result = decompressed.flatMap(e => e).map( (e, i) => e !== '.' ? Number(e) * i : 0).reduce( (acc, c) => acc + c, 0);

console.log('Result', result);

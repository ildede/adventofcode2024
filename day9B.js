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

const emptyPointer = (min) => decompressed.findIndex( (e) => (e.filter(l => l === ".").length >= min));
const filledPointer = () => decompressed.findLastIndex( (e) => !!e.length && !e.includes("."));

for (let index = decompressed.length; index > 0; index--) {
    if (index % 2 === 0) {
        const firstValidSpace = emptyPointer(decompressed[index].length)
        if (firstValidSpace > 0 && firstValidSpace < index) {
            decompressed[firstValidSpace].splice(decompressed[firstValidSpace].indexOf('.'), decompressed[index].length, ...decompressed[index]);
            decompressed[index] = Array(decompressed[index].length).fill('.');
        }
    }
}

const result = decompressed.flatMap(e => e).map( (e, i) => e !== '.' ? Number(e) * i : 0).reduce( (acc, c) => acc + c, 0);

console.log('Result', result);

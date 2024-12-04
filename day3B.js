const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const findMul = (line) => Array.from(line.matchAll(/mul\(\d+,\d+\)/g), (m) => [m.index, m[0].replace("mul(", "").replace(")", "").split(",")]).map( ([index,[a,b]]) => [index, a * b]);
const findDo = (line) => Array.from(line.matchAll(/do\(\)/g), (m) => [m.index, m[0]]);
const findDont = (line) => Array.from(line.matchAll(/don\'t\(\)/g), (m) => [m.index, m[0]]);

let mulEnabled = true;
const result = lines.flatMap(line => {
    const muls = findMul(line);
    const dos = findDo(line);
    const donts = findDont(line);
    const operations = [...muls, ...dos, ...donts];
    operations.sort( (a, b) => a[0] - b[0]);

    return operations.map( ([index,op]) => {
        if (op === "do()") {
            mulEnabled = true;
        } else if (op === "don't()") {
            mulEnabled = false;
        } else if (mulEnabled) {
            return op;
        }
        return 0;
    }
    );

}
).reduce( (acc, v) => acc + v, 0);

console.log("Result", result)

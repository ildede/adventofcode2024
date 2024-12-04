const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const findMul = (line) => Array.from(line.matchAll(/mul\(\d+,\d+\)/g), (m) => m[0].replace("mul(", "").replace(")", "")).map( (e) => e.split(",")).map( ([a,b]) => a * b);

const result = lines.flatMap(findMul).reduce( (acc, v) => acc + v, 0);

console.log('Result', result);

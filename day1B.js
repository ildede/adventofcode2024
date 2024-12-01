const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n');
const reduced = lines.map(l => l.split('   ')).reduce( (acc, [a,b]) => {
    if (a && b) {
        acc[0].push(a);
        acc[1].push(b);
    }
    return acc;
}
, [[], []]);

const sum = (acc, e) => acc + e;
const result = reduced[0].map( (a) => a * reduced[1].filter(b => a === b).length).reduce(sum, 0);
console.log(result);

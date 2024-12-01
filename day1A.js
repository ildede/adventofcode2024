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
reduced[0].sort();
reduced[1].sort();

const result = reduced[0].map( (e, i) => Math.abs(e - reduced[1][i])).reduce( (acc, e) => acc + e, 0);
console.log(result);

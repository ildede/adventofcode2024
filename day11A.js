const pre = document.getElementsByTagName('pre')[0].innerText;
let numbers = (pre.split('\n').filter(l => !!l))[0].split(' ');

for (let index = 0; index < 25; index++) {
    numbers = numbers.flatMap((n) => {
        if (n === '0') {
            return ['1'];
        } else if (n.length % 2 === 0) {
            return [n.slice(0,n.length/2), Number(n.slice(n.length/2)).toString()];
        } else {
            return [(Number(n) * 2024).toString()];
        }
    });
}
const result = numbers.length

console.log('Result', result);

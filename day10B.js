const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const topographicMap = lines.map(l => l.split("").map(Number));

const findStep = (value, y, x) => {
    const goodStep = [];
    if (topographicMap[y - 1]?.[x] === value + 1) {
        goodStep.push([y - 1, x])
    }
    if (topographicMap[y + 1]?.[x] === value + 1) {
        goodStep.push([y + 1, x])
    }
    if (topographicMap[y][x - 1] === value + 1) {
        goodStep.push([y, x - 1])
    }
    if (topographicMap[y][x + 1] === value + 1) {
        goodStep.push([y, x + 1])
    }
    return goodStep;
}

let count = 0;
topographicMap.forEach( (line, y) => {
    line.forEach( (height, x) => {
        if (height === 0) {
            const highests = findStep(0, y, x).flatMap( ([sy,sx]) => findStep(1, sy, sx)).flatMap( ([sy,sx]) => findStep(2, sy, sx)).flatMap( ([sy,sx]) => findStep(3, sy, sx)).flatMap( ([sy,sx]) => findStep(4, sy, sx)).flatMap( ([sy,sx]) => findStep(5, sy, sx)).flatMap( ([sy,sx]) => findStep(6, sy, sx)).flatMap( ([sy,sx]) => findStep(7, sy, sx)).flatMap( ([sy,sx]) => findStep(8, sy, sx));
            count += highests.length;
        }
    }
    )
}
);

const result = count

console.log('Result', result);

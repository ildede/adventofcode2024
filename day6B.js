const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const findGuard = (map) => {
    const guard = {
        x: -1,
        y: -1,
        face: 'U',
        steps: 0
    };
    map.forEach( (line, y) => {
        if (line.indexOf("^") >= 0) {
            guard.x = line.indexOf("^");
            guard.y = y;
        }
    }
    );
    return guard;
}

const originalMap = lines.map(l => l.split(''));

const willThisMapLoop = (map) => {
    const guard = findGuard(map);
    let willLoop = false;
    while (guard.x >= 0 && guard.y >= 0 && guard.x < 130 && guard.y < 130 && !willLoop) {
        switch (guard.face) {
        case 'U':
            if (map[guard.y - 1]?.[guard.x] !== '#') {
                if (map[guard.y][guard.x].includes('U')) {
                    willLoop = true;
                }
                map[guard.y][guard.x] += 'U';
                guard.y--;
                guard.steps++;
            } else {
                guard.face = "R";
            }
            break;
        case 'D':
            if (map[guard.y + 1]?.[guard.x] !== '#') {
                if (map[guard.y][guard.x].includes('D')) {
                    willLoop = true;
                }
                map[guard.y][guard.x] += 'D';
                guard.y++;
                guard.steps++;
            } else {
                guard.face = "L";
            }
            break;
        case 'L':
            if (map[guard.y][guard.x - 1] !== '#') {
                if (map[guard.y][guard.x].includes('L')) {
                    willLoop = true;
                }
                map[guard.y][guard.x] += 'L';
                guard.x--;
                guard.steps++;
            } else {
                guard.face = "U";
            }
            break;
        case 'R':
            if (map[guard.y][guard.x + 1] !== '#') {
                if (map[guard.y][guard.x].includes('R')) {
                    willLoop = true;
                }
                map[guard.y][guard.x] += 'R';
                guard.x++;
                guard.steps++;
            } else {
                guard.face = "D";
            }
            break;
        }
    }
    return willLoop;
}

let countLoopingMaps = 0;
for (let y = 0; y < 130; y++) {
    for (let x = 0; x < 130; x++) {
        if (originalMap[y][x] === ".") {
            let tmpMap = structuredClone(originalMap);
            tmpMap[y][x] = "#";
            if (willThisMapLoop(tmpMap)) {
                countLoopingMaps++;
            }
        }
    }
}

console.log("Result", countLoopingMaps);

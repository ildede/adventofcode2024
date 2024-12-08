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

const map = lines.map(l => l.split(''));
const guard = findGuard(map);
while (guard.x >= 0 && guard.y >= 0 && guard.x < 130 && guard.y < 130) {
    switch (guard.face) {
    case 'U':
        if (map[guard.y - 1][guard.x] !== '#') {
            map[guard.y][guard.x] = 'X';
            guard.y--;
            guard.steps++;
        } else {
            guard.face = "R";
        }
        break;
    case 'D':
        if (map[guard.y + 1][guard.x] !== '#') {
            map[guard.y][guard.x] = 'X';
            guard.y++;
            guard.steps++;
        } else {
            guard.face = "L";
        }
        break;
    case 'L':
        if (map[guard.y][guard.x - 1] !== '#') {
            map[guard.y][guard.x] = 'X';
            guard.x--;
            guard.steps++;
        } else {
            guard.face = "U";
        }
        break;
    case 'R':
        if (map[guard.y][guard.x + 1] !== '#') {
            map[guard.y][guard.x] = 'X';
            guard.x++;
            guard.steps++;
        } else {
            guard.face = "D";
        }
        break;
    }
}

const result = map.reduce( (acc, l) => acc + l.filter(e => e === "X").length, 0);

console.log("Result", result);

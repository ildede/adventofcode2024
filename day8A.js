const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const antennas = {};
lines.forEach( (line, y) => {
    line.split('').forEach( (letter, x) => {
        if (letter === ".")
            return;
        if (!antennas[letter]?.coords) {
            antennas[letter] = {
                coords: []
            }
        }
        antennas[letter].coords.push([x, y])
    }
    )
}
);

Object.entries(antennas).forEach( ([k,v]) => {
    if (!v.antinodes) {
        v.antinodes = []
    }
    v.coords.forEach( (c) => {
        if (!v.antinodes) {
            v.antinodes = []
        }
        v.coords.forEach( (other) => {
            if (other !== c) {
                const Ax = c[0];
                const Ay = c[1];
                const Bx = other[0];
                const By = other[1];
                const node1 = [Bx - Ax + Bx, By - Ay + By, ]
                const node2 = [Ax - Bx + Ax, Ay - By + Ay, ]
                if (node1[0] >= 0 && node1[0] < 50 && node1[1] >= 0 && node1[1] < 50) {
                    if (!v.antinodes.includes(node1.toString())) {
                        v.antinodes.push(node1.toString());
                    }
                }
                if (node2[0] >= 0 && node2[0] < 50 && node2[1] >= 0 && node2[1] < 50) {
                    if (!v.antinodes.includes(node2.toString())) {
                        v.antinodes.push(node2.toString());
                    }
                }
            }
        }
        )
    }
    )
}
)

const antinodesLocation = new Set(Object.values(antennas).flatMap(e => e.antinodes))

console.log("Result", Array.from(antinodesLocation).length);

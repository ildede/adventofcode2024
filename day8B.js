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

const diff = (vec1, vec2) => ([vec1[0] - vec2[0], vec1[1] - vec2[1]])
const add = (vec1, vec2) => ([vec1[0] + vec2[0], vec1[1] + vec2[1]])

const gridSize = 50;
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
                let isInGrid = true;
                let difference = diff(other, c);
                let lastNode = other;
                while (isInGrid) {
                    const node = add(lastNode, difference);
                    lastNode = node;
                    if (node[0] >= 0 && node[0] < gridSize && node[1] >= 0 && node[1] < gridSize) {
                        if (!v.antinodes.includes(node.toString())) {
                            v.antinodes.push(node.toString());
                        }
                    } else {
                        isInGrid = false;
                    }
                }

                isInGrid = true;
                difference = diff(c, other);
                lastNode = c;
                while (isInGrid) {
                    const node = add(lastNode, difference);
                    lastNode = node;
                    if (node[0] >= 0 && node[0] < gridSize && node[1] >= 0 && node[1] < gridSize) {
                        if (!v.antinodes.includes(node.toString())) {
                            v.antinodes.push(node.toString());
                        }
                    } else {
                        isInGrid = false;
                    }
                }
            }
        }
        )
    }
    )
}
)

const antennasLocation = Object.values(antennas).flatMap(e => e.coords.map( (crd) => crd.toString()))
const antinodesLocation = Object.values(antennas).flatMap(e => e.antinodes)
const result = Array.from(new Set([...antennasLocation, ...antinodesLocation])).length;

console.log("Result", result);

const pre = document.getElementsByTagName('pre')[0].innerText;
const startTime = performance.now();

//140x140
const garden = pre.split('\n').filter(l => !!l).map(l => l.split(''));

const fencesNeeded = (plant, y, x) => {
    let count = 0;
    if (garden[y - 1]?.[x] !== plant) {
        count++;
    }
    if (garden[y + 1]?.[x] !== plant) {
        count++;
    }
    if (garden[y][x - 1] !== plant) {
        count++;
    }
    if (garden[y][x + 1] !== plant) {
        count++;
    }
    return count;
}
const samePlantsNearby = (plant, y, x) => {
    let plants = [];
    if (garden[y - 1]?.[x] === plant) {
        plants.push(`${y - 1}x${x}`);
    }
    if (garden[y + 1]?.[x] === plant) {
        plants.push(`${y + 1}x${x}`);
    }
    if (garden[y][x - 1] === plant) {
        plants.push(`${y}x${x - 1}`);
    }
    if (garden[y][x + 1] === plant) {
        plants.push(`${y}x${x + 1}`);
    }
    return plants;
}

const regions = {};
const GRID_SIZE = 140;
let index = 0;
for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
        const plant = garden[y][x];

        if (regions[plant]) {
            const otherPlants = samePlantsNearby(plant, y, x);
            const nearbyRegions = regions[plant].filter(p => {
                const founded = otherPlants.filter(op => p.plants.includes(op));
                return founded.length
            }
            );
            if (nearbyRegions.length === 0) {
                regions[plant][index] = {
                    index,
                    plants: [`${y}x${x}`],
                    area: 1,
                    perimeter: fencesNeeded(plant, y, x),
                };
                index++;
            }
            if (nearbyRegions.length === 1) {
                nearbyRegions[0].plants.push(`${y}x${x}`);
                nearbyRegions[0].area += 1;
                nearbyRegions[0].perimeter += fencesNeeded(plant, y, x);
            }
            if (nearbyRegions.length > 1) {
                const indexSeen = nearbyRegions.map(r => r.index);
                const mergedRegion = nearbyRegions.reduce( (acc, c) => {
                    acc.plants.push(...c.plants);
                    acc.area += c.area;
                    acc.perimeter += c.perimeter;
                    return acc;
                }
                , {
                    index,
                    plants: [`${y}x${x}`],
                    area: 1,
                    perimeter: fencesNeeded(plant, y, x),
                });
                indexSeen.forEach(i => delete regions[plant][i]);
                regions[plant][index] = mergedRegion;
                index++;
            }

        } else {
            regions[plant] = [];
            regions[plant][index] = {
                index,
                plants: [`${y}x${x}`],
                area: 1,
                perimeter: fencesNeeded(plant, y, x),
            };
            index++;
        }
        ;
    }
}

const result = Object.values(regions).flatMap(r => r).map(r => r.area * r.perimeter).reduce( (acc, c) => acc + c, 0);

console.log(`Elapsed time ${(performance.now() - startTime) / 1000}s`)
console.log('Result', result);

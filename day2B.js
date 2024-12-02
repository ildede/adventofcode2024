const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l).map(l => l.split(' '));

const isReportSafe = report => {
    let notSafe = false;
    let increasing = Number(report[0]) < Number(report.at(-1));
    let skippedLevel;
    let spliced;
    let spliced2;

    report.forEach( (level, index) => {
        if (index < report.length - 1) {
            const diff = increasing ? Number(report[index + 1]) - Number(level) : Number(level) - Number(report[index + 1]);
            if (diff < 1 || diff > 3) {
                if (!skippedLevel) {
                    skippedLevel = index;
                }
                notSafe = true;
            }
        }
    }
    );

    if (notSafe && skippedLevel != undefined) {
        notSafe = false;
        spliced = report.toSpliced(skippedLevel, 1);
        spliced.forEach( (level, index) => {
            if (index < spliced.length - 1) {
                const diff = increasing ? Number(spliced[index + 1]) - Number(level) : Number(level) - Number(spliced[index + 1]);
                if (diff < 1 || diff > 3) {
                    notSafe = true;
                }
            }
        }
        );

        if (notSafe) {
            notSafe = false;
            spliced2 = report.toSpliced(skippedLevel + 1, 1);
            spliced2.forEach( (level, index) => {
                if (index < spliced.length - 1) {
                    const diff = increasing ? Number(spliced2[index + 1]) - Number(level) : Number(level) - Number(spliced2[index + 1]);
                    if (diff < 1 || diff > 3) {
                        notSafe = true;
                    }
                }
            }
            );
        }
    }

    return !notSafe;
}

console.log('Result', lines.filter(isReportSafe).length);

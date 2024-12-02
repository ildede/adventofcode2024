const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l).map(l => l.split(' '));

const isReportSafe = report => {
    let notSafe = false;
    let increasing = Number(report[0]) < Number(report.at(-1));

    report.forEach( (level, index) => {
        if (index < report.length - 1) {
            const diff = increasing ? Number(report[index + 1]) - Number(level) : Number(level) - Number(report[index + 1]);
            if (diff < 1 || diff > 3) {
                notSafe = true;
            }
        }
    }
    );

    return !notSafe;
}

console.log('Result', lines.filter(isReportSafe).length);

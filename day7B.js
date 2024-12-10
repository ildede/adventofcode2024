const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const equations = lines.map(l => l.split(": ")).map( ([testValue,operands]) => ({
    value: Number(testValue),
    operands: operands.split(" ").map(Number)
}));

const operations = {
    add: (a, b) => a + b,
    mul: (a, b) => a * b,
    conc: (a, b) => Number(`${a}${b}`)
}

const isItTrue = (operands, operators, expected) => {
    return operands.reduce( (acc, operand, index) => {
        if (index === 0) {
            return operand;
        } else if (index < operands.length) {
            return operations[operators[index - 1]](acc, operand);
        } else {
            return acc;
        }
    }
    , 0) === expected;
}

const couldBeTrue = (eq) => {
    let operators = Array(eq.operands.length - 1).fill('add');
    let operatorsPatternFound = false;
    let triedAllPatterns = false;
    let count = 0;

    while (!operatorsPatternFound && !triedAllPatterns) {
        triedAllPatterns = !operators.includes('add') && !operators.includes('mul');
        count++;
        if (isItTrue(eq.operands, operators, eq.value)) {
            operatorsPatternFound = true;
        } else {
            operators = count.toString(3).padStart(operators.length, '0').split("").map(e => e === '0' ? 'add' : e === '1' ? 'mul' : 'conc');
        }
    }
    return operatorsPatternFound;
}
;

const result = equations.filter(couldBeTrue).reduce( (acc, c) => acc + c.value, 0);

console.log("Result", result);

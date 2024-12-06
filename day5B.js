const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const pageRules = {
    rules: [],
    updates: []
};

lines.reduce( (acc, l) => {
    if (l.includes("|")) {
        acc.rules.push(l);
    } else if (l.includes(",")) {
        acc.updates.push(l);
    }
    return acc;
}
, pageRules);

const updatesWithErrors = pageRules.updates.map( (e) => e.split(",")).filter( (updates) => {
    const atLeastOnePageNumberHasError = updates.some( (pageNumber) => {
        const ruleToApply = pageRules.rules.filter(r => r.includes(pageNumber)).map(r => r.split("|"));
        const atLeastOneRuleIsKO = ruleToApply.some( ([first,second]) => {
            const firstIndex = updates.indexOf(first)
            const secondIndex = updates.indexOf(second);
            const ruleIsValid = (firstIndex < 0 || secondIndex < 0) || (updates.indexOf(first) < updates.indexOf(second));
            return !ruleIsValid;
        }
        );
        return atLeastOneRuleIsKO;
    }
    );
    return atLeastOnePageNumberHasError;
}
);

const fixOrder = (update) => {
    const compactedUpdate = {}
    update.forEach( (pageNumber) => {
        compactedUpdate[pageNumber] = [];
        const ruleToApply = pageRules.rules.filter(r => r.includes(pageNumber)).map(r => r.split("|")).filter( ([first,second]) => {
            if (first !== pageNumber)
                return;
            const firstIndex = update.indexOf(first);
            const secondIndex = update.indexOf(second);
            return firstIndex >= 0 && secondIndex >= 0;
        }
        );
        compactedUpdate[pageNumber].push(...ruleToApply);
    }
    );
    update.sort( (a, b) => compactedUpdate[a].length - compactedUpdate[b].length);
    return update;
}

const result = updatesWithErrors.map(fixOrder).map( (e) => Number(e[(e.length - 1) / 2])).reduce( (acc, c) => acc + c, 0);

console.log("Result", result);

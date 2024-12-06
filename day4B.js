const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const letterAt = (y, x) => (y >= 0 && y < 140 && x >= 0 && x < 140) ? lines[y].charAt(x) : "-";

let count = 0;
lines.forEach( (line, v_index) => {
    line.split("").forEach( (letter, h_index) => {
        if (letter !== "A")
            return;
        // MM
        // SS
        if (letterAt(v_index - 1, h_index - 1) == "M" && letterAt(v_index - 1, h_index + 1) == "M" && letterAt(v_index + 1, h_index - 1) == "S" && letterAt(v_index + 1, h_index + 1) == "S") {
            count++;
        }
        // MS
        // MS
        if (letterAt(v_index - 1, h_index - 1) == "M" && letterAt(v_index - 1, h_index + 1) == "S" && letterAt(v_index + 1, h_index - 1) == "M" && letterAt(v_index + 1, h_index + 1) == "S") {
            count++;
        }
        // SS
        // MM
        if (letterAt(v_index - 1, h_index - 1) == "S" && letterAt(v_index - 1, h_index + 1) == "S" && letterAt(v_index + 1, h_index - 1) == "M" && letterAt(v_index + 1, h_index + 1) == "M") {
            count++;
        }
        // SM
        // SM
        if (letterAt(v_index - 1, h_index - 1) == "S" && letterAt(v_index - 1, h_index + 1) == "M" && letterAt(v_index + 1, h_index - 1) == "S" && letterAt(v_index + 1, h_index + 1) == "M") {
            count++;
        }
    }
    );
}
);

console.log("Result", count)

const pre = document.getElementsByTagName('pre')[0].innerText;
const lines = pre.split('\n').filter(l => !!l);

const letterAt = (y, x) => (y >= 0 && y < 140 && x >= 0 && x < 140) ? lines[y].charAt(x) : "-";

let count = 0;
lines.forEach( (line, v_index) => {
    line.split("").forEach( (letter, h_index) => {
        if (letter !== "X")
            return;

        // look to top
        if (letterAt(v_index - 1, h_index) == "M" && letterAt(v_index - 2, h_index) == "A" && letterAt(v_index - 3, h_index) == "S") {
            count++;
        }
        // look to top/right
        if (letterAt(v_index - 1, h_index + 1) == "M" && letterAt(v_index - 2, h_index + 2) == "A" && letterAt(v_index - 3, h_index + 3) == "S") {
            count++;
        }
        // look to right
        if (letterAt(v_index, h_index + 1) == "M" && letterAt(v_index, h_index + 2) == "A" && letterAt(v_index, h_index + 3) == "S") {
            count++;
        }
        // look to down/right
        if (letterAt(v_index + 1, h_index + 1) == "M" && letterAt(v_index + 2, h_index + 2) == "A" && letterAt(v_index + 3, h_index + 3) == "S") {
            count++;
        }
        // look to down
        if (letterAt(v_index + 1, h_index) == "M" && letterAt(v_index + 2, h_index) == "A" && letterAt(v_index + 3, h_index) == "S") {
            count++;
        }
        // look to down/left
        if (letterAt(v_index + 1, h_index - 1) == "M" && letterAt(v_index + 2, h_index - 2) == "A" && letterAt(v_index + 3, h_index - 3) == "S") {
            count++;
        }
        // look to left
        if (letterAt(v_index, h_index - 1) == "M" && letterAt(v_index, h_index - 2) == "A" && letterAt(v_index, h_index - 3) == "S") {
            count++;
        }
        // look to top/left
        if (letterAt(v_index - 1, h_index - 1) == "M" && letterAt(v_index - 2, h_index - 2) == "A" && letterAt(v_index - 3, h_index - 3) == "S") {
            count++;
        }
    }
    );
}
);

console.log("Result", count)

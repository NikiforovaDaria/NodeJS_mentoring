const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", input => {
    input = input
        .split("")
        .reverse()
        .join("");
    process.stdout.write(input);
});
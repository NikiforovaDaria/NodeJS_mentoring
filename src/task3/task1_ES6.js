import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', input => {
    const reversedInput = [...input].reverse().join('');
    process.stdout.write(reversedInput);
});

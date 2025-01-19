const readline = require('readline')

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let question = "How are you today? \n"

userInterface.question(question, (answer) => {
    userInterface.write(`The answer received: ${answer} \n`)
    process.exit(1)
})


process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    console.log('Received data:', data.toString());
  });


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const y = 2; // Row to move the cursor to

readline.cursorTo(process.stdout, 0, y);

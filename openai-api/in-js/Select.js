import * as readline from 'node:readline';

const stdout = process.stdout
const stdin = process.stdin
const stderr = process.stderr

export default class Select {
    constructor(opts = {
        question: "",
        options: [],
        answers: [],
        pointer: "",
        color: ""
    }) {
        let { question, options, answers, pointer, color} = opts
        this.question = question
        this.options = options
        this.answers = answers || []
        this.pointer = pointer || ">"
        this._color = color || "blue"
        this.input
        this.selection = null
        // For delaying and waiting
        this.selectionPromise = new Promise(resolve => {
            this.resolveSelection = resolve
        })
        this.cursorLoc = {
            x: 0,
            y: 0
        }
    }

    // Used to return colored data
    // str: the data we want to color
    // colorName: the color we want
    color(str, colorName = 'yellow') {
        // First value in each color is the color code for the foreground
        // Second value is the color code for the background
        const colors = {
            'yellow': [33,89],
            'blue': [34, 89],
            'green': [32, 89],
            'cyan': [35, 89],
            'red': [31, 89],
            'magenta': [36, 89]
        }
        // Coat the str with the foreground code and background with a special format: \x1b[COLOR_CODE_HEREm
        // Attach the foreground at the start and the background at the back of the str and return the concatenation
        const _color = colors[colorName]
        const start = "\x1b[" + _color[0] + "m"
        const stop = "\x1b[" + _color[1] + "m\x1b[0m"
        return start + str + stop
    }

    start(callbackFn) {
        // console.log("setting", callbackFn)
        // this.callbackFn = callbackFn
        console.clear()
        stdout.write(this.question + '\n')
        for (let opt = 0; opt < this.options.length; opt++) {
            this.options[opt] = this.pointer + " " + this.options[opt]
            if (opt === this.options.length - 1) {
                this.input = this.options.length - 1
                this.options[opt] += '\n'
                stdout.write(this.color(this.options[opt], this._color)) 
            } else {
                this.options[opt] += '\n'
                stdout.write(this.options[opt])
            }
            this.cursorLoc.y = opt + 1
        }
        stdin.setRawMode(true) // turn raw mode on, so standard input stream is reading individual keypresses
        stdin.resume()
        stdin.setEncoding('utf-8') // specify how the incoming data from 'stdin' should be interpeted and decoded
        this.hideCursor()
        stdin.on('data', this.pn(this))
    }


    pn(self) {
        // keycode will be taken in the c param
        // use the switch statement to work on different keystroke
        return (c) => {
            switch(c) {
                case '\u0004': // ctrl-d
                case '\r': 
                case '\n':
                    return self.enter()
                case '\u0003': // ctrl-c
                    return self.ctrlc()
                case '\u001b[A':
                    return self.upArrow()
                case '\u001b[B':
                    return self.downArrow()
            }
        }
    }

    // Highlight the current options
    // First get the current position of the cursor in the y plane of the terminal,
    // and use cursorTo() to set the cursor to the position of y and 0 in the x plane
    // Then, check if it's at topmost index, if yes, wrap the index around and point 
    // it at the last index, if not, then simply decrease it
    upArrow() {
        let y = this.cursorLoc.y
        readline.cursorTo(stdout, 0, y) // used to move the cursor position within the stdout stream, 0 represents column, y represents row
        stdout.write(this.options[y-1]) // reset the color of the text back to the original color
        if (this.cursorLoc.y === 1) {
            this.cursorLoc.y = this.options.length
        } else {
            this.cursorLoc.y--
        }
        y = this.cursorLoc.y
        readline.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y-1], this._color))
        this.input = y - 1
    }

    // The implementation for downArrow() is pretty much the same as upArrow
    // The differences are that y is incremented instead of decremented, and is set to 1
    // if equal to the length of options
    downArrow() {
        let y = this.cursorLoc.y
        readline.cursorTo(stdout, 0, y) // reset the color of the text back to the original color
        stdout.write(this.options[y - 1])
        if(this.cursorLoc.y === this.options.length) {
            this.cursorLoc.y = 1
        } else {
            this.cursorLoc.y++
        } 
        y = this.cursorLoc.y
        readline.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y - 1], this._color))
        this.input = y - 1
    }

    // called when enter key is pressed
    enter() {
        stdin.removeListener('data', this.pn) // remove data listening hookline
        stdin.setRawMode(false) // reset stdin setting
        stdin.pause() // reset stdin setting
        this.showCursor() // showCursor method
        readline.cursorTo(stdout, 0, this.options.length + 1) 

        const choice = this.options[this.input].slice(2)
        console.log("\nYou selected: " + choice)

        // For delaying and waiting
        this.selection = choice
        this.resolveSelection(choice)
        // console.log("starting...", this.callbackFn)
        // this.callbackFn?.();
    }

    ctrlc() {
        stdin.removeListener('data', this.pn)
        stdin.setRawMode(false)
        stdin.pause()
        this.showCursor()
    }

    // hide the cursor
    hideCursor() {
        stdout.write('\x1b[?25l')
    }

    // show the cursor
    showCursor() {
        stdout.write("\x1B[?25h")
    }

    get Selection() {
        return this.selection
    }
}

const testSample = new Select({
    question: "How are you today?",
    options: [
        "I am good",
        "Great!",
        "I am tired",
        "I doing fine"
    ],
})


// testSample.start()





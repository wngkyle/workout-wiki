import readline from "readline"
import { OpenAIApi, Configuration } from "openai"
import { config } from "dotenv"
config({path: '../.env'})

console.log("Welcome to ChatGPT-586")

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

userInterface.prompt()
userInterface.on("line", async input => {
    const res = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: 'user',
            content: input
        }] 
    })
    console.log((await res).data.choices[0].message.content)
    userInterface.prompt()
})


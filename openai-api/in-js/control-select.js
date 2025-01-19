import Select from "./Select.js"

const setting = new Select({
    question: "Choose the desired setting",
    options: [
        "Default",
        "Custom"
    ]
})

const chatgptModel = new Select({
    question: "Choose the desired model:",
    options: [
        "GPT-4",
        "GPT-3.5",
        "DALL·E",
        "Whisper",
        "Embeddings",
        "Moderation",
        "GPT-3"
    ],
})

async function firstConfig() {
    setting.start()
    setting.selectionPromise.then((val)=>{
        console.log("done", val)
        return chatgptModel.start()
}).th
    // secondConfig()
}

async function secondConfig() {
    chatgptModel.start()
    await chatgptModel.selectionPromise
    console.log("ALL DONE")
}
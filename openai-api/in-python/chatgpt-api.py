import os
import openai 
from dotenv import load_dotenv

load_dotenv('../.env')

openai.api_key = os.getenv("OPENAI_API_KEY")


print("Welcome to ChatGPT-586")
message = input("> ")

while message != "quit()" :
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[{
            "role": "user", 
            "content": message
        }]
    )
    print(chat_completion.choices[0].message.content)
    message = input("> ")

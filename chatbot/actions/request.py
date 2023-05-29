
import requests
# import speech_recognition as sr     # import the library
# import subprocess
# from gtts import gTTS

# sender = input("What is your name?\n")

bot_message = ""
while bot_message !="Bye" :
    message = input("apa pesan mu?\n")

    print("Sending message now...")

    r = requests.post('http://localhost:5002/webhooks/rest/webhook', json={"message":message})

    print("Bot says, ",end= ' ')
    for i in r.json():
        bot_message = i['text']
        print(f"{i['text']}")
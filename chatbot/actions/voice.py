## rasa run -m models --endpoints endpoints.yml --port 5002 --credentials credentials.yml

# import subprocess
import requests
import speech_recognition as sr    
from gtts import gTTS


bot_message = ""
message=""

r = requests.post('http://localhost:5002/webhooks/rest/webhook', json={"message": "Hello"})

print("respon bot: ",end=' ')
for i in r.json():
    bot_message = i['text']
    print(f"{bot_message}")

myobj = gTTS(text=bot_message)
myobj.save("welcome.mp3")
print('saved')

while bot_message != "Bye" or bot_message!='thanks':

    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak Anything :")
        audio = r.listen(source)
        try:
            message = r.recognize_google(audio)
            print("Pesan anda : {}".format(message))

        except:
            print("Maaf tidak dapat mengenal suara anda")
    if len(message)==0:
        continue
    print("mengirim pesan anda...")

    r = requests.post('http://localhost:5002/webhooks/rest/webhook', json={"message": message})

    print("respon bot: ",end=' ')
    for i in r.json():
        bot_message = i['text']
        print(f"{bot_message}")

    myobj = gTTS(text=bot_message)
    myobj.save("welcome.mp3")
    print('saved')

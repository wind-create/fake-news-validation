from typing import Any, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from googleapiclient.discovery import build

class ActionSearchGoogle(Action):
    def name(self) -> str:
        return "action_search_google"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[str, Any]) -> List[Dict[str, Any]]:
        
        query = tracker.latest_message['text']
        service = build("customsearch", "v1", developerKey="YOUR_API_KEY")
        result = service.cse().list(q=query, cx="YOUR_CSE_ID").execute()
        results = result.get("items", [])
        response = ""
        for item in results:
            response += f"{item['title']}\n{item['link']}\n\n"
        if response:
            dispatcher.utter_message(response)
        else:
            dispatcher.utter_message("Sorry, I couldn't find any results")



from typing import Any, Dict, List, Tuple
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class SaveDialogToFile(Action):

    def name(self) -> Text:
        return "action_save_dialog_to_file"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        conversation = tracker.export_stories()
        with open("conversation.json", "w") as f:
            f.write(conversation)

        dispatcher.utter_message(template="utter_conversation_saved")
        return []



import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any, Text
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction

class ActionSearchTheWeb(Action):
    def name(self) -> Text:
        return "action_search_the_web"
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        keywords = tracker.get_slot("keywords")
        if not keywords:
            dispatcher.utter_message("Please provide some keywords")
            return []
        
        sites_to_search = ["https://www.kompas.com/", "https://turnbackhoax.id/", "https://www.liputan6.com/", "https://cekfakta.tempo.co/"]
        search_url = f"https://www.google.com/search?q={keywords}+site:{'+site:'.join(sites_to_search)}"
        response = requests.get(search_url)
        soup = BeautifulSoup(response.text, "html.parser")
        search_results = soup.find_all("div", class_="g")

        if not search_results:
            dispatcher.utter_message("Sorry, no search results found.")
            return []

        message = f"I found these search results for {keywords}:"
        for result in search_results:
            title = result.find("h3").text
            url = result.find("cite").text
            message += f"\n{title} - {url}"

        dispatcher.utter_message(message)
        return []

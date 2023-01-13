
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import pandas as pd
# import csv
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
# import functools
# import operator

# import sqlite3
# import random
from pymongo import MongoClient
from googleapiclient.discovery import build

# sqlite koneksi
# class DBQueryingMethods:
#      def create_connection(db_file):
#          conn = None
#          try:
#             conn = sqlite3.connect(db_file)
#          except Error as e:
#             print(e)
         
#          return conn

# class DBQueryingMethods:
#      def create_connection(db_file):
#         client = MongoClient('mongodb+srv://skripsiuser:<password>@cluster0.khqzqbq.mongodb.net/?retryWrites=true&w=majority')
#         db = client['test']
#         collection = db['hoax_faqs']


def _connect_mongo(username, password):
    """ A util for making a connection to mongo """

    if username and password:
        mongo_uri = 'mongodb+srv://%s:%s@cluster0.khqzqbq.mongodb.net/?retryWrites=true&w=majority' % (username, password)
        conn = MongoClient(mongo_uri)
    else:
        print("koneksi mongodb gagal")


    return conn

# class GetHoaxFaqAnswer(Action):


#      def __init__(self):

#         # csv dan sqlite
#         #   conn = DBQueryingMethods.create_connection(db_file= "./data/faq.db")
#         #  self.faq = pd.read_csv('./data/faq.csv')
#         #  self.faq = pd.read_sql_query("SELECT * from faq_hoax_news", conn)

#         # mongodb
#          db = _connect_mongo(username='skripsiuser', password='skripsi12345')['test']
#          cursor = db['hoax_faqs'].find()
#          self.faq =  pd.DataFrame(list(cursor))
        
#          qss = list(self.faq['pertanyaan'])
#          with open("./data/hoax_faq.yml", "wt", encoding="utf-8") as f:
#              f.write("nlu: \n- intent: hoax_faq\n  examples: | \n")
#              for q in qss:
#                  f.write(f"    - {q}\n")

        
#      def name(self) -> Text:
#         return "action_get_hoax_faq_answer"

#      def run(self, dispatcher: CollectingDispatcher,
#              tracker: Tracker,
#              domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         query = tracker.latest_message['text']
#         questions = list(self.faq['pertanyaan'])
#         answer = list(self.faq['response'])
#         # memproses ratio pada fuzzy 
#         Ratios = process.extract(query, questions)
#         print(Ratios)
#         # penggunaan fuzzy pada menilai kesamaan pertanyaan 
#         mathed_question, score = process.extractOne(query,questions, scorer=fuzz.token_set_ratio)
#         # jika score ratio diatas 50 maka akan memberitahukan jawaban tersebut
#         if score > 50:
#             matched_row = self.faq.loc[self.faq['pertanyaan'] == mathed_question,]
#             answer = matched_row['response'].values[0]
#             response = "fakta berita hoax , \n answer: {} \n".format(answer)
        
#         else:
#             response = "maaf, saya tidak menemukan jawaban untuk pertanyaan tersebut"

        
#         dispatcher.utter_message(response)


# class GetAnswer(Action):


#      def __init__(self):

#         # csv dan sqlite
#         #   conn = DBQueryingMethods.create_connection(db_file= "./data/faq.db")
#         #  self.faq = pd.read_csv('./data/faq.csv')
#         #  self.faq = pd.read_sql_query("SELECT * from faq_hoax_news", conn)

#         # mongodb
#          db = _connect_mongo(username='skripsiuser', password='skripsi12345')['test']
#          cursor = db['faqs'].find()
#          self.faq =  pd.DataFrame(list(cursor))
        
#          qss = list(self.faq['pertanyaan'])
#          with open("./data/faq.yml", "wt", encoding="utf-8") as f:
#              f.write("nlu: \n- intent: question\n  examples: | \n")
#              for q in qss:
#                  f.write(f"    - {q}\n")

        
#      def name(self) -> Text:
#         return "action_get_answer"

#      def run(self, dispatcher: CollectingDispatcher,
#              tracker: Tracker,
#              domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         query = tracker.latest_message['text']
#         questions = list(self.faq['pertanyaan'])
#         answer = list(self.faq['response'])
#         Ratios = process.extract(query, questions)
#         print(Ratios)

#         mathed_question, score = process.extractOne(query,questions, scorer=fuzz.token_set_ratio)

#         if score > 50:
#             matched_row = self.faq.loc[self.faq['pertanyaan'] == mathed_question,]
#             answer = matched_row['response'].values[0]
#             response = "{} \n".format(answer)
        
#         else:
#             response = "maaf, saya tidak menemukan jawaban untuk pertanyaan tersebut"

        
#         dispatcher.utter_message(response)

    #  def run(self, dispatcher: CollectingDispatcher,
    #          tracker: Tracker,
    #          domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    
    #         csvfile = open(r"D:\RASA\personal_website_bot\data\faq.csv",encoding='utf-8-sig')
    #         reader = csv.reader(csvfile)
    #         #question
    #         question = tracker.latest_message['text'] 
    #         #fuzzywuzzy
    #         data_list = list(self.faq['pertanyaan'])
    #         qa = process.extractOne(question,data_list)
    #         qa1 = functools.reduce(operator.add, str(qa))
    #         qa_f = qa1[2:-7]
    #         for row in reader:
    #             # check
    #             if qa_f in row[0]:
    #                 print(row[1])
    #                 answer = row[1]
    #                 dispatcher.utter_message(text = str(answer))
    #                 break;                     
    #                 return []


class ActionSearchGoogle(Action):
    def __init__(self):

        # csv dan sqlite
        #   conn = DBQueryingMethods.create_connection(db_file= "./data/faq.db")
        #  self.faq = pd.read_csv('./data/faq.csv')
        #  self.faq = pd.read_sql_query("SELECT * from faq_hoax_news", conn)

        # mongodb
         db = _connect_mongo(username='skripsiuser', password='skripsi12345')['test']
         cursor = db['faqs'].find()
         self.faq =  pd.DataFrame(list(cursor))
        
         qss = list(self.faq['pertanyaan'])
         with open("./data/faq.yml", "wt", encoding="utf-8") as f:
             f.write("nlu: \n- intent: question\n  examples: | \n")
             for q in qss:
                 f.write(f"    - {q}\n")

    def name(self) -> str:
        return "action_search_google"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[str, Any]) -> List[Dict[str, Any]]:
        
        message = tracker.latest_message.get('text')
        if message.startswith("Cek berita"):
            query = message.replace("cek berita", "").strip()
            service = build("customsearch", "v1", developerKey="AIzaSyBiRrDiWdY1MfRrFtO5U0NgZfTDIiL-U9k")
            result = service.cse().list(q=query, cx="3bd74cd840a9b9f50", num=3).execute()
            results = result.get("items", [])
            response = ""
            for item in results:
                response += f"{item['title']}\n{item['snippet']}\n{item['link']}\n\n"
            if response:
                dispatcher.utter_message(response)
            else:
                dispatcher.utter_message("Sorry, I couldn't find any results")

        else:
            # dispatcher.utter_message("Sorry, gak tau")
            query = tracker.latest_message['text']
            questions = list(self.faq['pertanyaan'])
            answer = list(self.faq['response'])
            Ratios = process.extract(query, questions)
            print(Ratios)

            mathed_question, score = process.extractOne(query,questions, scorer=fuzz.token_set_ratio)

            if score > 50:
                matched_row = self.faq.loc[self.faq['pertanyaan'] == mathed_question,]
                answer = matched_row['response'].values[0]
                response = "{} \n".format(answer)
        
            else:
                response = "maaf, saya tidak menemukan jawaban untuk pertanyaan tersebut"

        
            dispatcher.utter_message(response)


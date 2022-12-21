# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []


from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import pandas as pd
import csv
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import functools
import operator

import sqlite3
import random
from pymongo import MongoClient

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

class GetAnswer(Action):


     def __init__(self):

        # csv dan sqlite
        #   conn = DBQueryingMethods.create_connection(db_file= "./data/faq.db")
        #  self.faq = pd.read_csv('./data/faq.csv')
        #  self.faq = pd.read_sql_query("SELECT * from faq_hoax_news", conn)

        # mongodb
         db = _connect_mongo(username='skripsiuser', password='skripsi12345')['test']
         cursor = db['hoax_faqs'].find()
         self.faq =  pd.DataFrame(list(cursor))
        
         qss = list(self.faq['pertanyaan'])
         with open("./data/faq.yml", "wt", encoding="utf-8") as f:
             f.write("nlu: \n- intent: question\n  examples: | \n")
             for q in qss:
                 f.write(f"    - {q}\n")

        
     def name(self) -> Text:
        return "action_get_answer"

     def run(self, dispatcher: CollectingDispatcher,
             tracker: Tracker,
             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        query = tracker.latest_message['text']
        questions = list(self.faq['pertanyaan'])
        answer = list(self.faq['response'])
        Ratios = process.extract(query, questions)
        print(Ratios)

        mathed_question, score = process.extractOne(query,questions, scorer=fuzz.token_set_ratio)

        if score > 50:
            matched_row = self.faq.loc[self.faq['pertanyaan'] == mathed_question,]
            answer = matched_row['response'].values[0]
            response = "Here's something I found, \n Answer: {} \n".format(answer)
        
        else:
            response = " sorry I couldn't find anything"

        
        dispatcher.utter_message(response)

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

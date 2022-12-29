import pandas as pd
import numpy as np
import pickle
import operator
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split as tts
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder as LE
from sklearn.metrics.pairwise import cosine_similarity
import random
import nltk
nltk.download('punkt')
from nltk.stem.lancaster import LancasterStemmer
from pymongo import MongoClient


def _connect_mongo(username, password):
    """ A util for making a connection to mongo """

    if username and password:
        mongo_uri = 'mongodb+srv://%s:%s@cluster0.khqzqbq.mongodb.net/?retryWrites=true&w=majority' % (username, password)
        conn = MongoClient(mongo_uri)
    else:
        print(mongo_uri)


    return conn


    """ Read from Mongo and Store into DataFrame """

    # Connect to MongoDB
db = _connect_mongo(username='skripsiuser', 
password='skripsi12345')['test']

    # Make a query to the specific DB and Collection
cursor = db['hoax_faqs'].find()

    # Expand the cursor and construct the DataFrame
df =  pd.DataFrame(list(cursor))


def cleanup(sentence):
    word_tok = nltk.word_tokenize(sentence)
    return word_tok

questions = df['pertanyaan'].values
X = []
for question in questions:
    X.append(cleanup(question))

X
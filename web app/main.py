from __future__ import print_function
from flask import  Flask
from flask import Flask, request, session, g, redirect, url_for, \
    abort, render_template, flash, jsonify
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

import os, json, simplejson

# imports for tweepy

import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
from pprint import pprint
import sys, string, os
import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
from pprint import pprint
import sys
import string
import os

from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
# from gensim import corpora, models
# import gensim
import re
app = Flask(__name__)
app.debug = True
GoogleMaps(app)

# css_file = url_for('static', filename='style.css')


@app.route('/')
def index():
    author = "Brandon"
    name = "Karrie"
     # creating a map in the view
    airport_info = getAirportJson()
    
    return render_template('index.html', author=author, name=name, airport_info=airport_info)


@app.route("/second")
def second():
    try:
        create_data()
        return  render_template("second.html")
    except:
        return "Failed loading" 
        
@app.route("/destination", methods=['GET'])

def destination():
    x = { "City":"Atlanta","IATA":"ATL","Latitude":33.636719,"Longitude":-84.428067}
    return jsonify(x)
    
def getAirportJson():
    with open('static/airports.json') as data_file:    
        data = json.load(data_file)
    return data
    
    
    
@app.route("/third")
def third():
    try:
        # create_data()
        return render_template('third.html')
    except:
        return render_template('third.html')
        
        
def array(arlist):
    string = ""
    for x in arlist:
        string+= x
    return string


@app.route('/_add_numbers')
def add_distances():
    a = request.args.get('iata')
    return jsonify(result = a)
    

    
# def getAirportsLocations():
#     airport_list = []
#     for i in getAirportJson():
#         airport_tuple = ( , )
#         airport_list.append(airport_tuple)



#tweepy import




def get_data():
    with open("static/airports.json") as json_file:
        json_data = json.load(json_file)
        return json_data

try:
    import json
except ImportError:
    import simplejson as json

# Import the necessary methods from "twitter" library
from twitter import Twitter, OAuth, TwitterHTTPError, TwitterStream

# Variables that contains the user credentials to access Twitter API 
access_token = "2895975151-qIpcR87xyekgsHkD0hofDyXVU3kQQ7EL9pyXtAU"
access_token_secret = "yuSY7otPCo7nAlCVlVXIs6ddXF0P0K5I2UrHTp4dHR3ZK"
consumer_key = "EwakJXeajVTIDaq6XPb8bAE2f"
consumer_secret = "TMpxcRWYKgZeOfSecBB8doM17cbqCCMEJFxHpyVCqEbsGP8IE2"

oauth = OAuth(access_token, access_token_secret, consumer_key, consumer_secret)

# Initiate the connection to Twitter Streaming API
twitter_stream = TwitterStream(auth=oauth)


# def create_data():
#     data = get_data()
#     for d in data:
#         tweet_count = 20
#         iterator = twitter_stream.statuses.filter(track = d['City'], language="en")
#         if not os.path.exists("data_city"):
#             os.makedirs("data_city")
#         file = open( "data_city" + "/"+d['City']+".txt", 'a')
#         for tweet in iterator:
#             tweet_count -= 1
#             # Twitter Python Tool wraps the data returned by Twitter 
#             # as a TwitterDictResponse object.
#             # We convert it back to the JSON format to print/score
            
#             try:
#                 file.write(json.dumps(tweet["text"]).encode('utf-8'))
#                 file.write('\n') 
#             except:
#                 print("no Tweets")
#             # The command below will do pretty printing for JSON data, try it out
#             # print json.dumps(tweet, indent=4)
            
#             if tweet_count <= 0:
#                 break 


def create_data():
    print("D")
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
   
    api = tweepy.API(auth)
    query = 'python'
    max_tweets = 100
    # searched_tweets = [status for status in tweepy.Cursor(api.search, q=query,lang="en").items(max_tweets)]
    # # print searched_tweets.text
    data = get_data()
    for d in data:
        print(d)
        if not os.path.exists("data_city"):
            os.makedirs("data_city")
        file = open( "data_city" + "/"+d['City']+".txt", 'a')
        for tweet in tweepy.Cursor(api.search,q = d['City'],count = max_tweets,result_type="recent",include_entities=True,lang="en").items(10):
            try:
                print(tweet.text)
                file.write(tweet.text)
                file.write('\n') 
            except:
                print("no Tweets")
        # file.write(json.dumps(tweet["text"]).encode('utf-8'))
        # file.write('\n')
    
    file.close
 
 
# def topics(doc):
#     doc = doc.lower()
#     doc   = re.sub(r"(?:\@|https?\://)\S+", "", doc)
#     doc = re.sub(r"austin","",doc)
#     doc = doc.decode('unicode_escape').encode('ascii','ignore')
#     doc = re.sub("\W",' ', doc)
#     doc = ' '.join(word for word in doc.split() if len(word)>3)
#     tokenizer = RegexpTokenizer(r'\w+')
#     # create English stop words list
#     en_stop = get_stop_words('en')
#     doc_set = [doc]
#     texts = []
#     for i in doc_set:
#         raw = i.lower()
#         tokens = tokenizer.tokenize(raw)
#         stopped_tokens = [i for i in tokens if not i in en_stop]
#         texts.append(stopped_tokens)
#     dictionary = corpora.Dictionary(texts)
#     corpus = [dictionary.doc2bow(text) for text in texts]
#     ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=1, id2word = dictionary, passes=20)
#     return ldamodel.print_topics(num_topics=1, num_words=3)

     

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    host = os.getenv('IP', '0.0.0.0')
    app.run(port=port, host=host)
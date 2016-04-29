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


app = Flask(__name__)
app.debug = True
GoogleMaps(app)

# css_file = url_for('static', filename='style.css')


@app.route('/')
def index():
    author = "Brandon"
    name = "Karrie"
     # creating a map in the view
    sndmap = Map(
        identifier="sndmap",
        style = "height:500px;width:80%;margin:5%;",
        lat=37.4419,
        lng=-122.1419,
        zoom = 5,
        markers={'http://maps.google.com/mapfiles/ms/icons/green-dot.png':[(37.4419, -122.1419)],
                 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png':[(37.4300, -122.1400)]},
                
    )
    
    
    airport_info = getAirportJson()
    
    return render_template('index.html', sndmap=sndmap, author=author, name=name, airport_info=airport_info)


@app.route("/second")
def second():
    try:
        create_data()
        return render_template('second.html')
    except:
        return "SDa" 
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
@app.route("/destination", methods=['GET'])

    
# def getAirportsLocations():
#     airport_list = []
#     for i in getAirportJson():
#         airport_tuple = ( , )
#         airport_list.append(airport_tuple)



#tweepy import




def get_data():
    with open("static/airport2.json") as json_file:
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
    # # stream = Stream(auth, l)
    api = tweepy.API(auth)
    query = 'python'
    max_tweets = 1
    # searched_tweets = [status for status in tweepy.Cursor(api.search, q=query,lang="en").items(max_tweets)]
    # # print searched_tweets.text
    data = get_data()
    # for d in data:
    #     if not os.path.exists("data_city"):
    #         os.makedirs("data_city")
    #         file = open( "data_city" + "/"+d['City']+".txt", 'a')
    # for tweet in tweepy.Cursor(api.search,q = d['City'],count = max_tweets,result_type="recent",include_entities=True,lang="en").items(10):
    #     print(tweet.text)
    #     file.write(json.dumps(tweet["text"]).encode('utf-8'))
    #     file.write('\n')
    
    # file.close
  

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    host = os.getenv('IP', '0.0.0.0')
    app.run(port=port, host=host)
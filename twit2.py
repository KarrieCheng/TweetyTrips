import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
from pprint import pprint
import sys
import string
import os
from __future__ import print_function


def get_data():
    with open("airports.json") as json_file:
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

# Get a sample of the public data following through Twitter


# Print each tweet in the stream to the screen 
# Here we set it to stop after getting 1000 tweets. 
# You don't have to set it to stop, but can continue running 
# the Twitter API to collect data for days or even longer. 
def create_data():
    data = get_data()
    for d in data:
        tweet_count = 10
        print "looped"
        iterator = twitter_stream.statuses.filter(track= d['City'], language="en")
        if not os.path.exists("data_city"):
            os.makedirs("data_city")
        file = open( "data_city" + "/"+d['City']+".txt", 'a')
        for tweet in iterator:
            tweet_count -= 1
            # Twitter Python Tool wraps the data returned by Twitter 
            # as a TwitterDictResponse object.
            # We convert it back to the JSON format to print/score
            
            try:
                print json.dumps(tweet["text"]).encode('utf-8')
                file.write(json.dumps(tweet["text"]).encode('utf-8'))
                file.write('\n') 
            except:
                print "no text"
            # The command below will do pretty printing for JSON data, try it out
            # print json.dumps(tweet, indent=4)
            
            if tweet_count <= 0:
                print "broke"
                break 



if __name__ == '__main__':
    create_data()

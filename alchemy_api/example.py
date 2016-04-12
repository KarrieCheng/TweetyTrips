#!/usr/bin/env python

#	Copyright 2013 AlchemyAPI
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.


from __future__ import print_function
from alchemyapi import AlchemyAPI
import json, sys, urllib

def get_data():
    with open("airports.json") as json_file:
        json_data = json.load(json_file)
        return json_data

def main():
    # with open(os.path.join(sub_dir, filename), "r") as f:
    json_data = get_data()
    for airport in json_data:
        filename = airport['City'] + ".txt"
        with open(filename, "r") as f:
            data = f.read()
            demo_text = airport['City']



    alchemyapi = AlchemyAPI()

    # demo_text = 'I hate everything but I love me some chicken nuggets. There\'s a lot of people here wow!'
    alchemyapi = AlchemyAPI()
    # city = urllib.quote(sys.argv[1])
    city = "weather"






    print('############################################')
    print('#   Sentiment Analysis Example             #')
    print('############################################')

    response = alchemyapi.sentiment('html', demo_text)

    if response['status'] == 'OK':
        print('## Response Object ##')
        print(json.dumps(response, indent=4))

        print('')
        print('## Document Sentiment ##')
        print('type: ', response['docSentiment']['type'])

        if 'score' in response['docSentiment']:
            print('score: ', response['docSentiment']['score'])
    else:
        print('Error in sentiment analysis call: ', response['statusInfo'])

    print('############################################')
    print('#   Targeted Sentiment Analysis Example    #')
    print('############################################')


    print('Processing text: ', demo_text)
    print('')

    response = alchemyapi.sentiment_targeted('text', demo_text, city)

    if response['status'] == 'OK':
        print('## Response Object ##')
        print(json.dumps(response, indent=4))

        print('')
        print('## Targeted Sentiment ##')
        print('type: ', response['docSentiment']['type'])

        if 'score' in response['docSentiment']:
            print('score: ', response['docSentiment']['score'])
    else:
        print('Error in targeted sentiment analysis call: ',
              response['statusInfo'])


    
    for airport in json_data():
        filename = airport['City'] + ".txt"
        f = open(airport['City']+"_sentiment_results.txt", 'w')
        f.write(response['docSentiment']['type'])

if __name__ == '__main__':
    main()
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

demo_text = 'I hate everything but I love me some chicken nuggets. There\'s a lot of people here wow!'
alchemyapi = AlchemyAPI()
city = urllib.quote(sys.argv[1])

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

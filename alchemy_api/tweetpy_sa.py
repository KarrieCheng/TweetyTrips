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
import json, os, sys, urllib

def get_data():
    with open("airports.json") as json_file:
        json_data = json.load(json_file)
        return json_data

def main():
    # with open(os.path.join(sub_dir, filename), "r") as f:
    json_data = get_data()

    sub_dir = '../data_city'
    for filename in os.listdir(sub_dir):
        city_name = filename[:-4]
        with open(os.path.join(sub_dir, filename), "r") as f:
            if filename.endswith(".txt"):
                data = f.read()
                demo_text = data
                f.close()
                # documents.append(create_tokenized_string(tokenize_document(data)))


    # for airport in json_data:
    #     filename = "../data_city" + "/"+ airport['City'] + ".txt"
    #     with open(filename, "r") as f:
    #         data = f.read()
    #         demo_text = data



            alchemyapi = AlchemyAPI()

            # demo_text = 'I hate everything but I love me some chicken nuggets. There\'s a lot of people here wow!'
            alchemyapi = AlchemyAPI()
            # city = urllib.quote(sys.argv[1])
            city = city_name
            # city = airport['City']






            # print('############################################')
            # print('#   Sentiment Analysis Example             #')
            # print('############################################')

            overall_response = alchemyapi.sentiment('html', demo_text)

            if overall_response['status'] == 'OK':
            #     print('## Response Object ##')
            #     print(json.dumps(response, indent=4))

            #     print('')
            #     print('## Document Sentiment ##')
            #     print('type: ', response['docSentiment']['type'])

                if 'score' in overall_response['docSentiment']:
                    print('score: ', overall_response['docSentiment']['score'])
            else:
                print('Error in sentiment analysis call: ', overall_response['statusInfo'])

            # print('############################################')
            # print('#   Targeted Sentiment Analysis Example    #')
            # print('############################################')


            # print('Processing text: ', demo_text)
            # print('')

            target_response = alchemyapi.sentiment_targeted('text', demo_text, city)

            if target_response['status'] == 'OK':

            #     print('## Response Object ##')
            #     print(json.dumps(response, indent=4))

            #     print('')
            #     print('## Targeted Sentiment ##')
            #     print('type: ', response['docSentiment']['type'])

                if 'score' in target_response['docSentiment']:
                    print('score: ', target_response['docSentiment']['score'])
            else:
                print('Error in targeted sentiment analysis call: ',
                      target_response['statusInfo'])


            
            # filename = airport['City'] + ".txt"
            # f = open(airport['City']+"_sentiment_results.txt", 'w')

            filename = city_name + ".txt"
            try:
                fw = open(city_name + "_sentiment_results.txt", 'w')
                doc_sa_score = "Document Sentiment: " + overall_response['docSentiment']['score']
                target_sa_score = "Target Sentiment: " + target_response['docSentiment']['score']
                tweetpy_score = str(.3 * float(overall_response['docSentiment']['score']) + .7* float(target_response['docSentiment']['score']))
                tweetpy_score_string = "Tweety Sentiment Score: " + tweetpy_score

                fw.write(doc_sa_score + "\n" + target_sa_score + "\n" + tweetpy_score_string)
                fw.close()
            except:
                print("error")
if __name__ == '__main__':
    main()
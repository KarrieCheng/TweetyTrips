##Description
This is a project for CSCE470 (at Texas A&M University) in Spring 2016 which performs sentiment analysis on recent tweets in a specific geographic location. We hope to provide adventurous (but poor) college students a method to choose which city to visit, given current Frontier Airlines deals. These flash deals typically require tickets to be bought that day for flights that are within a certain upcoming date range.

We will:
- [ ] Determine the typical difference in time between the sale date and the flight for Frontier promotional emails (optional)
- [x] Collect cities that Frontier Airlines provides promotional deals using a web crawler 
- [ ] Collect a backlog of tweets to create a overall happiness level for the above cities
- [x] Analyze the sentiments of these tweets
- [ ] Compare the happiness levels of these cities
 
 ##Resources/Libraries Used
 - scra.py
 - alchemy API
 - openflights API


##How to Run:
- dependencies:
 - pip install 'twitter'
 - pip install 'tweepy'
- to collect the data:
 - You will also need to get your own api key to run this application and insert it in the twit2.py file
 - first run python twit2.py making sure that the airport.json file is in the same directory.
 - this step should take a little bit of time as it will create the directory data_city then fill in files with incoming   tweets
- to run the sentiment on the cities:
  - run the line  python alchemyapi.py  <API KEY>   

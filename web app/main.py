from flask import  Flask
from flask import Flask, request, session, g, redirect, url_for, \
    abort, render_template, flash
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

import os, json, simplejson

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
    return render_template('second.html')
    
def getAirportJson():
    with open('static/airports.json') as data_file:    
        data = json.load(data_file)
    return data
    
# def getAirportsLocations():
#     airport_list = []
#     for i in getAirportJson():
#         airport_tuple = ( , )
#         airport_list.append(airport_tuple)
    

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    host = os.getenv('IP', '0.0.0.0')
    app.run(port=port, host=host)
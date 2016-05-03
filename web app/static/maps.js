//airplane image by Situ Herrera in signs.
//suitcase by Freepik in other.

//when removing topmost map definition, uncomment this


var airports_info;
var markers = [];
var redirect = "";
function initMap() {
  var center = {lat: 30.59098, lng:-96.3617013} ; //want this to be dynamic
  // var center = {lat: , lng: 131.044};
  // var myLatlng = center;


  //when removing topmost map definition, uncomment this
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: center
  });


    
  createMarker(map, 30.59098,-96.3617013);
    ///PLACES SEARCH
// Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
 // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  
// Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
  
    if (places.length == 0) {
      return;
    }
  
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      center = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()} ; //want this to be dynamic
  
      distanceCalculationPromise(map, center);
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      
      distanceCalculationPromise(map, center);
    });
    map.fitBounds(bounds);
  });


    geolocationRetrievalPromise(map,center);
  
    //must populate airports before attempting to create markers
    $.getJSON('/static/airports.json', function(data) {         
      airports_info = data;
    });
    
 
    distanceCalculationPromise(map,center);
    
    // airports_info = sortByKey(airports_info, 'distance');
     
  }
function geolocationRetrievalPromise(map, center){
  var geolocation_promise = new Promise(
            function(resolve, reject) {
                if ("geolocation" in window.navigator) {
                  //DEPRECATED ON INSECURE LOCATIONS; WELP!
                  window.navigator.geolocation.getCurrentPosition(function(position) {
                      resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                    });
                } else {
                  resolve(null);
                }
            });
        geolocation_promise.then(
          function(val) {
            if (val == null)
              center = {lat: 39, lng:-98.3617013};
            else
              center = val;
            return val;
          }).then(
            function(val){
              
              map.setCenter(val);
              map.setZoom(7);
              createMarker(map, val.lat, val.lng);
            return "Success";
            }
        )
        .catch(
          // Log the rejection reason
          function(reason) {
                console.log('Handle rejected promise ('+reason+') here.');
        });
}
  
function distanceCalculationPromise(map, center){
  
  var p1 = new Promise(
            function(resolve, reject) {
                $.getJSON('/static/airports.json', function(data) {         
                  resolve(data); 
                });
            });
        p1.then(
            function(val) {
              var airports_array = [];
              for (var airport in val){
                createMarkerAirport(map, val[airport]);
                var airport_geo = {lat: val[airport].Latitude, lng:val[airport].Longitude};
                // console.log(getDistance(center, airport_geo));
                val[airport].distance = getDistance(center, airport_geo);
                // console.log(center.lat);
                airports_array.push(val[airport]);
              }
              return airports_array;
            }).then(
              
              
              
              
              
              
              
            //   function(val) {
            //   var close_airport_tables = document.getElementById("closest_airports");
            //   val = sortByKey(val, 'distance');
            //   var first_n_airports = 5;
            //   var iata_arrays = [];
            //   for (var i = 0; i< first_n_airports; i++){
            //     if (i == 0) 
            //       close_airport_tables.innerHTML = " "
            //     //race conditions, yo
            //     var span_id = "airport" + i;
            //     // close_airport_tables.innerHTML += "<p>" + val[i].City + " <span name = "+ span_id + "> (" + val[i].IATA +") </span>: "+ val[i].distance +" miles </p>";
            //     close_airport_tables.innerHTML += "<p>" + val[i].City + " (<span name = "+ span_id + ">" + val[i].distance +"</span> miles): "+ val[i].IATA +" miles </p>";
            //     data_string = "{"+span_id+": "+val[i].IATA+"}" 
            //     iata_arrays.push(val[i]);
            //   }
            //   // getRequestInterestedAirports(iata_arrays);
            // })
              
              
              
              
              
            function(val) {
              var close_airport_tables = document.getElementById("closest_airports");
              val = sortByKey(val, 'distance');
              var first_n_airports = 7;
              var iata_arrays = [];
              for (var i = 0; i< first_n_airports; i++){
                //TODO GET THINGS TO WORK WHEN CLICKING A PARTICLE AIRPORT
                close_airport_tables.innerHTML += "<tr class = 'iata'><td>" + val[i].City + "</td> <td>" + val[i].distance  + "</td> <td class = 'iata'>" + val[i].IATA + "</td>";
                
                iata_arrays.push(val[i]);
              }
                
                
                // for(var i = 0; i< first_n_airports; i++){
                //   $('<table>').append('<tr>');
                //     $('<td>').text(val[i].City).appendTo('tr');
                //     $('<td>').text(val[i].distance).appendTo('tr');
                //     $('<td>').text(val[i].IATA).appendTo('tr');
                    
                //   $('<table>').append('</tr>');
                // }

             
              // getRequestInterestedAirports(iata_arrays);
            })
        .catch(
          // Log the rejection reason
          function(reason) {
                console.log('Handle rejected promise ('+reason+') here.');
          });
       
      airports_info = sortByKey(airports_info, 'distance');
  
}
// //TODO GET THINGS TO WORK FOR SPECIFIC AIRPORTt
$(function() {
    $(".checking_stuff").bind('click',function() {
      
      $.get(
        url=$SCRIPT_ROOT + '/_add_numbers',
        data={iata: "HM"}, 
        success=function(data) {
          $("#result").text(data.result);
        }
      );
      // return false;
    });
});

// $(function() {
//   var content = 3;
//     $("#calculate").bind('click',function() {
      
//       alert("H");
//       // return false;
//     });
// });
  
// function getRequestInterestedAirports(iata_array){
//   // iata_array : JSON.stringify(iata_array);
//   // something = iata_array[3]
//   $.get(
//       url=$SCRIPT_ROOT + '/_add_numbers',
//       data={iata: iata_array[0]['IATA']}, 
//       success=function(data) {
//         $("#result").text(data.result);
//       }
//   );
// }
  
  
  
  
  
// function getRequestInterestedAirports(iata_array){
//   // iata_array : JSON.stringify(iata_array);
//   // something = iata_array[3]
//   $.get(
//       url=$SCRIPT_ROOT + '/_add_numbers',
//       data={iata: iata_array[0]['IATA']}, 
//       success=function(data) {
//         $("#result").text(data.result);
//       }
//   );
// }


function getDistance (origin,dest) {
  start = new google.maps.LatLng(origin.lat, origin.lng);
  end = new google.maps.LatLng(dest.lat, dest.lng);
	return Math.floor(google.maps.geometry.spherical.computeDistanceBetween(start,end) * 0.000621371);
}

function createMarker( map1, lat, long) {
    var image = '/static/travel.png';
 
    var center = {lat: lat, lng: long} ; //want this to be dynamic
  	var marker = new google.maps.Marker({
  		map: map1,
  		position: center,
  		icon:image,
  		animation: google.maps.Animation.BOUNCE
  	});
  	
  	  
}


 var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


// function createMarkerAirport( map1, lat, long) {
//     var image = '/static/airport.png';
 
//     var center = {lat: lat, lng: long} ; //want this to be dynamic
//   	var marker = new google.maps.Marker({
//   		map: map1,
//   		position: center,
//   		icon:image,
//   		animation: google.maps.Animation.DROP
//   	});
//   	 google.maps.event.addListener(marker, 'click', function() { 
  	  
//         console.log("sd")
            
//     }); 
// }

function createMarkerAirport( map1, airport) {
    var image = '/static/airport.png';
 
    var center = {lat: airport.Latitude, lng: airport.Longitude} ; //want this to be dynamic
  	var marker = new google.maps.Marker({
  		map: map1,
  		position: center,
  		icon:image,
  		animation: google.maps.Animation.DROP
  	});
  	 google.maps.event.addListener(marker, 'click', function() { 
  	  
        console.log("sd")
            
    }); 
}



//Thank you http://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
//Same http://stackoverflow.com/questions/20916221/getting-latitude-and-longitude-from-google-places-search-api-using-javascript
function getLatlong()
    {
        var latitude = 0;
        var longitude = 0;
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('pac-input').value;

        geocoder.geocode({ 'address': address }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
var center = {lat: latitude, lng: longitude};
return center;
            }
        });
        
    }  
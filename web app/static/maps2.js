
//BRANDON CODE START


//airplane image by Situ Herrera in signs.
//suitcase by Freepik in other.

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

  var p2 = new Promise(
          function(resolve, reject) {
              if ("geolocation" in window.navigator) {
                window.navigator.geolocation.getCurrentPosition(function(position) {
                    resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                  });
              } else {
                resolve(null);
              }
          });
      p2.then(
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
         
         
   
    
    //must populate airports before attempting to create markers
    $.getJSON('/static/airports.json', function(data) {         
      airports_info = data;
    });
    
 
       
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
          
            //   $('#nice tr:last').after('<tr><td>'+ 'Houston' +'<td>'+ val[airport].City +'<td>' + Math.random());
              createMarkerAirport(map, val[airport]);
              var airport_geo = {lat: val[airport].Latitude, lng:val[airport].Longitude};
      //           // console.log(getDistance(center, airport_geo));
                val[airport].distance = getDistance(center, airport_geo);
                 airports_array.push(val[airport]);
                        }
                        return airports_array;
              }).then(
              function(val) {
                var close_airport_tables = document.getElementById("closest_airports");
                val = sortByKey(val, 'distance');
                // for (var i = 0; i< 5; i++){
                //   close_airport_tables.innerHTML += "<p>" + val[i].City + ": "+ val[i].distance +"km </p>";
                // }
                
                return val
              }).then(
                 function(val) {
                    for (var airport in val){
                      sortByKey(val, 'distance');
                      $('#nice tr:last').after('<tr><td>'+ 'College Station' +'<td>'+ val[airport].City +'<td>' + Math.random());
                    }
            })
          .catch(
             // Log the rejection reason
             function(reason) {
                  console.log('Handle rejected promise ('+reason+') here.');
             });
                 
              // airports_info = sortByKey(airports_info, 'distance');
      // for (var airport in airports_info){
          
              // $('#nice tr:last').after('<tr><td>'+ 'Houston' +'<td>'+ airports_info[airport].City +'<td>' + Math.random());
            

  }
  
  
//Thank you http://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


function getDistance (origin,dest) {
  start = new google.maps.LatLng(origin.lat, origin.lng);
  end = new google.maps.LatLng(dest.lat, dest.lng);
	return google.maps.geometry.spherical.computeDistanceBetween(start,end);
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
    
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+airport.City+'</h1>'+
      '<div id="bodyContent">'+
      "SOMETHING COOL"
      +
      '</div>'+
      '</div>';

 

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  	var marker = new google.maps.Marker({
  		map: map1,
  		position: center,
  		icon:image,
  		animation: google.maps.Animation.DROP
  	});
  	 google.maps.event.addListener(marker, 'click', function() { 
  	  infowindow.open(map1, marker);
  	 // 
  	 });
}

// function createMarkerAirport( map1, lat, long) {
    
//     var image = '/static/airport.png';
//     var title = "Austin"
//     var information = "HAPPY"
//     var center = {lat: lat, lng: long} ; //want this to be dynamic
//     var contentString = '<div id="content">'+
//       '<div id="siteNotice">'+
//       '</div>'+
//       '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
//       '<div id="bodyContent">'+
//       airports_info.City
//       +
//       '</div>'+
//       '</div>';

 

//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });
//   	var marker = new google.maps.Marker({
//   		map: map1,
//   		position: center,
//   		icon:image,
//   		animation: google.maps.Animation.DROP
//   	});
//   	 google.maps.event.addListener(marker, 'click', function() { 
//   	  infowindow.open(map1, marker);
         
            
//     }); 
// }

// if ("geolocation


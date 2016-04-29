
//BRANDON CODE START


//airplane image by Situ Herrera in signs.
//suitcase by Freepik in other.

var airports_info;
var markers = [];
var center
var list_of_airports = [];

function distBetween(origin, destination) {
  return google.maps.geometry.spherical.computeDistanceBetween(origin,destination);
}
 function initMap() {
   
  var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 39, lng:-98.3617013}
              }); 
   
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
         
         

    // map.addListener('center_changed', function() {
    // // 3 seconds after the center of the map has changed, pan back to the
    // // marker.
    // window.setTimeout(function() {
    //     map.panTo(marker.getPosition());
    //     }, 3000);
    // });
    // createMarkers(map);
    
    
       
      var p1 = new Promise(
          function(resolve, reject) {
              $.getJSON('/static/airports.json', function(data) {         
                resolve(data); 
              });
          });
      p1.then(
          function(val) {
            //create a container that holds closest airport, or the nearest 3 hours
            list_of_airports = val;
            
            // // var coord = 0;
            //   for (var airport in val){
            //     var coord = {lat:  val[airport].Latitude, lng:  val[airport].Longitude};
            //     // createMarkerAirport(map, coord.lat, coord.lng, val[airport].IATA);
            // //     if (distBetween(coord, center) < 200)
            // //       list_of_airports.push(val[airport]);
            //   }
            //   return "Success";
              
              
              
          })
      // }).then(
      //   function(val) {
      //       //create a container that holds closest airport, or the nearest 3 hours
            
      //     console.log(val);
      // } )
      .catch(
         function(reason) {
              console.log('Handle rejected promise ('+reason+') here.');
         });
       
    
    
    Promise.all([p1, p2]).then(function(value) { 
      console.log(value);
      
      //compare center and airports
      for (var airport in list_of_airports){
        var coord = {lat:  list_of_airports[airport].Latitude, lng:  list_of_airports[airport].Longitude};
          createMarkerAirport(map, coord.lat, coord.lng, list_of_airports[airport].IATA); 
      }
    }, function(reason) {
      console.log(reason)
    });
    
    
  }
  
  
  
  

// var airport_info = JSON.parse(airports);

// //create markers for every airport in airport
//   //for these markers, get customized info based off of IATA
//     //this includes score
//       //which is used to make the table 
//       //creates the map
// //

// //pin all the markers on the map


//stuff for loading json
// $.getJSON('/static/airports.json', function(data) {         
//     airports_info = data;
// });

// function createMarkers(map){
//   for (var airport in airports_info){
//     var center = {lat: airport.Latitude, lng:airport.Longitude} ; //want this to be dynamic
//     var map = map;
//     var marker = new google.maps.Marker({
//           position: center,
//           map: map,
//           title: 'Click to zoom'
//         });
//         markers.push(marker);
//   }
  
  
  
  
//   marker.addListener('click', function() {
    
//       map.setCenter(marker.getPosition());
//     //   console.log(this.position.lat());
//     //   console.log(this.position.lng());
//       $('#nice tr:last').after('<tr><td>test</td><td>test</td><td>test</td><td>test</td></tr>');

//     });
// }



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

function createMarkerAirport( map1, lat, long, title) {
    var image = '/static/airport.png';
 
    var center = {lat: lat, lng: long} ; //want this to be dynamic
  	var marker = new google.maps.Marker({
  		map: map1,
  		position: center,
  		icon: image,
  		label: title.toString(),
  		animation: google.maps.Animation.DROP
  	});
}

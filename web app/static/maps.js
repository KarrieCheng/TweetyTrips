
//BRANDON CODE START


//airplane image by Situ Herrera in signs.
//suitcase by Freepik in other.

var airports_info;
var markers = [];
var center;
 function initMap() {
     if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude +" "+ position.coords.longitude);
            center = {lat: position.coords.latitude, lng: position.coords.longitude};
          });
      } else {
        Console.log("Cannot do geolocation");
      }
      
      if (center == null)
        center = {lat: 30.59098, lng:-96.3617013} ; //want this to be dynamic
      
      // var center = {lat: , lng: 131.044};
      // var myLatlng = center;


//when removing topmost map definition, uncomment this
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: center
      });

    //   var marker = new google.maps.Marker({
    //     position: center,
    //     map: map,
    //     title: 'Click to zoom'
    //   });
    
    createMarker(map, 30.59098,-96.3617013);

    // map.addListener('center_changed', function() {
    // // 3 seconds after the center of the map has changed, pan back to the
    // // marker.
    // window.setTimeout(function() {
    //     map.panTo(marker.getPosition());
    //     }, 3000);
    // });

   
    
    //must populate airports before attempting to create markers
    $.getJSON('/static/airports.json', function(data) {         
      airports_info = data;
    });
    
    // createMarkers(map);
    
    
    
    
    
    // setTimeout(function(){
    //   for (var airport in airports_info){
         
    //     createMarker(map, airport.Latitude, airport.Longitude)
    // }}, 10000);
       
       
      var p1 = new Promise(
          function(resolve, reject) {
              $.getJSON('/static/airports.json', function(data) {         
                resolve(data); 
              });
          });
      p1.then(
          function(val) {
            for (var airport in val){
              createMarkerAirport(map, val[airport].Latitude, val[airport].Longitude, val[airport].IATA);
            }
          })
      .catch(
         // Log the rejection reason
         function(reason) {
              console.log('Handle rejected promise ('+reason+') here.');
         });
       
          // markers.push(marker);
    
    
    
    //sry bran
    

    // for (var airport in airports_info){
    //   var center = {lat: airport.Latitude, lng:airport.Longitude} ; //want this to be dynamic
      
    //   var marker = new google.maps.Marker({
    //         position: center,
    //         map: map,
    //         title: 'Click to zoom'
    //       });
    //       markers.push(marker);
    // }
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
  		title: title,
  		animation: google.maps.Animation.DROP
  	});
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude +" "+ position.coords.longitude);
      center = {lat: position.coords.latitude, lng: position.coords.longitude};
    });
} else {
  Console.log("Cannot do geolocation");
}
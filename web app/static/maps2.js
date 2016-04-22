
//BRANDON CODE START


//airplane image by Situ Herrera in signs.
//suitcase by Freepik in other.

var airports_info;
var markers = [];
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
            for (var airport in val){
              createMarkerAirport(map, val[airport].Latitude, val[airport].Longitude);
            }
          })
      .catch(
         // Log the rejection reason
         function(reason) {
              console.log('Handle rejected promise ('+reason+') here.');
         });
       

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

function createMarkerAirport( map1, lat, long) {
    var image = '/static/airport.png';
 
    var center = {lat: lat, lng: long} ; //want this to be dynamic
  	var marker = new google.maps.Marker({
  		map: map1,
  		position: center,
  		icon:image,
  		animation: google.maps.Animation.DROP
  	});
  	 google.maps.event.addListener(marker, 'click', function() { 
       alert("I am marker " + marker.title); 
    }); 
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude +" "+ position.coords.longitude);
    });
} else {
  Console.log("Cannot do geolocation");
}


  marker.addListener('click', function() {
    
     
      console.log("TE");
    //   console.log(this.position.lng());
     

    });
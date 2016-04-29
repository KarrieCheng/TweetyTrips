
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
  	  
         console.log("sd")
            
    }); 
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    
    });
} else {
  Console.log("Cannot do geolocation");
}


  marker.addListener('click', function() {
    
     
      console.log("TE");
  
    //   console.log(this.position.lng());
     

    });
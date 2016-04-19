
        google.maps.event.addListener(marker,'click',function() {
          map.setZoom(9);
          map.setCenter(marker.getPosition());
        });

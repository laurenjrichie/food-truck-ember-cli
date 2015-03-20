import Ember from 'ember';

export default Ember.Component.extend({
  pointsSetBinding: 'controller.pointsSet',
  onPointsSetChange: function() {
    console.log("test")
  }.observes('pointsSet'),
  
  actions: {
    drawMap: function(trucks) {
      var featureArray = [];
  
      for (var i = 0; i < trucks.length; i++) {
        featureArray.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [trucks[i].longitude, trucks[i].latitude]
            },
            "properties": {
              'name': trucks[i].name,
              'description': trucks[i].description,
              'link': trucks[i].link,
              'startTime': trucks[i].startTime,
              'endTime': trucks[i].endTime,
              'marker-color': trucks[i].color,
            }
          });
      }
      
      $('.leaflet-container').remove();
      $('#map-canvas').append("<div id='map'></div>");
      L.mapbox.accessToken = 'pk.eyJ1IjoiZGF5eW51aGhoIiwiYSI6IlNrUWlXd0kifQ.PkwjuKO6Clksu2OGIoePeA';
      var map = L.mapbox.map('map', 'dayynuhhh.b2259e3f').setView([37.791214, -122.417902], 14);
      var geojson = [{
                      "type": "FeatureCollection",
                      "features": featureArray
                    }];
      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    }
  },
});

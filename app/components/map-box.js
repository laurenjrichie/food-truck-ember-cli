import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    drawMap: function(coordinates) {
      // $('.leaflet-container').remove();
      $('#map-canvas').append("<div id='map'></div>");
      
      var featureArray = [];
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
  init: drawMap,
});

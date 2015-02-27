import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    setTimeout(function() {
      L.mapbox.accessToken = 'pk.eyJ1IjoiZGF5eW51aGhoIiwiYSI6IlNrUWlXd0kifQ.PkwjuKO6Clksu2OGIoePeA';
      var map = L.mapbox.map('map', 'dayynuhhh.b2259e3f').setView([37.791214, -122.417902], 14);
      
      var geojson = [{
                      "type": "FeatureCollection",
                      // "features": [
                      //   {
                      //     "type": "Feature",
                      //     "geometry": {
                      //       "type": "Point",
                      //       "coordinates": [-122.388078331989, 37.7667867792956]
                      //     },
                      //     "properties": {}
                      //   },
                      // ]
                    }];
      
      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    }, 200);
    
  }
});


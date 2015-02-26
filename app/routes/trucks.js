import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    setTimeout(function() {
      L.mapbox.accessToken = 'pk.eyJ1IjoibGF1cmVuanJpY2hpZSIsImEiOiJHTEY1OVFZIn0.MlJXkQlI1fW9t4Yi3ZOYlg';
      var map = L.mapbox.map('map', 'laurenjrichie.ladp904d'); // can use .setView here to specify coordinates
      
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
      return myLayer.setGeoJSON(geojson);
    }, 200);
    
  }
});


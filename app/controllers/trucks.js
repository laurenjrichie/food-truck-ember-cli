import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    testClick: function() {
      console.log("click");
      
      
      
      L.mapbox.accessToken = 'pk.eyJ1IjoibGF1cmVuanJpY2hpZSIsImEiOiJHTEY1OVFZIn0.MlJXkQlI1fW9t4Yi3ZOYlg';
      var map = L.mapbox.map('map', 'laurenjrichie.ladp904d'); // can use .setView here to specify coordinates
      
      var geojson = [{
                      "type": "FeatureCollection",
                      "features": [
                        {
                          "type": "Feature",
                          "geometry": {
                            "type": "Point",
                            "coordinates": [-122.388078331989, 37.7667867792956]
                          },
                          "properties": {}
                        },
                        // {
                        //   "type": "Feature",
                        //   "geometry": {
                        //     "type": "Point",
                        //     "coordinates": [-122.423315547721, 37.7811982218612]
                        //   },
                        //   "properties": {}
                        // }
                      ]
                    }];
      
      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    }
  }
});

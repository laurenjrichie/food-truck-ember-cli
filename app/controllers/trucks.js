import Ember from 'ember';

var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var currentDate = new Date();
var dayIndex = currentDate.getDay();
var hour24 = currentDate.getHours();
var currentHour;
var currentTimeOfDay;
  if(hour24 > 12){
    currentTimeOfDay = "PM";
    currentHour = hour24 - 12;
  } else if(hour24 === 12) {
    currentTimeOfDay = "PM";
    currentHour = hour24;
  } else{
    currentTimeOfDay = "AM";
    currentHour = hour24;
  }
var currentDay = dayArray[dayIndex];

export default Ember.Controller.extend({
  currentHour: currentHour,
  currentDay: currentDay,
  currentTimeOfDay: currentTimeOfDay,
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  timeOfDay: ['AM','PM'],
  trucks: [],
  locations: [],
  actions: {
    truckSearch: function(){
      var filter_trucks = [];
      var locations = [];
      var day = this.get('daySearch');
      var userStartTime = this.get('timeSearch');
      var usertimeOfDay = this.get('timeOfDaySearch');
      var userTime =  0;
      if(userStartTime !== 12){
        if(usertimeOfDay === 'PM'){
          userTime = userStartTime + 12;
        } else {
          userTime = userStartTime;
        }
      } else {
        if(usertimeOfDay === 'PM'){
          userTime = userStartTime;
        }
      }
      var _this = this;
      Ember.$.getJSON('https://data.sfgov.org/resource/jjew-r69b.json?$$app_token=RBuWnGSH2NAzZS1JHTxfCprNz&dayofweekstr=' + day).then(function(results){
        for(var i= 0; i < results.length; i++){
          if(results[i].applicant !== "Natan's Catering" && results[i].applicant !== "Park's Catering" && results[i].applicant !== "May Catering"){
            var startTime = results[i].start24;
            var endTime = results[i].end24;
            startTime = startTime.substring(0, startTime.length - 3);
            endTime = endTime.substring(0, endTime.length - 3);
            if (userTime >= startTime  && userTime <= endTime){
              filter_trucks.push(results[i]);
              var lat = results[i].latitude;
              var long = results[i].longitude;
              locations.push([lat, long]);
              _this.set('locations', locations);
              console.log(locations);
            }
          }

        }
        return locations;
        
      }).then(function(locations){
        _this.set('trucks', filter_trucks);
        
        $('.leaflet-container').remove();
        $('.ten.wide.column').append("<div id='map'></div>");
        var featureArray = [];
        for (var k = 0; k < locations.length; k++) {
          // featureArray.push({
          //   "type": "Feature",
          //   "geometry": {
          //     "type": "Point",
          //     "coordinates": []
          //   },
          //   "properties": {}
          // });
        }                
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
                            ]
                      }];
        var myLayer = L.mapbox.featureLayer().addTo(map);
        return myLayer.setGeoJSON(geojson);
        map.featureLayer.setGeoJSON(geojson);
      });
    }
  }
});
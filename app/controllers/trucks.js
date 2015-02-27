import Ember from 'ember';

function twitterLink(name){
  var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/g;
  var spaceRE = /\s+/g;
  var nopunctuationName = name.replace(punctRE, '').replace(spaceRE, ' ');
  var finalName = nopunctuationName.replace(/ LLC/i, '');
  var twitterSearch = finalName.split(' ').join('%20');
  var twitterLink = 'https://twitter.com/search?f=realtime&q=' + twitterSearch + '%20near%3A"San%20Francisco%2C%20CA"%20within%3A15mi&src=typd';
  return twitterLink;
}

function timeConvert(time){
  var time24;
  var timeHour = time.slice(0, time.length - 2);
  timeHour = parseInt(timeHour);
  var timeOfDay = time.slice(time.length - 2, time.length);
  if (timeHour !== 12){
    if(timeOfDay === 'PM'){
      time24 = (12 + timeHour);
    } else {
      time24 = timeHour;
    }
  } else {
    if(timeOfDay === 'PM'){
      time24 = timeHour;
    } else{
      time24 = 0;
    }
  }
  return time24;
}

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
  ourTrucks: [],
  actions: {
    truckSearch: function(){
      var day = this.get('daySearch');
      var userStartTime = this.get('timeSearch');
      var usertimeOfDay = this.get('timeOfDaySearch');
      var truckArray = [];
      var ourTrucks = [];
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
          var result = results[i];
          if(result.applicant === "Natan's Catering" && result.applicant === "Park's Catering" && result.applicant === "May Catering") {
            continue;
          }
                   
          var startTime = result.start24;
          var endTime = result.end24;
          startTime = startTime.substring(0, startTime.length - 3);
          endTime = endTime.substring(0, endTime.length - 3);
          
          if (userTime >= startTime  && userTime <= endTime){
            var name = result.applicant;
            var link = twitterLink(name);
            
            truckArray.push({
                link: link,
                name: name,
                description: result.optionaltext,
                startTime: result.starttime,
                endTime: result.endtime,
                longitude: result.longitude,
                latitude: result.latitude
                });
            _this.set('trucks', truckArray);
          }
        }
                
      }).then(function() {
        Ember.$.getJSON('https://frozen-eyrie-4055.herokuapp.com/submissions?q=' + day).then(function(results){
          var results = results.submissions;
          for(var i= 0; i < results.length; i++){
            console.log(results);
            var result = results[i];
            var startTime = timeConvert(result.starttime);
            var endTime = timeConvert(result.endtime);
            if (userTime >= startTime  && userTime <= endTime){
              console.log(result);
              ourTrucks.push({
                link: result.link,
                name: result.name,
                description: result.description,
                startTime: result.starttime,
                endTime: result.endtime,
                longitude: result.longitude,
                latitude: result.latitude
                });
              _this.set('ourTrucks', ourTrucks);
            }
          }
        });
      }).then(function(){        
        $('.leaflet-container').remove();
        $('#map-canvas').append("<div id='map'></div>");
        
        setTimeout(function() {
          var featureArray = [];
          var trucks = _this.get('trucks');
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
                  'marker-color': '#009fda',
                }
              });
          }
          
          var ourTrucks = _this.get('ourTrucks');
          for (var k = 0; k < ourTrucks.length; k++) {
            featureArray.push({
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [+(ourTrucks[k].longitude), +(ourTrucks[k].latitude)]
                },
                "properties": {
                  'name': ourTrucks[k].name,
                  'description': ourTrucks[k].description,
                  'link': ourTrucks[k].link,
                  'startTime': ourTrucks[k].startTime,
                  'endTime': ourTrucks[k].endTime,
                  'marker-color': '#F7BE81',
                }
              });
          }
          
          console.log(featureArray)

          L.mapbox.accessToken = 'pk.eyJ1IjoiZGF5eW51aGhoIiwiYSI6IlNrUWlXd0kifQ.PkwjuKO6Clksu2OGIoePeA';
          var map = L.mapbox.map('map', 'dayynuhhh.b2259e3f').setView([37.791214, -122.417902], 14);
          var geojson = [{
                          "type": "FeatureCollection",
                          "features": featureArray
                        }];
          var myLayer = L.mapbox.featureLayer().addTo(map);
          myLayer.setGeoJSON(geojson);
          myLayer.eachLayer(function(layer) {
            var content = "<h3><a href=" + layer.feature.properties.link + "\
            >" + layer.feature.properties.name + "</a></h3><p>\
            " + layer.feature.properties.description + "</p><p>\
            " + layer.feature.properties.startTime + " - \
            " + layer.feature.properties.endTime + "</p>";
            layer.bindPopup(content);
          });
        }, 200);
                
      });
    }
  }
});
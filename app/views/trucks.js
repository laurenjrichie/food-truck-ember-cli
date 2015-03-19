import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    $('#map-canvas').append("<div id='map'></div>");
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGF5eW51aGhoIiwiYSI6IlNrUWlXd0kifQ.PkwjuKO6Clksu2OGIoePeA';
    var map = L.mapbox.map('map', 'dayynuhhh.b2259e3f').setView([37.791214, -122.417902], 14);
  }
});

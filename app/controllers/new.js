import Ember from 'ember';

export default Ember.Controller.extend({
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  timeOfDay: ['AM','PM'],
  actions: {
    createSubmission: function() {
      var name = this.get('name');
      var link = this.get('name');
      var description = this.get('description');
      var starttime = this.get('openTime') + this.get('openTimeOfDay');
      var endtime = this.get('closeTime') + this.get('closeTimeOfDay');
      var day = this.get('dayOfWeek');
      var latitude = this.get('lat');
      var longitude = this.get('long');      
      var submission = this.store.createRecord('submission', {
        name: name,
        link: link,
        description: description,
        starttime: starttime,
        endtime: endtime,
        day: day,
        latitude: latitude,
        longitude: longitude
      });
      
      var _this = this;
      submission.save().then(function() {
        _this.transitionToRoute('trucks');
      });
      
    }
  }
});

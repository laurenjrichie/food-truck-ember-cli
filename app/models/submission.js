import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  starttime: DS.attr('string'),
  endtime: DS.attr('string'),
  verified: DS.attr('boolean'),
  latitude: DS.attr('string'),
  longitude: DS.attr('string'),
  day: DS.attr('string'),
});

import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  additionalInfo: DS.attr('string'),
  timestamp: DS.attr('number'),
  type: DS.attr('string', { defaultValue: 'task' }),
  priority: DS.attr('boolean', { defaultValue: false }),
  inspiration: DS.attr('boolean', { defaultValue: false }),
  explore: DS.attr('boolean', { defaultValue: false }),
  completed: DS.attr('boolean', { defaultValue: false }),
  migrated: DS.attr('boolean', { defaultValue: false }),
  scheduled: DS.attr('boolean', { defaultValue: false })
});

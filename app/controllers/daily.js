import Ember from 'ember';


export default Ember.Controller.extend({
	notify: Ember.inject.service('notify'),
	sortProperties: ['timestamp'],
	sortAscending: false, // sorts dailies by timestamp
	actions: {
	    publishDaily: function() {
	    	var newDaily = this.store.createRecord('daily', {
		        title: this.get('title'),
		        additionalInfo: this.get('additionalInfo'),
		        timestamp: new Date().getTime(),
		        type: this.get('type'),
		        priority: this.get('priority'),
		        inspiration: this.get('inspiration'),
		        explore: this.get('explore'),
		        completed: this.get('completed'),
		        migrated: this.get('migrated'),
		        scheduled: this.get('scheduled')
		    });
		    newDaily.save();
		    this.get('notify').info('It worked. Fucking finally.');
		    this.set('title', '');
		    this.set('type', 'task');
		    this.set('additionalInfo', '');

	    }
	},
	typeOptions: [
        {
            value: "task",
            label: "Task"
        },
        {
            value: "event",
            label: "Event"
        },
        {
            value: "note",
            label: "Note"
        }
    ]
});

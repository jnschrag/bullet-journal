import Ember from 'ember';


export default Ember.Controller.extend({
	notify: Ember.inject.service('notify'),
	titleEmpty: Ember.computed('title', function() {
		var title = this.get('title');
	    return Ember.isEmpty(this.get('title'));
	}),
	sortProperties: ['timestamp'],
	sortAscending: false, // sorts dailies by timestamp
	actions: {
	    publishDaily: function() {
	    	var newDaily = this.store.createRecord('daily', {
		        title: this.get('title'),
		        timestamp: new Date().getTime(),
		        type: 'task',
		    });
		    newDaily.save();
		    this.get('notify').info('It worked. Fucking finally.');
		    this.set('title', '');
	    }
	}
});
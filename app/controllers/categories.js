import Ember from 'ember';

export default Ember.Controller.extend({
	notify: Ember.inject.service('notify'),
	nameEmpty: Ember.computed('name', function() {
		var name = this.get('name');
	    return Ember.isEmpty(this.get('name'));
	}),
	sortProperties: ['name'],
	sortAscending: false, // sorts dailies by timestamp
	actions: {
	    addCategory: function() {
	    	var newCategory = this.store.createRecord('categories', {
		        name: this.get('name')
		    });
		    newCategory.save();
		    this.get('notify').info('A new category was added!');
		    this.set('name', '');
	    }
	}
});

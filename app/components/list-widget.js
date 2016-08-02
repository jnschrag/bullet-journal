import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
	    editTodo(todo) {
	       todo.set('isEditing', true);
	    },

	    cancelTodoEdit(todo) {
	       todo.set('isEditing', false);
	       todo.rollbackAttributes();
	    },

	    saveTodo(todo) {
	       if (todo.get('isNotValid')) {
	         return;
	       }

	       todo.set('isEditing', false);
	       todo.save();
	    }
	}
});

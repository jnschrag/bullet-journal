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
	    },
	    toggleCompleted(todo) {
	    	todo.toggleProperty('completed');
	    	todo.save();
	    },
	    markPriority(todo) {
	    	todo.toggleProperty('priority');
	    	todo.save();
	    },
	    markExplore(todo) {
	    	todo.toggleProperty('explore');
	    	todo.save();
	    },
	    markInspiration(todo) {
	    	todo.toggleProperty('inspiration');
	    	todo.save();
	    },
	}
});

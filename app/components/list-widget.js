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
	    editTodoInfo(todo) {
	       todo.set('isEditingInfo', true);
	    },
	    cancelTodoInfoEdit(todo) {
	       todo.set('isEditingInfo', false);
	       todo.rollbackAttributes();
	    },
	    saveTodoInfo(todo) {
	    	console.log(todo.isEditingInfo);
	       todo.set('isEditingInfo', false);
	       todo.save();
	       console.log(todo.isEditingInfo);
	    },
	    deleteTodo(todo) {
	    	return todo.destroyRecord();
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
	    markType(todo, typeOption) {
	    	todo.set('type', typeOption);
	    	todo.save();
	    },
	    viewMoreInfo: function(todo){
	        todo.toggleProperty('isInfoVisible');
	    },
	    migrateTask(todo,value) {
	    	var d = new Date(value);
	    	todo.set('migrateDate', d.getTime());
	    	todo.save();
	    },
	    scheduleTask(todo,value) {
	    	var d = new Date(value);
	    	todo.set('scheduleDate', d.getTime());
	    	todo.save();
	    },
	}
});
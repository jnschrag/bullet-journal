import Ember from 'ember';

export function taskTypeFormatter(params) {
	let todoType = params[0];
	let typeOption = params[1];
	if(todoType == typeOption) {
		return "actionActivated";
	}
}

export default Ember.Helper.helper(taskTypeFormatter);

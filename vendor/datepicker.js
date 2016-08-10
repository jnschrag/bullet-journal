
$(function() {
	$('body').on('click', 'li.datepickerAction', function(event){
		event.stopPropagation();
	})
});
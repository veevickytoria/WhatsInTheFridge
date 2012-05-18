exports.EditReminderWindow = function(win, reminder) {
	var editReminderTitle = L('editReminderTitle');
	var editReminderUpdateButton = L('editReminderUpdateButton');
	var editReminderCancelButton = L('editReminderCancelButton');
	
	var self = Ti.UI.createWindow({
		title: editReminderTitle,
		backgroundColor: '#fff'
	});
	
	var reminderDateField = Ti.UI.createPicker({
		top: '10dp',
		value: reminder,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_DATE
	});
	
	reminderDateField.addEventListener('change',function(e){
    	reminderDateField.value = e.value;
	});
	
	
	var reminderTimeField = Ti.UI.createPicker({
		top: '150dp',
		value: reminder,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	reminderTimeField.addEventListener('change',function(e){
    	reminderTimeField.value = e.value;
	});
	
	if (reminder == '') {
		reminderDateField.fireEvent('change', {value : new Date()});
		reminderTimeField.fireEvent('change', {value : new Date()});
	}
	
	var editButton = Ti.UI.createButton({
		title: editReminderUpdateButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	editButton.addEventListener('click', function() {
		var reminder = reminderDateField.value;
		reminder.setTime(reminderTimeField.value);
		
		win.fireEvent('reminderChoice', {reminderEvent : reminder});
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: editReminderCancelButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		right: '20dp'
	});
	
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(reminderDateField);
	self.add(reminderTimeField);
	self.add(editButton);
	self.add(cancelButton);
	
	return self;
};
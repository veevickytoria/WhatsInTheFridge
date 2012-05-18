exports.AddReminderWindow = function(win) {
	var addReminderTitle = L('addReminderTitle');
	var addReminderAddButton = L('addReminderAddButton');
	var addReminderCancelButton = L('addReminderCancelButton');
	
	
	var self = Ti.UI.createWindow({
		// modal: true,
		title: addReminderTitle,
		backgroundColor: '#fff'
	});
	
	var reminderDateField = Ti.UI.createPicker({
		top: '10dp',
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_DATE,
	});
	
	//Why does the Titanium API lie about the value field?
	reminderDateField.addEventListener('change',function(e){
    	reminderDateField.value = e.value;
	});
	
	//If this event isn't fired then the program breaks when nothing is changed in the picker
	reminderDateField.fireEvent('change', {value : new Date()});
	
	var reminderTimeField = Ti.UI.createPicker({
		top: '150dp',
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	reminderTimeField.addEventListener('change',function(e){
    	reminderTimeField.value = e.value;
	});
	
	reminderDateField.fireEvent('change', {value : new Date()});
	
	var addButton = Ti.UI.createButton({
		title: addReminderAddButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		var reminder = reminderDateField.value;
		
		//get the time without changing the date
		reminder.setHours(reminderTimeField.value.getHours());
		reminder.setMinutes(reminderTimeField.value.getMinutes());
		//do I need to set seconds?
		reminder.setSeconds(reminderTimeField.value.getSeconds());
		
		win.fireEvent('reminderChoice', {reminderEvent : reminder});
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: addReminderCancelButton,
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
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};
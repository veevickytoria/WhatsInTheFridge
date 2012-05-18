exports.AddReminderWindow = function(win) {
	//var reminderTime;
	//var reminderEnabled;
	
	var self = Ti.UI.createWindow({
		// modal: true,
		title: 'Add Reminder',
		backgroundColor: '#fff'
	});
	
	var reminderDateField = Ti.UI.createPicker({
		top: '10dp',
		hintText: 'Reminder Date',
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
		hintText: 'Reminder Time',
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	reminderTimeField.addEventListener('change',function(e){
    	reminderTimeField.value = e.value;
	});
	
	reminderDateField.fireEvent('change', {value : new Date()});
	
	// var enableBoxField = Ti.UI.createSwitch({
		// width: '300dp',
		// height: '45dp',
		// top: '300dp',
		// hintText: 'Enable Button'
	// });
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
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
		
		Titanium.API.info("--------------------------------->reminder: " + reminder);
		win.fireEvent('reminderChoice', {reminderEvent : reminder});
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
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
	// self.add(enableBoxField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};
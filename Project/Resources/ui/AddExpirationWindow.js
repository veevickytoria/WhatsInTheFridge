exports.AddExpirationWindow = function(win) {
	
	var self = Ti.UI.createWindow({
		// modal: true,
		title: 'Add Expiration Date',
		backgroundColor: '#fff'
	});
	
	var expirationDateField = Ti.UI.createPicker({
		top: '10dp',
		hintText: 'Reminder Date',
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_DATE,
	});
	
	expirationDateField.addEventListener('change',function(e){
    	expirationDateField.value = e.value;
	});
	
	expirationDateField.fireEvent('change', {value : new Date()});
	
	var expirationTimeField = Ti.UI.createPicker({
		top: '150dp',
		hintText: 'Reminder Time',
		// minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	expirationTimeField.addEventListener('change',function(e){
    	expirationTimeField.value = e.value;
	});
	
	expirationTimeField.fireEvent('change', {value : new Date()});
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		var expiration = expirationDateField.value;
		
		//get the time without changing the date
		//expiration.setHours(expirationTimeField.value.getHours());
		//expiration.setMinutes(expirationTimeField.value.getMinutes());
		
		win.fireEvent('expirationChoice', {expirationEvent : expiration});
		
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
	
	self.add(expirationDateField);
	//self.add(expirationTimeField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};
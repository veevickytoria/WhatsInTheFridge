exports.EditExpirationWindow = function(win, expiration) {
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Edit Expiration Date',
		backgroundColor: '#fff'
	});
	
	var expirationDateField = Ti.UI.createPicker({
		top: '10dp',
		hintText: 'Expiration Date',
		value: expiration,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_DATE
	});
	
	expirationDateField.addEventListener('change',function(e){
    	expirationDateField.value = e.value;
	});
	
	
	var expirationTimeField = Ti.UI.createPicker({
		top: '150dp',
		hintText: 'Expiration Time',
		value: expiration,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	expirationTimeField.addEventListener('change',function(e){
    	expirationTimeField.value = e.value;
	});
	
	var editButton = Ti.UI.createButton({
		title: 'Update',
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	editButton.addEventListener('click', function() {
		var expiration = expirationDateField.value;
		
		expiration.setHours(expirationTimeField.value.getHours());
		expiration.setMinutes(expirationTimeField.value.getMinutes());
		expiration.setSeconds(expirationTimeField.value.getSeconds());
		
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
	self.add(expirationTimeField);
	self.add(editButton);
	self.add(cancelButton);
	
	return self;
};
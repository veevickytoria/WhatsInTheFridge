exports.EditExpirationWindow = function(win, expiration) {
	var editExpirationTitle = L('editExpirationTitle');
	var editExpirationUpdateButton = L('editExpirationUpdateButton');
	var editExpirationCancelButton = L('editExpirationCancelButton');
	
	var self = Ti.UI.createWindow({
		title: '',
		backgroundColor: '#fff'
	});
	
	var expirationDateField = Ti.UI.createPicker({
		top: '10dp',
		value: expiration,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_DATE
	});
	
	expirationDateField.addEventListener('change',function(e){
    	expirationDateField.value = e.value;
	});
	
	
	var expirationTimeField = Ti.UI.createPicker({
		top: '150dp',
		value: expiration,
		minDate: new Date(),
		type: Titanium.UI.PICKER_TYPE_TIME
	});
	
	expirationTimeField.addEventListener('change',function(e){
    	expirationTimeField.value = e.value;
	});
	
	var editButton = Ti.UI.createButton({
		title: editExpirationUpdateButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	editButton.addEventListener('click', function() {
		var expiration = expirationDateField.value;
		
		//default it to 8am on the date
		expiration.setHours(8,0,0);
		win.fireEvent('expirationChoice', {expirationEvent : expiration});
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: editExpirationCancelButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		right: '20dp'
	});
	
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(expirationDateField);
	self.add(editButton);
	self.add(cancelButton);
	
	return self;
};
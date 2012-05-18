exports.AddExpirationWindow = function(win) {
	var addExpirationTitle = L('addExpirationTitle');
	var addExpirationAddButton = L('addExpirationAddButton');
	var addExpirationCancelButton = L('addExpirationCancelButton');	
	
	var self = Ti.UI.createWindow({
		title: addExpirationTitle,
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
	
	var addButton = Ti.UI.createButton({
		title: addExpirationAddButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		var expiration = expirationDateField.value;
		
		//defult it to 8am on the date
		expiration.setHours(8,0,0);
		win.fireEvent('expirationChoice', {expirationEvent : expiration});
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: addExpirationCancelButton,
		width: '120dp',
		height: '40dp',
		top: '400dp',
		right: '20dp'
	});
	
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(expirationDateField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};
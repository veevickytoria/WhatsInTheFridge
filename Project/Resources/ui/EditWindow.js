exports.EditWindow = function(id) {
	var item = selecItem(id);
	
	var EditReminderWindow = require('ui/EditReminderWindow').EditReminderWindow;
	var EditExpirationWindow = require('ui/EditExpirationWindow').EditExpirationWindow;
	
	var reminder;
	var expiration;
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Edit Item',
		backgroundColor: '#fff'
	});
	
	var itemNameField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		value:item.name,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_NEXT
	});
	
	itemNameField.addEventListener('return', function(e) {
		itemDescField.focus();
	});
	
	itemNameField.addEventListener('click', function(e) {
		itemDescField.value = "";
	});
	
	var itemDescField = Ti.UI.createTextArea({
		editable: true,
		width: '300dp',
		height: '70dp',
		top: '80dp',
		font : {fontSize:18},
		value : item.description,
		borderWidth:1,
		borderColor:'#bbb',
		borderRadius:5,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	// itemDescField.addEventListener('return', function(e) {
		// var item = {name: itemNameField.value, description: itemDescField.value};
		// addItem(item, self);
	// });
	
	itemDescField.addEventListener('click', function(e) {
		itemDescField.value = "";
	});
	
	var reminderButton = Ti.UI.createButton({
		title: 'Reminder',
		width: '120dp',
		height: '40dp',
		top: '170dp',
		left: '20dp'
	});
	
	self.addEventListener('reminderChoice', function(e) {
		Ti.API.info("=====================================>" + e.reminderEvent);
		reminder = e.reminderEvent;
	});
	
	reminderButton.addEventListener('click', function() {
		Ti.API.info("------------------------------> item.reminder at window call" + item.reminder);
		new EditReminderWindow(self, new Date(Date.parse(item.reminder))).open();
	});
	
	var expirationButton = Ti.UI.createButton({
		title: 'Expiration Date',
		width: '120dp',
		height: '40dp',
		top: '170dp',
		right: '20dp'
	});
	
	self.addEventListener('expirationChoice', function(e) {
		expiration = e.expirationEvent;
	});
	
	expirationButton.addEventListener('click', function() {
		new EditExpirationWindow(self, new Date(Date.parse(item.expDate))).open();
	});
	
	var updateButton = Ti.UI.createButton({
		title: 'Update',
		width: '120dp',
		height: '40dp',
		top: '220dp',
		left: '20dp'
	});
	
	updateButton.addEventListener('click', function() {
		var item = {name: itemNameField.value, description: itemDescField.value, reminder: reminder, expDate: expiration};
		updateItem(id, item, self);
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '120dp',
		height: '40dp',
		top: '220dp',
		right: '20dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(itemNameField);
	self.add(itemDescField);
	self.add(reminderButton);
	self.add(expirationButton);
	self.add(updateButton);
	self.add(cancelButton);
	
	return self;
};

var selecItem = function(id) {	
	return require('db').selectItem(id);
};

var updateItem = function(id, item, win) {	
	if (item.name === '') {
		alert('Please enter a name first');
		return false;	
	}
	
	var result = require('db').updateItem(id, item);
	Ti.App.fireEvent('app:updateTables');
	win.close();
	if (result !== false)
		alert(result.name + " is updated successfully!");
};
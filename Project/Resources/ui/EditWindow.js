var editItemEmptyNameAlert = L('editItemEmptyNameAlert');
var editItemUpdateAlert = L('editItemUpdateAlert');

exports.EditWindow = function(id) {
	var item = selecItem(id);
	
	var editItemReminderButton 	= L('editItemReminderButton');
	var editItemExpirationButton = L('editItemExpirationButton');
	var editItemUpdateButton 	= L('editItemUpdateButton');
	var editItemCancelButton 	= L('editItemCancelButton');
	var editItemTitle			= L('editItemTitle');
	
	var EditReminderWindow = require('ui/EditReminderWindow').EditReminderWindow;
	var EditExpirationWindow = require('ui/EditExpirationWindow').EditExpirationWindow;
	
	var reminder;
	var expiration;
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: editItemTitle,
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
	
	itemDescField.addEventListener('click', function(e) {
		itemDescField.value = "";
	});
	
	var reminderButton = Ti.UI.createButton({
		title: editItemReminderButton,
		width: '120dp',
		height: '40dp',
		top: '170dp',
		left: '20dp'
	});
	
	self.addEventListener('reminderChoice', function(e) {
		reminder = e.reminderEvent;
	});
	
	reminderButton.addEventListener('click', function() {
		if (item.reminder == null){
			new EditReminderWindow(self, new Date()).open();
		} else {
			new EditReminderWindow(self, new Date(Date.parse(item.reminder))).open();
		}
	});
	
	var expirationButton = Ti.UI.createButton({
		title: editItemExpirationButton,
		width: '120dp',
		height: '40dp',
		top: '170dp',
		right: '20dp'
	});
	
	self.addEventListener('expirationChoice', function(e) {
		expiration = e.expirationEvent;
	});
	
	expirationButton.addEventListener('click', function() {
		if (item.expDate == null){
			new EditExpirationWindow(self, new Date()).open();
		} else {
			new EditExpirationWindow(self, new Date(Date.parse(item.expDate))).open();
		}
	});
	
	var updateButton = Ti.UI.createButton({
		title: editItemUpdateButton,
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
		title: editItemCancelButton,
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
		alert(editItemEmptyNameAlert);
		return false;	
	}
	
	var result = require('db').updateItem(id, item);
	Ti.App.fireEvent('app:updateTables');
	win.close();
	if (result !== false)
		alert(result.name + editItemUpdateAlert);
};
exports.AddWindow = function() {
	var itemName;
	var itemDesc;
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Add Item',
		backgroundColor: '#fff'
	});
	
	var itemNameField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'Item Name',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_NEXT
	});
	
	itemNameField.addEventListener('return', function(e) {
		itemDescField.focus();
	});
	
	var itemDescField = Ti.UI.createTextArea({
		editable: true,
		width: '300dp',
		height: '70dp',
		top: '80dp',
		font : {fontSize:18},
		hintText: 'Item Description',
		borderWidth:1,
		borderColor:'#bbb',
		borderRadius:5,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	itemDescField.addEventListener('return', function(e) {
		var item = {name: itemNameField.value, description: itemDescField.value};
		addItem(item, self);
	});
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '120dp',
		height: '40dp',
		top: '160dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		var item = {name: itemNameField.value, description: itemDescField.value};
		addItem(item, self);
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '120dp',
		height: '40dp',
		top: '160dp',
		right: '20dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(itemNameField);
	self.add(itemDescField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};

var addItem = function(item, win) {	
	if (item.name === '') {
		alert('Please enter a name first');
		return false;	
	}
	
	var result = require('db').addItem(item);
	Ti.App.fireEvent('app:updateTables');
	win.close();
	return result;
};
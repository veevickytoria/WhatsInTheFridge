var sortNumber = 0;

exports.SortWindow = function() {
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Add Reminder',
		backgroundColor: '#fff'
	});
	
	var sortTypeField = Ti.UI.createPicker({
		top: '100dp',
		width: '300dp',
		hintText: 'Sort Type'
	});
	
	sortTypeField.setSelectedRow(0, sortNumber);
	
	var data = [];
	data.push(Ti.UI.createPickerRow({title: 'No Sort', number: 0}));
	data.push(Ti.UI.createPickerRow({title: 'Name Asc', number: 1}));
	data.push(Ti.UI.createPickerRow({title: 'Name Desc', number: 2}));
	
	sortTypeField.add(data);
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '120dp',
		height: '40dp',
		top: '400dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		Ti.App.fireEvent('app:changeSort', {sortType : sortTypeField.getSelectedRow(0)});
		
		sortNumber = sortTypeField.getSelectedRow(0).number;
		
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
	
	self.add(sortTypeField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};
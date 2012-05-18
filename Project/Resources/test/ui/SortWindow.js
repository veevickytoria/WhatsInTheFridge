var sortNumber = 0;

exports.SortWindow = function() {
	var defautSort = L('sortDefaultSortOption');
	var nameASort  = L('sortNameASortOption');
	var nameDSort  = L('sortNameDSortOption');
	var sortUpdateButton = L('sortUpdateButton');
	var sortCancelButton = L('sortCancelButton');
	var sortTitle = L('sortTitle');
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: sortTitle,
		backgroundColor: '#fff'
	});
	
	var sortTypeField = Ti.UI.createPicker({
		top: '100dp',
		width: '300dp',
		hintText: 'Sort Type'
	});
	
	sortTypeField.setSelectedRow(0, sortNumber);
	
	var data = [];
	data.push(Ti.UI.createPickerRow({title: defautSort, number: 0}));
	data.push(Ti.UI.createPickerRow({title: nameASort, number: 1}));
	data.push(Ti.UI.createPickerRow({title: nameDSort, number: 2}));
	
	sortTypeField.add(data);
	
	sortTypeField.selectionIndicator = true;
	
	var addButton = Ti.UI.createButton({
		title: sortUpdateButton,
		width: '120dp',
		height: '40dp',
		top: '350dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		Ti.App.fireEvent('app:changeSort', {sortType : sortTypeField.getSelectedRow(0).number});
		
		sortNumber = sortTypeField.getSelectedRow(0).number;
		
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: sortCancelButton,
		width: '120dp',
		height: '40dp',
		top: '350dp',
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
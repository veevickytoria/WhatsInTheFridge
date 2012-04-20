var platform = Ti.Platform.osname;

exports.ListWindow = function(args) {
	var AddWindow = require('ui/AddWindow').AddWindow;
	var self = Ti.UI.createWindow(args);
	var tableview = Ti.UI.createTableView();
	
	tableview.setData(getTableData());
	
	self.add(tableview);
	
	if (platform !== 'android') {
		var addBtn = Ti.UI.createButton({
			title:'+'
		});
		addBtn.addEventListener('click', function() {
			new AddWindow().open();
		});
		self.rightNavButton = addBtn;
	}
	
	// tableview.addEventListener('click', function(e) {
		// createConfirmDialog(e.row.name, e.row.description).show();
	// });
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData());
	});
	
	return self;
};

var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var items = db.selectAllItems();
	
	if(items != null){
		for (var i = 0; i < items.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: items[i].itemId,
				title: items[i].name,
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			data.push(row);
		}
	}
	return data;
};

// var createConfirmDialog = function(id, title, isDone) {
	// var db = require('db');
	// var buttons, doneIndex, clickHandler;
// 	
	// if (isDone) {
		// buttons = ['Delete', 'Cancel'];	
		// clickHandler = function(e) {
			// if (e.index === 0) {
				// deleteItem(db, id, isDone);
				// Ti.App.fireEvent('app:updateTables');
			// }
		// };
	// } else {
		// buttons = ['Done', 'Delete', 'Cancel'];
		// clickHandler = function(e) {
			// if (e.index === 0) {
				// db.updateItem(id, 1);
				// Ti.App.fireEvent('app:updateTables');
			// } else if (e.index === 1) {
				// deleteItem(db, id, isDone);
				// Ti.App.fireEvent('app:updateTables');
			// }
		// };
	// }
// 	
	// var confirm = Ti.UI.createAlertDialog({
		// title: 'Change Task Status',
		// message: title,
		// buttonNames: buttons
	// });
	// confirm.addEventListener('click', clickHandler);
// 	
	// return confirm;
// };
// 
// var deleteItem = function(db, id, isDone) {
	// if (platform === 'mobileweb') {
		// db.deleteItem(id, isDone);
	// }
	// else {
		// db.deleteItem(id);
	// }
// };

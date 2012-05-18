var platform = Ti.Platform.osname;
var sortTypes = ["",
				 "order by name asc",
				 "order by name desc"];
				 
var sortIndex = 0;

exports.ListWindow = function(args) {
	getTableData();
	
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
	
	tableview.addEventListener('click', function(e) {
		createConfirmDialog(e.row.id, e.row.title).show();
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData());
	});
	
	Ti.App.addEventListener('app:changeSort', function(e) {
		sortIndex = e.sortType.number;
		tableview.setData(getTableData());
	});
	
	return self;
};

var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var items = db.selectAllItems(sortTypes[sortIndex]);
	
	if(items != null){
		for (var i = 0; i < items.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: items[i].id,
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

var createConfirmDialog = function(id, title) {
	var db = require('db');
	var EditWindow = require('ui/EditWindow').EditWindow;
	var buttons = ['Edit', 'Delete', 'Cancel'];
	var confirm = Ti.UI.createAlertDialog({
		title: 'Edit',
		message: title,
		buttonNames: buttons
	});
	
	confirm.addEventListener('click', function(e) {
		if (e.index === 0) {
			new EditWindow(id).open();
		} else if (e.index === 1) {
			var delConfirm =  Titanium.UI.createAlertDialog({
        		message:'Delete ' + title +' ?'
   			 });
    		delConfirm.buttonNames = ['Yes', 'No'];
    		delConfirm.addEventListener('click', function(e) {
    			if(e.index === 0){
    				db.deleteItem(id);
					Ti.App.fireEvent('app:updateTables');
    			}else if(e.index ===1){
    				return;
    			}
    		});
    		delConfirm.show();
		}
	});
	return confirm;
};

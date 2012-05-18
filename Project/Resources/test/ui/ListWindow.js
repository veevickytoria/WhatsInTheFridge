var platform = Ti.Platform.osname;
var sortTypes = ["",
				 "order by name asc",
				 "order by name desc"];
				 
var sortIndex = 0;

var listIphoneAddButton = L('listIphoneAddButton');
var listIphoneSortButton = L('listIphoneSortButton');
var listOptionWindowEditButton = L('listOptionWindowEditButton');
var listOptionWindowDeleteButton = L('listOptionWindowDeleteButton');
var listOptionWindowCancelButton = L('listOptionWindowCancelButton');
var listOptionWindowTitle = L('listOptionWindowTitle');
var listOptionWindowDeleteConf = L('listOptionWindowDeleteConf');
var listOptionWindowDeleteYesButton = L('listOptionWindowDeleteYesButton');
var listOptionWindowDeleteNoButton = L('listOptionWindowDeleteNoButton');

exports.ListWindow = function(args) {
	getTableData();
	
	var AddWindow = require('ui/AddWindow').AddWindow;
	var SortWindow = require('ui/SortWindow').SortWindow;
	
	var self = Ti.UI.createWindow(args);
	var tableview = Ti.UI.createTableView();
	
	tableview.setData(getTableData());
	
	self.add(tableview);
	
	if (platform !== 'android') {
		var addBtn = Ti.UI.createButton({
			title: listIphoneAddButton
		});
		
		var changeSortButton = Ti.UI.createButton({
			title:listIphoneSortButton
		});
		
		
		addBtn.addEventListener('click', function() {
			new AddWindow().open();
		});
		
		changeSortButton.addEventListener('click', function() {
			new SortWindow().open();
		});
		
		self.rightNavButton = addBtn;
		self.leftNavButton = changeSortButton;

	}
	
	tableview.addEventListener('click', function(e) {
		createConfirmDialog(e.row.id, e.row.title).show();
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData());
	});
	
	Ti.App.addEventListener('app:changeSort', function(e) {
		sortIndex = e.sortType;
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
	
	var buttons = [listOptionWindowEditButton, listOptionWindowDeleteButton, listOptionWindowCancelButton];
	var confirm = Ti.UI.createAlertDialog({
		title: listOptionWindowTitle,
		message: title,
		buttonNames: buttons
	});
	
	confirm.addEventListener('click', function(e) {
		if (e.index === 0) {
			new EditWindow(id).open();
		} else if (e.index === 1) {
			var delConfirm =  Titanium.UI.createAlertDialog({
        		message: listOptionWindowDeleteConf
   			 });
    		delConfirm.buttonNames = [listOptionWindowDeleteYesButton, listOptionWindowDeleteNoButton];
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

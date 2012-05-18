var editItemEmptyNameAlert = L('editItemEmptyNameAlert');
var editItemUpdateAlert = L('editItemUpdateAlert');
var editItemReminderAlert 	= L('addItemReminderAlert');
var editItemExpirationAlert 	= L('addItemExpirationAlert');

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

var updateItem = function(id, item, win, timers) {	
	if (item.name === '') {
		alert(editItemEmptyNameAlert);
		return false;	
	}
	
	var result = require('db').updateItem(id, item);
	Ti.App.fireEvent('app:updateTables');
	
	var countID = -1;
	
	while (countID < Ti.App.itemTimers.length) {
		countID++;
		Ti.API.info("====================================== count " + countID + "      value " + Ti.App.itemTimers[countID]);
		
		if (Ti.App.itemTimers[countID] !== undefined && Ti.App.itemTimers[countID].id == id) {
			if (Ti.App.itemTimers[countID].reminder !== undefined) {
				Ti.App.itemTimers[countID].reminder.stop();
			}
			
			if (Ti.App.itemTimers[countID].expiration !== undefined) {
				Ti.App.itemTimers[countID].expiration.stop();
			}
			
			break;
		}
	}
	
	var currentTime= new Date();
	var dif;
	var remTimer;
	var expTimer;

	//reminder timer start	
	if (item.reminder !== undefined) {
		dif = item.reminder.getTime() - currentTime.getTime(); 
	
		if (dif > 0){
			var seconds = dif / 1000;
		
			remTimer = countDown(0, seconds, function() {
				alert(item.name + editItemReminderAlert);
			});
			
			remTimer.start();
		}
	}
	
	//Blah Blah code copying
	//expiration date timer
	if (item.expDate !== undefined) {
		dif = item.expDate.getTime() - currentTime.getTime(); 
	
		if (dif > 0){
			seconds = dif / 1000;
		
			expTimer = countDown(0, seconds, function() {
				alert(item.name + editItemExpirationAlert);
			});
			
			expTimer.start();
		}
	}
	
	Ti.App.itemTimers[countID].reminder = remTimer;
	Ti.App.itemTimers[countID].reminder = expTimer;
	
	win.close();
	if (result !== false)
		alert(result.name + editItemUpdateAlert);
};

//from http://cssgallery.info/create-a-countdown-timer-with-titanium-appcelerator/
var countDown =  function( m , s, fn_end ) {
	return {
		total_sec:m*60+s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m)*60+parseInt(s);
			this.time = {m:m,s:s};
			return this;
		},
		start: function() {
			var self = this;
			this.timer = setInterval( function() {
				if (self.total_sec > 0) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
					// fn_tick();
				}
				else {
					self.stop();
					fn_end();
				}
				}, 1000 );
			return this;
		},
		stop: function() {
			clearInterval(this.timer)
			this.time = {m:0,s:0};
			this.total_sec = 0;
			return this;
		}
	}
}
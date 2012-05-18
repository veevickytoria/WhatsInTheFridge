exports.AddWindow = function() {
	var addItemNameText 		= L('addItemNameText');
	var addItemDescText 		= L('addItemDescText');
	var addItemReminderButton 	= L('addItemReminderButton');
	var addItemExpirationButton = L('addItemExpirationButton');
	var addItemAddButton 		= L('addItemAddButton');
	var addItemCancelButton 	= L('addItemCancelButton');
	var addItemTitle			= L('addItemTitle');
	
	var AddReminderWindow = require('ui/AddReminderWindow').AddReminderWindow;
	var AddExpirationWindow = require('ui/AddExpirationWindow').AddExpirationWindow;
	
	var reminder;
	var expiration;
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: addItemTitle,
		backgroundColor: '#fff'
	});
	
	var itemNameField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: addItemNameText,
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
		hintText: addItemDescText,
		borderWidth:1,
		borderColor:'#bbb',
		borderRadius:5,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	// itemDescField.addEventListener('return', function(e) {
		// var item = {name: itemNameField.value, description: itemDescField.value};
		// addItem(item, self);
	// });
	
	var reminderButton = Ti.UI.createButton({
		title: addItemReminderButton,
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
		new AddReminderWindow(self).open();
	});
	
	var expirationButton = Ti.UI.createButton({
		title: addItemExpirationButton,
		width: '120dp',
		height: '40dp',
		top: '170dp',
		right: '20dp'
	});
	
	self.addEventListener('expirationChoice', function(e) {
		Ti.API.info("=====================================>" + e.expirationEvent);
		expiration = e.expirationEvent;
	});
	
	expirationButton.addEventListener('click', function() {
		new AddExpirationWindow(self).open();
	});
	
	var addButton = Ti.UI.createButton({
		title: addItemAddButton,
		width: '120dp',
		height: '40dp',
		top: '220dp',
		left: '20dp'
	});
	
	addButton.addEventListener('click', function() {
		var item = {name: itemNameField.value, description: itemDescField.value, reminder: reminder, expDate: expiration};
		addItem(item, self);
	});
	
	var cancelButton = Ti.UI.createButton({
		title: addItemCancelButton,
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
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};

var addItem = function(item, win) {	
	var addItemEmptyNameAlert 	= L('addItemEmptyNameAlert');
	var addItemReminderAlert 	= L('addItemReminderAlert');
	var addItemExpirationAlert 	= L('addItemExpirationAlert');
	
	if (item.name === '') {
		alert(addItemEmptyNameAlert);
		return false;	
	}
	
	var result = require('db').addItem(item);
	Ti.App.fireEvent('app:updateTables');
	
	var currentTime= new Date();
	var dif;

	//reminder timer start	
	if (item.reminder !== undefined) {
		dif = item.reminder.getTime() - currentTime.getTime(); 
	
		if (dif < 0){
			var seconds = dif / 1000;
		
			//TODO: create item.reminderID that holds the position in the array of the running reminder timer?
			var timer = countDown(0, seconds, function() {
				alert(item.name + addItemReminderAlert);
			});
			
			timer.start();
		}
	}
	
	//Blah Blah code copying
	//expiration date timer
	if (item.expDate !== undefined) {
		dif = item.expDate.getTime() - currentTime.getTime(); 
	
		if (dif < 0){
			seconds = dif / 1000;
		
			//TODO: create item.expirationID that holds the position in the array of the running expiration timer
			var expTimer = countDown(0, seconds, function() {
				alert(item.name + addItemExpirationAlert);
			});
			
			expTimer.start();
		}
	}
	
	win.close();
	return result;
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
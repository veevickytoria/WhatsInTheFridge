
//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

var reminder1 = {itemId: 1, reminder: '2012-05-15 10:00:00', enabled: 0};
var reminder2 = {itemId: 2, reminder: '2012-04-01 12:00;00', enabled: 1};
var reminder3 = {itemId: 2000, reminder: '2012-05-20 12:00;00', endable: 0};
var item1 = {id: 1, name:"ice cream", description:"loving it!", reminder: {id: 1, reminder: '2012-05-15 10:00:00', enabled: 0}};
var item2 = {id: 2, name:"milk"};
var item3 = {id: 1, name:"ice cream", description:"loving it!", reminder: {id: 1, reminder: '2012-05-15 10:00:00', enabled: 1}};
var item4 = {id: 1, name:"ice cream", description:"loving it!", reminder: {id: 1, reminder: '2012-05-30 10:00:00', enabled: 1}};
var item5 = {id: 1, name:"ice cream", description:"loving it!"};
var newTime1 = '2012-05-30 10:00:00';
var newTime2 = '2012-01-30 10:00:00';

//test insertion
when(mockDB).addReminder(reminder1).thenReturn(item1);
test("addReminder1",function(){
	var returnedItem = mockDB.addReminder(reminder1);
	ok(returnedItem.reminder !== null, "addReminder1 failed");
});

//test invalid insertion (non-existing item)
when(mockDB).addReminder(reminder3).thenReturn(null);
test("addReminder2",function(){
	var returnedItem = mockDB.addReminder(reminder3);
	ok(returnedItem === null, "add invalid reminder 1 failed");
});

//test invalid insertion (date before today)
when(mockDB).addReminder(reminder2).thenReturn(item2);
test("addReminder3",function(){
	var returnedItem = mockDB.addReminder(reminder3);
	equals(returnedItem, item2, "add invalid reminder 2 failed");
});

//test select reminder when item doesn't have a reminder
when(mockDB).selectReminder(item2.id).thenReturn(null);
test("selectNullReminder",function(){
	var returnedItem = mockDB.selectReminder(item2.id);
	ok(returnedItem === null, "select invalid reminder failed");
});

//test select valid reminder 
when(mockDB).selectReminder(item1.id).thenReturn(reminder1);
test("selectNullReminder",function(){
	var returnedItem = mockDB.selectReminder(item1.id);
	equals(returnedItem, reminder1, "select valid reminder failed");
});

//test enable reminder
when(mockDB).enableReminder(item1.id).thenReturn(item3);
test("enable reminder",function(){
	var returnedItem = mockDB.enableReminder(item1.id);
	equals(returnedItem, reminder3, "enable reminder failed");
});

//test disable reminder
when(mockDB).disableReminder(item1.id).thenReturn(item1);
test("disable reminder",function(){
	var returnedItem = mockDB.disableReminder(item1.id);
	equals(returnedItem, reminder1, "disable reminder failed");
});

//test update reminder
when(mockDB).updateReminderTime(item3.id, newTime1).thenReturn(item4);
test("update reminder",function(){
	var returnedItem = mockDB.updateReminderTime(item3.id, newTime1);
	equals(returnedItem, reminder4, "update reminder failed");
});

//test update reminder to an invalid time
when(mockDB).updateReminderTime(item3.id, newTime2).thenReturn(item3);
test("update reminder",function(){
	var returnedItem = mockDB.updateReminderTime(item3.id, newTime2);
	equals(returnedItem, reminder3, "update invalid reminder failed");
});

//test delete reminder
when(mockDB).deleteReminder(item3.id).thenReturn(item5);
test("update reminder",function(){
	var returnedItem = mockDB.deleteReminder(item3.id);
	equals(returnedItem, item5, "delete reminder 1 failed");
});

//test delete reminder from an item without reminder
when(mockDB).deleteReminder(item2.id).thenReturn(item2);
test("update reminder",function(){
	var returnedItem = mockDB.deleteReminder(item2.id);
	equals(returnedItem, item2, "delete reminder 2 failed");
});
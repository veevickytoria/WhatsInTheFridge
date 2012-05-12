
//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

var expiration1 = expiration "2012-05-15 10:00:00";
var expiration2 = expiration "2012-04-01 12:00;00";
var expiration3 = expiration "2012-05-20 12:00;00";
var item1 = {id: 1, name:"ice cream", description:"loving it!", expiration: "2012-05-15 10:00:00"};
var item2 = {id: 2, name:"milk"};
var item3 = {id: 1, name:"ice cream", description:"loving it!", expiration: "2012-05-15 10:00:00"};
var item4 = {id: 1, name:"ice cream", description:"loving it!", expiration: "2012-05-30 10:00:00"};
var item5 = {id: 1, name:"ice cream", description:"loving it!"};
var newTime1 = "2012-05-30 10:00:00";
var newTime2 = "2012-01-30 10:00:00";

//test insertion
when(mockDB).addExpiration(expiration1).thenReturn(item1);
test("addExpiration1",function(){
	var returnedItem = mockDB.addExpiration(expiration1);
	ok(returnedItem.expiration !== null, "addExpiration1 failed");
});

//test invalid insertion (non-existing item)
when(mockDB).addExpiration(expiration3).thenReturn(null);
test("addExpiration2",function(){
	var returnedItem = mockDB.addExpiration(expiration3);
	ok(returnedItem === null, "add invalid expiration 1 failed");
});

//test invalid insertion (date before today)
when(mockDB).addExpiration(expiration2).thenReturn(item2);
test("addExpiration3",function(){
	var returnedItem = mockDB.addExpiration(expiration3);
	equals(returnedItem, item2, "add invalid expiration 2 failed");
});

//test select expiration when item doesn't have a expiration
when(mockDB).selectExpiration(item2.id).thenReturn(null);
test("selectNullExpiration",function(){
	var returnedItem = mockDB.selectExpiration(item2.id);
	ok(returnedItem === null, "select invalid expiration failed");
});

//test select valid expiration 
when(mockDB).selectExpiration(item1.id).thenReturn(expiration1);
test("selectNullExpiration",function(){
	var returnedItem = mockDB.selectExpiration(item1.id);
	equals(returnedItem, expiration1, "select valid expiration failed");
});

//test enable expiration
when(mockDB).enableExpiration(item1.id).thenReturn(item3);
test("enable expiration",function(){
	var returnedItem = mockDB.enableExpiration(item1.id);
	equals(returnedItem, expiration3, "enable expiration failed");
});

//test disable expiration
when(mockDB).disableExpiration(item1.id).thenReturn(item1);
test("disable expiration",function(){
	var returnedItem = mockDB.disableExpiration(item1.id);
	equals(returnedItem, expiration1, "disable expiration failed");
});

//test update expiration
when(mockDB).updateExpirationTime(item3.id, newTime1).thenReturn(item4);
test("update expiration",function(){
	var returnedItem = mockDB.updateExpirationTime(item3.id, newTime1);
	equals(returnedItem, expiration4, "update expiration failed");
});

//test update expiration to an invalid time
when(mockDB).updateExpirationTime(item3.id, newTime2).thenReturn(item3);
test("update expiration",function(){
	var returnedItem = mockDB.updateExpirationTime(item3.id, newTime2);
	equals(returnedItem, expiration3, "update invalid expiration failed");
});

//test delete expiration
when(mockDB).deleteExpiration(item3.id).thenReturn(item5);
test("update expiration",function(){
	var returnedItem = mockDB.deleteExpiration(item3.id);
	equals(returnedItem, item5, "delete expiration 1 failed");
});

//test delete expiration from an item without expiration
when(mockDB).deleteExpiration(item2.id).thenReturn(item2);
test("update expiration",function(){
	var returnedItem = mockDB.deleteExpiration(item2.id);
	equals(returnedItem, item2, "delete expiration 2 failed");
});
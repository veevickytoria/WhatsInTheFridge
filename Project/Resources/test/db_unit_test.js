//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

//id to test non-existing item
var invalidID = 1000;
var item = {name:"milk", description:"can't have breakfast without it"};
var item2 = {name:"ice cream", description:"loving it!"};

//test selectAll on empty database
var empty = [];
when(mockDB).selectAllItems().thenReturn(empty);
test("selectAllOnEmpty",function(){
	equal(mockDB.selectAllItems(), empty, "select on empty db test failed");
});

//test insertion
var itemToInsert = {name:"milk", description:"can't have breakfast without it"};
when(mockDB).addItem(itemToInsert).thenReturn(item);
test("addItem1",function(){
	var returnedItem = mockDB.addItem(itemToInsert);
	item.itemId = returnedItem.itemId;
	equal(returnedItem.name, itemToInsert.name, "addItem test 1 failed - different name");
	equal(returnedItem.name, itemToInsert.name, "addItem test 1 failed - different name");
});

//test insertion
var itemToInsert2 = {name:"ice cream", description:"loving it!"};
when(mockDB).addItem(itemToInsert2).thenReturn(item2);
test("addItem2",function(){
	var returnedItem = mockDB.addItem(itemToInsert2);
	item2.itemId = returnedItem.itemId;
	equal(returnedItem.name, itemToInsert2.name, "addItem test 2 failed - different name");
	equal(returnedItem.name, itemToInsert2.name, "addItem test 2 failed - different name");
});

//test updating existing item
var newItem = {name:"milk", description:"we are out!"};
var updatedItem = {itemId:item.itemId, name:"milk", description:"we are out!"};
when(mockDB).updateItem(item.itemId, newItem).thenReturn(updatedItem);
test("updateExistingItem1",function(){
	equal(mockDB.updateItem(item.itemId, newItem), updatedItem, "update exsiting item test 1 failed");
});

//test updating existing item
var newItem2 = {name:"ice cream", description:"Go buy some!"};
var updatedItem2 = {itemId:item2.itemId, name:"ice cream", description:"Go buy some!"};
when(mockDB).updateItem(item2.itemId, newItem2).thenReturn(updatedItem2);
test("updateExistingItem2",function(){
	equal(mockDB.updateItem(item2.itemId, newItem2), updatedItem2, "update exsiting item test 2 failed");
});

//test updating non-existing item
when(mockDB).updateItem(invalidID, newItem).thenReturn(null);
test("updateNonExistingItem",function(){
	equal(mockDB.updateItem(invalidID, newItem), null, "update non-exsiting item test failed");
});

//test selection
when(mockDB).selectItem(item.itemId).thenReturn(item);
test("selectItem",function(){
	equal(mockDB.selectItem(item.itemId), item, "select item test failed");
});

//test selecting non-existing item
when(mockDB).selectItem(invalidID).thenReturn(null);
test("selectItem",function(){
	equal(mockDB.selectItem(invalidID), null, "select non-existing item test failed");
});

//test selectAll on database with some info
var data = [updatedItem, updatedItem2];
when(mockDB).selectAllItems().thenReturn(data);
test("selectAllOnSomeData",function(){
	equal(mockDB.selectAllItems(), data, "select on some data test failed");
});

//test deleting existing item
when(mockDB).deleteItem(item.itemId).thenReturn(true);
test("deleteExistingItem",function(){
	equal(mockDB.deleteItem(item.itemId), true, "delete existing item test failed");
});

//test deleting non-existing item
when(mockDB).deleteItem(invalidID).thenReturn(false);
test("deleteNonExistingItem",function(){
	equal(mockDB.deleteItem(invalidID), false, "delete non-existing item test failed");
});

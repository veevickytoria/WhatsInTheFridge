
//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

//id to test non-existing item
var invalidID = 1000;
var item = {itemId:"1", name:"milk", description:"can't have breakfast without it"};

//test insertion
var itemToInsert = {name:"milk", description:"can't have breakfast without it"};
when(mockDB).addItem(itemToInsert).thenReturn(item);
test("addItem",function(){
	var returnedItem = mockDB.addItem(itemToInsert);
	item.itemId = returnedItem.itemId;
	equal(returnedItem.name, itemToInsert.name, "addItem test failed - different name");
	equal(returnedItem.name, itemToInsert.name, "addItem test failed - different name");
});

//test updating existing item
var newItem = {name:"milk", description:"we are out!"};
var updatedItem = {itemId:item.itemId, name:"milk", description:"we are out!"};
when(mockDB).updateItem(item.itemId, newItem).thenReturn(updatedItem);
test("updateExistingItem",function(){
	equal(mockDB.updateItem(item.itemId, newItem), updatedItem, "update exsiting item test failed");
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

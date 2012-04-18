
//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

//test insertion
var itemToInsert = {name:"milk", description:"can't have breakfast without it"};
var item = {itemId:"2", name:"milk", description:"can't have breakfast without it"};
when(mockDB).addItem(itemToInsert).thenReturn(item);
test("addItem",function(){
	equal(mockDB.addItem(item), item, "addItem test failed");
});

//test updating existing item
var newItem = {name:"milk", description:"we are out!"};
var updatedItem = {itemId:"2", name:"milk", description:"we are out!"};
when(mockDB).updateItem(item.itemId, newItem).thenReturn(updatedItem);
test("updateExistingItem",function(){
	equal(mockDB.updateItem(item.itemId, newItem), updatedItem, "update exsiting item test failed");
});

//test updating non-existing item
when(mockDB).updateItem(1000, newItem).thenReturn(null);
test("updateNonExistingItem",function(){
	equal(mockDB.updateItem(item.itemId, newItem), null, "update non-exsiting item test failed");
});

//test selection
when(mockDB).selectItem(item.itemId).thenReturn(item);
test("selectItem",function(){
	equal(mockDB.selectItem(item.itemId), item, "select item test failed");
});

//test deleting existing item
when(mockDB).deleteItem(item.itemId).thenReturn(true);
test("deleteExistingItem",function(){
	equal(mockDB.deleteItem(item.itemId), true, "delete existing item test");
});

//test deleting non-existing item
when(mockDB).deleteItem("2000").thenReturn(false);
test("deleteNonExistingItem",function(){
	equal(mockDB.deleteItem(item.itemId), false, "delete non-xisting item test");
});

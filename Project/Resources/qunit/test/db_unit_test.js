
//mock database
var mockDB = mock(require('db'));
mockDB.createDb();
verify(mockDB).createDb();

//test insertion
var item = {itemId:"2", name:"milk", description:"can't have breakfast without it"};
when(mockDB).addItem(item).thenReturn(true);
test("addItem",function(){
	equal(mockDB.addItem(item), true, "addItem test failed");
});

//test updating
var newItem = {name:"milk", description:"we are out!"};
when(mockDB).updateItem(item.itemId, newItem).thenReturn(true);
test("updateItem",function(){
	equal(mockDB.updateItem(item.itemId, newItem), true, "updateItem test failed");
});

//test selection
when(mockDB).selectItem(item.itemId).thenReturn(item);
test("selectItem",function(){
	equal(mockDB.selectItem(item.itemId), item, "selectItem test failed");
});

//test deleting
when(mockDB).deleteItem(item.itemId).thenReturn(true);
test("deleteItem",function(){
	equal(mockDB.deleteItem(item.itemId), true, "deleteItem test");
});
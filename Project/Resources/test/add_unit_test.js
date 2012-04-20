//test adding items
//addItem takes the item and adds it to the database. 
//Returns the item's id' if the addition is successful, otherwise it returns -1.
var invalidItem = {name:"", description:"description", quantity:"5"};
test("invalid addition", function(){
	equal(addItem(invalidItem), false, "invalid additon test failed")
});

var item1 = {name:"bread"};
test("addition 1", function(){
	equal(addItem(item1), item1, "addition test 1 failed")
});

var item2 = {name:"egg", description:"don't break it!", quantity:"12"};
test("addition 2", function(){
	equal(addItem(item2), item2, "addition test 2 failed")
});

//getTableRowsById research through an array that keeps track of all the items displaying
//returns an Array of matching result
var invalidItemId = -4;
test("invalid getTableRowsById", function(){
	ok(getTableRowsById(itemId).length = 0, "invalid getTableRowsById test failed")
});

var validItemId = 2;
test("valid getTableRowsById", function(){
	ok(getTableRowsById(validItemId).length > 0, "view getTableRowsById failed")
});

//test updating overall list upon addition
var item3 = {name:"ice cream", description:"LOVE IT!"};
var itemId = addItem(item3).itemId;
test("view updated", function(){
	ok(getTableRowsById(itemId).length > 0, "view updated test failed")
});



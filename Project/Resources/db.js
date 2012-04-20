var DATABASE_NAME = 'fridge';
var db;

exports.createDb = function() {
	//Install database
	Titanium.Database.install('fridge.sqlite', DATABASE_NAME);
};

exports.selectItem = function(id) {
	return selectById(id);
};

exports.selectAllItems = function(){
	return sqlExecute(function(result){
				return pushData(result);
			   }, 
			   function(result){
			   	alert("An error occured when selecting all items");
			   	return null;
			   },
			   "select ROWID, * from item");
};

exports.updateItem = function(id, newItem) {
	return sqlExecute(function(result){
				return selectById(id);
			   }, 
			   function(result){
			   	alert("An error occured when updating ROWID = " + id);
			   	return null;
			   },
			   'update item set values ? where ROWID = ?', newItem, id);
};

exports.addItem = function(item) {
	return sqlExecute(function(result){
				return selectByName(item.name);
			   }, 
			   function(result){
			   	alert("An error occured when inserting itemName = " + item.name);
			   	return null;
			   },
			   'insert into item (name, description, expirationDate, location, category, reminder) values (?, ?, ?, ?, ?, ?)', 
			   item.name, item.description, item.expDate, item.location, item.category, item.reminder);
};

exports.deleteItem = function(id) {
	return sqlExecute(function(result){
				return result;
			   }, 
			   function(result){
			   	alert("An error occured when deleting ROWID = " + id);
			   	return result;
			   },
			   'delete from item where ROWID = ?', id);
};

//helper methods
var sqlExecute = function(onSuccess, onError, sql, args){
	db = Ti.Database.open(DATABASE_NAME);
    var vals = [];
    for (i=3;i<arguments.length;i++){
    	vals.push(arguments[i]);
    }
    //  Call the execute method
    var result = db.execute(sql, vals);
    if(result === false ){
        return onError(result);
    }else{
        return onSuccess(result); 
    }
}

var selectById = function(id){
	return sqlExecute(function(result){
				return pushData(result);
			   }, 
			   function(result){
			   	alert("An error occured when selecting ROWID = " + id);
			   	return null;
			   },
			   "select ROWID, * from item where ROWID = ?", id);
};

var selectByName = function(name){
	return sqlExecute(function(result){
				return pushData(result);
			   }, 
			   function(result){
			   	alert("An error occured when selecting itemName = " + name);
			   	return null;
			   },
			   "select ROWID, * from item where name = ?", name);
};

var pushData = function(rows){
	var data = [];
	while (rows.isValidRow()) {
		data.push({id:rows.fieldByName('ROWID'), name:rows.fieldByName('name'), 
				   description:rows.fieldByName('description'), expDate:rows.fieldByName('expirationDate'),
				   location:rows.fieldByName('location'), category:rows.fieldByName('category'), reminder: rows.fieldByName('reminder')});
		rows.next();
		}
		return data;
};

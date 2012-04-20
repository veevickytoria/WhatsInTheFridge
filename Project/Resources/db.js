var DATABASE_NAME = 'fridge';

exports.createDb = function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory+'/database', 'fridge.sqlite');
//	If it's there, delete it and reinstall the DB
	if(f.exists() == true)
    	f.deleteFile();
//	install it
	Ti.Database.install('fridge.sqlite', DATABASE_NAME);
};

exports.selectItem = function(id) {
	return selectById(id);
};

exports.updateItem = function(id, newItem) {
	sqlExecute(function(result){
				return selectById(id);
			   }, 
			   function(result){
			   	alert("An error occured when updating ROWID = " + id);
			   	return null;
			   },
			   'update item set values ? where ROWID = ?', newItem, id);
};

exports.addItem = function(item) {
	sqlExecute(function(result){
				return selectByName(item.name);
			   }, 
			   function(result){
			   	alert("An error occured when inserting itemName = " + item.name);
			   	return null;
			   },
			   'insert into item values ?', item);
};

exports.deleteItem = function(id) {
	sqlExecute(function(result){
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
	var db = Ti.Database.open(DATABASE_NAME);
    var args = arguments; 
    // Remove the onSuccess, onError and sql from the arguments
    args.shift(); 
    args.shift();
    args.shift();
    //  Call the execute method
    var result = db.execute(sql, args);
    db.close();
    if(result === false ){
        onError(result);
    }else{
        onSuccess(result); 
    }
}

var selectById = function(id){
	sqlExecute(function(result){
				return pushData(result);
			   }, 
			   function(result){
			   	alert("An error occured when selecting ROWID = " + id);
			   	return null;
			   },
			   "select * from item where ROWID = ?", id);
};

var selectByName = function(name){
	sqlExecute(function(result){
				return pushData(result);
			   }, 
			   function(result){
			   	alert("An error occured when selecting itemName = " + name);
			   	return null;
			   },
			   "select * from item where name = ?", name);
};

var pushData = function(rows){
	var data = [];
	while (rows.isValidRow()) {
		data.push({id:rows.fieldByName('ROWID'), name:rows.fieldByName('name'), 
				   description:rows.fieldByName('description'), expDate:rows.fieldByName('expirationDate'),
				   location:rows.fieldByName('location'), category:rows.fieldByName('category')});
		rows.next();
		}
		return data;
};

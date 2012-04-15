var DATABASE_NAME = 'fridge';

exports.createDb = function() {
	Ti.Database.install('fridge.sqlite', DATABASE_NAME);
};

exports.selectItem = function(id) {
};

exports.updateItem = function(id, newItem) { 
};

exports.addItem = function(item) {
};

exports.deleteItem = function(id) {
};
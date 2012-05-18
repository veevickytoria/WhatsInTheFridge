/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else if (Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
}
else {
	var globals = {};
	
	(function() {
		var AppTabGroup = require('ui/AppTabGroup').AppTabGroup,
			ListWindow = require('ui/ListWindow').ListWindow,
			AddWindow = require('ui/AddWindow').AddWindow;
			SortWindow = require('ui/SortWindow').SortWindow;
		
		// Initialize local storage
		require('db').createDb();
		
		//create our global tab group	
		globals.tabs = new AppTabGroup(
			{
				title: "What's in the Fridge?",
				icon: 'images/KS_nav_ui.png',
				window: new ListWindow({
					title: 'Items',
					backgroundColor: '#fff',
					navBarHidden: false,
					activity: {
						onCreateOptionsMenu: function(e) {
							var menu = e.menu;
							
							var addMenuString = L('appAddItem');
							var changeSortString = L('appChangeSort');
							
						    var menuAddItem = menu.add({ title: addMenuString });
						    //menuAddItem.setIcon("images/ic_menu_add.png");
						    menuAddItem.addEventListener("click", function(e) {
						        new AddWindow().open();
						    });
						    var menuChangeSort = menu.add({ title: changeSortString });
						    menuChangeSort.addEventListener("click", function(e) {
						        new SortWindow().open();
						    });
						}
					}
				})
			},
			{
				title: 'Unit Test',
				icon: 'images/KS_nav_views.png',
				window: Titanium.UI.createWindow({
	    			url: 'runner.js', 
	    			title:'Unit Test'
				})
			}
		);
		
		globals.tabs.open();
	})();
}
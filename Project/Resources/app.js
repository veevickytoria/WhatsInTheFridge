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

var appTitaniumVerCheckAlert = L('appTitaniumVerCheckAlert');
var appTitaniumMobWebCheckAlert = L('appTitaniumMobWebCheckAlert');
var appListWindowTitle = L('appListWindowTitle');
var appListTabTitle = L('appListTabTitle');
var appTestTabTitle = L('appTestTabTitle');

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	var appTitaniumVerCheckAlert = L('appTitaniumVerCheckAlert');
	alert(appTitaniumVerCheckAlert);
}
else if (Ti.Platform.osname === 'mobileweb') {
	var appTitaniumMobWebCheckAlert = L('appTitaniumMobWebCheckAlert');
	alert(appTitaniumMobWebCheckAlert);
}
else {
	var globals = {};
	
	(function() {
		var AppTabGroup = require('ui/AppTabGroup').AppTabGroup,
			ListWindow = require('ui/ListWindow').ListWindow,
			AddWindow = require('ui/AddWindow').AddWindow,
			SortWindow = require('ui/SortWindow').SortWindow;
			
		var appListWindowTitle = L('appListWindowTitle');
		var appListTabTitle = L('appListTabTitle');
		var appTestTabTitle = L('appTestTabTitle');
		
		// Initialize local storage
		require('db').createDb();
		
		//create our global tab group	
		globals.tabs = new AppTabGroup(
			{
				title: appListTabTitle,
				icon: 'images/KS_nav_ui.png',
				window: new ListWindow({
					title: appListWindowTitle,
					backgroundColor: '#fff',
					navBarHidden: false,
					activity: {
						onCreateOptionsMenu: function(e) {
							var menu = e.menu;
							
							var addMenuString = L('appAddItem');
							var changeSortString = L('appChangeSort');
							
						    var menuAddItem = menu.add({ title: addMenuString });
						    menuAddItem.setIcon("images/ic_menu_add.png");
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
				title: appTestTabTitle,
				icon: 'images/KS_nav_views.png',
				window: Titanium.UI.createWindow({
	    			url: 'runner.js', 
	    			title: appTestTabTitle
				})
			}
		);
		
		globals.tabs.open();
	})();
}
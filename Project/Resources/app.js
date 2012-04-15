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
	//require and open top level UI component
	var AppTabGroup = require('ui/AppTabGroup');
	tabGroup = new AppTabGroup();
	
	// Add this to app.js (modify as you wish)
	var unit = Titanium.UI.createWindow({
	    url: 'runner.js', 
	    title:'Unit Test'
	});
	var tabUnitTest = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Unit Test',
	    window:unit
	});
	
	// Assuming you have a tab group and want it to open automatically
	tabGroup.addTab(tabUnitTest);
	tabGroup.setActiveTab(tabGroup.tabs[1]);
	tabGroup.open();
}
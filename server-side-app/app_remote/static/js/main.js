function init(){

	var client = ZAFClient.init(); 
	// The ZAF SDK needs two parameters to create a client object that can interact with the framework
	// the url of the Zendesk Support instance (its origin) and the app's unique id (its app_guid)
	// see the core concept here https://help.zendesk.com/hc/en-us/articles/229489188#apis
	
	switch (action) {
		case 'notifySuccess':
			client.invoke('notify', 'Request successful!'); // Apps framework's notify method to display success or error messages with in-product notifications
			break;
		case 'notifyFailure':
			client.invoke('notify', msg, 'error');
			break;
	}

}

window.addEventListener('load', init, false);
$(function() {
  var client = ZAFClient.init(); // gives you a number of methods to interact with the Apps framework
  client.invoke('resize', { width: '400px', height: '120px' });

  // client.get() gets data from the UI asynchronously
  // the response should be like this
  // {
  //  'ticket.requester.id': 29043265
  // }
  client.get('ticket.requester.id').then(function(data){
    var user_id = data['ticket.requester.id']; // The ID of ticket the agent is viewing in Zendesk Support, The framework (v1) gives you access to the ticket data of any ticket open in the agent interface (Data API doc)
  	console.log("Requester ID: " + user_id); // gets the user id of the requester of the ticket currently open in the agent interface.

  	requestUserInfo(client, user_id); // HTTP request to the Users API in the Zendesk REST API.
  });

});

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/'+ id +'.json', // https://developer.zendesk.com/rest_api/docs/core/introduction
    type: 'GET',
    dataType: 'json',
  };

  // use client.request() to make HTTP requests to external APIs
  // the response should be like this
  //{
  //  "user": {
  //    "id":   35436,
  //    "name": "Johnny Agent",
  //    ...
  //  }
  //}
  client.request(settings).then(
    function(data){
      showInfo(data);
    }, 
    function(response){
      showError(response);
    }
  );
}

function showInfo(data) {
  var requester_data = {
    'name': data.user.name,
    'tags': data.user.tags,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at)
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

function showError() {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}
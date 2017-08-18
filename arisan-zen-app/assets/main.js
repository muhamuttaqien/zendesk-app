$(function() {
    // Initialise the Zendesk JavaScript API client
    // https://developer.zendesk.com/apps/docs/apps-v2
    var client = ZAFClient.init();
    client.invoke('resize', { width: '400px', height: '120px' });
    
    // $("#btn-submit").click(function(){
    //   var phone_number = $(this).prev().val();
    //   getArisanInfo(client, phone_number);
    // });

    $("#KAPhoneNumber").on('keyup', function(){
      var phone_number = $(this).val();
      getArisanInfo(client, phone_number);
    });
});


function getArisanInfo(client, phone_number) {
  var settings = {
  	url: 'http://viewmidware.mapan.ruma.co.id/arisan/leader/info/?phone_number=' + phone_number,
    // url: 'http://10.99.3.146:8080/arisan/leader/info/?phone_number=+628119334309', // 085740981138, +6285865611732 
    // url: 'https://app.asana.com/api/1.0/projects/356068610698611/tasks',
    headers: {"Authorization": "0a1c8ed6-89f4-4b0f-a747-728266c3aa4e"},
    type: 'GET',
    dataType: 'json'
  }

  client.request(settings).then(
  	function(data) {
  		showInfo(data);
  	},
  	function(response) {
  		showError(response);
  	}
  );

}

function showInfo(data) {
  var requester_data = {
    'id': data.data.id,
    'name': data.data.name,
    'job_title': data.data.job_title,
    'phone_number': data.data.phone_number,
    'city': data.data.city,
    'rt': data.data.rt,
    'rw': data.data.rw,
    'province': data.data.province,
    'mapan_id': data.data.mapan_id,
    'extra': data.data.extra,
    'id_number': data.data.id_number,
    'subdistrict': data.data.subdistrict,
    'zip_code': data.data.zip_code,
    'street': data.data.street,
    'village': data.data.village
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);

  $("#content").html(html);
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  
  $("#content").html(html);
}
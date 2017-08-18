<html>
<head>
 	<link href="https://cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<!-- when a user clicks the link in the iframe, the query string (qs) is sent to the server and then back to the iframe -->
 	<a class="btn btn-default btn-block" href="list?{{qs}}" role="button">List tech note ideas</a>
 	<a class="btn btn-default btn-block" href="add" role="button">Add tech note idea</a>
	% if defined('error_msg'):
		<script type="text/javascript" src="https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js"></script>
		<script>
			var action = 'notifyFailure';
			var msg = '{{error_msg}}';
		</script>
		<script type="text/javascript" src="js/main.js"></script>
	% end
</body>
</html>
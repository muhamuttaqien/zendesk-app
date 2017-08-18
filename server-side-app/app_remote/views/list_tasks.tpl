<html>
<head>
	<link href="https://cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<ul>
		% for task in list:
			<li>
				<a href="https://app.asana.com/0/356068610698611/{{task['id']}}" target="_blank">{{task['name']}}</a>
			</li>
		% end
	</ul>

	<script type="text/javascript" src="https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js"></script>
	<script>
	  var action = 'notifySuccess';
	</script>
	<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
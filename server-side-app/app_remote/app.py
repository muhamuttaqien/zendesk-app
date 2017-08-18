import requests # library simplifies making HTTP requests in Python
from bottle import route, run, template, request, response # bottle is a micro web framework for Python

@route('/sidebar')
def send_iframe_html():
	qs = request.query_string
	response.set_cookie('my_app_params', qs)
	return template('start', qs=qs)

@route('/list')
def show_tasks():
	# authenticate the request
	access_token = '0/23284b6637a296d854660450bdbdab94'
	header = {'Authorization': 'Bearer {}'.format(access_token)}

	# make the request to get data from ASANA's external API
	url = 'https://app.asana.com/api/1.0/projects/356068610698611/tasks' 
	r = requests.get(url, headers=header)

	if r.status_code == 200:
		tasks = r.json() # json() method to convert the JSON response to a Python dictionary
		return template('list_tasks', list=tasks['data'])
	else:
		msg = 'Problem with the request: {} {}'.format(r.status_code, r.reason)
		qs = request.get_cookie('my_app_params')
		return template('start', qs=qs, error_msg=msg)

@route('/js/<filename>')
def send_js(filename):
	return static_file(filename, root='static/js')


run(host='localhost', port=8080, debut=True) # run command 'python app.py' to start the local server


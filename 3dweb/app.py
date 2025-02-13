from flask import Flask, render_template, request, redirect, url_for, jsonify, session, flash, abort
from flask_socketio import SocketIO, emit, join_room, leave_room


app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for sessions and flash messages

socketio = SocketIO(app)

# Home route renders a template
@app.route('/')
def home():
    # This would render an HTML file named "home.html" from the templates folder
    return render_template('index.html')

# A route that handles both GET and POST requests
@app.route('/api', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        # Retrieve data from a form submission
        user_input = request.form.get('data', 'No Data')
        # Flash a message to the user
        flash(f'Data received: {user_input}')
        # Redirect to the home page after processing
        return redirect(url_for('home'))
    else:
        # For GET requests, return a JSON response
        return jsonify({'message': 'Please send a POST request with form data.'})

# A route to demonstrate error handling
@app.route('/error')
def error():
    # Abort the request with a 404 error
    abort(404)


@socketio.on('connect')
def handle_connect():
    print('Client verbunden')
    emit('response', {'message': 'Verbunden mit dem Server!'})

# SocketIO-Event: Empfang einer Nachricht vom Client
@socketio.on('message')
def handle_message(data):
    print('Nachricht empfangen:', data)
    emit('response', {'message': 'Nachricht empfangen!'}, broadcast=True)

# SocketIO-Event: Client trennt die Verbindung
@socketio.on('disconnect')
def handle_disconnect():
    print('Client getrennt')



if __name__ == '__main__':
    # Run the app in debug mode for development purposes
    socketio.run(app=app, host='0.0.0.0', port=5000, debug=True)

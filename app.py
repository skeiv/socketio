from flask import Flask, render_template,send_file, send_from_directory
from flask_socketio import SocketIO, send
import os 
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['UPLOAD_FOLDER'] = 'photos/'
socketio = SocketIO(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@socketio.on('connect user')
def handle_connect(msg):
	print(msg)
	send(msg, broadcast=True)

@socketio.on('upload img')
def handle_upload_img(data):
    with open(app.config['UPLOAD_FOLDER'] + data['name'], 'wb') as f:
        f.write(data['file'])
    socketio.emit('upload img', {'file': data['file'],
                                'mimetype': 'image/jpeg',
                                'user':data['user']}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
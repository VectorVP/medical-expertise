from flask import Flask, request, jsonify, Response
from utils import *

app = Flask(__name__)

@app.route('/process', methods = ['POST'])
def process_document():
    data = request.data
    data_processed = process_html(data, 60)
    return jsonify(data_processed)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

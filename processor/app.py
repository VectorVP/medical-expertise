from flask import Flask, request, jsonify, Response
from utils import *

app = Flask(__name__)

@app.route('/process', methods = ['POST'])
def process_document():
    image = request.data
    image = preprocessor(image)
    icd_list = parse_image(image)
    return jsonify(icd_list)

@app.route('/process', methods = ['GET'])
def get_document():
    pass

@app.route('/process', methods = ['PUT'])
def add_document():
    pass

@app.route('/process', methods = ['DELETE'])
def remove_document():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

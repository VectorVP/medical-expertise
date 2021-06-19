from flask import Flask, request, jsonify, Response
from utils import *

app = Flask(__name__)

@app.route('/process', methods = ['POST'])
def process_document():
    image = request.data
    image = preprocessor(image)
    icd_list = parse_image(image)
    return jsonify(icd_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

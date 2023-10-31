from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Test Route
@app.route("/test")
def test():
    return jsonify(message="Hello from Flask")


if __name__ == "__main__":
    app.run(debug=True)

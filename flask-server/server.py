from flask import Flask

app = Flask(__name__)


# Test Route
@app.route("/test")
def test():
    return ""


if __name__ == "__main__":
    app.run(debug=True)

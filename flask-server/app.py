"""
This module initializes a Flask app and sets up a SQLAlchemy database connection.
"""
import logging
import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Setup logging
logging.basicConfig(level=logging.INFO)

load_dotenv()

app = Flask(__name__)
CORS(app)

# add DB
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")


db = SQLAlchemy(app)


class Staff(db.Model):
    __tablename__ = "Staff"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    dept = db.Column(db.String(20))
    sex = db.Column(db.String(1))
    salary = db.Column(db.Float)
    ext = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "dept": self.dept,
            "sex": self.sex,
            "salary": self.salary,
            "ext": self.ext,
        }


# testing for all staff
@app.route("/staff")
def get_all_staff():
    staff = Staff.query.all()
    return jsonify([s.to_dict() for s in staff])


# testing for staff by name
@app.route("/staff/<name>")
def get_staff(name):
    if not name.isalpha():  # Simple check to ensure 'name' contains only letters
        return jsonify({"error": "Invalid name parameter"}), 400

    try:
        staff = Staff.query.filter_by(name=name).all()
        if not staff:
            return jsonify({"error": "Staff member not found"}), 404
        return jsonify([s.to_dict() for s in staff])
    except Exception as e:
        logging.error("An error occurred: %s", e)
        return jsonify({"error": "An error occurred while fetching staff members"}), 500


# Test Route
@app.route("/")
def test():
    return jsonify(message="Hello from Flask")


if __name__ == "__main__":
    app.run(debug=True)

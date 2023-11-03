import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

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
    staff = Staff.query.filter_by(name=name).all()
    return jsonify([s.to_dict() for s in staff])


# Test Route
@app.route("/")
def test():
    return jsonify(message="Hello from Flask")


if __name__ == "__main__":
    app.run(debug=True)

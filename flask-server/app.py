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

class StudentTravelRegistrationFormDay(db.Model):

    __tablename__ = 'student_travel_registration_form_day'
    id = Column(Integer, primary_key=True)
    event_name = Column(String(255))
    host_organization = Column(String(255))
    departure_time = Column(DateTime)
    approximate_return_time = Column(DateTime)
    minimum_age_requirement = Column(Integer)
    first_name = Column(String(255))
    last_name = Column(String(255))
    kuid = Column(String(10))
    email = Column(String(255))
    phone_number = Column(String(15))
    date_of_birth = Column(DateTime)
    current_address = Column(String(255))
    city = Column(String(255))
    state = Column(String(2))
    zip = Column(String(10))

    def to_dict(self):
        return {
            'id': self.id,
            'event_name': self.event_name,
            'host_organization': self.host_organization,
            'departure_time': str(self.departure_time),  # Convert DateTime to string for JSON serialization
            'approximate_return_time': str(self.approximate_return_time),
            'minimum_age_requirement': self.minimum_age_requirement,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'kuid': self.kuid,
            'email': self.email,
            'phone_number': self.phone_number,
            'date_of_birth': str(self.date_of_birth),
            'current_address': self.current_address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip
        }

    def __repr__(self):
        return f"<StudentTravelRegistrationFormDay(id={self.id}, event_name='{self.event_name}', host_organization='{self.host_organization}', departure_time={self.departure_time}, approximate_return_time={self.approximate_return_time})>"


@app.route('/studenttravelregistrationformdaysubmit', methods=['POST'])
def studenttravelregistrationformdaysubmit():
    data = request.json
    student_registration_day = StudentTravelRegistrationFormDay(
         event_name=data.get('event_name'),
         host_organization=data.get('host_organization'),
         departure_time=data.get('departure_time'),
         approximate_return_time=data.get('approximate_return_time'),
         minimum_age_requirement=data.get('minimum_age_requirement'),
         first_name=data.get('first_name'),
         last_name=data.get('last_name'),
         kuid=data.get('kuid'),
         email=data.get('email'),
         phone_number=data.get('phone_number'),
         date_of_birth=data.get('date_of_birth'),
         current_address=data.get('current_address'),
         city=data.get('city'),
         state=data.get('state'),
         zip=data.get('zip')
     )

     db.session.add(student_registration_day)
     db.session.commit()





if __name__ == "__main__":
    app.run(debug=True)     








'''
class Staff(db.Model):
    """
    Represents a staff member in the database.
    """

    __tablename__ = "Staff"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    dept = db.Column(db.String(20))
    sex = db.Column(db.String(1))
    salary = db.Column(db.Float)
    ext = db.Column(db.Integer)

    def to_dict(self):
        """
        Returns a dictionary representation of the Staff object.
        """
        return {
            "id": self.id,
            "name": self.name,
            "dept": self.dept,
            "sex": self.sex,
            "salary": self.salary,
            "ext": self.ext,
        }

    def __repr__(self):
        return f"<Staff {self.name}>"


# testing for all staff
@app.route("/staff")
def get_all_staff():
    """
    Returns a JSON representation of all staff members in the database.
    """

    staff = Staff.query.all()
    return jsonify([s.to_dict() for s in staff])


# testing for staff by name
@app.route("/staff/<name>")
def get_staff(name):
    """
    Returns a JSON representation of a staff member with the given name.
    """

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
    """
    Returns a JSON message "Hello from Flask".
    """

    return jsonify(message="Hello from Flask")

'''
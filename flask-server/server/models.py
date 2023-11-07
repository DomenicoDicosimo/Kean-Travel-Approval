from datetime import date

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    fName = db.Column(db.String(100), nullable=False)
    lName = db.Column(db.String(100), nullable=False)
    DOB = db.Column(db.Date, nullable=False)
    sex = db.Column(db.String(1), nullable=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip = db.Column(db.String(10), nullable=False)
    role = db.Column(db.String(20), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "fName": self.fName,
            "lName": self.lName,
            "DOB": self.DOB.strftime("%Y-%m-%d")
            if isinstance(self.DOB, date)
            else self.DOB,
            "sex": self.sex,
            "email": self.email,
            "password": self.password,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "role": self.role,
        }

    def __repr__(self):
        return f"<User {self.fName} {self.lName}>"


class StudentTravelRegistrationFormDay(db.Model):
    __tablename__ = "student_travel_registration_form_day"

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255))
    host_organization = db.Column(db.String(255))
    departure_time = db.Column(db.DateTime)
    approximate_return_time = db.Column(db.DateTime)
    minimum_age_requirement = db.Column(db.Integer)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    kuid = db.Column(db.String(10))
    email = db.Column(db.String(255))
    phone_number = db.Column(db.String(15))
    date_of_birth = db.Column(db.DateTime)
    current_address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(2))
    zip = db.Column(db.String(10))

    def to_dict(self):
        return {
            "id": self.id,
            "event_name": self.event_name,
            "host_organization": self.host_organization,
            "departure_time": str(self.departure_time),
            "approximate_return_time": str(self.approximate_return_time),
            "minimum_age_requirement": self.minimum_age_requirement,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "kuid": self.kuid,
            "email": self.email,
            "phone_number": self.phone_number,
            "date_of_birth": str(self.date_of_birth),
            "current_address": self.current_address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
        }

    def __repr__(self):
        return f"<StudentTravelRegistrationFormDay(id={self.id}, event_name='{self.event_name}', host_organization='{self.host_organization}', departure_time={self.departure_time}, approximate_return_time={self.approximate_return_time})>"

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

from datetime import date

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


#To store the receipt 
class Receipt(db.Model):
    __tablename__ = "receipts"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('Users.id'))
    file_path = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.Date, nullable=False)
    
    def __repr__(self):
        return f'<Receipt {self.id} - User {self.user_id}>'
    

class User(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.String(50), primary_key=True)
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
    #The Test table has the complete records from the day trip form
    #If you want you can keep the old form, comment out the other table and delete the new fields
    # __tablename__ = "student_travel_registration_form_day"
    __tablename__ = "Test"

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
    
    #New fields
    parent_name = db.Column(db.String(100))
    parent_signature = db.Column(db.String(100))
    parent_signature_date = db.Column(db.Date)
    parent_contact_number = db.Column(db.String(15))
    paid_ticket_price = db.Column(db.Float)
    other_activity_costs = db.Column(db.Float)
    total_financial_obligation = db.Column(db.Float)
    emergency_contact_name = db.Column(db.String(100))
    relation_to_participant = db.Column(db.String(100))
    emergency_contact_phone = db.Column(db.String(15))
    emergency_contact_address = db.Column(db.String(200))
    agree_to_release = db.Column(db.Boolean, default=False)
    agree_to_conduct = db.Column(db.Boolean, default=False)
    transportation_waiver = db.Column(db.Boolean, default=False)
    agree_to_ferpa = db.Column(db.Boolean, default=False)
    financial_obligation = db.Column(db.Boolean, default=False)
    participant_certification = db.Column(db.Boolean, default=False)
    
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
    
class TravelAuthorizationRequestForm(db.Model):
    __tablename__ = "travel_authorization_request_form"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zip = db.Column(db.String(255))
    kean_id = db.Column(db.String(255))
    title = db.Column(db.String(255))
    location = db.Column(db.String(255))
    email = db.Column(db.String(255))
    ext = db.Column(db.String(255))
    departure_time = db.Column(db.DateTime)
    return_date = db.Column(db.DateTime)
    destination = db.Column(db.String(255))
    conference_name = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "kean_id": self.kean_id,
            "title": self.title,
            "location": self.location,
            "email": self.email,
            "ext": self.ext,
            "departure_time": str(self.departure_time),
            "return_date": str(self.return_date),
            "destination": self.destination,
            "conference_name": self.conference_name,
        }

    def __repr__(self):
        return f"<TravelAuthorizationRequestForm(id={self.id}, name='{self.name}', address='{self.address}', city='{self.city}', state='{self.state}', zip='{self.zip}', kean_id='{self.kean_id}', title='{self.title}', location='{self.location}', email='{self.email}', ext='{self.ext}', departure_time={self.departure_time}, return_date={self.return_date}, destination='{self.destination}', conference_name='{self.conference_name}')>"

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
    
    
class ApprovalLevel(db.Model):
    __tablename__ = "ApprovalLevels"

    LevelID = db.Column(db.Integer, primary_key=True)
    LevelName = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "LevelID": self.LevelID,
            "LevelName": self.LevelName,
        }

    def __repr__(self):
        return f"<ApprovalLevel {self.LevelName}>"
    

class ApprovalRoute(db.Model):
    __tablename__ = "ApprovalRoute"

    RouteID = db.Column(db.Integer, primary_key=True)
    FundingSource = db.Column(db.String(50), nullable=False)
    ApprovalOrder = db.Column(db.Integer, nullable=False)
    LevelID = db.Column(db.Integer, db.ForeignKey('ApprovalLevel.LevelID'), nullable=False)

    def to_dict(self):
        return {
            "RouteID": self.RouteID,
            "FundingSource": self.FundingSource,
            "ApprovalOrder": self.ApprovalOrder,
            "LevelID": self.LevelID,
        }

    def __repr__(self):
        return f"<ApprovalRoute {self.RouteID}>"


class ApprovalStatus(db.Model):
    __tablename__ = "ApprovalStatus"

    StatusID = db.Column(db.Integer, primary_key=True)
    StatusName = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "StatusID": self.StatusID,
            "statusName": self.StatusName,
        }

    def __repr__(self):
        return f"<ApprovalStatus {self.StatusName}>"


class Approver(db.Model):
    __tablename__ = "Approver"

    ApproverID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    LevelID = db.Column(db.Integer, db.ForeignKey('ApprovalLevel.LevelID'), nullable=False)

    def to_dict(self):
        return {
            "ApproverID": self.ApproverID,
            "UserID": self.UserID,
            "LevelID": self.LevelID,
        }

    def __repr__(self):
        return f"<Approver {self.ApproverID}>"

class Expenses(db.Model):
    __tablename__ = "Expenses"

    ItemID = db.Column(db.Integer, primary_key=True)
    FormID = db.Column(db.Integer, db.ForeignKey('TravelEthicsForm.FormID'), nullable=False)
    ExpenseDate = db.Column(db.Date, nullable=False)
    Description = db.Column(db.String(255), nullable=False)
    Amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "ItemID": self.ItemID,
            "FormID": self.FormID,
            "ExpenseDate": self.ExpenseDate.strftime("%Y-%m-%d")
            if isinstance(self.ExpenseDate, date)
            else self.ExpenseDate,
            "Description": self.Description,
            "Amount": self.Amount,
        }

    def __repr__(self):
        return f"<Expenses {self.description}>"


class TravelEthicsForm(db.Model):
    __tablename__ = "TravelEthicsForm"

    FormID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    SubmissionDate = db.Column(db.Date, nullable=False)
    FormType = db.Column(db.String(50), nullable=False)
    FundingSource = db.Column(db.String(50), nullable=False)
    Name = db.Column(db.String(255), nullable=False)
    Address = db.Column(db.Text, nullable=False)
    City = db.Column(db.String(100), nullable=False)
    State = db.Column(db.String(2), nullable=False)
    Zip = db.Column(db.String(10), nullable=False)
    KeanID = db.Column(db.String(20), nullable=False)
    Title = db.Column(db.String(255), nullable=False)
    Location = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), nullable=False)
    Extension = db.Column(db.String(10), nullable=False)
    DepartureDate = db.Column(db.Date, nullable=False)
    DepartureTime = db.Column(db.Time, nullable=False)
    ReturnDate = db.Column(db.Date, nullable=False)
    ReturnTime = db.Column(db.Time, nullable=False)
    DestinationCity = db.Column(db.String(100), nullable=False)
    DestinationState = db.Column(db.String(2), nullable=False)
    ConferenceName = db.Column(db.String(255), nullable=False)
    UniversityFunds = db.Column(db.Boolean, nullable=False)
    GrantFunds = db.Column(db.Boolean, nullable=False)
    PersonalFunds = db.Column(db.Boolean, nullable=False)
    OtherEmployeesTraveling = db.Column(db.Text, nullable=False)
    ReasonForTravel = db.Column(db.Text, nullable=False)
    GrantFundedProjectName = db.Column(db.String(255), nullable=False)
    SourceOfFunding = db.Column(db.String(255), nullable=False)
    BudgetedInGrantProposal = db.Column(db.Boolean, nullable=False)
    InitialGrantAmount = db.Column(db.Numeric(10, 2), nullable=False)
    HowCoveredIfNotBudgeted = db.Column(db.Text, nullable=False)
    Department = db.Column(db.String(255), nullable=False)
    Division = db.Column(db.String(255), nullable=False)
    Telephone = db.Column(db.String(20), nullable=False)
    Fax = db.Column(db.String(20), nullable=False)
    Event = db.Column(db.String(255), nullable=False)
    Sponsor = db.Column(db.String(255), nullable=False)
    SponsorInterestedParty = db.Column(db.Boolean, nullable=False)
    StateOfficialRole = db.Column(db.String(50), nullable=False)
    FederalGovernmentSponsor = db.Column(db.Boolean, nullable=False)
    NonprofitSponsor = db.Column(db.Boolean, nullable=False)
    NonprofitMember = db.Column(db.Boolean, nullable=False)
    NonprofitContracts = db.Column(db.Boolean, nullable=False)
    Dates = db.Column(db.String(255), nullable=False)
    OvernightAccommodationsRequired = db.Column(db.Boolean, nullable=False)
    OutOfStateTravelRequired = db.Column(db.Boolean, nullable=False)
    EstimatedTotalCosts = db.Column(db.Numeric(10, 2), nullable=False)
    TransportationCost = db.Column(db.Numeric(10, 2), nullable=False)
    MealsCost = db.Column(db.Numeric(10, 2), nullable=False)
    AccommodationsCost = db.Column(db.Numeric(10, 2), nullable=False)
    RegistrationFeesCost = db.Column(db.Numeric(10, 2), nullable=False)
    AgencyPaysCost = db.Column(db.Boolean, nullable=False)
    SponsorPaysCost = db.Column(db.Boolean, nullable=False)
    EmployeePaysCost = db.Column(db.Boolean, nullable=False)
    OtherPaysCost = db.Column(db.Boolean, nullable=False)
    OtherPayerName = db.Column(db.String(255), nullable=False)
    ReasonForAttendance = db.Column(db.Text, nullable=False)
    SponsorOffersHonorarium = db.Column(db.Boolean, nullable=False)
    StatusID = db.Column(db.Integer, db.ForeignKey('ApprovalStatus.StatusID'), nullable=False)

    def to_dict(self):
        return {
            "FormID": self.FormID,
            "UserID": self.UserID,
            "SubmissionDate": self.SubmissionDate.strftime("%Y-%m-%d")
            if isinstance(self.SubmissionDate, date)
            else self.SubmissionDate,
            "FormType": self.FormType,
            "FundingSource": self.FundingSource,
            "Name": self.Name,
            "Address": self.Address,
            "City": self.City,
            "State": self.State,
            "Zip": self.Zip,
            "KeanID": self.KeanID,
            "Title": self.Title,
            "Location": self.Location,
            "Email": self.Email,
            "Extension": self.Extension,
            "DepartureDate": self.DepartureDate.strftime("%Y-%m-%d")
            if isinstance(self.DepartureDate, date)
            else self.DepartureDate,
            "DepartureTime": self.DepartureTime.strftime("%H:%M:%S")
            if isinstance(self.DepartureTime, date.time)
            else self.DepartureTime,
            "ReturnDate": self.ReturnDate.strftime("%Y-%m-%d")
            if isinstance(self.ReturnDate, date)
            else self.ReturnDate,
            "ReturnTime": self.ReturnTime.strftime("%H:%M:%S")
            if isinstance(self.ReturnTime, date.time)
            else self.ReturnTime,
            "DestinationCity": self.DestinationCity,
            "DestinationState": self.DestinationState,
            "ConferenceName": self.ConferenceName,
            "UniversityFunds": self.UniversityFunds,
            "GrantFunds": self.GrantFunds,
            "PersonalFunds": self.PersonalFunds,
            "OtherEmployeesTraveling": self.OtherEmployeesTraveling,
            "ReasonForTravel": self.ReasonForTravel,
            "GrantFundedProjectName": self.GrantFundedProjectName,
            "SourceOfFunding": self.SourceOfFunding,
            "BudgetedInGrantProposal": self.BudgetedInGrantProposal,
            "InitialGrantAmount": float(self.InitialGrantAmount),
            "HowCoveredIfNotBudgeted": self.HowCoveredIfNotBudgeted,
            "Department": self.Department,
            "Division": self.Division,
            "Telephone": self.Telephone,
            "Fax": self.Fax,
            "Event": self.Event,
            "Sponsor": self.Sponsor,
            "SponsorInterestedParty": self.SponsorInterestedParty,
            "StateOfficialRole": self.StateOfficialRole,
            "FederalGovernmentSponsor": self.FederalGovernmentSponsor,
            "NonprofitSponsor": self.NonprofitSponsor,
            "NonprofitMember": self.NonprofitMember,
            "NonprofitContracts": self.NonprofitContracts,
            "Dates": self.Dates,
            "OvernightAccommodationsRequired": self.OvernightAccommodationsRequired,
            "OutOfStateTravelRequired": self.OutOfStateTravelRequired,
            "EstimatedTotalCosts": float(self.EstimatedTotalCosts),
            "TransportationCost": float(self.TransportationCost),
            "MealsCost": float(self.MealsCost),
            "AccommodationsCost": float(self.AccommodationsCost),
            "RegistrationFeesCost": float(self.RegistrationFeesCost),
            "AgencyPaysCost": self.AgencyPaysCost,
            "SponsorPaysCost": self.SponsorPaysCost,
            "EmployeePaysCost": self.EmployeePaysCost,
            "OtherPaysCost": self.OtherPaysCost,
            "OtherPayerName": self.OtherPayerName,
            "ReasonForAttendance": self.ReasonForAttendance,
            "SponsorOffersHonorarium": self.SponsorOffersHonorarium,
            "StatusID": self.StatusID,
        }

    def __repr__(self):
        return f"<TravelEthicsForm {self.FormID}>"




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
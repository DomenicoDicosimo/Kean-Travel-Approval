"""
This module contains the routes for the Flask server.
"""

from flask import Blueprint, jsonify, request

from . import db
from .models import StudentTravelRegistrationFormDay, User, TravelAuthorizationRequestForm,TravelEthicsForm

main = Blueprint("main", __name__)


@main.route("/users")
def get_all_users():
    """
    Returns a JSON representation of all users in the database.
    """

    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


@main.route("/add_user", methods=["POST"])
def add_user():
    data = request.json
    user = User(
        id=data["id"],
        fName=data["firstName"],
        lName=data["lastName"],
        DOB=data["DOB"],
        sex=data["sex"],
        email=data["email"],
        password=data["password"],
        street=data["street"],
        city=data["city"],
        state=data["state"],
        zip=data["zip"],
        role=data["role"],
    )

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists!"}), 200

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 200


@main.route("/student-travel-registration-form-day")
def get_all_student_forms():
    """
    Returns a JSON representation of all student-day forms in the database.
    """

    forms = StudentTravelRegistrationFormDay().query.all()
    return jsonify([f.to_dict() for f in forms])


@main.route("/submit-student-travel-registration-form-day", methods=["POST"])
def submit_student_travel_registration_form_day():
    data = request.json
    student_registration_day = StudentTravelRegistrationFormDay(
        event_name=data.get("event_name"),
        host_organization=data.get("host_organization"),
        departure_time=data.get("departure_time"),
        approximate_return_time=data.get("approximate_return_time"),
        minimum_age_requirement=data.get("minimum_age_requirement"),
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        kuid=data.get("kuid"),
        email=data.get("email"),
        phone_number=data.get("phone_number"),
        date_of_birth=data.get("date_of_birth"),
        current_address=data.get("current_address"),
        city=data.get("city"),
        state=data.get("state"),
        zip=data.get("zip"),
    )

    if StudentTravelRegistrationFormDay.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already submitted form. Wait for approval."}), 200

    db.session.add(student_registration_day)
    db.session.commit()

    return jsonify({"message": "Form submitted successfully"}), 200


@main.route("/submit-travel-authorization-request-form", methods=["POST"])
def submit_student_travel_registration_form_day():
    data = request.json
    travel_authorization_request_form = TravelAuthorizationRequestForm(
        name=data.get("name"),
        address=data.get("address"),
        city=data.get("city"),
        state=data.get("state"),
        zip=data.get("zip"),
        kean_id=data.get("kean_id"),
        title=data.get("title"),
        location=data.get("location"),
        email=data.get("email"),
        ext=data.get("ext"),
        departure_time=data.get("departure_time"),
        return_date=data.get("return_date"),
        destination=data.get("destination"),
        conference_name=data.get("conference_name"),
    )

    if TravelAuthorizationRequestForm.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already submitted form. Wait for approval."}), 200

    db.session.add(travel_authorization_request_form)
    db.session.commit()

    return jsonify({"message": "Form submitted successfully"}), 200


@main.route("/travel_ethics_form")
def get_all_travel_ethics_forms():
    """
    Returns a JSON representation of all student-day forms in the database.
    """

    forms = TravelEthicsForm().query.all()
    return jsonify([f.to_dict() for f in forms])

@main.route('/submit_travel_ethics_form', methods=['POST'])
def submit_travel_ethics_form():
    
    data = request.json  

    # Validate user existence 
    user_id = data.get('UserID')
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

   
    Travel_Ethics_Form = TravelEthicsForm(
        UserID=user_id,
        SubmissionDate=data['SubmissionDate'],
        FormType=data['FormType'],
        FundingSource=data['FundingSource'],
        Name=data['Name'],
        Address=data['Address'],
        City=data['City'],
        State=data['State'],
        Zip=data['Zip'],
        KeanID=data['KeanID'],
        Title=data['Title'],
        Location=data['Location'],
        Email=data['Email'],
        Extension=data['Extension'],
        DepartureDate=data['DepartureDate'],
        DepartureTime=data['DepartureTime'],
        ReturnDate=data['ReturnDate'],
        ReturnTime=data['ReturnTime'],
        DestinationCity=data['DestinationCity'],
        DestinationState=data['DestinationState'],
        ConferenceName=data['ConferenceName'],
        UniversityFunds=data['UniversityFunds'],
        GrantFunds=data['GrantFunds'],
        PersonalFunds=data['PersonalFunds'],
        OtherEmployeesTraveling=data['OtherEmployeesTraveling'],
        ReasonForTravel=data['ReasonForTravel'],
        GrantFundedProjectName=data['GrantFundedProjectName'],
        SourceOfFunding=data['SourceOfFunding'],
        BudgetedInGrantProposal=data['BudgetedInGrantProposal'],
        InitialGrantAmount=data['InitialGrantAmount'],
        HowCoveredIfNotBudgeted=data['HowCoveredIfNotBudgeted'],
        Department=data['Department'],
        Division=data['Division'],
        Telephone=data['Telephone'],
        Fax=data['Fax'],
        Event=data['Event'],
        Sponsor=data['Sponsor'],
        SponsorInterestedParty=data['SponsorInterestedParty'],
        StateOfficialRole=data['StateOfficialRole'],
        FederalGovernmentSponsor=data['FederalGovernmentSponsor'],
        NonprofitSponsor=data['NonprofitSponsor'],
        NonprofitMember=data['NonprofitMember'],
        NonprofitContracts=data['NonprofitContracts'],
        Dates=data['Dates'],
        OvernightAccommodationsRequired=data['OvernightAccommodationsRequired'],
        OutOfStateTravelRequired=data['OutOfStateTravelRequired'],
        EstimatedTotalCosts=data['EstimatedTotalCosts'],
        TransportationCost=data['TransportationCost'],
        MealsCost=data['MealsCost'],
        AccommodationsCost=data['AccommodationsCost'],
        RegistrationFeesCost=data['RegistrationFeesCost'],
        AgencyPaysCost=data['AgencyPaysCost'],
        SponsorPaysCost=data['SponsorPaysCost'],
        EmployeePaysCost=data['EmployeePaysCost'],
        OtherPaysCost=data['OtherPaysCost'],
        OtherPayerName=data['OtherPayerName'],
        ReasonForAttendance=data['ReasonForAttendance'],
        SponsorOffersHonorarium=data['SponsorOffersHonorarium'],
        StatusID=data['StatusID'],
    )

    db.session.add(Travel_Ethics_Form)
    db.session.commit()

    return jsonify({'message': 'Form submitted successfully'})



# Test Route
@main.route("/")
def test():
    return jsonify(message="Hello from Flask")

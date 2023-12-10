"""
This module contains the routes for the Flask server.
"""

import os
import smtplib
from datetime import date, datetime

# from email import message
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError

# New imports for uploading receipts
# ******************************************
from werkzeug.utils import secure_filename

from . import db
from .models import (
    ApprovalRoute,
    Approver,
    Expenses,
    FormApproval,
    StudentTravelRegistrationFormDay,
    TravelAuthorizationRequestForm,
    TravelEthicsForm,
    User,
)

main = Blueprint("main", __name__)

# ***************IGNORE THIS PART FOR THE MOMENT - UPLOAD RECEIPT FUNCTIONALITY ***********#

UPLOAD_FOLDER = "/uploaded_receipts"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@main.route("/upload_receipt", methods=["POST"])
def upload_receipt():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        # Assuming the user ID is provided as part of the request
        user_id = request.form.get("user_id")

        new_receipt = Receipt(
            user_id=user_id, file_path=file_path, upload_date=datetime.utcnow()
        )
        db.session.add(new_receipt)
        db.session.commit()

        return (
            jsonify({"message": "File uploaded successfully", "file_path": file_path}),
            200,
        )

    return jsonify({"error": "Invalid file type"}), 400


@main.route("/get_receipts", methods=["GET"])
def get_receipts():
    try:
        receipts = Receipt.query.all()
        receipts_data = []
        for receipt in receipts:
            receipt_dict = {
                "id": receipt.id,
                "user_id": receipt.user_id,
                "file_path": receipt.file_path,
                "upload_date": receipt.upload_date.strftime("%Y-%m-%d %H:%M:%S")
                if receipt.upload_date
                else None,
            }
            receipts_data.append(receipt_dict)

        # Return data as JSON
        return jsonify({"receipts": "receipts_data"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# **************************************************************************************************************

email_sequence = {
    "current_step": 0,
    "steps": [
        "gordonza@kean.edu",
        "sergabri@kean.edu",
        "ibarrjou@kean.edu",
        "dicosimd@kean.edu",
    ],
}


# USERS
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
        id=data.get("id"),
        fName=data.get("firstName"),
        lName=data.get("lastName"),
        DOB=data.get("DOB"),
        sex=data.get("sex"),
        email=data.get("email"),
        password=data.get("password"),
        street=data.get("street"),
        city=data.get("city"),
        state=data.get("state"),
        zip=data.get("zip"),
        role=data.get("role"),
    )

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists!"}), 200

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 200


# Route to add user from clerk if not in Users table
@main.route("/check-user-exists", methods=["GET"])
def check_user_exists():
    user_id = request.args.get("id")
    user = User.query.filter_by(id=user_id).first()

    return jsonify(userExists=user is not None)


# FORMS
@main.route("/get-user-submitted-forms", methods=["GET"])
def get_user_submitted_forms():
    """
    Returns a JSON representation of all forms for the associated user in the database
    """
    target_email = request.args.get("email")
    forms = (
        db.session.query(StudentTravelRegistrationFormDay, User.role)
        .join(User, StudentTravelRegistrationFormDay.email == User.email)
        .filter(StudentTravelRegistrationFormDay.email == target_email)
        .all()
    )
    return jsonify([{"form": form.to_dict(), "role": role} for form, role in forms])


@main.route("/get-user-submitted-forms/<int:form_id>", methods=["GET"])
def get_user_submitted_form(form_id):
    """
    Example call: http://127.0.0.1:5000/get-user-submitted-forms/form_id?email=user@example.com
    """
    target_email = request.args.get("email")
    form = (
        db.session.query(StudentTravelRegistrationFormDay, User.role)
        .join(User, StudentTravelRegistrationFormDay.email == User.email)
        .filter(StudentTravelRegistrationFormDay.email == target_email)
        .filter(StudentTravelRegistrationFormDay.id == form_id)
        .first()
    )
    if form is None:
        return jsonify({"error": "Form not found"}), 404
    else:
        return jsonify({"form": form[0].to_dict(), "role": form[1]})


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
        event_date=data.get("event_date"),
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
        # new fields -- ignore the data below if using old form
        parent_name=data.get("parent_name"),
        parent_signature=data.get("parent_signature"),
        parent_signature_date=data.get("parent_signature_date"),
        parent_contact_number=data.get("parent_contact_number"),
        paid_ticket_price=data.get("paidTicketPrice"),
        other_activity_costs=data.get("otherActivityCosts"),
        total_financial_obligation=data.get("totalFinancialObligation"),
        emergency_contact_name=data.get("emergencyContactName"),
        relation_to_participant=data.get("relationToParticipant"),
        emergency_contact_phone=data.get("emergencyContactPhone"),
        emergency_contact_address=data.get("emergencyContactAddress"),
        agree_to_release=data.get("agreeToRelease"),
        agree_to_conduct=data.get("agreeToConduct"),
        transportation_waiver=data.get("transportationWaiver"),
        agree_to_ferpa=data.get("agreeToFerpa"),
        financial_obligation=data.get("financialObligation"),
        participant_certification=data.get("participantCertification"),
    )
    """ date_assigned=date.today(), """

    if StudentTravelRegistrationFormDay.query.filter_by(email=data["email"]).first():
        return (
            jsonify({"message": "User already submitted form. Wait for approval."}),
            200,
        )

    db.session.add(student_registration_day)
    db.session.commit()

    #! working on emails
    # TODO Replace hardcoded email with variable

    current_step = email_sequence["current_step"]
    sender_email = "gordonza@kean.edu"
    try:
        receiver_email = email_sequence["steps"][current_step]
    except IndexError:
        return (
            jsonify(
                {
                    "message": "Form submitted but email not sent. No more people in sequence."
                }
            ),
            200,
        )
    password = os.environ.get("EMAIL_PASSWORD")

    # Create a MIMEMultipart message
    message = MIMEMultipart("alternative")
    message["Subject"] = "email test"
    # message["From"] = sender_email
    message["From"] = "TravelTeam"
    message["To"] = receiver_email

    text = f"""\
    Hi {receiver_email.split('@', maxsplit=1)[0]},
    This is a test email sent from the Flask server.
    """

    if current_step + 1 < len(email_sequence["steps"]):
        next_step = email_sequence["steps"][current_step + 1]
    else:
        next_step = "Nobody"

    html = f"""\
    <html>
        <body>
            <p>Hi {receiver_email.split('@', maxsplit=1)[0]},<br>
             This is a test email sent from the Flask server.<br>
             You are person number {current_step + 1} in the email sequence.
             Next it will be sent to {next_step}.
            </p>
        </body>
    </html>
    """

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    message.attach(part1)
    message.attach(part2)

    # Send email
    # Send email
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())

    # Move to the next step
    email_sequence["current_step"] += 1

    return (
        jsonify({"message": "Form submitted and email sent to the next person."}),
        200,
    )


@main.route("/submit-travel-authorization-request-form", methods=["POST"])
def submit_student_travel_authorization_request_form():
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
        return (
            jsonify({"message": "User already submitted form. Wait for approval."}),
            200,
        )

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


@main.route("/submit_travel_ethics_form", methods=["POST"])
def submit_travel_ethics_form():
    data = request.json

    # Validate user existence
    user_id = data.get("UserID")
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    Travel_Ethics_Form = TravelEthicsForm(
        UserID=user_id,
        SubmissionDate=data.get("SubmissionDate"),
        FormType=data.get("FormType"),
        FundingSource=data.get("FundingSource"),
        Name=data.get("Name"),
        Address=data.get("Address"),
        City=data.get("City"),
        State=data.get("State"),
        Zip=data.get("Zip"),
        KeanID=data.get("KeanID"),
        Title=data.get("Title"),
        Location=data.get("Location"),
        Email=data.get("Email"),
        Extension=data.get("Extension"),
        DepartureDate=data.get("DepartureDate"),
        DepartureTime=data.get("DepartureTime"),
        ReturnDate=data.get("ReturnDate"),
        ReturnTime=data.get("ReturnTime"),
        DestinationCity=data.get("DestinationCity"),
        DestinationState=data.get("DestinationState"),
        ConferenceName=data.get("ConferenceName"),
        UniversityFunds=data.get("UniversityFunds"),
        GrantFunds=data.get("GrantFunds"),
        PersonalFunds=data.get("PersonalFunds"),
        OtherEmployeesTraveling=data.get("OtherEmployeesTraveling"),
        ReasonForTravel=data.get("ReasonForTravel"),
        GrantFundedProjectName=data.get("GrantFundedProjectName"),
        SourceOfFunding=data.get("SourceOfFunding"),
        BudgetedInGrantProposal=data.get("BudgetedInGrantProposal"),
        InitialGrantAmount=data.get("InitialGrantAmount"),
        HowCoveredIfNotBudgeted=data.get("HowCoveredIfNotBudgeted"),
        Department=data.get("Department"),
        Division=data.get("Division"),
        Telephone=data.get("Telephone"),
        Fax=data.get("Fax"),
        Event=data.get("Event"),
        Sponsor=data.get("Sponsor"),
        SponsorInterestedParty=data.get("SponsorInterestedParty"),
        StateOfficialRole=data.get("StateOfficialRole"),
        FederalGovernmentSponsor=data.get("FederalGovernmentSponsor"),
        NonprofitSponsor=data.get("NonprofitSponsor"),
        NonprofitMember=data.get("NonprofitMember"),
        NonprofitContracts=data.get("NonprofitContracts"),
        Dates=data.get("Dates"),
        OvernightAccommodationsRequired=data.get("OvernightAccommodationsRequired"),
        OutOfStateTravelRequired=data.get("OutOfStateTravelRequired"),
        EstimatedTotalCosts=data.get("EstimatedTotalCosts"),
        TransportationCost=data.get("TransportationCost"),
        MealsCost=data.get("MealsCost"),
        AccommodationsCost=data.get("AccommodationsCost"),
        RegistrationFeesCost=data.get("RegistrationFeesCost"),
        AgencyPaysCost=data.get("AgencyPaysCost"),
        SponsorPaysCost=data.get("SponsorPaysCost"),
        EmployeePaysCost=data.get("EmployeePaysCost"),
        OtherPaysCost=data.get("OtherPaysCost"),
        OtherPayerName=data.get("OtherPayerName"),
        ReasonForAttendance=data.get("ReasonForAttendance"),
        SponsorOffersHonorarium=data.get("SponsorOffersHonorarium"),
        StatusID=data.get("StatusID"),
    )

    db.session.add(Travel_Ethics_Form)
    db.session.commit()

    return jsonify(
        {"message": "Form submitted successfully", "FormID": TravelEthicsForm.FormID}
    )


@main.route("/submit_expenses", methods=["POST"])
def submit_expenses():
    data = request.json

    # Validate FormID
    form_id = data.get("FormID")
    if not form_id:
        return jsonify({"error": "FormID is required"}), 400
    form = TravelEthicsForm.query.get(form_id)
    if not form:
        return (
            jsonify({"error": "TravelEthicsForm with the given FormID does not exist"}),
            404,
        )

    # Validate and extract other fields
    try:
        expense_date = datetime.strptime(data.get("ExpenseDate"), "%Y-%m-%d")
        description = data.get("Description")
        amount = float(data.get("Amount"))

        if not description:
            return jsonify({"error": "Description is required"}), 400
        if amount <= 0:
            return jsonify({"error": "Amount must be greater than 0"}), 400
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid data format"}), 400

    # Create and save the expense
    try:
        new_expense = Expenses(
            FormID=form_id,
            ExpenseDate=expense_date,
            Description=description,
            Amount=amount,
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify(
            {"message": "Expense submitted successfully", "ItemID": new_expense.ItemID}
        )
    except SQLAlchemyError as e:
        # Log the exception here
        return jsonify({"error": "Database error"}), 500


@main.route("/submit-approval", methods=["POST"])
def submit_approval():
    # Extract form ID and approver ID from request
    data = request.json
    id = data["id"]
    approver_id = data["approver_id"]

    # Retrieve the form and approver from the database
    form = StudentTravelRegistrationFormDay.query.get(id)
    approver = Approver.query.get(approver_id)

    # Check if the approver is authorized for the current level
    if approver.LevelID != form.CurrentApprovalLevelID:
        return jsonify({"message": "Approver not authorized for this level"}), 403

    # Find the next level in the route
    next_level = ApprovalRoute.query.filter_by(
        RouteID=form.CurrentRouteID, ApprovalOrder=form.CurrentApprovalLevelID + 1
    ).first()

    # If there's a next level, update the form
    if next_level:
        form.CurrentApprovalLevelID = next_level.LevelID
    else:
        # If there's no next level, it means the approval process is complete
        form.CurrentApprovalLevelID = None

    db.session.commit()

    return jsonify({"message": "Approval submitted successfully"}), 200


@main.route("/forms-for-approval", methods=["GET"])
def get_forms_for_approval():
    user_id = request.args.get("user_id")

    # Check if the user is an approver and retrieve their level
    approver = Approver.query.filter_by(UserID=user_id).first()
    if not approver:
        return jsonify({"message": "User is not an approver or does not exist"}), 404

    approval_level_id = approver.LevelID

    # Fetch student travel forms at the approver's level
    student_travel_forms = StudentTravelRegistrationFormDay.query.filter_by(
        CurrentApprovalLevelID=approval_level_id
    ).all()

    student_travel_forms_data = [form.to_dict() for form in student_travel_forms]

    return jsonify({"student_travel_forms": student_travel_forms_data}), 200


# Test Route
@main.route("/")
def test():
    return jsonify(message="Hello from Flask")

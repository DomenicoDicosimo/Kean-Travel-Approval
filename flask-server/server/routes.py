"""
This module contains the routes for the Flask server.
"""

import os
import smtplib
from datetime import date

# from email import message
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import Blueprint, jsonify, request

from . import db
from .models import StudentTravelRegistrationFormDay, User

main = Blueprint("main", __name__)


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


# FORMS
@main.route("/get-user-submitted-forms", methods=["GET"])
def get_user_submitted_forms():
    """
    Returns a JSON representation of all forms for the associated user in the database
    """
    target_email = request.args.get("email")
    forms = StudentTravelRegistrationFormDay.query.filter_by(email=target_email).all()
    return jsonify([f.to_dict() for f in forms])


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
        date_assigned=date.today(),
    )

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


# Test Route
@main.route("/")
def test():
    return jsonify(message="Hello from Flask")

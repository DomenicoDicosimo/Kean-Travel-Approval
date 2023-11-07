"""
This module contains the routes for the Flask server.
"""

from flask import Blueprint, jsonify, request

from . import db
from .models import User

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


# Test Route
@main.route("/")
def test():
    return jsonify(message="Hello from Flask")

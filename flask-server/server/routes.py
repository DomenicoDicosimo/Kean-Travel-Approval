from flask import Blueprint, jsonify

from .models import User

main = Blueprint("main", __name__)


@main.route("/users")
def get_all_users():
    """
    Returns a JSON representation of all users in the database.
    """

    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


# Test Route
@main.route("/")
def test():
    """
    Returns a JSON message "Hello from Flask".
    """

    return jsonify(message="Hello from Flask")

from config import Config
from flask import Flask
from flask_cors import CORS

from .models import db
from .routes import main


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)
    db.init_app(app)
    app.register_blueprint(main)

    # with app.app_context():
    #     db.create_all()  # Create tables if they don't exist

    return app
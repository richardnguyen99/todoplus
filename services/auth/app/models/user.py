import datetime

from flask_sqlalchemy import SQLAlchemy

from app.utils.extensions import db


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)

    is_active = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)

    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False
    )
    modified_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False
    )

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        self.is_active = is_active
        self.is_admin = is_admin

    def __str__(self):
        return f"<User {self.username}>"

    def __repr__(self):
        return f"<User {self.username}>"

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
        }

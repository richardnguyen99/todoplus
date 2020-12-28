import datetime as dt

from .extensions import db, bcrypt


def get_user_by_username(username, db_model):
    return db_model.query.filter(db_model.username == username).first()


def check_password(password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, password)


def hash_password(password):
    return bcrypt.generate_password_hash(password, rounds=12).decode("utf-8")


def save_user(user):
    db.session.add(user)
    db.session.commit()


def update_user(user, data):
    for k, v in data.items():
        if k == "password":
            v = hash_password(v)
        setattr(user, k, v)

    setattr(user, "modified_at", dt.datetime.utcnow())
    db.session.commit()


def update_user_login(user):
    setattr(user, "last_login", dt.datetime.utcnow())
    db.session.commit()

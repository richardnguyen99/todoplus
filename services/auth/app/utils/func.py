from .extensions import db, bcrypt


def get_user_by_username(username, db_model):
    return db_model.query.filter(db_model.username == username).first()


def hash_password(password):
    return bcrypt.generate_password_hash(password, rounds=12).decode("utf-8")


def save_user(user):
    db.session.add(user)
    db.session.commit()


def check_password(password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, password)

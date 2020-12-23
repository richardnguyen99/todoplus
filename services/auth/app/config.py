import os

basedir = os.path.abspath(os.path.dirname(__file__))


class DevConfig(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

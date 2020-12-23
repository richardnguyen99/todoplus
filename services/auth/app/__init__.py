import os

from flask import Flask

from .utils.extensions import db, bcrypt


def create_app(config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(os.environ.get("APP_CONFIG"))

    db.init_app(app)
    bcrypt.init_app(app)

    from .blueprint import auth_bp

    app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")

    @app.route("/")
    def index():
        return "Hello, World!"

    return app

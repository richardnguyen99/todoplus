from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

from .ping import PingAPI

ping_view = PingAPI.as_view("ping_view")
auth_bp.add_url_rule("/ping", view_func=ping_view, methods=["GET"])

from .login import LoginAPI

login_view = LoginAPI.as_view("login_view")
auth_bp.add_url_rule("/login", view_func=login_view, methods=["GET", "POST"])

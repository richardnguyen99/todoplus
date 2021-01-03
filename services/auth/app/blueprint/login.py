from http import HTTPStatus
from flask import request, make_response, jsonify
from flask.views import MethodView

from app.schema import user_schema
from app.models.user import User
from app.utils.func import check_password, get_user_by_username, update_user_login


class LoginAPI(MethodView):
    def get(self):
        req = request.get_json()
        res = {}

        res = {"msg": "Login", "status": "success", "data": req}

        return make_response(jsonify(res)), 200

    def post(self):
        req = request.get_json()
        res = {}

        try:
            data = user_schema.load(req)

            username = data.get("username")
            password = data.get("password")

            user = get_user_by_username(username, User)

            if not user or not check_password(password, user.password):
                res = {
                    "msg": "Username or password is incorrect. Please try again",
                    "status": "failed",
                }

                return make_response(jsonify(res)), HTTPStatus.BAD_REQUEST

            if not user.is_active:
                res = {
                    "msg": "User needs to be activated for further access",
                    "status": "failed",
                }

                return make_response(jsonify(res)), HTTPStatus.FORBIDDEN

            update_user_login(user)
            res = {"msg": "Logged in success", "status": "success", "data": f"{req}"}

            return make_response(jsonify(res)), HTTPStatus.ACCEPTED

        except Exception as e:
            res = {"msg": f"Internal errors: {e}", "status": "failed", "data": req}

            return make_response(jsonify(res)), HTTPStatus.INTERNAL_SERVER_ERROR

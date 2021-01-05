from http import HTTPStatus
from flask.views import MethodView
from flask import make_response, jsonify, request

from app.schema import user_schema
from app.models.user import User
from app.utils.func import get_user_by_username, save_user


class RegisterAPI(MethodView):
    def post(self):
        req = request.get_json()
        res = {}
        data, err = {}, ""

        try:
            data = user_schema.load(req)
            print(data)

            if err:
                res = {"msg": req, "status": "failed"}

                return make_response(jsonify(res)), HTTPStatus.BAD_REQUEST

            username = data.get("username")
            password = data.get("password")
            email = data.get("email")

            user = get_user_by_username(username, User)

            if not user:
                new_user = User(username, password, email)

                save_user(new_user)

                res = {"msg": "registered success", "status": "success"}

                return make_response(jsonify(res)), HTTPStatus.CREATED

            else:
                res = {"msg": "User has existed already", "status": "failed"}

                return make_response(jsonify(res)), HTTPStatus.CONFLICT
        except Exception as e:
            res = {"msg": f"Internal errors: {e}", "status": "failed", "data": req}

            return make_response(jsonify(res)), HTTPStatus.INTERNAL_SERVER_ERROR

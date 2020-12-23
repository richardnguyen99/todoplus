from flask import request, make_response, jsonify
from flask.views import MethodView


class LoginAPI(MethodView):
    def get(self):
        req = request.get_json()
        res = {}

        res = {"msg": "Login", "status": "success", "data": req}

        return make_response(jsonify(res)), 200

    def post(self):
        req = request.get_json()
        res = {}

        res = {"msg": "Login", "status": "success", "data": req}

        return make_response(jsonify(res)), 200

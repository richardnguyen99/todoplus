from http import HTTPStatus

from flask.views import MethodView
from flask import jsonify, make_response


class PingAPI(MethodView):
    def get(self):
        res = {
            "msg": "OK",
            "status": "success",
        }

        return make_response(jsonify(res)), HTTPStatus.OK

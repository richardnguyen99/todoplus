from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(
        required=True,
        validate=[
            validate.Length(
                min=8, error="Username should contains 8 characters at least"
            )
        ],
    )
    password = fields.Str(
        required=True,
        load_only=True,
        validate=[
            validate.Length(
                min=8, error="Username should contains 8 characters at least"
            )
        ],
    )
    email = fields.Email(require=True)

    is_admin = fields.Bool()
    is_active = fields.Bool()

    created_at = fields.DateTime()
    modified_at = fields.DateTime()

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, Optional
from app.api.aws_utils import ALLOWED_EXTENSIONS

class PinForm(FlaskForm):
    image = FileField(
        "Image File",
        validators=[
            FileRequired(),
            FileAllowed(list(ALLOWED_EXTENSIONS))
        ]
    )
    title = StringField(
        "Title",
        validators=[DataRequired()]
    )
    description = TextAreaField(
        "Description",
        validators=[DataRequired()]
    )
    link = StringField(
        "Link",
        validators=[Optional(), URL()]
    )
    submit = SubmitField("Create Pin")

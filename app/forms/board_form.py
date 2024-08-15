from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Optional

class BoardForm(FlaskForm):
    name = StringField('Board', validators=[DataRequired(), Length(min=1, max=255)])
    private = BooleanField('Private')
    description = TextAreaField("Description", validators=[Optional()])
    submit = SubmitField("Create Board")

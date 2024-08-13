from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    name = StringField('Board', validators=[DataRequired(), Length(min=1, max=255)])
    private = BooleanField('Private')

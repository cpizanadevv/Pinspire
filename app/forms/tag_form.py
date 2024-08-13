from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class TagForm(FlaskForm):
    Tag = StringField('Tag', validators=[DataRequired(), Length(min=1, max=250)])
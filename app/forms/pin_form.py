from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, URL

class PinForm(FlaskForm):

    img_url = StringField('URL', validators=[URL()])
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description')
    link = StringField('Link', validators=[URL()])
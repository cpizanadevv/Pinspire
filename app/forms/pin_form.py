from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
# from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, Optional
# from app.api.aws_utils import ALLOWED_EXTENSIONS

class PinForm(FlaskForm):
    # image = FileField(
    #     "Image File",
    #     validators=[
    #         FileRequired(),
    #         FileAllowed(list(ALLOWED_EXTENSIONS))
    #     ]
    # )
    image = StringField(
        "Image URL",
        validators=[DataRequired(), URL(message="Invalid URL.")]
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
    
   
  
    # from wtforms import StringField, TextAreaField
# from wtforms.validators import DataRequired, URL

# class PinForm(FlaskForm):

#     img_url = StringField('URL', validators=[URL()])
#     title = StringField('Title', validators=[DataRequired()])
#     description = TextAreaField('Description')
#     link = StringField('Link', validators=[URL()])

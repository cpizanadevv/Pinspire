from app.models import db, Comment
from flask import jsonify, request, Blueprint

comment_routes = Blueprint('comments', __name__)

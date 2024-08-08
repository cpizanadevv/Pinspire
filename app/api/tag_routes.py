from app.models import db, Tag
from flask import jsonify, request, Blueprint

tag_routes = Blueprint('tags', __name__)

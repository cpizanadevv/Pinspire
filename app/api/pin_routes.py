from app.models import db, Pin
from flask import jsonify, request, Blueprint

pin_routes = Blueprint('pins', __name__)

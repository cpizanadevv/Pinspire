from app.models import db, Pin
from flask import jsonify, request, Blueprint

pin_routes = Blueprint('pins', __name__)

@pin_routes.route('/pins')
def get_all_pins():
    """
    Query for all users and returns them in a list of pin dictionaries
    """
    pins = Pin.query.all()
    return {'pins': [pins.to_dict() for pin in pins]}


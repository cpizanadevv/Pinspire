from app.models import db, Board
from flask import jsonify, request, Blueprint

board_routes = Blueprint('boards', __name__)

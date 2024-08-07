from flask import Flask, jsonify
from .config import Configuration
from .models import db, Board, User, Pin, Tag, Comment
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)


@app.route("/")
def index():
    return "<h1>Python Flask Assessment</h1>"

@app.route("/api/boards", methods=["GET"])
def get_board():
    boards = Board.query.all()  # Fetch all boards
    board_list = [board.to_dict() for board in boards]  # Convert each board to a dictionary
    return jsonify({ "Boards": board_list})  # Return as JSON response

@app.route("/api/pins", methods=["GET"])
def get_pin():
    pins = Pin.query.all()
    pin_list = [pin.to_dict() for pin in pins]
    return jsonify({ "Pins": pin_list})

@app.route("/api/boards/<int:board_id>/pins", methods=["GET"])
def get_pins_by_board_id(board_id):
    board = Board.query.get(board_id)
    if not board:
        return jsonify({"error": "Pin not found"})

    pins_list = [pin.to_dict() for pin in board.pins]
    return jsonify(pins_list)

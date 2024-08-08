from ..models import db, Board, User, Pin, Tag, Comment
from flask import jsonify, request, Blueprint

boards_bp = Blueprint('boards', __name__)

@boards_bp.route("/api/boards", methods=["GET"])
def get_board():
    boards = Board.query.all()  # Fetch all boards
    board_list = [board.to_dict() for board in boards]  # Convert each board to a dictionary
    return jsonify({ "Boards": board_list})  # Return as JSON response

@boards_bp.route("/api/boards/<int:board_id>/pins", methods=["GET"])
def get_pins_by_id(board_id):
    board = Board.query.get(board_id)
    if not board:
        return jsonify({"error": "Pin not found"})

    pins_list = [pin.to_dict() for pin in board.pins]
    return jsonify(pins_list)

@boards_bp.route("/api/boards", methods=["POST"])
def post_board():
    data = request.get_json()
    user_id = data.get("user_id")
    img_url = data.get("img_url")
    title = data.get("title")
    description = data.get("description")
    link = data.get("link")

    if not all([user_id, img_url, title, description, link]):
        return jsonify({"error": "Missing data"}), 400

    new_pin = Pin(
        user_id=user_id,
        img_url=img_url,
        title=title,
        description=description,
        link=link)

    db.session.add(new_pin)
    db.session.commit()

    return jsonify(new_pin.to_dict())

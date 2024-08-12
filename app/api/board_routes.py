from app.models import db, Board
from flask import jsonify, request, Blueprint, abort
from flask_login import login_required, current_user

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=["GET"])
def get_all_boards():
    boards = Board.query.all()

    if not boards:
        return jsonify({"message": "no boards found"})

    boards_list = [board.to_dict() for board in boards]

    return jsonify(boards_list)

@board_routes.route('/<int:board_id>', methods=['GET'])
def get_boards_by_id(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({"error": "no board found"})

    return jsonify(board.to_dict())

@board_routes.route('/', methods=['POST'])
@login_required
def post_board():
    data = request.get_json()
    name = data.get('name')
    private = data.get('private')
    user_id = current_user.id

    errors = {}

    if not name:
        errors['name'] = "Name cannot be empty"
    if not isinstance(private, bool):
        errors['private'] = "Private needs to be a boolean"

    if errors:
        return jsonify({"errors": errors}), 400


    new_board = Board(name=name, user_id=user_id, private=private)

    db.session.add(new_board)
    db.session.commit()

    return jsonify(new_board.to_dict()), 201

@board_routes.route('/<int:board_id>', methods=['PUT'])
@login_required
def edit_board_by_id(board_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    private = data.get('private')

    board_to_edit = Board.query.get(board_id)
    board_to_edit.name = name
    board_to_edit.description = description
    board_to_edit.private = private

    user = current_user


    db.session.commit()

    return jsonify({
        "message": "successfully",
        "board": board_to_edit.to_dict()
        })



@board_routes.route('/<int:board_id>', methods=['DELETE'])
@login_required
def delete_board_by_id(board_id):
    board_to_delete = Board.query.get(board_id)

    if not board_to_delete:
        return jsonify({"error": "board does not exist"}), 404

    db.session.delete(board_to_delete)
    db.session.commit()

    return jsonify({"message": f'Successfully deleted board {board_id}'})

@board_routes.route('/<int:board_id>/pins', methods=['GET'])
def get_pins_by_board_id(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({"error": "no board found"})

    pins = [pin.to_dict() for pin in board.pins]

    if not pins:
        return jsonify({"error": "no pins found for that board"})

    return jsonify({"Pins": pins})

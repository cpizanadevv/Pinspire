from app.models import db, Board
from flask import jsonify, request, Blueprint

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=["GET"])
def get_all_boards():
    boards = Board.query.all()

    boards_list = [board.to_dict() for board in boards]

    return jsonify(boards_list)

@board_routes.route('/', methods=['POST'])
def post_board():
    data = request.get_json()
    name = data.get('name')
    user_id = data.get('user_id')
    private = data.get('private')

    new_board = Board(name=name, user_id=user_id, private=private)

    db.session.add(new_board)
    db.session.commit()

    return jsonify(new_board.to_dict())

@board_routes.route('/<int:board_id>', methods=['DELETE'])
def delete_board_by_id(board_id):
    board_to_delete = Board.query.get(board_id)

    db.session.delete(board_to_delete)
    db.session.commit()

    return jsonify({"message": f'Successfully deleted board {board_id}'})

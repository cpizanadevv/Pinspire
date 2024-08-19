from app.models import db, Board, Pin, board_pins
from flask import jsonify, request, Blueprint, abort
from flask_login import login_required, current_user
from app.models.forms import BoardForm
from app.models.forms import PinForm
from app.models import Pin

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=["GET"])
def get_all_boards():
    boards = Board.query.all()

    if not boards:
        return jsonify({"message": "no boards found"})

    boards_list = []
    for board in boards:
        board_data = board.to_dict()
        board_data['pins'] = [pin.to_dict() for pin in board.pins]
        boards_list.append(board_data)

    return jsonify(boards_list)

@board_routes.route('/<int:board_id>', methods=['GET'])
def get_boards_by_id(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({"error": "no board found"})

    board_data = board.to_dict()
    board_data['pins'] = [pin.to_dict() for pin in board.pins]

    return jsonify(board_data)

@board_routes.route('/create', methods=['POST'])
@login_required
def post_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    name = form.data['name']
    private = form.data['private']
    # name = request.form.get('name')
    # private = request.form.get('private')
    user_id = current_user.id

    new_board = Board(name=name, user_id=user_id, private=private)

    db.session.add(new_board)
    db.session.commit()

    return jsonify(new_board.to_dict()), 201
    # else:
    #     errors = form.errors
    #     return jsonify({"errors": errors}), 400

@board_routes.route('/<int:board_id>', methods=['PUT'])
@login_required
def edit_board_by_id(board_id):
    data = request.json
    board_to_edit = Board.query.get(board_id)

    if not board_to_edit:
        return jsonify({"error": "no board found"}), 404
    if board_to_edit.user_id != current_user.id:
        return jsonify({"error": "unauthorized"}), 403

    if 'name' in data:
        board_to_edit.name = data['name']
    if 'private' in data:
        board_to_edit.private = data['private']
    if 'description' in data:
        board_to_edit.description = data['description']

    db.session.commit()

    return jsonify({
        "message": "board changes successful",
        "board": board_to_edit.to_dict()
    }), 200

@board_routes.route('/<int:board_id>', methods=['DELETE'])
@login_required
def delete_board_by_id(board_id):
    board_to_delete = Board.query.get(board_id)

    if not board_to_delete:
        return jsonify({"error": "board does not exist"}), 404

    db.session.delete(board_to_delete)
    db.session.commit()

    return jsonify({"message": f'Successfully deleted board {board_id}',
                    "boardId": board_id}), 200

@board_routes.route('/<int:board_id>/pins', methods=['GET'])
def get_pins_by_board_id(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({"error": "no board found"})

    pins = [pin.to_dict() for pin in board.pins]

    if not pins:
        return jsonify({"error": "Loading"})

    return jsonify({"Pins": pins})

@board_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['GET'])
def get_pin_that_belong_to_board(board_id, pin_id):
    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)

    if not board:
        return jsonify({"error": "no board found"}), 404

    if not pin:
        return jsonify({"error": "pin not found"}), 404

    existing_association = db.session.query(board_pins).filter_by(board_id=board_id, pin_id=pin_id).first()

    if not existing_association:
        return jsonify({"message": "Pin not associated with this board"}), 400

    return jsonify(pin.to_dict())

@board_routes.route('/<int:board_id>/pins/<int:pin_id>/create', methods=['POST'])
def add_pin_to_board(board_id, pin_id):
    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)

    if not board:
        return jsonify({"message": "Board not found"}), 404

    if not pin:
        return jsonify({"message": "Pin not found"}), 404


    existing_association = db.session.query(board_pins).filter_by(board_id=board_id, pin_id=pin_id).first()

    if existing_association:
        return jsonify({"message": "Pin already associated with this board"}), 400


    board.pins.append(pin)
    db.session.commit()

    return jsonify(pin.to_dict()), 200

@board_routes.route('/<int:board_id>/pins/<int:pin_id>/delete', methods=['DELETE'])
def delete_pins_from_board(board_id, pin_id):
    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)

    if not board:
        return jsonify({"error": "Board not found"}), 404
    if not pin:
        return jsonify({"error": "Pin not found"}), 404

    # Check if the association exists
    existing_association = db.session.query(board_pins).filter_by(board_id=board_id, pin_id=pin_id).first()

    if not existing_association:
        return jsonify({"message": "Pin not associated with this board"}), 400

    # Remove the pin from the board
    board.pins.remove(pin)
    db.session.commit()

    return jsonify(pin.to_dict()), 200

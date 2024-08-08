from flask import Flask, jsonify, request
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

@app.route("/api/tags/start_with_t", methods=["GET"])
def get_tags_t():
    t_tags = Tag.query.filter(Tag.tag.ilike('t%')).all()

    t_tags_list = [tag.to_dict() for tag in t_tags]
    return jsonify(t_tags_list)

@app.route("/api/boards", methods=["POST"])
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

@app.route("/api/pins/<int:pin_id>", methods=["PUT"])
def edit_pin_by_id(pin_id):
    pin_to_edit = Pin.query.get(pin_id)

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    link = data.get("link")

    pin_to_edit.title = title
    pin_to_edit.description = description
    pin_to_edit.link = link

    db.session.commit()

    return jsonify({
        "message": f"Successfully changed pin {pin_id}",
        "pin": pin_to_edit.to_dict()
    })

@app.route("/api/pins/<int:pin_id>", methods=["DELETE"])
def delete_pin_by_id(pin_id):
    pin_to_delete = Pin.query.get(pin_id)

    db.session.delete(pin_to_delete)
    db.session.commit()

    return jsonify({"message": f"pin with id {pin_id} successfully deleted"})

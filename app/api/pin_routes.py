from app.models import db, Pin, board_pins
from flask import jsonify, request, Blueprint
from flask_login import login_required, current_user

pin_routes = Blueprint('pins', __name__)

@pin_routes.route("/", methods=["GET"])
def get_pins():
    pins = Pin.query.all()
    pin_list = [pin.to_dict() for pin in pins]
    return jsonify({ "Pins": pin_list})

@pin_routes.route("/<int:pin_id>", methods=["GET"])
def get_single_pin(pin_id):
    pin = Pin.query.get(pin_id)

    if pin:
        return jsonify(pin.to_dict())
    else: 
        return ({"message": "Pin not found"})
    
@pin_routes.route("/new", methods=["POST"])
@login_required
def create_pin():
    data = request.get_json()

    user_id = current_user.id
    # user_id = data.get("user_id")
    img_url = data.get("img_url")
    title = data.get("title")
    description = data.get('description')
    link = data.get('link')
    # board_id = data.get('board_id')  # If board is chosen

    new_pin = Pin(
        user_id = user_id,
        img_url = img_url,
        title = title,
        description = description,
        link = link
    )

    db.session.add(new_pin)
    db.session.commit()

    # if board_id:
    #     board_pin = board_pins(pin_id=new_pin.id, board_id=board_id)
    #     db.session.add(board_pin)
    #     db.session.commit()

    return jsonify(new_pin.to_dict())


@pin_routes.route("/<int:pin_id>", methods=["PUT"])
@login_required
def edit_pin(pin_id):
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

@pin_routes.route("/<int:pin_id>", methods=["DELETE"])
@login_required
def delete_pin(pin_id):
    pin_to_delete = Pin.query.get(pin_id)

    db.session.delete(pin_to_delete)
    db.session.commit()

    return jsonify({"message": f"pin with id {pin_id} successfully deleted"})
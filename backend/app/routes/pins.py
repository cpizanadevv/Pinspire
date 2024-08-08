from ..models import db, Board, User, Pin, Tag, Comment
from flask import jsonify, request, Blueprint

pins_bp = Blueprint('pins', __name__)

@pins_bp.route("/api/pins", methods=["GET"])
def get_pin():
    pins = Pin.query.all()
    pin_list = [pin.to_dict() for pin in pins]
    return jsonify({ "Pins": pin_list})

@pins_bp.route("/api/pins/<int:pin_id>", methods=["PUT"])
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

@pins_bp.route("/api/pins/<int:pin_id>", methods=["DELETE"])
def delete_pin_by_id(pin_id):
    pin_to_delete = Pin.query.get(pin_id)

    db.session.delete(pin_to_delete)
    db.session.commit()

    return jsonify({"message": f"pin with id {pin_id} successfully deleted"})

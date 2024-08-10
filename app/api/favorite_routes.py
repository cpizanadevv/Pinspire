from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Favorite, Pin

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/<int:pin_id>', methods=['POST'])
@login_required
def add_favorite(pin_id):
    favorite = Favorite(user_id=current_user.id, pin_id=pin_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict()), 201

@favorite_routes.route('/', methods=['GET'])
@login_required
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify([favorite.to_dict() for favorite in favorites])

@favorite_routes.route('/<int:pin_id>', methods=['DELETE'])
@login_required
def delete_favorite(pin_id):
    favorite = Favorite.query.filter_by(user_id=current_user.id, pin_id=pin_id).first()
    if not favorite:
        return jsonify({'error': 'Favorite not found'}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite deleted'})

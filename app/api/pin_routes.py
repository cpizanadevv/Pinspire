from app.models import db, Pin, Comment
from flask import jsonify, request, Blueprint,
from flask_login import login_required

pin_routes = Blueprint('pins', __name__)

@pin_routes.routes('/<int:pin_id>', methods=['GET'])
def get_pin_comments(pin_id):
    comments = Comment.query.get.filter(Comment.pin_id.like(pin_id)).all
    
    return {'comments': [comment.to_dict() for comment in comments]}

@pin_routes.routes('/<int:pin_id>/new_comment', methods=['POST'])
@login_required()
def create_pin_comment(pin_id):
    form=''
    
    
    return {'comments': [comment.to_dict() for comment in comments]}

@pin_routes.routes('/<int:pin_id>', methods=['DELETE'])
@login_required()
def delete_pin_comment(pin_id):
    
    comments = Comment.query.get.filter(Comment.pin_id.like(pin_id)).all
    
    return {'comments': [comment.to_dict() for comment in comments]}
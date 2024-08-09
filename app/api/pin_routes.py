from app.models import db, Pin, Comment
from flask import jsonify, request, Blueprint
from flask_login import login_required, current_user

pin_routes = Blueprint('pins', __name__)

#Get Comments done
@pin_routes.route('/<int:pin_id>', methods=['GET'])
def get_pin_comments(pin_id):
    comments = Comment.query.get.filter(Comment.pin_id.like(pin_id)).all
    
    return {'comments': [comment.to_dict() for comment in comments]}

#Create comment
@pin_routes.route('/<int:pin_id>/new_comment', methods=['POST'])
@login_required
def create_pin_comment(pin_id):
    form=''
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user,
            pin_id=pin_id,
            comment =  form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
    
    
    
    return {'comments': [comment.to_dict() for comment in comments]}

#Update comment
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['POST'])
@login_required
def update_pin_comment(comment_id):
    form=''
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_comment = Comment.query.filter(Comment.id.like(comment_id))
    if form.validate_on_submit():
        
        curr_comment.comment= form.data['comment']
        db.session.commit()
    
    
    
    
    return {'comments': [comment.to_dict() for comment in comments]}


#Delete Comment
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_pin_comment(comment_id):
    
    curr_comment = Comment.query.filter(Comment.id.like(comment_id))
    
    db.session.delete(curr_comment)
    
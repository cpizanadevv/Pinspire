from app.models import db, Pin, Comment
from flask import jsonify, request, Blueprint
from flask_login import login_required, current_user
from app.forms import CommentForm

pin_routes = Blueprint('pins', __name__)

#Get Comments for pin done
@pin_routes.route('/<int:pin_id>', methods=['GET'])
def get_pin_comments(pin_id):
    comments = Comment.query.filter(Comment.pin_id == pin_id).all()
    
    return jsonify({'comments': [comment.to_dict() for comment in comments]})

#Create comment on a pin done
@pin_routes.route('/<int:pin_id>/new-comment', methods=['POST'])
@login_required
def create_pin_comment(pin_id):
    form=CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            pin_id=pin_id,
            comment =  form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
    
    return new_comment.to_dict()

#Update comment on a pin done
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['PUT'])
@login_required
def update_pin_comment(pin_id,comment_id):
    form=CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("THIS IS COMMENT ID", comment_id)
    curr_comment = Comment.query.filter(Comment.id == comment_id).one()
    if form.validate_on_submit():
        print("THIS IS CURR COMMENT",curr_comment.user_id)
        if curr_comment and current_user.id == curr_comment.user_id:
            curr_comment.comment= form.data['comment']
            db.session.commit()
            return curr_comment.to_dict()
        else:
            return {'error': 'Comment not found!'},404


#Delete Comment on a pin done
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_pin_comment(pin_id,comment_id):
    
    curr_comment = Comment.query.filter(Comment.id.like(comment_id)).one()
    if curr_comment and current_user.id == curr_comment.user_id:
        db.session.delete(curr_comment)
        db.session.commit()
        return "Comment has been deleted"
    else:
        return {'error': 'Comment not found'}, 404
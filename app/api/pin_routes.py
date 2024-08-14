from app.models import db, Pin, board_pins, Comment, Tag, pin_tags
from flask import jsonify, request, Blueprint
from flask_login import login_required, current_user
from app.forms import CommentForm, TagForm

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
#Get Comments for pin
@pin_routes.route('/<int:pin_id>', methods=['GET'])
def get_pin_comments(pin_id):
    comments = Comment.query.filter(Comment.pin_id == pin_id).all()
    
    return jsonify({'comments': [comment.to_dict() for comment in comments]})

#Create comment on a pin
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

#Update comment on a pin
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['PUT'])
@login_required
def update_pin_comment(pin_id,comment_id):
    form=CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_comment = Comment.query.filter(Comment.id == comment_id).one()
    if form.validate_on_submit():
        if curr_comment and current_user.id == curr_comment.user_id:
            curr_comment.comment= form.data['comment']
            db.session.commit()
            return curr_comment.to_dict()
        else:
            return {'error': 'Comment not found!'},404


#Delete Comment on a pin
@pin_routes.route('/<int:pin_id>/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_pin_comment(pin_id,comment_id):
    curr_comment = Comment.query.filter(Comment.id == comment_id).one()
    if curr_comment and current_user.id == curr_comment.user_id:
        db.session.delete(curr_comment)
        db.session.commit()
        return "Comment has been deleted"
    else:
        return {'error': 'Comment not found'}, 404
    
#Create tag
@pin_routes.route('/<int:pin_id>/add-tag')
@login_required
def add_tag(pin_id):
    form = TagForm
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_pin = Pin.query.filter(Pin.id == pin_id).one_or_none()
    
    if curr_pin and current_user.id == curr_pin.user_id:
         return {'error': 'Pin not found or unauthorized'}, 404
    
    if form.validate_on_submit():
        tag_exists = Tag.query.filter(Tag.tag.like(form.data['tag'])).one_or_none()
        if tag_exists:
            return tag_exists.to_dict()
            
        new_tag = Tag(
            pin_id = pin_id,
            tag = form.data['tag']
        )
        db.session.add(new_tag)
        db.commit()
        
        return new_tag.to_dict()
            
            
            
#Add pin + tag to joint table 
@pin_routes.route('/<int:pin_id>/<int:tag_id>/add-pin-tag')
@login_required
def add_pin_tag(pin_id,tag_id):
    curr_pin = Pin.query.filter(Pin.id == pin_id).one_or_none()
    
    if not curr_pin or curr_pin.user_id != current_user.id:
        return {'error': 'Pin not found'}, 404
    
    curr_tag = Tag.query.filter(Tag.id == tag_id).one_or_none()
    if not curr_tag:
        return {'message': 'Tag not found'}, 404   
    
    pin_tag_exists = pin_tags.query.filter(pin_tags.pin_id == pin_id, pin_tags.tag_id == tag_id).one_or_none()
    
    if pin_tag_exists:
        return {'message': 'Pin-Tag relationship already exists'}, 400
    
    new_pin_tag = pin_tags(
        pin_id = pin_id,
        tag_id = curr_tag.tag_id
    )
    
    db.session.add(new_pin_tag)
    db.session.commit()
    return {'message': 'Pin-Tag relationship added successfully'}, 201

#Delete Pin Tag
@pin_routes.route('/<int:pin_id>/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_pin_tag(pin_id,tag_id):
    #Current Tag
    #Pin tag relationship we want to delete
    pin_tag_to_delete = pin_tags.query.filter(pin_tags.tag_id == tag_id, pin_tags.pin_id == pin_id).one_or_none()

    
    curr_pin = Pin.query.filter(Pin.id == pin_id).one_or_none()
    
    
    if not curr_pin or curr_pin.user_id != current_user.id:
        return {'error': 'Pin not found or unauthorized'}, 404
    
    if not pin_tag_to_delete:
        return {'error': 'Pin-Tag relationship not found'}, 404
    
    #Checking if tag is being used elsewhere
    tag_usage = pin_tags.query.filter(pin_tags.tag_id == tag_id).count()
    if tag_usage == 1:
        curr_tag = Tag.query.filter(Tag.id == tag_id).one_or_none()
        if curr_tag:
            db.session.delete(curr_tag)
            db.session.commit()
        else:
            return {'error': 'Tag not found'}, 404

    db.session.delete(pin_tag_to_delete)
    db.session.commit()
    return "Tag/Pin-Tag has been deleted"
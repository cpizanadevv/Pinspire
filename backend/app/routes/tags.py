from ..models import db, Board, User, Pin, Tag, Comment
from flask import jsonify, request, Blueprint

tags_bp = Blueprint("tags", __name__)

@tags_bp.route("/api/tags/start_with_t", methods=["GET"])
def get_tags_t():
    t_tags = Tag.query.filter(Tag.tag.ilike('t%')).all()

    t_tags_list = [tag.to_dict() for tag in t_tags]
    return jsonify(t_tags_list)

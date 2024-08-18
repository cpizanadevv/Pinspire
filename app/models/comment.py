from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .pin import Pin
from sqlalchemy.schema import ForeignKey

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id'), ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User", back_populates='comments')
    pin = db.relationship("Pin", back_populates='comments')

    def to_dict(self):
        return {
            "id": self.id,
            "pin_id": self.pin_id,
            "user_id": self.user_id,
            "comment": self.comment,
            'username': self.user.username
        }

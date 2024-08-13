from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .pin import Pin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)

    user = relationship('User', back_populates='favorites')
    pin = relationship('Pin', back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pin_id': self.pin_id
        }

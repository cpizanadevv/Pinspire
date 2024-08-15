from .db import db, environment, SCHEMA, add_prefix_for_prod
from .relationship import board_pins
from sqlalchemy.schema import ForeignKey

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(6969))
    private = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='boards')
    pins = db.relationship('Pin', secondary=board_pins, back_populates='boards')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            "name": self.name,
            "private": self.private
        }

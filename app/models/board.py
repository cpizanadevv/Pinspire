from .db import db, environment, SCHEMA
from .relationship import board_pins
from sqlalchemy.schema import ForeignKey

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='boards')
    pins = db.relationship('Pin', secondary=board_pins, back_populates='boards')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "private": self.private
        }
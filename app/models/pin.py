from .db import db, environment, SCHEMA, add_prefix_for_prod
from .relationship import board_pins, pin_tags
from sqlalchemy.schema import ForeignKey

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))
    link = db.Column(db.String(255))

    user = db.relationship('User', back_populates='pins')
    comments = db.relationship('Comment', back_populates='pin')
    boards = db.relationship('Board', secondary=board_pins, back_populates='pins')
    tags = db.relationship('Tag', secondary=pin_tags, back_populates='pins')
    favorites = db.relationship('Favorite', back_populates='pin')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'img_url': self.img_url,
            'title': self.title,
            'description': self.description,
            'link': self.link
        }

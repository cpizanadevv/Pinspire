from .db import db, environment, SCHEMA
from .pin import Pin
from .relationship import pin_tags

class TagForm(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)

    pins = db.relationship("Pin", secondary=pin_tags, back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "tag": self.tag
        }

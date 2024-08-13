from .db import db, environment, SCHEMA
from .pin import Pin
from .relationship import pin_tags

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)

    pins = db.relationship("Pin", secondary=pin_tags, back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "tag": self.tag
        }

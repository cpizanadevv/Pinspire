from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)

    pins = db.relationship('Pin', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

# join table for boards and pins many-to-many relationship
board_pins = Table(
    "board_pins",
    Base.metadata,
    Column("board_id", ForeignKey("boards.id"), primary_key=True),
    Column("pin_id", ForeignKey("pins.id"), primary_key=True)
)

# join table for tags and pins many-to-many relationship

pin_tags = Table(
    "pin_tags",
    Base.metadata,
    Column("pin_id", ForeignKey("pins.id"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True)
)

class Pin(db.Model):
    __tablename__ = "pins"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    link = db.Column(db.String(255), nullable=False)

    user = db.relationship('User', back_populates='pins')
    comments = db.relationship('Comment', back_populates='pin')
    boards = relationship("Board", secondary=board_pins, back_populates="pins")
    tags = relationship("Tag", secondary=pin_tags, back_populates="pins")

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    pin_id = db.Column(db.Integer, ForeignKey('pins.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)

    pin = db.relationship('Pin', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

class Board(db.Model):
    __tablename__= 'boards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey='users.id', nullable=False)
    name = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='boards')
    pins = relationship("Pin", secondary=board_pins, back_populates="boards")

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)

    pins = relationship("Pin", secondary=pin_tags, back_populates="tags")


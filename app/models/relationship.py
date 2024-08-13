from .db import db, environment, SCHEMA
from sqlalchemy.schema import Column, ForeignKey, Table

# Join table for boards and pins many-to-many relationship
board_pins = db.Table(
    "board_pins",
    db.Model.metadata,
    db.Column("board_id", db.ForeignKey("boards.id"), primary_key=True),
    db.Column("pin_id", db.ForeignKey("pins.id"), primary_key=True)
)

if environment == "production":
    board_pins.schema = SCHEMA

# Join table for tags and pins many-to-many relationship
pin_tags = db.Table(
    "pin_tags",
    db.Model.metadata,
    db.Column("pin_id", db.ForeignKey("pins.id"), primary_key=True),
    db.Column("tag_id", db.ForeignKey("tags.id"), primary_key=True)
)

if environment == "production":
    pin_tags.schema = SCHEMA

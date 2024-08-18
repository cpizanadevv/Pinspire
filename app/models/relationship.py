from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey, Table

# Join table for boards and pins many-to-many relationship
board_pins = db.Table(
    "board_pins",
    db.Model.metadata,
    db.Column("board_id", db.ForeignKey(add_prefix_for_prod("boards.id"), ondelete='CASCADE'), primary_key=True),
    db.Column("pin_id", db.ForeignKey(add_prefix_for_prod("pins.id"), ondelete='CASCADE'), primary_key=True)
)

pin_tags = db.Table(
    "pin_tags",
    db.Model.metadata,
    db.Column("pin_id", db.ForeignKey(add_prefix_for_prod("pins.id"), ondelete='CASCADE'), primary_key=True),
    db.Column("tag_id", db.ForeignKey(add_prefix_for_prod("tags.id"), ondelete='CASCADE'), primary_key=True)
)

if environment == "production":
    pin_tags.schema = SCHEMA
    board_pins.schema = SCHEMA

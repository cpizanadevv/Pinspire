from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey, Table

# Join table for boards and pins many-to-many relationship
board_pins = db.Table(
    "board_pins",
    db.Model.metadata,
    Column("board_id", ForeignKey(add_prefix_for_prod("boards.id")), primary_key=True),
    Column("pin_id", ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True)
)

if environment == "production":
    board_pins.schema = SCHEMA

# Join table for tags and pins many-to-many relationship
pin_tags = db.Table(
    "pin_tags",
    db.Model.metadata,
    Column("pin_id", ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True),
    Column("tag_id", ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True)
)

if environment == "production":
    pin_tags.schema = SCHEMA

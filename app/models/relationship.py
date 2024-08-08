from .db import db
from sqlalchemy.schema import Column, ForeignKey, Table

# Join table for boards and pins many-to-many relationship
board_pins = Table(
    "board_pins",
    db.metadata,
    Column("board_id", ForeignKey("boards.id"), primary_key=True),
    Column("pin_id", ForeignKey("pins.id"), primary_key=True)
)

# Join table for tags and pins many-to-many relationship
pin_tags = Table(
    "pin_tags",
    db.metadata,
    Column("pin_id", ForeignKey("pins.id"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True)
)

from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    all_pins = Board(
        name='All Pins',
        private=True
    )

    db.session.add(all_pins)

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

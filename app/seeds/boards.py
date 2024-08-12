from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    board1 = Board(
        name='All Pins',
        user_id=1,
        private=True
    )

    board2 = Board(
        name='All Pins',
        user_id=2,
        private=True
    )

    board3 = Board(
        name='All Pins',
        user_id=3,
        private=True
    )

    db.session.add_all([board1, board2, board3])
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

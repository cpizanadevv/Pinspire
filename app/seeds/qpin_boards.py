from app.models import db, Board, Pin, User, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_board_pins():
    board1 = Board.query.get(1)  # Replace with the actual IDs of your boards
    board2 = Board.query.get(2)
    board3 = Board.query.get(3)

    pins = Pin.query.all()

    random_pins1 = random.sample(pins, 5)  # 5 random pins for board1
    random_pins2 = random.sample(pins, 5)  # 5 different random pins for board2
    random_pins3 = random.sample(pins, 5)  # 5 different random pins for board3

    board1.pins.extend(random_pins1)
    board2.pins.extend(random_pins2)
    board3.pins.extend(random_pins3)

    db.session.add_all([board1, board2, board3])
    db.session.commit()


def undo_board_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_pins"))

    db.session.commit()

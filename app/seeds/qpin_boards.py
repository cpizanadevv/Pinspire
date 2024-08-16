from app.models import db, Board, Pin, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_board_pins():
    board1 = Board.query.get(1)  # Replace with the actual IDs of your boards
    board2 = Board.query.get(2)
    board3 = Board.query.get(3)
    board4 = Board.query.get(4)
    board5 = Board.query.get(5)
    board6 = Board.query.get(6)

    pins = Pin.query.all()

    random_pins1 = random.sample(pins, 5)  # 5 random pins for board1
    random_pins2 = random.sample(pins, 5)  # 5 different random pins for board2
    random_pins3 = random.sample(pins, 5)  # 5 different random pins for board3
    random_pins4 = random.sample(pins, 5)  # 5 different random pins for board3
    random_pins5 = random.sample(pins, 5)  # 5 different random pins for board3
    random_pins6 = random.sample(pins, 5)  # 5 different random pins for board3

    board1.pins.extend(random_pins1)
    board2.pins.extend(random_pins2)
    board3.pins.extend(random_pins3)
    board4.pins.extend(random_pins4)
    board5.pins.extend(random_pins5)
    board6.pins.extend(random_pins6)

    db.session.add_all([board1, board2, board3, board4, board5, board6])
    db.session.commit()


def undo_board_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_pins"))

    db.session.commit()

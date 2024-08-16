from app.models import db, environment, SCHEMA, Favorite
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(
        user_id=1,
        pin_id=1
    )
    favorite2 = Favorite(
        user_id=1,
        pin_id=2
    )
    favorite3 = Favorite(
        user_id=1,
        pin_id=3
    )
    favorite4 = Favorite(
        user_id=1,
        pin_id=4
    )
    favorite5 = Favorite(
        user_id=1,
        pin_id=5
    )
    favorite6 = Favorite(
        user_id=2,
        pin_id=6
    )
    favorite7 = Favorite(
        user_id=2,
        pin_id=7
    )
    favorite8 = Favorite(
        user_id=2,
        pin_id=8
    )
    favorite9 = Favorite(
        user_id=3,
        pin_id=9
    )
    favorite10 = Favorite(
        user_id=3,
        pin_id=10
    )
    favorite11 = Favorite(
        user_id=3,
        pin_id=11
    )

    db.session.add_all([favorite1, favorite2, favorite3, favorite4, favorite5,
                        favorite6, favorite7, favorite8, favorite9, favorite10, favorite11])
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
from app.models import db, Pin, environment, SCHEMA, Comment
from sqlalchemy.sql import text


def seed_comments():
    comment1= Comment(
        pin_id=1,
        user_id=1,
        comment='1this is comment 1'
    )
    comment2= Comment(
        pin_id=1,
        user_id=2,
        comment='2this is comment 1'
    )
    comment3= Comment(
        pin_id=1,
        user_id=3,
        comment='3this is comment 1'
    )
    comment4= Comment(
        pin_id=2,
        user_id=1,
        comment='1this is comment 2'
    )
    comment5= Comment(
        pin_id=2,
        user_id=2,
        comment='2this is comment 2'
    )
    comment6= Comment(
        pin_id=2,
        user_id=3,
        comment='3this is comment 2'
    )
    comment7= Comment(
        pin_id=3,
        user_id=1,
        comment='1this is comment 3'
    )
    comment8= Comment(
        pin_id=3,
        user_id=2,
        comment='2this is comment 3'
    )
    comment9= Comment(
        pin_id=3,
        user_id=3,
        comment='3this is comment 3'
    )
    
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.commit()
    
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    
    db.session.commit()

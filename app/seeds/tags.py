from app.models import db, Pin, environment, SCHEMA, Tag
from sqlalchemy.sql import text


def seed_tags():
    categories = [
        'nature', 'animals', 'technology', 'programming', 'food', 'travel',
        'fashion', 'architecture', 'people', 'sports', 'music', 'art', 'cities',
        'landscape', 'interior design', 'crochet design', 'plants', 'fantasy',
        'gaming', 'medieval', 'castles', 'movies', 'disney'
     ]

    for category in categories:
        new_tag = Tag(
            tag = category
        )

        db.session.add(new_tag)

    db.session.commit()
    
    
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
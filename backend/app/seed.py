from app import create_app
from app.models import db, User, Pin, Board, Tag, Comment

app = create_app()

with app.app_context():
    # Clear existing data (optional)
    db.drop_all()
    db.create_all()

    # Create and add sample users
    user1 = User(first_name='John', last_name='Doe', username='johndoe', password='password123', email='john.doe@example.com')
    user2 = User(first_name='Jane', last_name='Smith', username='janesmith', password='password456', email='jane.smith@example.com')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()  # Commit to generate IDs

    # Create and add sample tags
    tag1 = Tag(tag='Technology')
    tag2 = Tag(tag='Education')
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.commit()  # Commit to ensure tags are added

    # Create and add sample pins
    pin1 = Pin(user_id=user1.id, img_url='http://example.com/image1.jpg', title='Tech News', description='Latest in tech', link='http://example.com/tech')
    pin2 = Pin(user_id=user2.id, img_url='http://example.com/image2.jpg', title='Education Tips', description='Helpful tips for learning', link='http://example.com/education')
    db.session.add(pin1)
    db.session.add(pin2)
    db.session.commit()  # Commit to ensure pins are added

    # Create and add sample boards
    board1 = Board(user_id=user1.id, name='Tech Board', private=False)  # Ensure private column is provided
    board2 = Board(user_id=user2.id, name='Learning Board', private=False)  # Ensure private column is provided
    db.session.add(board1)
    db.session.add(board2)
    db.session.commit()  # Commit to ensure boards are added

    # Create and add sample comments
    comment1 = Comment(pin_id=pin1.id, user_id=user1.id, comment='Great tech news!')
    comment2 = Comment(pin_id=pin2.id, user_id=user2.id, comment='Very helpful education tips!')
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()  # Commit comments

    # Add relationships
    pin1.tags.append(tag1)
    pin2.tags.append(tag2)
    board1.pins.append(pin1)
    board2.pins.append(pin2)
    db.session.commit()  # Commit relationships

print("Database seeded successfully.")

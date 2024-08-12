from app.models import db, Pin, environment, SCHEMA


def seed_pins():
    pin1 = Pin(
        user_id= 1,
        img_url= 'example-img.test.com',
        title= 'Test',
        description= 'This is a demo')
    pin2 = Pin(
        user_id= 2,
        img_url= 'example-img.test.com',
        title= 'Test',
        description= 'This is a demo')
    pin3 = Pin(
        user_id= 3,
        img_url= 'example-img.test.com',
        title= 'Test',
        description= 'This is a demo')

    db.session.add(pin1)
    db.session.add(pin2)
    db.session.add(pin3)
    db.session.commit()
    
def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(("DELETE FROM pins"))
        
    db.session.commit()

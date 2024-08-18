from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_data = [
        {
            "first_name": "Demo",
            "last_name": "User",
            "username": "Demo",
            "email": "demo@aa.io",
            "password": "password",
        },
        {
            "first_name": "Marnie",
            "last_name": "LastName",
            "username": "marnie",
            "email": "marnie@aa.io",
            "password": "password",
        },
        {
            "first_name": "Bobbie",
            "last_name": "LastName2",
            "username": "bobbie",
            "email": "bobbie@aa.io",
            "password": "password",
        },
        {
            "first_name": "Amina",
            "last_name": "Hassan",
            "username": "aminah",
            "email": "aminahassan@example.com",
            "password": "password",
        },
        {
            "first_name": "Wei",
            "last_name": "Zhang",
            "username": "weizhang",
            "email": "weizhang@example.com",
            "password": "password",
        },
        {
            "first_name": "Priya",
            "last_name": "Patel",
            "username": "priyapatel",
            "email": "priyapatel@example.com",
            "password": "password",
        },
        {
            "first_name": "Javier",
            "last_name": "Garcia",
            "username": "javierg",
            "email": "javiergarcia@example.com",
            "password": "password",
        },
        {
            "first_name": "Fatima",
            "last_name": "Alam",
            "username": "fatimaa",
            "email": "fatimaal@example.com",
            "password": "password",
        },
        {
            "first_name": "Yuki",
            "last_name": "Tanaka",
            "username": "yukit",
            "email": "yukitanaka@example.com",
            "password": "password",
        },
        {
            "first_name": "Diego",
            "last_name": "Rodriguez",
            "username": "diegor",
            "email": "diegor@example.com",
            "password": "password",
        },
        {
            "first_name": "Leila",
            "last_name": "Nguyen",
            "username": "leilan",
            "email": "leilanguyen@example.com",
            "password": "password",
        },
        {
            "first_name": "Eshan",
            "last_name": "Khan",
            "username": "eshank",
            "email": "eshankhan@example.com",
            "password": "password",
        },
        {
            "first_name": "Nia",
            "last_name": "Jackson",
            "username": "niaj",
            "email": "niajackson@example.com",
            "password": "password",
        },
        {
            "first_name": "Sofia",
            "last_name": "Rossi",
            "username": "sofiar",
            "email": "sofiarossi@example.com",
            "password": "password",
        },
        {
            "first_name": "Ravi",
            "last_name": "Sharma",
            "username": "ravis",
            "email": "ravisharma@example.com",
            "password": "password",
        },
        {
            "first_name": "Lina",
            "last_name": "Kim",
            "username": "linak",
            "email": "linakim@example.com",
            "password": "password",
        },
        {
            "first_name": "Omar",
            "last_name": "Farah",
            "username": "omarf",
            "email": "omarfarah@example.com",
            "password": "password",
        },
        {
            "first_name": "Anika",
            "last_name": "Singh",
            "username": "anikas",
            "email": "anikasingh@example.com",
            "password": "password",
        },
        {
            "first_name": "Mateo",
            "last_name": "Hernandez",
            "username": "mateoh",
            "email": "mateohernandez@example.com",
            "password": "password",
        },
        {
            "first_name": "Zara",
            "last_name": "Ali",
            "username": "zaraa",
            "email": "zaraali@example.com",
            "password": "password",
        },
        {
            "first_name": "Leo",
            "last_name": "Martinez",
            "username": "leom",
            "email": "leomartinez@example.com",
            "password": "password",
        },
    ]


    for data in user_data:
        user = User(
            first_name=data["first_name"],
            last_name=data["last_name"],
            username=data["username"],
            email=data["email"],
            password=data["password"],
        )
        db.session.add(user)
        
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

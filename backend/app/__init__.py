from flask import Flask, jsonify, request
from .config import Configuration
from .models import db, Board, User, Pin, Tag, Comment
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Configuration)
    db.init_app(app)
    Migrate(app, db)

    from .routes.boards import boards_bp
    from .routes.pins import pins_bp
    from .routes.tags import tags_bp

    app.register_blueprint(boards_bp)
    app.register_blueprint(pins_bp)
    app.register_blueprint(tags_bp)

    return app

app = create_app()

@app.route("/")
def index():
    return "<h1>Python Flask Assessment</h1>"

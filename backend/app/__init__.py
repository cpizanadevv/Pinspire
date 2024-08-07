from flask import Flask
from .config import Configuration
from .models import db
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)


@app.route("/boards")
def index():
    return "<h1>Python Flask Assessment</h1>"

@app.route()

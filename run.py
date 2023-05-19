from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from waitress import serve

from app.login.login import login
from app.chat.chat import chat
from app.register.register import register

from app.admin.admin_login import admin_login
from app.admin.admin_members import admin_members
from app.admin.admin_rooms import admin_rooms


def create_app():

    app = Flask(__name__, static_folder="app/static", template_folder="app/templates")

    app.register_blueprint(login)
    app.register_blueprint(chat)
    app.register_blueprint(register)
    app.register_blueprint(admin_login)
    app.register_blueprint(admin_members)
    app.register_blueprint(admin_rooms)

    CORS(app)

    return app


if __name__=='__main__':
    
    load_dotenv()

    mode = os.getenv('APP_MODE')
    
    app = create_app()
    
    if mode == "dev":
        app.run(host=os.getenv("APP_HOST"), port=os.getenv("APP_PORT"), debug=True)
    else:
        serve(app, host=os.getenv("APP_HOST"), port=os.getenv("APP_PORT"))
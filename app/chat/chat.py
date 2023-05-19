from flask import Blueprint, render_template

chat = Blueprint("chat", __name__)

@chat.route("/chat")
def chat_page():
    return render_template("chat.html")


from flask import Blueprint, render_template

admin_rooms = Blueprint("admin_rooms", __name__)

@admin_rooms.route("/admin/rooms")
def admin_rooms_page():
    return render_template("admin_rooms.html")
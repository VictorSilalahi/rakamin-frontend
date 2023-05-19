from flask import Blueprint, render_template

admin_login = Blueprint("admin_login", __name__)

@admin_login.route("/admin")
def admin_login_page():
    return render_template("admin_login.html")
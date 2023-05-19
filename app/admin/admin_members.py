from flask import Blueprint, render_template

admin_members = Blueprint("admin_members", __name__)

@admin_members.route("/admin/members")
def admin_login_page():
    return render_template("admin_members.html")
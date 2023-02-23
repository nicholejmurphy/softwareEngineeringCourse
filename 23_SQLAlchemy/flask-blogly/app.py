"""Blogly application."""

from flask import Flask, request, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'some_value'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True

connect_db(app)
db.create_all()


@app.route('/')
def home_page():
    """Redirects users to the home page"""

    users = User.query.all()
    return render_template('base.html', users=users)


@app.route('/users')
def show_all_users():
    """Shows a list of all users in the database"""

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('base.html', users=users)


@app.route('/users/new', methods=["GET"])
def new_users_form():
    """Shows a new user form to create a new user"""

    return render_template('new-user-form.html')


@app.route('/users/new', methods=["POST"])
def add_new_user():
    """Submits new user form to add a new user to the database"""

    new_user = User(first_name=request.form['first-name'],
                    last_name=request.form['last-name'], img_url=request.form['img-url'] or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>')
def user_page(user_id):
    """Shows User Page"""

    user = User.query.get_or_404(user_id)
    return render_template('user_details.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["GET"])
def edit_user(user_id):
    """Shows user edit form"""

    user = User.query.get_or_404(user_id)
    return render_template('user_edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def submit_edited_user(user_id):
    """Updates user in database from submitted form"""

    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first-name']
    user.last_name = request.form['last-name']
    user.img_url = request.form['img-url']

    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Deletes user from database"""

    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect('/users')

"""Blogly application."""

from flask import Flask, request, redirect, flash, render_template
from flask_debugtoolbar import DebugToolbarExtension
import time
from models import db, connect_db, User, Post, Tag, PostTag, desc

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

app.config['SECRET_KEY'] = 'some_value'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True
app.app_context().push()

connect_db(app)
db.create_all()


###### HOME VIEW FUNCTION #######
@app.route('/')
def home_page():
    """Redirects users to the home page"""

    users = User.query.all()
    posts = Post.query.order_by(desc(Post.id)).limit(5).all()

    return render_template('base.html', users=users, posts=posts)


###### USERS VIEW FUNCTIONS #######
@app.route('/users')
def show_all_users():
    """Shows a list of all users in the database"""

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def new_users_form():
    """Shows a new user form to create a new user"""

    return render_template('new_user_form.html')


@app.route('/users/new', methods=["POST"])
def add_new_user():
    """Submits new user form to add a new user to the database"""

    new_user = User(first_name=request.form['first-name'],
                    last_name=request.form['last-name'], img_url=request.form['img-url'] or None)

    db.session.add(new_user)
    db.session.commit()

    flash(f"New user: {new_user.full_name} successfully created", "success")
    return redirect('/users')


@app.route('/users/<int:user_id>')
def user_page(user_id):
    """Shows User Page"""

    user = User.query.get_or_404(user_id)
    posts = Post.query.filter(Post.user_id == user_id)

    return render_template('user_details.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
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

    flash(f"User: {user.full_name} has been successfully updated", "success")
    return redirect(f'/users/{user_id}')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Deletes user from database"""

    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    flash(f"User: {user.full_name} has been successfully deleted", "danger")
    return redirect('/users')


###### POSTS VIEW FUNCTIONS #######
@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Shows post details and edit/delete buttons"""

    post = Post.query.get_or_404(post_id)

    return render_template('post_details.html', post=post)


@app.route('/users/<int:user_id>/posts/new')
def create_post_form(user_id):
    """Shows new post form"""

    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()

    return render_template('create_post.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def submit_new_post(user_id):
    """Shows new post form"""

    user = User.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    new_post = Post(title=request.form['title'],
                    content=request.form['content'], user_id=user_id, tags=tags)

    db.session.add(new_post)
    db.session.commit()

    flash(f"{new_post.title} has been successfully posted", "success")
    return redirect(f'/posts/{new_post.id}')


@app.route('/posts/<int:post_id>/edit')
def show_edit_post_form(post_id):
    """Shows edit post form"""

    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()

    return render_template('edit_post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def submit_edited_post(post_id):
    """Submits edited post and updates database"""

    post = Post.query.get_or_404(post_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    post.title = request.form['title']
    post.content = request.form['content']
    post.tags = tags

    db.session.add(post)
    db.session.commit()

    flash(f"This post has been successfully updated", "success")
    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Handles submission and deletes an existing post"""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    flash(f'The post "{post.title}" has been successfully deleted', "danger")
    return redirect(f"/users/{post.user_id}")


###### TAGS VIEW FUNCTIONS #######
@app.route('/tags')
def show_all_tags():
    """Shows a list of all tags in the database"""

    tags = Tag.query.order_by(Tag.name).all()
    return render_template('tags.html', tags=tags)


@app.route('/tags/<int:tag_id>')
def tag_page(tag_id):
    """Shows Tag Page"""

    tag = Tag.query.get_or_404(tag_id)

    return render_template('tag_details.html', tag=tag)


@app.route('/tags/new')
def create_tag_form():
    """Shows new tag form"""

    posts = Post.query.all()

    return render_template('create_tag.html', posts=posts)


@app.route('/tags/new', methods=['POST'])
def submit_new_tag():
    """Shows new tag form"""

    post_ids = [int(num) for num in request.form.getlist('posts')]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    new_tag = Tag(name=request.form['tag-name'])
    new_tag.posts = posts

    db.session.add(new_tag)
    db.session.commit()

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag_form(tag_id):
    """Shows edit post form"""

    tag = Tag.query.get_or_404(tag_id)
    posts = Post.query.all()

    return render_template('edit_tag.html', tag=tag, posts=posts)


@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def submit_edited_tag(tag_id):
    """Submits edited tag and updates database"""

    posts_id = [int(num) for num in request.form.getlist('posts')]
    posts = Post.query.filter(Post.id.in_(posts_id)).all()
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['tag-name']
    tag.posts = posts

    db.session.add(tag)
    db.session.commit()

    flash(f"{tag.name} has been successfully updated", "success")
    return redirect(f'/tags/{tag_id}')


@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    """Handles submission and deletes an existing tag"""

    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    flash(f"{tag.name} has been successfully deleted", "danger")
    return redirect("/tags")

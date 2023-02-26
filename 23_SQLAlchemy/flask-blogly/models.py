"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"


def connect_db(app):
    """Connects this database to app.py"""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """Users Model"""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.Text,
                           nullable=False)
    last_name = db.Column(db.Text,
                          nullable=False)
    img_url = db.Column(db.Text, nullable=False,
                        default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Post", backref="user",
                            cascade="all, delete-orphan")

    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        u = self
        return f"<User id={u.id} full_name={u.full_name}"


class Post(db.Model):
    """Posts model"""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        p = self
        return f"<Post id={p.id} title={p.title} user_id={p.user_id}"

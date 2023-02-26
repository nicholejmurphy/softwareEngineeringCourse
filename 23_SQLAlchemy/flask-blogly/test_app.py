from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample user."""

        User.query.delete()

        user = User(first_name="Nicky", last_name="Murphy")
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """Clean up session"""

        db.session.rollback()

    def test_home_page(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Nicky', html)

    def test_show_all_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Nicky', html)

    def test_new_users_form(self):
        with app.test_client() as client:
            resp = client.get('/users/new')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Create A User', html)

    def test_add_new_user(self):
        with app.test_client() as client:
            form_data = {"first-name": "Liam", "last-name": "Harris",
                         'img-url': "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"}
            resp = client.post("/users/new", data=form_data,
                               follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Liam Harris", html)

    def test_user_page(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Nicky Murphy', html)

    def test_user_page_404(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{28002}')

            self.assertEqual(resp.status_code, 404)

    def test_edit_user(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}/edit')
            html = resp.get_data(as_text=True)
            # import pdb
            # pdb.set_trace()
            self.assertEqual(resp.status_code, 200)
            self.assertIn('Nicky', html)
            self.assertIn('Edit A User', html)

    def test_submit_edited_user(self):
        with app.test_client() as client:
            form_data = {"first-name": "Liam", "last-name": "Murphy",
                         'img-url': "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"}
            resp = client.post(f"/users/{self.user_id}/edit", data=form_data,
                               follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Liam Murphy", html)

    def test_delete_user(self):
        with app.test_client() as client:
            resp = client.post(f"/users/{self.user_id}/delete",
                               follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("Nicky Murphy", html)

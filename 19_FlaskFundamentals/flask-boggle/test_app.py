from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    def test_boggle_home(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = (Boggle()).make_board()
                change_session['guessed-words'] = []
                change_session['points'] = 0
                change_session['high-score'] = 0
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            import pdb
            pdb.set_trace()

            self.assertEqual(resp.status_code, 200)
            self.assertIn(
                '<h1 class="display-2 text-center m-4 title">Boggle</h1>', html)

    def submit_word(self):
        with app.text_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['M', 'S', 'E', 'V', 'F'], ['J', 'X', 'C', 'B', 'F'], [
                    'T', 'U', 'M', 'A', 'F'], ['Y', 'P', 'Z', 'Y', 'P'], ['L', 'F', 'O', 'O', 'V']]
                change_session['points'] = 0
                change_session['high-score'] = 0

                resp = client.post('/submit-word/bay')
                html = resp.get_data(as_text=True)

                self.assertEqual(resp.status_code, 200)

    # @app.route('/submit-word/<word>', methods=["POST"])
    # def submit_word(word):
    #     """Checks if submitted guess is a valid word, add point if valid, if not, returns a flash msg"""

    #     checked_result = boggle_game.check_valid_word(session['board'], word)

    #     if checked_result == "ok":
    #         session['points'] = session.get('points', 0) + 1
    #     else:
    #         flash(checked_result)

    #     return jsonify({"result": checked_result, "guess": word, "points": session['points'], "high-score": session['high-score']})

    # def check_for_high_score(self):
    #     with app.text_client() as client:
    #         self.assertEqual(1, 1)

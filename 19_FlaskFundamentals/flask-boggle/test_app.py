from unittest import TestCase
from app import app
from flask import session, json
from boggle import Boggle


app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# import pdb
# pdb.set_trace()


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

            self.assertEqual(resp.status_code, 200)
            self.assertIn(
                '<h1 class="display-2 text-center m-4 title">Boggle</h1>', html)

    def test_submit_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['M', 'S', 'E', 'V', 'F'], ['J', 'X', 'C', 'B', 'F'], [
                    'T', 'U', 'M', 'A', 'F'], ['Y', 'P', 'Z', 'Y', 'P'], ['L', 'F', 'O', 'O', 'V']]
                change_session['points'] = 0
                change_session['high-score'] = 0
                change_session['guessed-words'] = []

            resp = client.post('/submit-word/bay')
            json_res = json.loads(resp.get_data(as_text=True))

    def test_submit_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['M', 'S', 'E', 'V', 'F'], ['J', 'X', 'C', 'B', 'F'], [
                    'T', 'U', 'M', 'A', 'F'], ['Y', 'P', 'Z', 'Y', 'P'], ['L', 'F', 'O', 'O', 'V']]
                change_session['points'] = 0
                change_session['high-score'] = 0
                change_session['guessed-words'] = []

            resp = client.post('/submit-word/baseball')
            json_res = json.loads(resp.get_data(as_text=True))
            import pdb
            pdb.set_trace()

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(json_res['guess'], 'baseball')
        self.assertEqual(json_res['points'], 0)
        self.assertEqual(json_res['result'], "Baseball is not on board!")

    def test_check_for_high_score(self, points=12):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['high-score'] = 10

            resp = client.post('/game-over/12')
            json_res = json.loads(resp.get_data(as_text=True))

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(json_res['new-high-score'], 'True')

    def test_check_for_high_score(self, points=8):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['high-score'] = 10

            resp = client.post('/game-over/8')
            json_res = json.loads(resp.get_data(as_text=True))

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(json_res['new-high-score'], 'False')

        # """Checks user score to see if they beat the highscore"""

        # if int(points) > int(session['high-score']):
        #     session['high-score'] = points
        #     return jsonify({"new-high-score": "True"})
        # else:
        #     return jsonify({"new-high-score": "False"})

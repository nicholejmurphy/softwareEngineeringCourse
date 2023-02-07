from boggle import Boggle
from flask import Flask, render_template, session, redirect, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
app = Flask(__name__)
app.config['SECRET_KEY'] = "value"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
debug = DebugToolbarExtension(app)
app.debug = True

boggle_game = Boggle()


@app.route('/')
def boggle_home():
    """Generates Boggle board @ home page"""
    session['board'] = boggle_game.make_board()
    session['guessed-words'] = []
    session['points'] = 0
    session['high-score'] = session.get('high-score', 0)
    return render_template('base.html')


@app.route('/submit-word/<word>', methods=["POST"])
def submit_word(word):
    """Checks if submitted guess is a valid word, add point if valid, if not, returns a flash msg"""

    checked_result = boggle_game.check_valid_word(session['board'], word)

    if checked_result == "ok":
        session['points'] = session.get('points', 0) + 1

    return jsonify({"result": checked_result, "guess": word, "points": session['points'], "high-score": session['high-score']})


@app.route('/game-over/<points>', methods=['POST'])
def check_for_high_score(points):
    """Checks user score to see if they beat the highscore"""

    if int(points) > int(session['high-score']):
        session['high-score'] = points
        return jsonify({"new-high-score": "True"})
    else:
        return jsonify({"new-high-score": "False"})

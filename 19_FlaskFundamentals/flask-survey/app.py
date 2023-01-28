from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey
app = Flask(__name__)
app.config['SECRET_KEY'] = "value"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True

DEBUG_TB_INTERCEPT_REDIRECTS = False

responses = []


@app.route('/')
def home_page():
    """Homepage for surveys"""
    responses = []
    return render_template('base.html', survey=satisfaction_survey)


@app.route('/questions/<index>')
def survey_questions(index):
    """Survey questions"""
    index = int(index)

    return render_template('questions.html', survey=satisfaction_survey, index=index)


@app.route('/answer_question/<index>', methods=["POST"])
def answer_question(index):
    """Submits and saves question answer"""

    # Go to next index of question
    index = int(index) + 1

    # Add answer to responses
    ans = request.form['answer']
    print(ans)
    responses.append(ans)

    # If on the index of question is valid, continue to the next question
    if index != len(satisfaction_survey.questions) - 1:
        return redirect(f'/questions/{index}')

    # If user has completed all questions, rediect to 'completed_survey.html'
    else:
        print(responses)
        return render_template('completed_survey.html', survey=satisfaction_survey)

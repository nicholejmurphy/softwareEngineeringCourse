from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey
app = Flask(__name__)
app.config['SECRET_KEY'] = "value"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
debug = DebugToolbarExtension(app)
app.debug = True

DEBUG_TB_INTERCEPT_REDIRECTS = True

responses = []


@app.route('/')
def home_page():
    """Homepage for surveys"""
    while len(responses) > 0:
        responses.pop()
    print(responses)
    return render_template('base.html', survey=satisfaction_survey)


@app.route("/start-survey", methods=["POST"])
def start_survey():
    """Empties the response list and begins the survey"""

    session["responses"] = []
    index = len(session["responses"])
    return redirect(f"/questions/{index}")


@app.route('/questions/<int:index>')
def survey_questions(index):
    """Survey questions"""
    index = index
    question_idx = len(session["responses"])

    # Make sure user is answering questions in order. If not, redirect them to the correct question.
    if question_idx != index:
        flash(
            f'Please complete the questions in order. You tried to answer question {index}, but you are on question {question_idx}')
        return redirect(f'/questions/{question_idx}')

    return render_template('questions.html', survey=satisfaction_survey, index=index)


@app.route('/answer_question/<int:index>', methods=["POST"])
def answer_question(index):
    """Submits and saves question answer"""

    # Go to next index of question
    index = index + 1

    # Add answer to responses
    ans = request.form['answer']
    responses = session['responses']
    responses.append(ans)
    session['responses'] = responses
    print(session["responses"])

    # If on the index of question is valid, continue to the next question
    if index <= len(satisfaction_survey.questions) - 1:
        return redirect(f'/questions/{index}')

    # If user has completed all questions, rediect to 'completed_survey.html'
    else:
        completed_survey = session["responses"].copy()
        responses = session["responses"]
        while len(responses) > 0:
            responses.pop()
        session["responses"] = responses
        print(completed_survey)
        print(session["responses"])
        return redirect('/completed_survey')


@app.route('/completed_survey')
def completed_survey():
    """Shows thank you page"""
    return render_template('completed_survey.html', survey=satisfaction_survey)

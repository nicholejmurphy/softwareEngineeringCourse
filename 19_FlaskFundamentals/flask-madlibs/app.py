from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories
app = Flask(__name__)

app.config['SECRET_KEY'] = "debugplz"
debug = DebugToolbarExtension(app)
app.debug = True


@app.route("/")
def homepage():
    """Shows home page where usuer can select story theme to use"""
    keys = stories.story_temps.keys()
    return render_template("base.html", keys=keys)


@app.route("/create_story")
def create_story():
    """Generates a dynamic form for user to fill in to add their own words to their story template."""
    chosen_story = ''
    for story in stories.story_temps.keys():
        if request.args.get(story):
            chosen_story = story

    storyPrompts = stories.story_temps[chosen_story].prompts

    return render_template("create.html", prompts=storyPrompts, chosen_story=chosen_story)


@app.route("/dev_story/<chosen_story>")
def dev_story(chosen_story):
    """Generates a story based on the words the user inputs into the story template"""
    title = chosen_story
    story = stories.story_temps[chosen_story].generate(request.args)

    return render_template("dev_story.html", title=title, story=story)

"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


"""
A dictionary that contains a variety of story templates. 
The key is the story theme and it's value contains an instance generator of the Story class containing its own template.
"""
story_temps = {
    'Fairytale': Story(
        ["place", "noun", "verb", "adjective", "plural_noun"],
        """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}."""
    ),
    'Murder Mystery': Story(
        ["adjective", "plural_noun", "noun", "room_type", "weapon", "job_title"],
        """It was a {adjective} day at Johnson Manor. {plural_noun} surround the mansion as a {noun} lies murdered in the {room_type}. All that is known to be true is the {weapon} which was found near the {job_title} with blood on their hands."""
    ),
    'Dream Vacation': Story(
        ["noun", "place", "plural_noun", "verb"],
        """My family and I took a {noun} to {place} for the weekend. All we packed were {plural_noun} and our bathing suits. First thing we will do when we arrive is {verb} to the pool!"""
    ),
    'Adventure': Story(
        ["time", "noun", "plural_noun", "number", "place"],
        """We woke up at {time} and I packed my {noun} with {plural_noun}. It will only take us {number} days to get to {place}, but I think it will be worth it!"""
    ),
    "Wedding Proposal": Story(
        ["adjective", "verb", "noun", "plural_noun", "yes_or_no", "plural_noun"],
        """I was completley surprised, my face looked {adjective}. He {verb} down on one knee and pulled out a {noun}. We were surrounded by {plural_noun} and the sun was just setting! Of course I said {yes_or_no}"""
    )
}

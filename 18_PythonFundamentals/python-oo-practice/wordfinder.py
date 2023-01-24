"""Word Finder: finds random words from a dictionary."""

from random import choice

class WordFinder:
    """Creates a random word generator"""

    def __init__(self, path):
        """Holds a file name as it's attribute"""
        file = open(path)
        self.words = self.parse(file)
        print(f"{len(self.words)} words read")
    
    def parse(self, file):
        '''Removes white space in words'''
        return [w.strip() for w in file]

    def random(self):
        """Generates a random word from the file"""
        return choice(self.words)

class SpecialWordFinder(WordFinder):
    """Finds a random word in a text file that may contain empty lines"""

    def __init__(self, path):
        super().__init__(self, path)
    
    def parse(self, file):
        """Generates a random word from the file"""
        return [w.strip() for w in file if w.strip() and not w.startswith('#')]